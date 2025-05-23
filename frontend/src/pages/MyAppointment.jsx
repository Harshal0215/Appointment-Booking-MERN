import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

const MyAppointment = () => {

  const { backendUrl, token , getDoctorsData} = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  
  const months = ["","Jan",'Feb',"Mar",'Apr,"May',"Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const slotDateFormat = (slotDate)=> {
    const dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+ " " + dateArray[2]
  }

  const cancelAppointment = async (appointmentId) =>{
    try {
      const data= await axios.post(backendUrl+ '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.success)
        getUserAppointments();
        getDoctorsData();
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.data);
      toast.error(error.message)
    }
  }

  const getUserAppointments = async () => {
    try {
      const {data} = await axios.get(backendUrl+'/api/user/appointments', {headers:{token}})

      if (data.success) {
        setAppointments(data.appointments.reverse())
      }

    } catch (error) {
      console.log(error.data);
      toast.error(error.message)
      
    }
  }
  useEffect(()=>{
    if (token) {
      getUserAppointments()
    }
  },[token])

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointment</p>
      <div >
        {appointments.map((item, index) => (
          <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
            <div>
              <img className="w-32 bg-indigo-200" src={item.docData.img} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-100 font-semibold">{item.docData.name}</p>
              <p className="text-zinc-800 font-medium">{item.docData.speciality}</p>
              <p className="text-zinc-500 font-medium mt-1">Address : </p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-sm mt-1"><span className="text-sm text-neutral-700">Date and Time :</span>{slotDateFormat(item.slotDate)}|{item.slotTime}</p>
            </div>
            <div></div>
            <div className="flex flex-col justify-end gap-3">
              {!item.cancelled && <button className=" text-sm bg-green-600 hover:bg-green-500 text-white font-semibold text-center sm:min-w-32 py-2 border rounded">Pay Online</button>}
              {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className=" text-sm text-white text-center font-semibold sm:min-w-32 py-2 bg-red-600 border rounded hover:bg-red-500">Cancel</button>}
              {item.cancelled && <button className="sm:min-w-48 py-2 border border-red-500 text-red-500">Appointment Cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
