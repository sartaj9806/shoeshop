import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const OrderedPage = () => {

    const { orderedInfo } = useContext(ShopContext)



    return (
        <div className='px-2 lg:px-[7vw] my-14'>
            <div className='text-3xl mb-2'>
                <Title text1={'Ordered'} text2={'Page'} />
            </div>


            {orderedInfo.map((order, index) => (
                order.orderItem.map((item, itemIndex) => (
                    <div key={`${index}-${itemIndex}`} className='flex justify-between items-center flex-col md:flex-row border p-4 rounded-lg mb-4'>
                        <div className='flex gap-4 items-center'>
                            <img className='w-[25%] md:w-[150px]' src={item.image} alt="" />

                            <div>
                                <p className='mb-2 text-base md:text-lg font-medium'>{item.name}</p>

                                <div className='flex items-center gap-2 mb-1'>
                                    <p className='text-[#EC5228] text-sm md:text-base font-medium'>₹ {Number(item.price) * Number(item.quantity)}</p>
                                    <p className='text-sm'>Quantity: {item.quantity}</p>
                                    <p className='text-sm'>Size: {item.size}</p>
                                </div>

                                <p className='mb-1 text-sm'>Date: <span className='text-gray-600'>{new Date(order.date).toDateString()}</span></p>
                                <p className='mb-1 text-sm'>Payment: <span className='text-gray-600'>{order.paymentMethod}</span></p>
                            </div>
                        </div>

                        <div className='flex items-center w-full md:w-fit justify-between md:justify-normal gap-4'>
                            <p className='text-orange-500'>{order.status}</p>
                            <p className='cursor-pointer px-3 py-2 border border-[#EC5228]'>Track order</p>
                        </div>
                    </div>
                ))
            ))}


        </div>
    )
}

export default OrderedPage
