import CustomerModel from "../models/customerModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//-------------Register Customer
export const registerCustomer = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'All fields are required' });
    }

    try {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({ success: false, message: 'Invalid email format' });
        }

        const existingCustomer = await CustomerModel.findOne({ email });
        if (existingCustomer) {
            return res.json({ success: false, message: 'User Already Registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCustomer = new CustomerModel({
            name,
            email,
            password: hashedPassword
        })

        const customer = await newCustomer.save();

        const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET);

        res.json({ success: true, message: 'Register Successfully', token, customer })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

export const loginCustomer = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'All fields are required' })
    }

    try {

        const customer = await CustomerModel.findOne({ email });
        if (!customer) {
            return res.json({ success: false, message: 'Invalid credintials' })
        }

        const isMatch = await bcrypt.compare(password, customer.password)

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credintials' })
        }

        const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET)

        res.json({ success: true, message: 'Customer Login Successfully', token, customer })


    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })

    }

}

export const customerInfo = async (req, res) => {
    const customerId = req.customerId

    try {

        const customer = await CustomerModel.findOne({ _id: customerId })

        if (!customer) {
            return res.json({ success: false, message: 'Customer not found' })
        }

        res.json({ success: true, message: 'Customer founded successfully', customer })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

export const updatePassword = async (req, res) => {
    const customerId = req.customerId;
    const { password } = req.body;

    if (!password) {
        return res.json({ success: false, message: 'Please enter password' })
    }

    try {

        const customer = await CustomerModel.findOne({ _id: customerId });

        const hashedPassword = bcrypt.hash(password, 10);

        customer.password = hashedPassword;

        await customer.save();

        res.json({ success: true, message: 'Password updated successfully' })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }

}


// ----------Admin login
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'All fields are required' })
    }

    try {

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(email + password, process.env.JWT_SECRET);

        res.json({ success: true, message: 'Admin Login Successfully', token });

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}