import React, { useContext } from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { ShopContext } from '../context/ShopContext';

const CustomerProfile = () => {

    const { profile, setProfile, customerInfo, setCustomerInfo, } = useContext(ShopContext)


    return profile && (
        <div className='absolute w-[90%] max-w-[500px] z-10 top-16 ml-2 right-2 lg:right-[8vw] border rounded-lg p-4 bg-gray-200 text-gray-700 font-medium'>

            {/* -------------Close button----------------- */}
            <div onClick={() => setProfile(false)} className='absolute right-2 top-2 text-2xl cursor-pointer'>
                <RxCross1 />
            </div>

            {/* -------------Personal Info--------------- */}
            <div className='flex items-center gap-4'>
                <div className='text-7xl bg-white rounded-full px-3 py-1 '>
                    <IoPersonSharp className='w-14 ' />
                </div>

                <div>
                    <h3 className='mb-1 text-xl'>{customerInfo.name}</h3>
                    <p className='mb-1'>{customerInfo.email}</p>
                    <p className=''>********</p>
                </div>
            </div>
        </div>
    )
}

export default CustomerProfile
