import React, { useCallback, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'

const AdminLogin = () => {

    const { backendURL, setToken, token, getAllProductData, getAllOrderedProduct, } = useContext(AdminContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('sartaj9806@gmail.com')
    const [password, setPassword] = useState('123456')

    const handlSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${backendURL}/api/customer/admin-login`, {
                email, password,
            })

            if (data.success) {
                toast.success(data.message)
                localStorage.setItem('token', data.token)
                setToken(data.token)
                getAllProductData(data.token);
                getAllOrderedProduct(data.token);
                console.log(data)
                // navigate('/')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    return (
        <div className='flex justify-center items-center my-14 px-2 w-full h-[60vh]'>
            <form onSubmit={handlSubmit} className='text-center border border-[#EC5228] w-full sm:w-[500px] p-4 rounded-lg'>

                <h1 className='text-[#EC5228] text-2xl font-bold mb-4'>Admin Login Page</h1>

                <input onChange={(e) => setEmail(e.target.value)} className='border border-[#EC5228] px-2 py-1 rounded-lg w-full mb-4 text-base' type="email" value={email} placeholder='Email' />
                <input onChange={(e) => setPassword(e.target.value)} className='border border-[#EC5228] px-2 py-1 rounded-lg w-full mb-4 text-base' type="password" value={password} placeholder='Password' />
                <button className='bg-[#EC5228] rounded-lg px-6 py-2 text-white hover:bg-white border hover:text-black hover:border-[#EC5228]'> Login </button>

            </form>

        </div>
    )
}

export default AdminLogin
