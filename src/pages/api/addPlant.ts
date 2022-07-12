import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@dataAccessLayer/actions/user"
import { PlantController } from "@/backEnd/dataAccessLayer/actions/plant";

//Reference Yudhvirs Class 30/06/2022

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 1) get username & password from body
    const { name, description }: { name: string, description: string} = req.body;
    console.log("made it to form validation")
    console.log("name: ", name)
    console.log("description: ", description)
    try {
        if (name == null || !name || name.length <= 2 || name.length > 10) {
            throw {
                code: 400,
                message: 'invalid information given for plant name',
                type: 'NETWORK'
            }
        }

        if (description == null || !description || description.length < 4 || description.length > 50) {
            throw {
                code: 400,
                message: 'invalid information given for plant description',
                type: 'NETWORK'
            }
        }

        if (req.method !== 'POST') {
            throw {
                code: 405,
                message: 'only POST is allowed'
            };
        }
        console.log("about to make a plant")
        const existingPlant: PlantController = await PlantController.getPlantByName(name)
        console.log("existingPlant: ", existingPlant)

        // 3) throw an error if it exists
        if (existingPlant) {
            throw {
                code: 400,
                message: 'plant is taken'
            }
        }

        const plant = new PlantController(name, description, "plantA.png")
        console.log("plant.email: ", plant.imagePath)
        plant.save()

        // optional, automatically sign in the user
        // look at nextauth docs to do this
        // 6) send back a succesful response
        res.status(200).json(
            {
                code: 200,
                success: true
            }
        );
    } catch(error: any) {
        const { code = 500, message } = error;
        console.log(message)
        res.status(code).json(
            {
                code,
                message
            }
        );
    }
}

