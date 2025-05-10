import { createContext } from "react";
import { toast } from 'react-toastify';
// import { doctors } from "../assets/assets_frontend/assets";
import axios from './axios'
import { useState } from "react";
import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext()

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])

    const value = {
        doctors
    }

    const getDoctorsData = async () =>{
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            }
            else{
                toast.error("Error")
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getDoctorsData()
    },[])
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider