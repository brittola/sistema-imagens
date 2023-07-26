const express = require('express');
const router = express.Router();
const UserService = require('./services/UserService');
const ImageService = require('./services/ImageService');
const loginAuth = require('./middlewares/loginAuth');
const { upload, handleMulterError } = require('./multerConfig');

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/user', UserService.create);

router.post('/auth', UserService.auth);

router.post('/image', loginAuth, upload.single('image'), handleMulterError, ImageService.create);

router.get('/image/:id', ImageService.get);

router.delete('/image/:id', loginAuth, ImageService.delete);

router.delete('/user/:email', UserService.delete);

module.exports = router;