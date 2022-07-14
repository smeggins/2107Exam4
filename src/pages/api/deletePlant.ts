import { NextApiRequest, NextApiResponse } from "next";
import { PlantController } from "@/backEnd/dataAccessLayer/actions/plant";

//Reference Yudhvirs Class 30/06/2022
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //plant information sent with req parsed into vars
    const { _id }: { _id: string } = req.body;

    try {
        // validate the correct request type
        if (req.method !== 'PUT') {
            throw {
                code: 405,
                message: 'only PUT is allowed'
            };
        }

        // basic input validation
        if (_id == null || !_id) {
            throw {
                code: 400,
                message: 'invalid information given for plant ID',
                type: 'NETWORK'
            };
        }
        
        // attempts to delete the plant
        const response  = await PlantController.delete(_id);

        // returns the success
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

