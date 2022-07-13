import NextAuth from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import Database from '@/backEnd/dataAccessLayer/database/database';
import { UserController } from '@/backEnd/dataAccessLayer/actions/user';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';


export default NextAuth(
    {
        adapter: MongoDBAdapter(Database.setupAdapterConnection()),
        session: {
            strategy: 'jwt'
        },
        providers: [
            CredentialsProvider({
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
                    console.log("in authorize method")
                    const { email, password } = credentials;

                    console.log("credentials email: ", email)
                    console.log("credentials password: ", password)

                    //wait database connection
                    await Database.setupClient();

                    //find user by email
                    const user = await UserController.getUserByEmail(email)

                    if (user) {
                        console.log(user.password)
                        
                        // compare password
                        const isValid = await compare(password, user.password);
                        if (!isValid) {

                            //return password error if not matched
                            throw new Error('password is incorrect');
                        }

                    } else {

                        //return email error if user not found
                        throw new Error('email does not exist');
                    }

                    console.log("returning user")
                    return user;
                }
            })
        ],
        pages: {
            signIn: "/Login",
            signOut: "/Login",
            newUser: "/",
            error: "/Login"
        },
        callbacks: {
            
            //called when user is successfully authenticated, get the user id
            //ref:https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1932922
            session: async ({ session, token }) => {
                console.log("in session method")
                if (session?.user) {
                  console.log("if (session?.user)")
                    session.user.id = token.sub;
                }
                return session;
            },

            async redirect() {
                console.log("in redirect method")
                return process.env.NEXTAUTH_URL;
            }
        },

        secret: process.env.NEXTAUTH_SECRET,
    }
);