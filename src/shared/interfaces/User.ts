// represents an example user for the purpose of demonstrating the ORM.
export interface User {
    // The users email address
    email: string;
    // the users password to be sent to the back-end for validation
    password: string;
    // id's of plants that were created by this user
    plantIDs: [string]
}