import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Contact = () => {
  return (
    <div className="w-full px-4 py-6">
      <div className="text-center mt-2">
      <p className='text-xl'>
          CONTACT <span className=" text-xl text-gray-700 font-medium">US</span>
        </p>
      </div>

      {/* Reduced gap from gap-6 to gap-3 */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-8">
        <div className="w-full md:w-1/2 flex md:justify-end justify-center">
          <img
            className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-lg"
            src={assets.contact_image}
            alt="doctor image"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-8 p-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl md:text-xl font-medium capitalize">OUR OFFICE</h2>
            <span className="capitalize">Lorem ipsum dolor sit amet, <span className="uppercase">USA</span>, California</span>
            <span>Tel: 1243435</span>
            <span>Email: email@.com</span>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className=" md:text-xl font-medium  capitalize">CAREERS AT PRESCRIPTO</h2>
            <span>Learn more about our teams and job openings.</span>
            <button className="w-fit px-4 py-2 border border-black text-stone-900 rounded-md capitalize hover:bg-gray-200 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;