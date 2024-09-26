// controllers/system.controller.js
const System = require('../models/system.model');

// Create a new system
exports.createSystem = async (req, res) => {
    try {
        const newSystem = new System(req.body);
        const savedSystem = await newSystem.save();
        res.status(201).json(savedSystem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all systems
exports.getAllSystems = async (req, res) => {
    try {
        const systems = await System.find();
        res.status(200).json(systems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single system by ID
exports.getSystemById = async (req, res) => {
    try {
        const system = await System.findById(req.params.id);
        if (!system) return res.status(404).json({ message: 'System not found' });
        res.status(200).json(system);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a system
exports.updateSystem = async (req, res) => {
    try {
        const system = await System.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!system) return res.status(404).json({ message: 'System not found' });
        res.status(200).json(system);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a system
exports.deleteSystem = async (req, res) => {
    try {
        const system = await System.findByIdAndDelete(req.params.id);
        if (!system) return res.status(404).json({ message: 'System not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
