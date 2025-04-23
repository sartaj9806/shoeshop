import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useState } from 'react';
import { assest } from '../assets/assest';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateProduct = () => {

  const { id }  = useParams()
  const { backendURL, token } = useContext(AdminContext);

  const [product, setProduct] = useState('')

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [gender, setGender] = useState('Men')
  const [brand, setBrand] = useState('Adidas')
  const [sizes, setSizes] = useState([])
  const [bestSeller, setBestSeller] = useState(false)

  const getSingleProduct = async () => {
    try {

      const { data } = await axios.get(`${backendURL}/api/product/get-single-product/${id}`, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      if (data.success) {
        setProduct(data.product)
      } else {
        toast.error(error.message)
      }

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, [])

  useEffect(() => {
    if (product) {
      // console.log(product.image[2])
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setGender(product.gender)
      setBrand(product.brand)
      setSizes(product.sizes)
      setBestSeller(product.bestSeller)
      setImage1(product.image[0] || false)
      setImage2(product.image[1] || false)
      setImage3(product.image[2] || false)
      setImage4(product.image[3] || false)
    }
  }, [product])




  const handlSubmit = async (e) => {
    e.preventDefault();

    try {

      const dataForm = new FormData();

      dataForm.append('name', name)
      dataForm.append('description', description)
      dataForm.append('price', price)
      dataForm.append('gender', gender)
      dataForm.append('brand', brand)
      dataForm.append('sizes', JSON.stringify(sizes))
      dataForm.append('bestSeller', bestSeller)

      // Image Storing
      dataForm.append('image', image1)
      dataForm.append('image', image2)
      dataForm.append('image', image3)
      dataForm.append('image', image4)

      const { data } = await axios.put(`${backendURL}/api/product/update-product/${id}`, dataForm, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      if (data.success) {
        console.log(data)
        toast.success(data.message)
        setName('')
        setDescription('')
        setPrice('')
        setSizes([])
        setBestSeller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(data.message)
      }


    } catch (error) {

    }
  }

  return (
    <div>
      <form onSubmit={handlSubmit}  >
        {/* ------------Image section----------------- */}
        <h2 className='text-gray-700 text-2xl mb-2'>Upload Image</h2>
        <div className='flex gap-4 mb-2'>
          <label htmlFor="image1">
            <img className='w-20' src={image1 ? typeof (image1) === 'string' ? image1 : URL.createObjectURL(image1) : assest.upload_area} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>

          <label htmlFor="image2">
            <img className='w-20' src={image2 ? typeof (image2) === 'string' ? image2 : URL.createObjectURL(image2) : assest.upload_area} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>

          <label htmlFor="image3">
            <img className='w-20' src={image3 ? typeof (image3) === 'string' ? image3 : URL.createObjectURL(image3) : assest.upload_area} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>

          <label htmlFor="image4">
            <img className='w-20' src={image4 ? typeof (image4) === 'string' ? image4 : URL.createObjectURL(image4) : assest.upload_area} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>

        {/* ---------------Text content--------------- */}
        <input onChange={(e) => setName(e.target.value)} value={name} className='border px-2 py-1 rounded-lg w-full mb-2' type="text" placeholder='Name' />

        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full border px-2 py-1 rounded-lg mb-2' placeholder='Description' />

        <div className='w-full flex flex-col md:flex-row gap-4 mb-2'>

          {/* ---------------Price----------------- */}
          <input onChange={(e) => setPrice(e.target.value)} value={price} type="Number" placeholder='Price' className='border w-full px-2 py-1 rounded-lg' />

          <select className='border rounded-lg px-2 py-1' onChange={(e) => setGender(e.target.value)} >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>

          <select className='border rounded-lg px-2 py-1' onChange={(e) => setBrand(e.target.value)} >
            <option value="Adidas">Adidas</option>
            <option value="Campus">Campus</option>
            <option value="Nike">Nike</option>
            <option value="Puma">Puma</option>
          </select>
        </div>

        {/* -----------------Product Sizes----------------- */}
        <div className='mb-2'>
          <p className='mb-1 text-gray-700'>Product Sizes</p>

          <div className='flex gap-4'>
            <div onClick={() => setSizes(prev => prev.includes('7') ? prev.filter(item => item !== '7') : [...prev, '7'])}>
              <p className={`text-base px-3 py-1 ${sizes.includes('7') ? 'bg-[#ec522846]' : 'bg-gray-100'} cursor-pointer`}>7</p>
            </div>

            <div onClick={() => setSizes(prev => prev.includes('8') ? prev.filter(item => item !== '8') : [...prev, '8'])}>
              <p className={`text-base px-3 py-1 ${sizes.includes('8') ? 'bg-[#ec522846]' : 'bg-gray-100'} cursor-pointer`}>8</p>
            </div>

            <div onClick={() => setSizes(prev => prev.includes('9') ? prev.filter(item => item !== '9') : [...prev, '9'])}>
              <p className={`text-base px-3 py-1 ${sizes.includes('9') ? 'bg-[#ec522846]' : 'bg-gray-100'} cursor-pointer`}>9</p>
            </div>

            <div onClick={() => setSizes(prev => prev.includes('10') ? prev.filter(item => item !== '10') : [...prev, '10'])}>
              <p className={`text-base px-3 py-1 ${sizes.includes('10') ? 'bg-[#ec522846]' : 'bg-gray-100'} cursor-pointer`}>10</p>
            </div>

            <div onClick={() => setSizes(prev => prev.includes('11') ? prev.filter(item => item !== '11') : [...prev, '11'])}>
              <p className={`text-base px-3 py-1 ${sizes.includes('11') ? 'bg-[#ec522846]' : 'bg-gray-100'} cursor-pointer`}>11</p>
            </div>
          </div>
        </div>

        <div className='mb-2'>
          <input onChange={(e) => setBestSeller(prev => !prev)} checked={bestSeller} className='mr-2' type="checkbox" id='bestSeller' />
          <label htmlFor="bestSeller">Add to bestseller</label>
        </div>

        <button className='bg-[#EC5228] rounded-lg px-4 py-2 text-white hover:bg-white hover:border hover:text-black border-[#EC5228]'>Upload</button>

      </form>
    </div>
  )
}

export default UpdateProduct
