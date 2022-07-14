import { NextApiRequest, NextApiResponse } from "next";
import { ToolController } from "@/backEnd/dataAccessLayer/actions/tool";

//Reference Yudhvirs Class 30/06/2022
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //plant information sent with req parsed into vars
    const { name, description, image }: { name: string, description: string, image: string} = req.body;

    try {
        // validate the correct request type
        if (req.method !== 'POST') {
            throw {
                code: 405,
                message: 'only POST is allowed'
            };
        }

        // basic validation of ref vars
        if (name == null || !name || name.length <= 2 || name.length > 10) {
            throw {
                code: 400,
                message: 'invalid information given for Tool name',
                type: 'NETWORK'
            }
        }

        if (description == null || !description || description.length < 4 || description.length > 60) {
            throw {
                code: 400,
                message: 'invalid information given for Tool description',
                type: 'NETWORK'
            }
        }

        // attempts to retrieve a tool with the given name
        const existingTool: ToolController = await ToolController.getToolByName(name.toUpperCase())

        // if tool exists throw error
        if (existingTool) {
            throw {
                code: 400,
                message: 'Tool is taken'
            }
        }

        // build a new instance of the tool and save it
        const Tool = new ToolController(name.toUpperCase(), description, image)
        Tool.save()

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

