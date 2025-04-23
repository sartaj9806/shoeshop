import mongoose from "mongoose";
import 'dotenv/config'


const connectDB = async () => {

    console.log("Hello Sartaj")

    try {
        await mongoose.connect(`${process.env.MONGO_URI}/CollegeProject`)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.log('MongoDB connected failed')
        process.exit(1)
    }
}

export default connectDB;