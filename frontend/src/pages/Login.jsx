import React, { useCallback, useContext, useState } from 'react'
import Title from '../components/Title'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const { backendURL,  setCustomerInfo, setToken, getCustomerOrders,getCustomerCart, token } = useContext(ShopContext)
    const navigate = useNavigate()
    const [currentState, setCurrentState] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlSubmit = async (e) => {
        e.preventDefault();

        try {

            if (currentState === 'Login') {

                const { data } = await axios.post(`${backendURL}/api/customer/login`, {
                    email, password,
                })

                if (data.success) {
                    toast.success(data.message)
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    setCustomerInfo(data.customer)
                    getCustomerOrders(data.token);
                    getCustomerCart(data.token)
                    navigate('/')

                } else {
                    toast.error(data.message)
                }

            } else {
                const { data } = await axios.post(`${backendURL}/api/customer/register`, {
                    name, email, password
                })

                if (data.success) {
                    toast.success(data.message)
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    setCustomerInfo(data.customer)
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    return token ? navigate('/') :  (
        <div className='flex justify-center items-center my-14 px-2 w-full h-[60vh]'>
            <form onSubmit={handlSubmit} className='text-center border border-[#EC5228] w-full sm:w-[500px] p-4 rounded-lg'>
                <div className='text-2xl'>
                    {
                        currentState === 'Sign up' ? <Title text1={'Sign up'} text2={'Page'} />
                            : <Title text1={'Login'} text2={'Page'} />
                    }
                </div>

                {currentState === 'Sign up' && <input onChange={(e) => setName(e.target.value)} className='border border-[#EC5228] px-2 py-1 rounded-lg w-full mb-4 text-base' type="text" value={name} placeholder='Name' />}
                <input onChange={(e) => setEmail(e.target.value)} className='border border-[#EC5228] px-2 py-1 rounded-lg w-full mb-4 text-base' type="email" value={email} placeholder='Email' />
                <input onChange={(e) => setPassword(e.target.value)} className='border border-[#EC5228] px-2 py-1 rounded-lg w-full mb-4 text-base' type="password" value={password} placeholder='Password' />

                <div className='flex justify-between items-center mb-4 text-sm'>
                    <p className='cursor-pointer text-gray-600 hover:text-blue-500'>Forgot your password?</p>
                    {
                        currentState === 'Sign up' ?
                            <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-gray-600 hover:text-blue-500'>Login Here</p>
                            :
                            <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer text-gray-600 hover:text-blue-500'>Create account</p>
                    }
                </div>

                <button className='bg-[#EC5228] rounded-lg px-6 py-2 text-white hover:bg-white border hover:text-black hover:border-[#EC5228]'> {currentState === 'Login' ? 'Login' : 'Sign up'} </button>

            </form>

        </div>
    )
}

export default Login
