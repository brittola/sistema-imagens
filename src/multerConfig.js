const multer = require('multer');
const path = require('path');

const imageFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo não suportado. Tente enviar um arquivo em um dos seguintes formatos: ' + allowedExtensions.join(', ')));
    }
};

const storage = multer.diskStorage({
    destination: path.join(__dirname, '/media'),
    filename: (req, file, cb) => {
        const originalExt = path.extname(file.originalname);
        cb(null, Date.now() + originalExt);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
});

const handleMulterError = (err, req, res, next) => {
    res.status(406).json({ error: err.message });
}


module.exports = { upload, handleMulterError };