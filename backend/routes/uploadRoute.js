import express from 'express';
import upload from '../middleware/multer.js';


const uploadRouter = express.Router();

uploadRouter.post('/upload-image', upload.single('image'), (req, res) => {
    res.json({ url: req.file.path })
})

export default uploadRouter;