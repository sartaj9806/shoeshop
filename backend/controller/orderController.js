import CustomerModel from "../models/customerModel.js";
import OrderModel from "../models/orderModel.js";



//---------Place Order
export const placeOrderProduct = async (req, res) => {
    const customerId = req.customerId;

    const { orderItem, amount, address, paymentMethod } = req.body;

    try {
        const orderData = {
            customerId,
            orderItem,
            address,
            amount,
            paymentMethod,
            date: Date.now(),
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save();

        await CustomerModel.findByIdAndUpdate(customerId, { cartItem: [] })

        res.json({ success: true, messsage: 'Order placed successfully' })

    } catch (error) {
        console.error(error)
        res.json({ success: false, messsage: error.messsage })
    }
}

//---------Fetech Ordered
export const getOrdered = async (req, res) => {

    const customerId = req.customerId;

    try {

        const ordered = await OrderModel.find({ customerId: customerId })

        res.json({ success: true, messsage: 'Ordered got succesfully', ordered })

    } catch (error) {
        console.error(error)
        res.json({ success: false, messsage: error.messsage })
    }
}

// For Admin Get All Ordered Product
export const getAllOrdered = async (req, res) => {      
    try {  

        const ordered = await OrderModel.find();
        if (!ordered) {
            return res.json({ success: false, message: 'Ordered are empty' })
        }

        res.json({ success: true, message: 'Ordered fetech successfully', ordered })

    } catch (error) {
        console.error(error)
        res.json({ success: false, messsage: error.message })
    }
}

export const updateStatus = async (req, res) => {
    const { orderId, status } = req.body;

    try {

        const order = await OrderModel.findByIdAndUpdate(orderId, { status })

        if (!order) {
            return res.json({ success: false, message: 'Order not found' })
        }

        res.json({ success: true, message: 'Status updated successfully' })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}