import Database from "@dataAccessLayer/database/database";
import { DatabaseObject } from "@interfaces/DatabaseObject";
import mongoose, { Model, Schema } from "mongoose";


export class ORM {

    /// save a copy of the given object as the supplied model to the database
    static async saveObject(obj: DatabaseObject, model: mongoose.Model<any>) {
        await Database.setupClient();
        /// The hashMapped values of the object
        const values = obj.toHashMap();
        /// builds the model with the given values and saves it to the database
        const buildModel = new model(values);
        
        return  await buildModel.save();
    }

    /// return all entries in the database that match the given model
    /// Cast the result as an array of objects you expect from the call.
    /// Ie> i'm getting all of the questions so i cast them as: question[]
    static async findAll(model: mongoose.Model<any>) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that needs to be Cast to the requested object type 
        const foundEntries = await model.find({});

        return foundEntries;
    }

    /// return all entries in the database that match the given model
    /// Cast the result as an array of objects you expect from the call.
    /// Ie> i'm getting all of the questions so i cast them as: question[]
    static async findSome(model: mongoose.Model<any>, numberOfResults: number) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that needs to be Cast to the requested object type 
        const foundEntries = await model.find({}).limit(numberOfResults);

        return foundEntries;
    }

    /// find a specific object by it's model and mongoose _id and returns a mongoose query
    /// Cast the result as the object type you expect from the call.
    static async find(model: mongoose.Model<any>, id: string) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns the request query that needs to be Cast to the requested object type 
        const foundEntry = await model.findById({ _id: id });
        
        return foundEntry;
    }

    /// find user document by email
    static async findByEmail(model: mongoose.Model<any>, userEmail: string) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that only includes document that contain the email
        const foundEntries = await model.findOne({email: userEmail});

        return foundEntries;
    }

    /// find user document by Name
    static async findByName(model: mongoose.Model<any>, entityName: string) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// returns a mongoose query that only includes document that contain the Name
        const foundEntries = await model.findOne({name: entityName});

        return foundEntries;
    }

    /// delete an entry in the mongoose document for the given model that matches the given id
    static async deleteByID(model: mongoose.Model<any>, id: string) {
        /// establishes a connecti on to the database
        await Database.setupClient();
        /// deletes the given entry and returns whether it was successful
        const deleteSuccessful = await model.deleteOne({ _id: id });
        
        return deleteSuccessful.deletedCount == 1;
    }

    /// updates the document that matches the id with the valuse in the obj parameter for the given model
    static async updateByID(_id:String, obj: DatabaseObject, model: mongoose.Model<any>) {
        /// establishes a connection to the database
        await Database.setupClient();
        /// converts the obj values to a hashmap
        const values = obj.toHashMap()
        // find by ID and update the given values, returning the updated document when completed
        var returnResult = await model.findOneAndUpdate({_id: _id}, values, { returnDocument: 'after' });
        
        return returnResult
    } 
}
