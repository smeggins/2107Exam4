import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@dataAccessLayer/actions/user";
import { hash } from 'bcrypt';

//Reference Yudhvirs Class 30/06/2022
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //user information sent with req parsed into vars
    const { email, password }: { email: string, password: string} = req.body;

    try {
        // validate the correct request type
        if (req.method !== 'POST') {
            throw {
                code: 405,
                message: 'only POST is allowed'
            };
        }

        // validation on inputs
        if (email == null || !email || email.length <= 3 || email.length > 320) {
            throw {
                code: 400,
                message: 'invalid information given for email',
                type: 'NETWORK'
            };
        }

        if (password == null || !password || password.length < 8 || password.length > 32) {
            throw {
                code: 400,
                message: 'invalid information given for password',
                type: 'NETWORK'
            };
        }

        // casts email to all lower case letters
        const lowercasedEmail = email.toLowerCase();
        // attempts to retrieve user with the lowercase email
        const existingUser: UserController = await UserController.getUserByEmail(lowercasedEmail);

        // if user with that email exists throw and error
        if (existingUser) {
            throw {
                code: 400,
                message: 'username is taken'
            };
        }

        // hash the password using bcrypt
        const hashedPassword = await hash(password, 10);

        // create a new usercontroller and save the new user
        const user = new UserController(lowercasedEmail, hashedPassword);
        user.save();

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

