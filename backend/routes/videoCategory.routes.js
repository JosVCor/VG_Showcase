const express = require('express');
const router = express.Router();
const videoCategoryController = require('../controllers/videoCategory.controller');

// Define video category routes
router.post('/', videoCategoryController.createVideoCategory);
router.get('/', videoCategoryController.getAllVideoCategories);
router.get('/:id', videoCategoryController.getVideoCategoryById);
router.put('/:id', videoCategoryController.updateVideoCategory);
router.delete('/:id', videoCategoryController.deleteVideoCategory);

module.exports = router;
