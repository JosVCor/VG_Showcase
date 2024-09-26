const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Video Category schema
const videoCategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('VideoCategory', videoCategorySchema);
