import cloudinary from "../config/cloudinary.js";
import ProductModel from "../models/productModel.js";


// ---------Add Product Fuction
export const addProduct = async (req, res) => {

    const { name, description, price, gender, brand, sizes, bestSeller } = req.body;

    const imagesURL = req.files.map(file => file.path);

    if (!name || !description || !price || !gender || !brand || !sizes) {
        return res.json({ success: false, message: 'All fields are required' });
    }


    try {
        const newProduct = new ProductModel({
            name,
            description,
            price,
            image: imagesURL,
            gender,
            brand,
            sizes: JSON.parse(sizes),
            date: Date.now(),
            bestSeller,

        })

        const product = await newProduct.save();

        res.json({ success: true, message: 'Successfully Data uploaded', product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }


}

// ---------Fetch Product Function
export const getAllProduct = async (req, res) => {
    try {

        const product = await ProductModel.find();

        if (!product) {
            return res.json({ success: false, message: 'Product is Empty' })
        }

        res.json({ success: true, message: 'Product fetched successfully', product })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

// ---------Fetch Single Product
export const getSingleProduct = async (req, res) => {
    const id = req.params.id;

    try {

        const product = await ProductModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: 'Product not found' })
        }

        res.json({ success: true, message: 'Product found successfully', product })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }

}

//----------Update Product with Image Replece On Cloudinary
export const updateProduct = async (req, res) => {
    const productId = req.params.id;

    const { name, description, price, gender, brand, sizes, bestSeller } = req.body;

    if (!name || !description || !price || !gender || !brand || !sizes) {
        return res.json({ success: false, message: 'All fields are required' });
    }


    try {

        const oldProduct = await ProductModel.findById(productId)

        if (!oldProduct) {
            return res.json({ success: false, message: 'Product deos not match' })
        }

        // Delete Old File in Cloudinary
        if (req.files && req.files.length > 0) {
            for (let imageUrl of oldProduct.image) {
                const publicId = imageUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`shoeshop/${publicId}`)
            }

            const imagesURL = req.files.map(item => item.path);
            oldProduct.image = imagesURL;
        }

        

        oldProduct.name = name;
        oldProduct.description = description;
        oldProduct.price = price;
        oldProduct.gender = gender;
        oldProduct.brand = brand;
        oldProduct.sizes = JSON.parse(sizes);
        oldProduct.bestSeller = bestSeller;

        const updateProduct = await oldProduct.save();

        res.json({ success: true, message: 'Product updated successfully', updateProduct })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }

}

//---------Delete Product with Id
export const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.json({ success: false, message: 'Product Not Found' })
        }

        // Delete Image from Cloudinary
        for (let imageUrl of product.image) {
            const publicId = imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`shoeshop/${publicId}`)
        }

        await ProductModel.findByIdAndDelete(productId)

        res.json({ success: true, message: 'Product Deleted successfully' })


    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}


