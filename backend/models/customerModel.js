import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartItem: { type: Array }
})

const CustomerModel = mongoose.model('customer', customerSchema);

export default CustomerModel;