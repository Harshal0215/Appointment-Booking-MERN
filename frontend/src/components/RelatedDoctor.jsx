import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // make sure to import your context

const RelatedDoctor = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();
  const {_id} = useParams

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc.id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="w-full px-4 py-8 flex flex-col 
    items-center text-center bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl md:text-3xl font-extrabold text-stone-800">
          Top Doctors to Book
        </h1>
        <p className="text-gray-600 mt-2">
          Simply browse through our extensive list of doctors
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {relDoc.length > 0 ? (
          relDoc.slice(0, 5).map((item,index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/my-appointments/${item._id}`);
                scrollTo(0, 0);
              }}
              className="cursor-pointer bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition duration-300"
            >
              <img
                className="w-full h-48 object-cover rounded-lg mb-3"
                src={item.image}
                alt={item.name}
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <h4 className="text-sm text-gray-700">{item.speciality}</h4>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No related doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedDoctor;