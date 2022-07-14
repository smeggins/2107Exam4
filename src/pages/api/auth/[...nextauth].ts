import NextAuth from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import Database from '@/backEnd/dataAccessLayer/database/database';
import { UserController } from '@/backEnd/dataAccessLayer/actions/user';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

// handles user login and authentication
// reference: class, chatmaker implementation, https://next-auth.js.org/
export default NextAuth(
    {
        // adapter to give nextauth access to mongoose db
        adapter: MongoDBAdapter(Database.setupAdapterConnection()),
        // used to force encryption of the session cookie using jwt
        session: {
            strategy: 'jwt'
        },
        providers: [
            CredentialsProvider(
            {
                id: 'credentials',
                name: 'TobysPlants',
                credentials: {
                    email: {
                        label: 'Email',
                        type: 'email',
                        placeholder: 'Email',
                    },
                    password: {
                        label: 'Password',
                        type: 'password',
                        placeholder: 'Password',
                    },
                },
                async authorize(credentials) {
                    // user email and password passed using nextauth signin metod in Login page
                    const { email, password } = credentials;

                    //wait database connection
                    await Database.setupClient();

                    //find user by email
                    const user = await UserController.getUserByEmail(email)

                    if (user) {                        
                        // compare given password against stored password using bcrypt
                        const isValid = await compare(password, user.password);
                        if (!isValid) {
                            //return password error if not matched
                            throw new Error('password is incorrect');
                        }

                    } 
                    else {
                        //return email error if user not found
                        throw new Error('email does not exist');
                    }

                    return user;
                }
            })
        ],
        // assigns pages to re-direct when performing next-auth tasks
        pages: {
            signIn: "/Login",
            signOut: "/Login",
            newUser: "/",
            error: "/Login"
        },
        callbacks: {
            //called when user is successfully authenticated, get the user id
            //ref:https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1932922
            //assigning token to user in session
            session: async ({ session, token }) => {
                if (session?.user) {
                    session.user.id = token.sub;
                }
                return session;
            },
            // default redirect
            async redirect() {
                return process.env.NEXTAUTH_URL;
            }
        },
        // sets string used to generate random hash tokens
        secret: process.env.NEXTAUTH_SECRET,
    }
);