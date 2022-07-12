import { ORM } from "./ORM/ORM";
import { User } from "@interfaces/User";
import { HashMap } from "@interfaces/HashMap";
import { DatabaseObject } from "@interfaces/DatabaseObject";
import UserModel from "@dataAccessLayer/schemas/user";

/// Controls all actions for the User Model
export class UserController implements DatabaseObject, User {
    /// The mongo ID given when an object is first created
    _id: String;
    /// the users email address
    email: String;
    // the users password to be sent to the back-end for validation     
    password: String;
    
    constructor(email: String, password: String, _id: String = "") {
        /// instantiated with a default value if non is given
        this._id = _id
        this.email = email;
        this.password = password;
    }
    

    /// saves the user to the database
    async save() {
        return await ORM.saveObject(this, UserModel)
    }

    /// if this objects _id matches a document Id update it with this objects values (excluding _id)
    async updateUser() {
        return await ORM.updateByID(this._id, this, UserModel)
    }

    /// deletes the user with the given ID
    static async delete(_id: string) {
        return await ORM.deleteByID(UserModel, _id)
    }

    /// if a user exists in the database with the given Id return it
    static async getUser(_id: string) {
        return await ORM.find(UserModel, _id)
    }

    /// get all users that belong to the UserModel in the database
    static async getUsers() {
        return await ORM.findAll(UserModel)
    }

    /// converts given values of this object into a HashMap
    toHashMap(): HashMap {
        return {
            email: this.email,
            password: this.password
        };
    }
}