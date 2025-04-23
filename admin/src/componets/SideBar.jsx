import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className='flex flex-col  w-full gap-4 text-base' >
            <NavLink className='  px-2 py-2' to='/'  >List Product</NavLink>
            <NavLink className='  px-2 py-2' to='/add-product'  >Add Product</NavLink>
            <NavLink className='  px-2 py-2' to='/ordered-product'  >Ordered Product</NavLink>
            <NavLink className='  px-2 py-2' to='/completed-product'  >Completed Product</NavLink>


        </div>
    )
}

export default SideBar
