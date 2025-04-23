import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { HiBars3 } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from 'react-toastify';

const Navbar = () => {

    const navigate = useNavigate();

    const { setSearchBar, cartCount, token, setToken, setCustomerInfo, setCartItem, setProfile, setOrderedInfo } = useContext(ShopContext)

    const [visible, setVisible] = useState(false);

    const handleLogout = () => {
        toast.success('Customer logout successfully')
        setCustomerInfo({})
        setCartItem([])
        setOrderedInfo([])
        setToken('')
        navigate('/login')
        localStorage.removeItem('token')
    }

    return (
        <div className='bg-[#EC5228]' >
            <div className=' flex justify-between  items-center h-14 text-white mx-2 lg:px-[7vw]' >
                <Link className='pacifico text-3xl' to='/'>ShoeShop</Link>

                <ul className='hidden md:flex gap-2  text-base font-medium'>
                    <NavLink className='hover:bg-white hover:text-black px-2 py-1  rounded-lg  ' to='/'>Home</NavLink>
                    <NavLink className='hover:bg-white hover:text-black px-2 py-1  rounded-lg  ' to='/collection' >Collection</NavLink>
                    <NavLink className='hover:bg-white hover:text-black px-2 py-1  rounded-lg  ' to='/about' >About</NavLink>
                    <NavLink className='hover:bg-white hover:text-black px-2 py-1  rounded-lg  ' to='/contact' >Contact</NavLink>
                </ul>

                <div className='flex gap-2 items-center'>
                    <img onClick={() => setSearchBar(true)} className='w-7 cursor-pointer' src={assets.search} alt="" />

                    <Link to='/cart' className='relative'>
                        <img className='w-7 cursor-pointer' src={assets.shoppingCart} alt="" />
                        <p className='absolute w-4 h-4 text-white text-[8px] leading-4 bg-black rounded-full flex items-center justify-center bottom-[-5px] right-[-5px] '>{cartCount}</p>
                    </Link>

                    <div className='group relative'>
                        <img onClick={() => token ? null : navigate('/login')} className='w-7 cursor-pointer' src={assets.user} alt="" />

                        {
                            token && <div className='group-hover:block hidden absolute right-0 pt-4'>

                                <div className="relative z-20 flex flex-col text-gray-500 text-base font-medium bg-gray-300 px-4 py-2 rounded-lg">
                                    <p onClick={() => setProfile(true)} className='hover:text-black cursor-pointer'>Profile</p>
                                    <p onClick={() => navigate('/ordered')} className='hover:text-black cursor-pointer' >Orders</p>
                                    <p onClick={handleLogout} className='hover:text-black cursor-pointer' >Logout</p>
                                </div>
                            </div>
                        }
                    </div>

                    <div onClick={() => setVisible(true)}> <HiBars3 className='text-4xl block md:hidden' /> </div>
                </div>

                {
                    visible && <div className={`absolute flex md:hidden gap-1 flex-col text-black text-base font-medium top-0 right-0 bg-gray-300 w-[min(300px,70%)] px-4 py-2 rounded-lg`}>

                        <div onClick={() => setVisible(false)} className=' cursor-pointer flex gap-1 items-center hover:bg-white hover:text-black px-2 py-1  rounded-lg  '>
                            <IoIosArrowBack />
                            <p className=''>Back</p>
                        </div>

                        <NavLink onClick={() => setVisible(false)} className='hover:bg-white hover:text-black px-2 py-1  rounded-lg  ' to='/'>Home</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='hover:bg-white hover:text-black px-2 py-1  rounded-lg  ' to='/collection' >Collection</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='hover:bg-white hover:text-black px-2 py-1  rounded-lg  ' to='/about' >About</NavLink>
                        <NavLink onClick={() => setVisible(false)} className='hover:bg-white hover:text-black px-2 py-1  rounded-lg  ' to='/contact' >Contact</NavLink>
                    </div>
                }


            </div>
        </div>
    )
}

export default Navbar
