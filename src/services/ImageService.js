const Image = require('../models/Image');

class ImageService {
    create = async (req, res) => {

        if (!req.file) {
            res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
            return;
        }

        res.json({ imageUrl: req.file.path });
    }
}

module.exports = new ImageService();