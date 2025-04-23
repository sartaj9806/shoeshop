import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const { getTotalAmount } = useContext(ShopContext);

    return (
        <div>
            <div className='border-t border-b flex justify-between text-base px-2 text-gray-700 mb-2'>
                <p className='py-2'>Subtotal</p>
                <p className='py-2'>₹ {getTotalAmount}.00</p>
            </div>

            <div className='border-t border-b flex justify-between text-base px-2 text-gray-700 mb-2'>
                <p className='py-2'>Shipping</p>
                <p className='py-2'>₹ {getTotalAmount === 0 ? 0 : getTotalAmount < 2000 ? 49 : 0}.00</p>
            </div>

            <div className='border-t border-b flex justify-between text-base px-2 text-gray-700 mb-2'>
                <p className='font-medium py-2'>Total</p>
                <p className='font-medium py-2'>₹ {getTotalAmount === 0 ? 0 : getTotalAmount < 2000 ? getTotalAmount + 49 : getTotalAmount}.00</p>
            </div>
        </div>
    )
}

export default CartTotal
