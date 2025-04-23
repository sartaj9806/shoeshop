import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    orderItem: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'Place Order' },
    paymentMethod: { type: String, required: true },
    date: { type: Number, required: true }

})

const OrderModel = mongoose.model('order', orderSchema)

export default OrderModel;