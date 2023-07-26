const express = require('express');
const router = express.Router();
const UserService = require('./services/UserService');
const ImageService = require('./services/ImageService');
const loginAuth = require('./middlewares/loginAuth');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: 'src/media',
    filename: (req, file, cb) => {
        const originalExt = path.extname(file.originalname);
        cb(null, Date.now() + originalExt);
    },
});
const upload = multer({ storage });


router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/user', UserService.create);

router.post('/auth', UserService.auth);

router.post('/image', upload.single('image'), loginAuth, ImageService.create);

router.get('/image/:id', ImageService.get);

router.delete('/image/:id', loginAuth, ImageService.delete);

router.delete('/user/:email', UserService.delete);

module.exports = router;