import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@dataAccessLayer/actions/user"
import { ToolController } from "@/backEnd/dataAccessLayer/actions/tool";

//Reference Yudhvirs Class 30/06/2022

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 1) get username & password from body
    const { name, description, image }: { name: string, description: string, image: string} = req.body;
    console.log("made it to form validation")
    console.log("name: ", name)
    console.log("description: ", description)
    try {
        if (name == null || !name || name.length <= 2 || name.length > 10) {
            throw {
                code: 400,
                message: 'invalid information given for Tool name',
                type: 'NETWORK'
            }
        }

        if (description == null || !description || description.length < 4 || description.length > 600) {
            throw {
                code: 400,
                message: 'invalid information given for Tool description',
                type: 'NETWORK'
            }
        }

        if (req.method !== 'POST') {
            throw {
                code: 405,
                message: 'only POST is allowed'
            };
        }
        console.log("about to make a Tool")
        const existingTool: ToolController = await ToolController.getToolByName(name.toUpperCase())
        console.log("existingTool: ", existingTool)

        // 3) throw an error if it exists
        if (existingTool) {
            throw {
                code: 400,
                message: 'Tool is taken'
            }
        }

        const Tool = new ToolController(name.toUpperCase(), description, image)
        console.log("Tool.email: ", Tool.imagePath)
        Tool.save()

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

