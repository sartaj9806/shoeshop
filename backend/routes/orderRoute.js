import express from 'express'
import { customerAuth } from '../middleware/customerAuth.js';
import { getAllOrdered, getOrdered, placeOrderProduct, updateStatus } from '../controller/orderController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const orderRouter = express.Router();

//------------for customer
orderRouter.post('/place', customerAuth, placeOrderProduct)
orderRouter.get('/get', customerAuth, getOrdered)

// ------------Route for Admin
orderRouter.get('/get-all', adminAuth, getAllOrdered)
orderRouter.put('/update-status', adminAuth, updateStatus)

export default orderRouter;