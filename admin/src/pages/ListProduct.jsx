import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const ListProduct = () => {

  const { products, backendURL, getAllProductData, token } = useContext(AdminContext);
  const navigate = useNavigate()

  useEffect(() => {
    getAllProductData();
  }, [])

  const handleProductDelete = async (id) => {

    try {

      const { data } = await axios.delete(`${backendURL}/api/product/delete-product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.success) {
        toast.success(data.message)
        getAllProductData();
      } else {
        toast.error(data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div>
      {/* ---------------Product list---------------- */}
      {
        products.map((item, index) => (
          <div key={index} className='border rounded-lg px-4 py-2 flex items-center justify-between mb-4'>
            <div className='flex gap-4 items-center'>
              <img className='w-24' src={item.image[0]} alt="" />

              <div className='w-[50%]'>
                <h2 className='mb-2'>{item.name}</h2>
                <p>₹ {item.price}.00</p>
              </div>
            </div>

            <div className='flex gap-4 overflow-y-hidden'>
              <p onClick={() => navigate(`/update-product/${item._id}`)} className='cursor-pointer'>Edit</p>
              <p onClick={() => handleProductDelete(item._id)} className='cursor-pointer'>Delete</p>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default ListProduct
