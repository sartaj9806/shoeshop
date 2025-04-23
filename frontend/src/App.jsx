import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Collection from './pages/Collection';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import ProductInfo from './pages/ProductInfo';
import PlaceOrder from './pages/PlaceOrder';
import { ToastContainer } from 'react-toastify';
import { BiSolidToTop } from "react-icons/bi";
import Login from './pages/Login';
import CustomerProfile from './components/CustomerProfile';
import OrderedPage from './pages/OrderedPage';
import { ShopContext } from './context/ShopContext';


const App = () => {

  const { token } = useContext(ShopContext)

  return (
    <div className='min-h-[100vh]'>

      <Navbar />
      <SearchBar />
      <CustomerProfile />
      <ToastContainer />


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path={`/product-info/:productId`} element={<ProductInfo />} />
        <Route path='/place-order' element={token ? <PlaceOrder /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/ordered' element={token ? <OrderedPage /> : <Login />} />
      </Routes>

      {/* -----------Go to Top--------------- */}
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='bg-[#EC5228] p-3 rounded-full fixed right-10 bottom-10'>
        <BiSolidToTop className='text-2xl text-white' />
      </div>


      <Footer />
    </div>
  )
}

export default App
