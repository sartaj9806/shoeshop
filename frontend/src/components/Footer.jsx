import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-[#646464] text-sm text-white px-2 lg:px-[7vw]'>
            {/* --------------Upper Footer Side------------------- */}
            <div className='py-6 flex flex-col md:flex-row justify-between gap-6'>
                <div className='flex flex-col gap-1 '>
                    <p className='font-medium'>Company</p>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/about'}>About</Link>
                    <Link to={'/contact'} >Contact</Link>
                </div>

                <div className='flex flex-col gap-1 ' >
                    <p className='font-medium'>Social Media</p>
                    <Link to={'https://www.facebook.com/profile.php?id=100014126105609'}>Facebook</Link>
                    <Link to={'https://www.instagram.com/a1sartaj'}>Instagram</Link>
                    <Link>WhatsApp</Link>
                    <Link to={'https://www.linkedin.com/in/a1sartaj/'} >Linkedin</Link>
                </div>

                <div className='flex flex-col gap-1 ' >
                    <p className='font-medium'>Legals</p>
                    <p>About Us</p>
                    <p>Career</p>
                    <p>Blogs</p>
                </div>

                <div className='flex flex-col gap-1 ' >
                    <p className='font-medium'>Contact</p>
                    <p>A-12  Badarpur Dehli India 110044 </p>
                    <p>Phone : +91 98 XXX 0306</p>
                    <p>Email : Sartaj9806@gmail.com</p>
                </div>
            </div>

            <hr />

            {/* -----------------Lower Footer Side------------------ */}
            <div className='py-6 text-center'>
                <p className=''>Copyright © 2025 All rights reserved | ShoesShop.in</p>
            </div>
        </div>
    )
}

export default Footer
