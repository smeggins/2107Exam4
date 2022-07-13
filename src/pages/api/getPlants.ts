import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@dataAccessLayer/actions/user"
import { PlantController } from "@/backEnd/dataAccessLayer/actions/plant";

//Reference Yudhvirs Class 30/06/2022

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 1) get username & password from body
    const name = String(req.query.name);
    console.log("made it to form validation")
    console.log("name: ", name)
    try {
        if (name == null || !name) {
            throw {
                code: 400,
                message: 'invalid information given for plant name',
                type: 'NETWORK'
            }
        }

        if (req.method !== 'GET') {
            throw {
                code: 405,
                message: 'only GET is allowed'
            };
        }
        console.log("about to get a plant")
        const existingPlant = await PlantController.getPlantByName(name)
        console.log("existingPlant: ", existingPlant)

        if (!existingPlant) {
            res.status(200).json(
                {
                    code: 200,
                    success: false
                }
            );

            return
        }
        else {
            res.status(200).json(
                {
                    code: 200,
                    success: true,
                    plant: existingPlant
                }
            );
        }
        
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

