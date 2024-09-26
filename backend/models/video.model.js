const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    system: { type: Schema.Types.ObjectId, ref: 'System', required: true },  // Reference to System (add this field)
    game: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'VideoCategory', required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
