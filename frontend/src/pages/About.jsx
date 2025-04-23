import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const About = () => {

    

    return (
        <div className='my-14  lg:px-[7vw]'>

            {/* ---------------Upper Section In About Page----------------- */}
            <div className='flex w-full flex-col md:flex-row justify-between gap-4 mb-14'>

                {/* Left Side Content */}
                <div className='w-full md:w-1/2 flex items-center justify-center'>
                    <div className='px-2 w-full md:w-[80%]'>
                        <div className='text-3xl' ><Title text1={'Our'} text2={'Mission'} /></div>
                        <p className='text-base text-gray-700'>
                            Our mission at ShoeShop is to revolutionize the way people discover and shop for footwear. We are committed to offering stylish, durable, and affordable shoes that cater to the needs of every individual. Through innovation and customer-first thinking, we aim to build a platform that not only delivers quality products but also inspires confidence in every step. Whether it's casual wear, formal shoes, or sports footwear, our goal is to empower people with the perfect pair for every moment.
                        </p>
                    </div>
                </div>

                {/* Right Side Image */}
                <div className='flex justify-center w-full md:w-1/2'>
                    <img src={assets.aboutMissionImg} alt="" />
                </div>
            </div>

            {/* -------------------------Lower Section In About Page---------------------------- */}
            <div className='flex gap-4 justify-between flex-col-reverse md:flex-row'>

                {/*---------------------Left Side Image------------------------  */}
                <div className='flex w-full md:w-1/2 justify-center'>
                    <img src={assets.aboutStoryImg} alt="" />
                </div>

                <div className='w-full md:w-1/2 px-2 justify-center'>
                    <div className='text-3xl'><Title text1={'Our'} text2={'Story'} /></div>
                    <p className='text-base text-gray-700 mb-4'>
                        Our story began with a passion for style, comfort, and technology. As students who struggled to find the perfect pair of shoes online—shoes that matched both budget and quality—we decided to create a solution ourselves. What started as a college project soon turned into a growing platform aimed at making shoe shopping simple, smart, and satisfying. From late-night coding sessions to design brainstorming in the classroom, ShoeShop was built with dedication, teamwork, and a dream to make fashion accessible for everyone. Today, we're proud to offer a seamless shopping experience backed by innovation and heart.
                    </p>

                </div>

            </div>
        </div>
    )
}

export default About
