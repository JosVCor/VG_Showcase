const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Import routes
const systemRoutes = require('./routes/system.routes');
const gameRoutes = require('./routes/game.routes');
const videoCategoryRoutes = require('./routes/videoCategory.routes');
const videoRoutes = require('./routes/video.routes');

// Use system, game, and category routes
app.use('/api/systems', systemRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/video-categories', videoCategoryRoutes);
app.use('/api/videos', videoRoutes);

// Serve the Angular frontend
app.use(express.static(path.join(__dirname, '../frontend/dist/frontend/browser')));

// Wildcard route to serve Angular frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/frontend/browser/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
