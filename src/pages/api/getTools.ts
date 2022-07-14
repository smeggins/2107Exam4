import { NextApiRequest, NextApiResponse } from "next";
import { ToolController } from "@/backEnd/dataAccessLayer/actions/tool";

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

        // basic validation of var
        if (name == null || !name) {
            throw {
                code: 400,
                message: 'invalid information given for plant name',
                type: 'NETWORK'
            };
        }

        const uppercaseName = name.toUpperCase();
        
        // attempts to retrieve tool by name
        const existingTool = await ToolController.getToolByName(uppercaseName);

        // returns success and tool
        if (existingTool) {
            res.status(200).json(
                {
                    code: 200,
                    success: true,
                    tool: existingTool
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

