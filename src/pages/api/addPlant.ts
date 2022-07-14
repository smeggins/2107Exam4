import { NextApiRequest, NextApiResponse } from "next";
import { PlantController } from "@/backEnd/dataAccessLayer/actions/plant";
import { UserController } from "@/backEnd/dataAccessLayer/actions/user";

//Reference Yudhvirs Class 30/06/2022
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //plant information sent with req parsed into vars
    const { name, description, image, userID }: { name: string, description: string, image: string, userID: string} = req.body;

    try {
        // validate the correct request type
        if (req.method !== 'POST') {
            throw {
                code: 405,
                message: 'only POST is allowed'
            };
        }

        // basic validation of input values
        if (name == null || !name || name.length <= 2 || name.length > 10) {
            throw {
                code: 400,
                message: 'invalid information given for plant name',
                type: 'NETWORK'
            };
        }

        if (description == null || !description || description.length < 4 || description.length > 60) {
            throw {
                code: 400,
                message: 'invalid information given for plant description',
                type: 'NETWORK'
            };
        }

        // basic validation of input values
        if (userID == null || !userID) {
            throw {
                code: 400,
                message: 'No userID recieved',
                type: 'NETWORK'
            };
        }
        
        // attempt to retrieve plant by name
        const existingPlant: PlantController = await PlantController.getPlantByName(name.toUpperCase());

        // if plant exists throw error
        if (existingPlant) {
            throw {
                code: 400,
                message: 'plant is taken'
            };
        }

        // create new plant object and save it
        let plant = new PlantController(name.toUpperCase(), description, image);
        await plant.save();
        // retrieve our newly created plants mongoose generated ID
        plant = await PlantController.getPlantByName(plant.name);
        // retrieve user values from user controller
        const uVals = await UserController.getUser(userID);
        // create a usercontroller to update
        const newUser = new UserController(uVals.email, uVals.password, uVals._id.toString(), uVals.plantIDs);
        // add the new plant id
        newUser.plantIDs.push(plant._id);
        // update the user
        newUser.updateUser();

        // return success
        res.status(200).json(
            {
                code: 200,
                success: true
            }
        );
    } 
    catch(error: any) {
        const { code = 500, message } = error;
        res.status(code).json(
            {
                code,
                message
            }
        );
    }
}

