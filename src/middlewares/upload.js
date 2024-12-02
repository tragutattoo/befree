const multer = require('multer');

const storage = multer.memoryStorage(); // Armazena a imagem na memória temporária
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB por imagem
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de arquivo não suportado. Apenas JPEG e PNG são permitidos.'));
        }
        cb(null, true);
    },
});

module.exports = upload;
