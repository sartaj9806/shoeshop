import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import Card from '../components/Card'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const [latestCollection, setLatestCollection] = useState([])

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestSeller))
        setBestSeller(bestProduct.slice(0, 5));

        setLatestCollection(products.slice(0, 10));


    }, [products])


    return (
        <div className=' lg:px-[7vw]'>
            {/* --------------------Hero Section Inner------------------------ */}
            <div className='border w-full py-14 mb-16 md:py-0 text-sm md:text-base font-medium  flex flex-col sm:flex-row items-center justify-between poppins'>
                {/* ------------------Hero left side------------------  */}
                <div className='w-full sm:w-1/2 flex flex-col items-center justify-center'>
                    <div className='w-full md:w-[80%]'>
                        <h1 className='text-4xl md:text-5xl font-bold mx-2'>Walk Bold. <br /> <span className='text-[#EC5228]'>Stay Comfortable.</span> </h1>
                        <p className='text-gray-600 mx-2 mt-4'>Discover 500+ styles for every adventure—from city streets to mountain trails. Limited-Time Offer: Get 25% Off Your  First Order!</p>
                        <p className='mx-2 mt-4'>Free Shipping & Returns</p>
                        <p className='mx-2 mt-4'>4.9/5 Stars from 10,000+ Reviews</p>
                        <div className='mx-2 mt-4'>
                            <button onClick={() => navigate('/collection')} className='bg-[#EC5228] rounded-lg px-4 py-2 text-white hover:bg-white border hover:text-black hover:border-[#EC5228]'>Shop Now</button>
                        </div>
                    </div>
                </div>

                {/* ----------------Hero Right side---------------------- */}
                <div className='w-full sm:w-1/2  flex justify-center'>
                    <img className='' src={assets.heroImg} alt="" />
                </div>
            </div>


            {/* -----------------Best Seller------------------- */}
            <div className='my-16 '>
                <div className='flex justify-center items-center text-3xl'>
                    <Title text1={'Best'} text2={'Seller'} />
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ' >
                    {
                        bestSeller.map((item, index) => (
                            <Card key={index} id={item._id} name={item.name} image={item.image[0]} price={item.price} />
                        ))
                    }
                </div>
            </div>


            {/* ---------------------Latest Product--------------------- */}
            <div className='my-16 '>
                <div className='flex justify-center items-center text-3xl'>
                    <Title text1={'Latest'} text2={'Product'} />
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ' >
                    {
                        latestCollection.map((item, index) => (
                            <Card key={index} id={item._id} name={item.name} image={item.image[0]} price={item.price} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
