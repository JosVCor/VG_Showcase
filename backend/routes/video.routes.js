const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  // Temp location for uploaded files

// Video routes
router.post('/', upload.single('videoFile'), videoController.createVideo);  // Apply multer only to the POST route
router.get('/', videoController.getAllVideos);
router.get('/:id', videoController.getVideoById);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

module.exports = router;
