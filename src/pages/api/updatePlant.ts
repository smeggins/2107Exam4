import { NextApiRequest, NextApiResponse } from "next";
import { PlantController } from "@/backEnd/dataAccessLayer/actions/plant";

//Reference Yudhvirs Class 30/06/2022
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //plant information sent with req parsed into vars
    const {_id,  name, description, image }: { _id: string, name: string, description: string, image: string} = req.body;

    try {
        // validate the correct request type
        if (req.method !== 'PUT') {
            throw {
                code: 405,
                message: 'only PUT is allowed'
            };
        }

        // validation on ref values
        if (_id == null || !_id) {
            throw {
                code: 400,
                message: 'invalid information given for plant ID',
                type: 'NETWORK'
            };
        }

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

        // creates a new plant with the updated values and updates it
        const newPlant: PlantController = new PlantController(name.toUpperCase(), description, image, _id);
        let response  = await newPlant.updatePlant();

        // returns success
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

