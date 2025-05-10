import { Route, Routes } from "react-router-dom"
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import MyAppointment from "./pages/MyAppointment.jsx"
import MyProfile from './pages/MyProfile.jsx'
import Doctor from './pages/Doctor.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Appointment from "./pages/Appointment.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import NotFound from "./pages/NotFound.jsx"
import { ToastContainer } from "react-toastify"

function App() {
  
  return (
    <>
      <div className="mx-4 sm:mx-[10%] "> 
        <ToastContainer/>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/doctors' element={<Doctor/>}/>
          <Route path='/doctors/:speciality' element={<Doctor/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/my-profile' element={<MyProfile/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/my-appointments' element={<MyAppointment/>}/>
          <Route path='/my-appointments/:docId' element={<Appointment/>}/>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Footer/>
      </div>
      
    </>
  )
}

export default App
