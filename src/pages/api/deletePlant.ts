import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@dataAccessLayer/actions/user"
import { PlantController } from "@/backEnd/dataAccessLayer/actions/plant";

//Reference Yudhvirs Class 30/06/2022

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 1) get username & password from body
    const { _id }: { _id: string } = req.body;
    console.log("made it to form validation")
    console.log("_id: ", _id)

    try {
        if (_id == null || !_id) {
            throw {
                code: 400,
                message: 'invalid information given for plant ID',
                type: 'NETWORK'
            }
        }

        if (req.method !== 'PUT') {
            throw {
                code: 405,
                message: 'only PUT is allowed'
            };
        }
        console.log("about to delete a plant")
        const response  = await PlantController.delete(_id)
        console.log("response to update: ", response)

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

