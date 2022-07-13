import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@dataAccessLayer/actions/user"
import { ToolController } from "@/backEnd/dataAccessLayer/actions/tool";

//Reference Yudhvirs Class 30/06/2022

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 1) get username & password from body
    const name = String(req.query.name);
    
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
        const existingTool = await ToolController.getToolByName(name)

        if (!existingTool) {
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
                    tool: existingTool
                }
            );
        }
        
    } catch(error: any) {
        const { code = 500, message } = error;
        res.status(code).json(
            {
                code,
                message
            }
        );
    }
}

