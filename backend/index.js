import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import productRouter from './routes/productRoute.js';
import uploadRouter from './routes/uploadRoute.js';
import customerRouter from './routes/customerRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();


const URL = [process.env.ADMIN_URL, process.env.FRONTEND_URL]

// Cors config
app.use(cors({
    origin: URL,
    credentials: true
}))

const PORT = process.env.PORT || 4000
app.use(express.json())

// MongoDB function 
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World Sartaj bhai hai kya');
})

// Routes
app.use('/api/product', productRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/customer', customerRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.listen(PORT, () => {
    console.log('Server is Running on PORT ' + PORT)
})  