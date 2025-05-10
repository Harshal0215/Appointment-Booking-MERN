import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext';
import { data } from 'autoprefixer';

const Login = () => {

  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setAToken, backendUrl} = useContext(AdminContext)
  const onSubmitHandler = async(event)=>{
    event.prevendDefault()
    try {
      if(state === 'Admin'){
        const {data} = await axios.post(backendUrl+ '/api/admin/login',{email,password})
        if(data.success){
          localStorage.setItem('aToken',data.token)
          setAToken(data.token);
        }
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }

  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required name="" id="" />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required name="" id="" />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {state === 'Admin'? <p>Login as doctor <span onClick={()=>setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p> : <p>Login as admin <span  className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>}
      </div>
    </form>
  )
}

export default Login