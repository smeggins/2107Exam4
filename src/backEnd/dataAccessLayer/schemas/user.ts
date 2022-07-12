import { model, models, Schema } from "mongoose";

/// a schema used to represnt a user
const userSchema = new Schema({
    // the users email address
    email: {type: String, required: true},
    // the users hashed password 
    password: {type: String, required: true},
    // id's of plants that were created by this user
    plantIDs: {type: [String], required: true}
}); 

// The database model that represents a user
const UserModel = models.User || model('User', userSchema);

export default UserModel;