import React, { useContext, useEffect, useState } from 'react'
import Navbar from './componets/Navbar'
import SideBar from './componets/SideBar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import CompletedOrder from './pages/CompletedOrder'
import ListProduct from './pages/ListProduct'
import OrderedProduct from './pages/OrderedProduct'
import UpdateProduct from './pages/UpdateProduct'
import { ToastContainer } from 'react-toastify';
import { BiSolidToTop } from "react-icons/bi";
import AdminLogin from './pages/AdminLogin'
import { AdminContext } from './context/AdminContext'

const App = () => {

  const navigate = useNavigate();

  const { token } = useContext(AdminContext)

  return (
    <div>

      <Navbar />
      <ToastContainer />

      {
        token === '' || !token ?
          <AdminLogin />
          :
          < div className='flex px-2 lg:px-[2vw] my-14'>

            <div className='w-1/5 border' >
              <SideBar />
            </div>

            <div className='w-full border border-l-0 p-8'>
              <Routes>
                <Route path='/' element={<ListProduct />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/ordered-product' element={<OrderedProduct />} />
                <Route path='/completed-product' element={<CompletedOrder />} />
                <Route path='/update-product/:id' element={<UpdateProduct />} />
              </Routes>
            </div>
          </div>
      }



      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='bg-[#EC5228] p-3 rounded-full fixed right-10 bottom-10'>
        <BiSolidToTop className='text-2xl text-white' />
      </div>

    </div >
  )
}

export default App
