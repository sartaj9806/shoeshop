import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import Title from '../components/Title';
import Card from '../components/Card';
import RelatedProduct from '../components/RelatedProduct';

const ProductInfo = () => {

    const { productId } = useParams();



    const { products, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState();
    const [image, setImage] = useState();
    const [size, setSize] = useState('')

    const fetchToProduct = async () => {
        const selectedProduct = products.find(item => item._id === productId)
        if (selectedProduct) {
            setProductData(selectedProduct)
            setImage(selectedProduct.image[0])
        }
    }

    useEffect(() => {
        fetchToProduct();
    }, [productId, products])


    return productData ? (
        <div className='lg:px-[7vw] '>

            {/* -----------Product Upper Side--------------- */}
            <div className='flex flex-col md:flex-row gap-4 my-14'>

                {/* --------------Left Product Image---------------- */}
                <div className='w-full h-full md:w-1/2'>
                    <div className='flex items-center justify-center w-full sm:w-[100%]'>
                        <img className='w-[60%] h-auto' src={image} alt="" />
                    </div>

                    <div className='flex justify-between  overflow-x-auto border px-2 py-1'>
                        {
                            productData.image.map((item, index) => (
                                <img key={index} onClick={() => setImage(item)} className='w-[18%] ' src={item} alt="" />
                            ))
                        }
                    </div>
                </div>

                {/* -----------------Right Product Content-------------------- */}
                <div className='w-full md:w-1/2 px-2'>
                    <h1 className='text-4xl mb-4'>{productData.name}</h1>
                    <div className='flex items-center mb-4  gap-2 text-[#EC5228]'>
                        <IoIosStar />
                        <IoIosStar />
                        <IoIosStar />
                        <IoIosStar />
                        <IoIosStarHalf />
                        <p className='text-sm'>(12k)</p>
                    </div>
                    <p className='text-4xl mb-4'>₹ {productData.price}.00</p>
                    <p className='text-base text-gray-700 mb-4'>{productData.description}</p>

                    <div className='flex items-center gap-2 mb-4'>
                        <p>Size</p>
                        {
                            productData.sizes.map((item, index) => (
                                <button onClick={() => setSize(item)} className={`border text-base bg-gray-100 text-gray-700 py-2 px-4 ${item === size ? 'border-[#EC5228]' : 'border-white'}`} key={index}> {item}</button>
                            ))
                        }
                    </div>

                    <div className='flex gap-4 mb-4'>
                        <button onClick={() => addToCart(productData._id, size)} className='bg-[#EC5228] rounded-lg px-4 py-2 text-white hover:bg-white border hover:text-black hover:border-[#EC5228]'>Add To Cart</button>
                    </div>

                    <div className='mb-4 text-sm text-gray-700'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* -------------Product Description--------------- */}
            <div className='my-14 px-2'>
                <h4 className='text-2xl mb-2'>Description</h4>
                <p className='text-base text-gray-700 mb-2'>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                <p className='text-base text-gray-700'>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
            </div>

            {/* ----------------Related Product----------------- */}
            <div className='my-16 '>
                <RelatedProduct brand={productData.brand} gender={productData.gender} />
            </div>
        </div>
    ) : <div></div>
}

export default ProductInfo
