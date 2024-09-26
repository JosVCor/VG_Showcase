// routes/system.routes.js
const express = require('express');
const router = express.Router();
const systemController = require('../controllers/system.controller');

// Define routes
router.post('/', systemController.createSystem);
router.get('/', systemController.getAllSystems);
router.get('/:id', systemController.getSystemById);
router.put('/:id', systemController.updateSystem);
router.delete('/:id', systemController.deleteSystem);

module.exports = router;