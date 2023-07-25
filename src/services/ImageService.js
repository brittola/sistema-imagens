const Image = require('../models/Image');

class ImageService {
    create = async (req, res) => {

        try {

            if (!req.file) {
                res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
                return;
            }
    
            const imagePath = req.file.path;
    
            const newImage = new Image({path: imagePath, uploadedBy: req.body.userId});
            await newImage.save();
    
            res.json({ imageUrl: imagePath });

        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}

module.exports = new ImageService();