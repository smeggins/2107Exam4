import { NextApiRequest, NextApiResponse } from "next";
import { UserController } from "@dataAccessLayer/actions/user"

import { hash } from 'bcrypt';

//Reference Yudhvirs Class 30/06/2022

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 1) get username & password from body
    const { email, password }: { email: string, password: string} = req.body;
    const lowercasedEmail = email.toLowerCase();
    console.log("made it to form validation")
    console.log("email: ", email)
    console.log("password: ", password)
    console.log("lowercasedEmail: ", lowercasedEmail)
    try {
        if (email == null || !email || email.length <= 3 || email.length > 320) {
            throw {
                code: 400,
                message: 'invalid information given for email',
                type: 'NETWORK'
            }
        }

        if (password == null || !password || password.length < 8 || password.length > 32) {
            throw {
                code: 400,
                message: 'invalid information given for password',
                type: 'NETWORK'
            }
        }

        if (req.method !== 'POST') {
            throw {
                code: 405,
                message: 'only POST is allowed'
            };
        }
        console.log("about to make a user")
        const existingUser: UserController = await UserController.getUserByEmail(lowercasedEmail)
        console.log("existingUser: ", existingUser)

        // 3) throw an error if it exists
        if (existingUser) {
            throw {
                code: 400,
                message: 'username is taken'
            }
        }

        // 4) hash the password
        // hash the password (auto get a salt)
        const hashedPassword = await hash(password, 10);

        const user = new UserController(lowercasedEmail, hashedPassword)
        console.log("user.email: ", user.email)
        user.save()

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

