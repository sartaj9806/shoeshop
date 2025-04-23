import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { MdDeleteForever } from "react-icons/md";
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, cartItem, updateCart, cartCount, deleteCart } = useContext(ShopContext);


  return (
    <div className='lg:px-[7vw] my-14'>
      <div className='text-3xl'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      {/* -----------------Cart Product Upper Section----------------- */}
      <div className=''>


        {cartCount === 0 ? <div>Your Cart is empty</div> : cartItem.map((item, index) => {
          const productData = products.find(p => p._id === item._id);

          return (
            <div key={index} className='border-t border-b px-2 mb-2 grid gap-4 items-center justify-between grid-cols-[1fr_4fr_0.5fr_0.5fr] sm:grid-cols-[1fr_4fr_1fr_1fr]'>

              <div> <img className='min-w-[55px] w-[100px]' src={productData.image[0]} alt="" /></div>

              <div>
                <p className='text-sm md:text-base'>{productData.name}</p>
                <p className='text-sm md:text-base text-gray-700'>Size : <span className='text-[#EC5228]'> {item.size} </span></p>
                <p className='text-sm md:text-base font-medium'> ₹ {productData.price * item.quantity}.00 </p>
              </div>

              <div className='text-end'> <input onChange={(e) => e.target.value === '' || e.target.value === '0' || e.target.value < 0 ? null : updateCart(productData._id, item.size, Number(e.target.value))} className='border border-gray-500 outline-none text-base px-1 w-[50px]' type="number" min={1} defaultValue={item.quantity} /> </div>

              <div className='text-end'>
                <button onClick={() => deleteCart(productData._id, item.size)} > <MdDeleteForever className='text-3xl text-[#EC5228]' /> </button>
              </div>
            </div>
          )

        })
        }

      </div>

      {/* --------------------Lower Section Price Calculation------------------- */}
      <div className='flex justify-end w-full '>
        <div className='border text-2xl w-full md:w-[35%] p-4 rounded-lg'>

          <Title text1={'Cart'} text2={'Total'} />

          <CartTotal />

          <div className='text-end'>
            <Link to={'/place-order'} className='bg-[#EC5228] w-[50%] rounded-lg px-4 py-2 text-base text-white hover:bg-white hover:border hover:text-black border-[#EC5228]'>Proceed To Checkout</Link>
          </div>

        </div>





      </div>
    </div>
  )
}

export default Cart
