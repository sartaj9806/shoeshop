import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    gender: { type: String, required: true },
    brand: { type: String, required: true },
    sizes: { type: Array, required: true },
    date: { type: Number, required: true },
    bestSeller: { type: Boolean, required: true },
})

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;