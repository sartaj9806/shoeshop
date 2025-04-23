import express from 'express'
import { addProduct, deleteProduct, getAllProduct, getSingleProduct, updateProduct } from '../controller/productController.js';
import upload from '../middleware/multer.js';
import { adminAuth } from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Product Routes For Admin
productRouter.post('/add-product', adminAuth, upload.array('image', 4), addProduct)
productRouter.delete('/delete-product/:id', adminAuth, deleteProduct)
productRouter.put('/update-product/:id', adminAuth, upload.array('image', 4), updateProduct)

// For Everyone
productRouter.get('/get-single-product/:id', getSingleProduct)
productRouter.get('/get-all-product', getAllProduct)

export default productRouter;