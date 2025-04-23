import React from 'react'
import Title from '../components/Title'

const Contact = () => {

    const toggleContactForm = (e) => {
        e.preventDefault();
    }

    return (
        <div className='my-14 lg:px-[7vw]'>

            {/* --------------------Map------------------- */}
            <div className='w-full mb-14'>
                <iframe className='w-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.2780539906116!2d77.29589853523258!3d28.517346220205496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6d907d8fe8b%3A0xedd1f02e3b237cb8!2sIndira%20Gandhi%20National%20Open%20University!5e0!3m2!1sen!2sin!4v1744043704120!5m2!1sen!2sin" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            {/* -----------------Contact Page--------------------- */}
            <div className='flex flex-col md:flex-row justify-between gap-4 py-14 border rounded-lg'>
                {/* -----------------Left Side content------------------ */}
                <div className='flex justify-center items-center w-full md:1/2 '>
                    <div className=' w-full px-2 md:w-[80%]'>
                        <div className='text-3xl'><Title text1={'Contact'} text2={'Us'} /></div>
                        <p className='mb-2  text-base text-gray-700'>There are many ways to contact us. You may drop us a line, give us a call or send an email, choose what suits you the most.</p>

                        <p className='mb-2  text-base text-gray-700'>A-12  Badarpur Dehli <br /> India 110044</p>

                        <p className='mb-2  text-base text-gray-700'>Phone : +91 98 XXX 0306</p>

                        <p className='mb-2  text-base text-gray-700'>Email : Sartaj9806@gmail.com</p>

                        <p className='mb-2  text-base text-gray-700'>Open hours: 8.00-18.00 Mon-Fri <br /> Sunday: Closed</p>
                    </div>
                </div>

                {/* --------------------Right Side form------------------------ */}
                <div className='w-full md:1/2  flex justify-center items-center '>
                    <form onSubmit={toggleContactForm} className='w-full px-2 md:w-[80%]'>
                        <div className='text-3xl'><Title text1={'Connect'} text2={'Us'} /></div>

                        <input className='w-full mb-4 px-2 py-1 rounded-lg border-[#EC5228] pl-4 text-base border' type="text" placeholder='Name' />

                        <input className='w-full mb-4 px-2 py-1 rounded-lg border-[#EC5228] pl-4 text-base border' type="email" placeholder='Email' />

                        <textarea className='w-full mb-4 px-2 py-1 pl-4 rounded-lg border border-[#EC5228]' placeholder='Message' />

                        <div className='flex justify-center'>
                            <button type='submit' className='text-center bg-[#EC5228] rounded-lg px-4 py-2 text-white hover:bg-white border hover:text-black hover:border-[#EC5228]'>Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
