import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* left section */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum blanditiis distinctio autem asperiores ipsam nobis obcaecati cumque quos facilis quasi?</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-700'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>Get In Touch</p>
                <ul className='flex flex-col gap-2 text-gray-700'>
                    <li>+91 3798959012</li>
                    <li>lavdalassan@gmail.com</li>
                </ul>
            </div>
        </div>
        {/*  */}
        <div>
    <hr />
        <p className='py-5 text-sm text-center'>Copyrights 2025 @prescripto - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer