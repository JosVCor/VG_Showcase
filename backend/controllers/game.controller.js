const Game = require('../models/game.model');

// Create a new game
exports.createGame = async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).json(game);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all games
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.find().populate('system'); // Populate system references
        res.status(200).json(games);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a game by ID
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('system');
        if (!game) return res.status(404).json({ error: 'Game not found' });
        res.status(200).json(game);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a game
exports.updateGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!game) return res.status(404).json({ error: 'Game not found' });
        res.status(200).json(game);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a game
exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
