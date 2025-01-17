const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/fileController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/file/:id', fileController.getFile);
router.get('/files', fileController.getAllFiles); // Nueva ruta para obtener toda la información
router.put('/file/:id', fileController.updateFile);
router.delete('/file/:id', fileController.deleteFile);

module.exports = router;