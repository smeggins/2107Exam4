import { ORM } from "./ORM/ORM";
import { HashMap } from "@interfaces/HashMap";
import { DatabaseObject } from "@interfaces/DatabaseObject";
import { Tool } from "@/shared/interfaces/Tool";
import ToolModel from "../schemas/tool";

/// Controls all actions for the User Model
export class ToolController implements DatabaseObject, Tool {
    /// The mongo ID given when an object is first created
    _id: string;
    // The name of the Tool
    name: string;
    // a short description of the Tool to be displayed
    description: string;
    // that path to the image
    imagePath: string;
    
    constructor(name: string, description: string, imagePath: string = "", _id: string = "") {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this._id = _id;
    }

    /// saves the user to the database
    async save() {
        return await ORM.saveObject(this, ToolModel);
    }

    /// if this objects _id matches a document Id update it with this objects values (excluding _id)
    async updateTool() {
        return await ORM.updateByID(this._id, this, ToolModel);
    }

    /// deletes the user with the given ID
    static async delete(_id: string) {
        return await ORM.deleteByID(ToolModel, _id);
    }
    
    /// if a user exists in the database with the given Id return it
    static async getTool(_id: string) {
        return await ORM.find(ToolModel, _id);
    }

    /// if a user exists in the database with the given name return it
    static async getToolByName(name: string) {
        return await ORM.findByName(ToolModel, name);
    }

    /// get all users that belong to the ToolModel in the database
    static async getTools() {
        return await ORM.findAll(ToolModel);
    }

    /// converts given values of this object into a HashMap
    toHashMap(): HashMap {
        return {
            name: this.name,
            description: this.description,
            imagePath: this.imagePath
        };
    }
}