const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Game schema
const gameSchema = new Schema({
    name: { type: String, required: true },
    system: [{ type: Schema.Types.ObjectId, ref: 'System', required: true }], // Reference to System
    releaseDate: { type: Date },
    rating: { type: String },
    videoCategories: [{
        categoryName: { type: String, required: true },
        videos: [{ type: String }] // Array of video URLs or file paths
    }],
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
