import express from 'express'
import { adminLogin, customerInfo, loginCustomer, registerCustomer } from '../controller/customerController.js';
import { customerAuth } from '../middleware/customerAuth.js';

const customerRouter = express.Router();

// ----------For Customer
customerRouter.post('/register', registerCustomer)
customerRouter.post('/login', loginCustomer)
customerRouter.get('/info', customerAuth, customerInfo)

//-------------for Admin
customerRouter.post('/admin-login', adminLogin)

export default customerRouter;