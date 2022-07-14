import { ORM } from "./ORM/ORM";
import { HashMap } from "@interfaces/HashMap";
import { DatabaseObject } from "@interfaces/DatabaseObject";
import { Plant } from "@/shared/interfaces/Plant";
import PlantModel from "../schemas/plant";

/// Controls all actions for the User Model
export class PlantController implements DatabaseObject, Plant {
    /// The mongo ID given when an object is first created
    _id: string;
    // The name of the Plant
    name: string;
    // a short description of the Plant to be displayed
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
        return await ORM.saveObject(this, PlantModel);
    }

    /// if this objects _id matches a document Id update it with this objects values (excluding _id)
    async updatePlant() {
        return await ORM.updateByID(this._id, this, PlantModel);
    }

    /// deletes the user with the given ID
    static async delete(_id: string) {
        return await ORM.deleteByID(PlantModel, _id);
    }
    
    /// if a user exists in the database with the given Id return it
    static async getPlant(_id: string) {
        return await ORM.find(PlantModel, _id);
    }

    /// if a user exists in the database with the given Id return it
    static async getPlantByName(name: string) {
        return await ORM.findByName(PlantModel, name);
    }

    /// get all users that belong to the PlantModel in the database
    static async getPlants() {
        return await ORM.findAll(PlantModel);
    }

    /// get all users that belong to the PlantModel in the database
    static async getLimitedPlants() {
        return await ORM.findSome(PlantModel, 2);
    }

    /// get all users that belong to the PlantModel in the database
    static async getPlantsByIDs(ids: [string]) {
        return await ORM.findByIDs(PlantModel, ids);
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