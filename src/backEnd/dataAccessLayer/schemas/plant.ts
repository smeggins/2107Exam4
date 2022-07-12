import { model, models, Schema } from "mongoose";

/// a schema used to represnt a user
const plantSchema = new Schema({
    // The name of the plant
    name: {type: String, required: true},
    // a short description of the plant to be displayed
    description: {type: String, required: true},
    // that path to the image
    imagePath: {type: String, required: false}
}); 

// The database model that represents a plant
const PlantModel = models.Plant || model('Plant', plantSchema);

export default PlantModel;