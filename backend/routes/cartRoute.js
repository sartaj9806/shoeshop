import express from 'express'
import { customerAuth } from '../middleware/customerAuth.js';
import { addCart, deleteCart, getCart, updateCart } from '../controller/cartController.js';

const cartRouter = express.Router();

cartRouter.get('/get', customerAuth, getCart)
cartRouter.post('/add', customerAuth, addCart)
cartRouter.put('/update', customerAuth, updateCart)
cartRouter.put('/delete', customerAuth, deleteCart)

export default cartRouter;