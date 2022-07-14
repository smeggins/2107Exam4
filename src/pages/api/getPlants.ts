import { NextApiRequest, NextApiResponse } from "next";
import { PlantController } from "@/backEnd/dataAccessLayer/actions/plant";

//Reference Yudhvirs Class 30/06/2022
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //plant information sent with req parsed into vars
    const name = String(req.query.name);

    try {
        // validate the correct request type
        if (req.method !== 'GET') {
            throw {
                code: 405,
                message: 'only GET is allowed'
            };
        }

        // basic value validation
        if (name == null || !name) {
            throw {
                code: 400,
                message: 'invalid information given for plant name',
                type: 'NETWORK'
            };
        }

        // all names are uppercase so a search should also always be uppercase
        const uppercaseName = name.toUpperCase();

        // attempts to retrieve plant by name
        const existingPlant = await PlantController.getPlantByName(uppercaseName);

        // validates plant was retrieved and returns it
        if (existingPlant) {
            res.status(200).json(
                {
                    code: 200,
                    success: true,
                    plant: existingPlant
                }
            );
        }

        throw {
            code: 400,
            message: 'failed to retrieve',
            type: 'NETWORK'
        };
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

