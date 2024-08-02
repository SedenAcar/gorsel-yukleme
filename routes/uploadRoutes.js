import uploadConrtoller from "../controller/uploadController.js";
import express from 'express';

const router = express.Router();

router.post('/upload', uploadConrtoller.upload.single('myImage'), uploadConrtoller.photoUpload);
router.patch('/', uploadConrtoller.updateFilename);
router.get('/', uploadConrtoller.getphoto);

export default router;