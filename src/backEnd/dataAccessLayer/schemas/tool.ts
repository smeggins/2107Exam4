import { model, models, Schema } from "mongoose";

/// a schema used to represnt a user
const toolSchema = new Schema({
    // The name of the tool
    name: {type: String, required: true},
    // a short description of the tool to be displayed
    description: {type: String, required: true},
    // that path to the image
    imagePath: {type: String, required: false}
}); 

// The database model that represents a tool
const ToolModel = models.Tool || model('Tool', toolSchema);

export default ToolModel;