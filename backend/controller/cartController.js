import CustomerModel from "../models/customerModel.js";
import ProductModel from "../models/productModel.js";



export const getCart = async (req, res,) => {
    const customerId = req.customerId;

    try {

        const customer = await CustomerModel.findOne({ _id: customerId })

        if (!customer) {
            return res.json({ success: false, message: 'Customer not found' })
        }

        let cartItem = customer.cartItem;

        res.json({ success: true, cartItem })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }

}

export const addCart = async (req, res) => {
    const customerId = req.customerId;
    const { productId, size } = req.body;

    try {

        const exists = await CustomerModel.findOne({
            _id: customerId,
            "cartItem._id": productId,
            "cartItem.size": size
        });

        if (exists) {
            // ✅ increment quantity
            await CustomerModel.updateOne(
                { _id: customerId, "cartItem._id": productId, "cartItem.size": size },
                { $inc: { "cartItem.$.quantity": 1 } }
            );
           res.json({success : true, message : 'Cart updated successfully'})
        } else {
            // ✅ add new item
            await CustomerModel.updateOne(
                { _id: customerId },
                {
                    $push: {
                        cartItem: {
                            _id: productId,
                            size: size,
                            quantity: 1
                        }
                    }
                }
            );
           res.json({success : true, message : 'Product added successfully in cart'})
        }

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export const updateCart = async (req, res) => {
    const customerId = req.customerId;
    const { productId, size, quantity } = req.body;

    if (quantity < 1) {
        return res.json({ success: false, message: 'Quantity must have at least 1 item' });
    }

    try {
        const updateProduct = await CustomerModel.updateOne(
            { _id: customerId, "cartItem._id": productId, "cartItem.size": size },
            {
                $set: {
                    "cartItem.$.quantity": quantity
                }
            }
        );

        if (updateProduct.modifiedCount === 0) {
            return res.json({ success: false, message: 'Product not found in Cart' });
        }

        res.json({ success: true, message: 'Cart quantity updated successfully' });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export const deleteCart = async (req, res) => {
    const customerId = req.customerId;
    const { productId, size } = req.body;

    // console.log(req.body)
    console.log("Im in ")

    try {
        const result = await CustomerModel.updateOne(
            { _id: customerId },
            {
                $pull: {
                    cartItem: {
                        _id: productId,
                        size: size
                    }
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.json({ success: false, message: 'Product not found in cart' });
        }

        res.json({ success: true, message: 'Cart item removed successfully' });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};



