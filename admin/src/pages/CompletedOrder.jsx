import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useEffect } from 'react'
import { assest } from '../assets/assest'

const CompletedOrder = () => {

    const { completedOrderProduct } = useContext(AdminContext)


    return (
        <div>
            {
                completedOrderProduct.map((order, index) => {

                    const dateObj = new Date(order.date)

                    const day = String(dateObj.getDate()).padStart(2, '0');
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const year = String(dateObj.getFullYear())
                    const hours = String(dateObj.getHours()).padStart(2, '0')
                    const minutes = String(dateObj.getMinutes()).padStart(2, '0')

                    const formateDate = `${day}-${month}-${year}`
                    const formatetime = `${hours}:${minutes}`

                    return (
                        <div key={`${index}`} className='border rounded-lg px-4 py-2 flex gap-4 items-start justify-between mb-4'>
                            <div className='flex gap-4 items-start w-[550px]'>
                                <img className='w-14' src={assest.packing} alt="" />

                                <div className=''>
                                    <div className='mb-3'>
                                        {
                                            order.orderItem.map((item, itemIndex) => (
                                                <p key={itemIndex} className='text-base font-medium leading-5 mb-1'> {item.name}, {item.size} * {item.quantity}, </p>
                                            ))
                                        }
                                    </div>



                                    <p className='mb-1 text-sm'>{order.address.firstName} {order.address.lastName}</p>
                                    <p className='text-gray-700 text-sm'>{order.address.phone},</p>
                                    <p className='text-gray-700 text-sm'>{order.address.email},</p>
                                    <p className='text-gray-700 text-sm'>{order.address.street},<br />{order.address.city} {order.address.state}, <br /> {order.address.country} {order.address.zipcode} </p>
                                </div>
                            </div>

                            <div className='w-[200px]'>
                                <p>item : {order.orderItem.length}</p>
                                <p>Method : {order.paymentMethod}</p>
                                <p>Date : {formateDate},</p>
                                <p>Time : {formatetime}</p>
                                <p className='font-medium'>Amount : ₹ {order.amount}.00</p>
                            </div>


                            <div className='flex gap-4 overflow-y-hidden' >
                                <select onChange={(e) => handleStatusUpdate(e, order._id)} value={order.status} className='px-2 py-1 border rounded-lg'>
                                    {/* <option value="Place Order">Place Order</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out For Delivery">Out for delivery</option> */}
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CompletedOrder
