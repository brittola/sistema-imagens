const Image = require('../models/Image');
const path = require('path');

class ImageService {
    create = async (req, res) => {

        try {

            if (!req.file) {
                res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
                return;
            }
    
            const newImage = new Image({filename: req.file.filename, uploadedBy: req.body.userId});
            const savedImage = await newImage.save();
    
            // devolve a url de visualização para ser compartilhada
            // devolve o nome do arquivo para o teste checar se foi criado na pasta /media
            res.json({ imageUrl: 'http://localhost:8080/image/' + savedImage._id, filename: req.file.filename });

        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
    get = async (req, res) => {
        // separa o caminho da pasta de imagens salvas e o id da imagem pela url
        const mediaPath = path.join(__dirname, '../media');
        const imageId = req.params.id;

        try {
            // busca a imagem pelo id
            const image = await Image.findById(imageId);

            if (!image) {
                res.sendStatus(404);
                return;
            }

            // junta o caminho da pasta /media com o nome da imagem e envia como resposta
            const imagePath = path.join(mediaPath, image.filename);
            res.sendFile(imagePath);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}

module.exports = new ImageService();