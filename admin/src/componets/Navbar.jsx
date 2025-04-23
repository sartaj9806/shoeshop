import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify';


const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AdminContext);

  const handleLoggout = () => {
    toast.success('Loggout successfully')
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
  }

  return (
    <div className='bg-[#EC5228] px-2 lg:px-[2vw] text-white flex justify-between items-center h-14' >

      <Link className='pacifico text-3xl' to='/'>ShoeShop</Link>

      {token && <button onClick={handleLoggout} className=' bg-white rounded-lg px-4 py-2 text-[#EC5228] hover:bg-[#EC5228] hover:border hover:text-white border-white font-medium'>Logout</button>}

    </div>
  )
}

export default Navbar
