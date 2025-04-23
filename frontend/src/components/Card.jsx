import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

const Card = ({ id, name, price, image }) => {



    return (
        <Link className='group hover:border p-3 rounded-lg text-sm overflow-hidden' to={`/product-info/${id}`}>
            <div className='w-full '>
                <img className='group-hover:scale-110 w-full h-full  aspect-square transition ease-in-out ' src={image} alt="" />
            </div>
            <p className='mt-8 text-gray-700'>{name}</p>
            <p className='font-medium'>₹ {price}.00</p>
        </Link>
    )
}

export default Card
