const VideoCategory = require('../models/videoCategory.model');

// Create a new video category
exports.createVideoCategory = async (req, res) => {
    try {
        const category = new VideoCategory(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all video categories
exports.getAllVideoCategories = async (req, res) => {
    try {
        const categories = await VideoCategory.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a video category by ID
exports.getVideoCategoryById = async (req, res) => {
    try {
        const category = await VideoCategory.findById(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a video category
exports.updateVideoCategory = async (req, res) => {
    try {
        const category = await VideoCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a video category
exports.deleteVideoCategory = async (req, res) => {
    try {
        const category = await VideoCategory.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
