const cloudinary = require('cloudinary').v2;
const Video = require('../models/video.model');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs'); // Add this for file deletion

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create a new video
exports.createVideo = async (req, res) => {
    try {
        const file = req.file.path;  // File path from multer

        // Upload video to Cloudinary
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "video",
            folder: 'vg_videos'
        });

        // Delete the file after successful upload to Cloudinary
        fs.unlinkSync(file);

        const video = new Video({
            title: req.body.title,
            url: result.secure_url,
            system: req.body.systemId,  // Added system handling
            game: req.body.gameId,
            category: req.body.category
        });

        await video.save();
        res.status(201).json(video);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all videos
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('game category');
        res.status(200).json(videos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a video by ID
exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id).populate('game category');
        if (!video) return res.status(404).json({ error: 'Video not found' });
        res.status(200).json(video);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a video
exports.updateVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!video) return res.status(404).json({ error: 'Video not found' });
        res.status(200).json(video);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) return res.status(404).json({ error: 'Video not found' });
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
