import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { useNavigate } from 'react-router-dom'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

    const navigate = useNavigate();
    const { cartCount, backendURL, cartItem, setCartItem, getTotalAmount, token, products, getCustomerOrders } = useContext(ShopContext);

    const [paymentMethod, setPaymentMethod] = useState('COD')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [country, setCountry] = useState('')



    useEffect(() => {
        if (cartCount === 0) {
            toast.error('Please Add Some Product')
            navigate('/collection')
        }
    }, [])



    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !phone || !street || !city || !state || !zipcode || !country) {
            return toast.error('All fields are required')
        }

        const orderItem = cartItem.map((cart) => {

            const product = products.find((item) => item._id === cart._id)

            return {
                _id: product._id,
                name: product.name,
                image: product.image[0],
                price: product.price,
                quantity: cart.quantity,
                size: cart.size
            }
        })


        try {
            const { data } = await axios.post(`${backendURL}/api/order/place`, {
                orderItem: orderItem,
                amount: getTotalAmount < 2000 ? getTotalAmount + 49 : getTotalAmount,
                address: { firstName, lastName, email, phone, street, city, state, zipcode, country },
                paymentMethod: paymentMethod,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                toast.success(data.message)
                getCustomerOrders(token);
                setCartItem([])
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }

    }

    return (
        <form onSubmit={handlePlaceOrder} className='lg:px-[7vw] my-14 flex flex-col md:flex-row gap-4 justify-between' >

            {/*---------------Left Side Delivery Details-------------------- */}
            <div className='w-full md:w-1/2'>

                <div className='px-2 w-full md:w-[80%]'>
                    <div className='text-2xl mb-2'>
                        <Title text1={'Delivery'} text2={'Address'} />
                    </div>

                    <div className='flex gap-4 mb-2'>
                        <input onChange={(e) => setFirstName(e.target.value)} value={firstName} className='border w-1/2 px-2 py-1 rounded-lg text-base' type="text" placeholder='First name' />
                        <input onChange={(e) => setLastName(e.target.value)} value={lastName} className='border w-1/2 px-2 py-1 rounded-lg text-base' type="text" placeholder='Last name' />
                    </div>

                    <div className='mb-2'>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full border px-2 py-1 rounded-lg text-base' type="email" placeholder='Email' />
                    </div>

                    <div className='mb-2'>
                        <input onChange={(e) => setPhone(e.target.value)} value={phone} className='w-full border px-2 py-1 rounded-lg text-base' type="text" placeholder='Number' />
                    </div>

                    <div className='mb-2'>
                        <input onChange={(e) => setStreet(e.target.value)} value={street} className='w-full border px-2 py-1 rounded-lg text-base' type="text" placeholder='Street' />
                    </div>

                    <div className='flex gap-4 mb-2' >
                        <input onChange={(e) => setCity(e.target.value)} value={city} className='border w-1/2 px-2 py-1 rounded-lg text-base' type="text" placeholder='City' />
                        <input onChange={(e) => setState(e.target.value)} value={state} className='border w-1/2 px-2 py-1 rounded-lg text-base' type="text" placeholder='State' />
                    </div>

                    <div className='flex gap-4 mb-2' >
                        <input onChange={(e) => setZipcode(e.target.value)} value={zipcode} className='border w-1/2 px-2 py-1 rounded-lg text-base' type="text" placeholder='Zipcode' />
                        <input onChange={(e) => setCountry(e.target.value)} value={country} className='border w-1/2 px-2 py-1 rounded-lg text-base' type="text" placeholder='Country' />
                    </div>
                </div>

            </div>

            {/* -------------------Right Side Total Amount---------------------- */}
            <div className='w-full md:w-1/2'>

                <div className='text-2xl'>
                    <Title text1={'Cart'} text2={'Total'} />
                </div>

                <CartTotal />

                <div className='flex justify-between my-4'>
                    <div onClick={() => setPaymentMethod('Online')} className='flex gap-2 items-center'>
                        <p className={`min-w-3.5 h-3.5 border border-[#EC5228] rounded-full ${paymentMethod === 'Online' ? 'bg-[#EC5228]' : ''}`} ></p>
                        <p>Online Payment</p>
                    </div>

                    <div onClick={() => setPaymentMethod('COD')} className='flex gap-2 items-center'>
                        <p className={`min-w-3.5 h-3.5 border border-[#EC5228] rounded-full ${paymentMethod === 'COD' ? 'bg-[#EC5228]' : ''}`}></p>
                        <p>Cash On Delivery</p>
                    </div>
                </div>

                <div className='text-end text'>
                    <button onClick={() => navigate('/ordered')} className='bg-[#EC5228] w-[50%] rounded-lg px-4 py-2 text-base text-white hover:bg-white hover:border hover:text-black border-[#EC5228]'>Order</button>
                </div>

            </div>
        </form>
    )
}

export default PlaceOrder
