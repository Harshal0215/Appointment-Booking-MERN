import React, { useState } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const {backendUrl, token, setToken} = useContext(AppContext)

  const onSubmit = async (event) => {
    event.preventDefault();
    // Handle submit logic here
    try {
      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/user/login',{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[])

  return (
    <div className='box w-full h-screen flex justify-center items-center relative text-gray-700'>
      
      {/* Blurred Background */}
      <div
        className='absolute inset-0 bg-cover bg-center blur-sm'
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/national-doctor-s-day-hand-drawn-background_23-2149438164.jpg')",
          zIndex: 0,
        }}
      ></div>

      {/* Form Card */}
      <div className='absolute -mt-20 top-0 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] sm:min-h-[65vh] h-auto bg-stone-100 bg-opacity-90 rounded-md px-4 py-6 shadow-lg z-10 relative'>
        <form
          onSubmit={onSubmit}
          className='w-full h-full flex flex-col gap-4 items-center'
        >
          <div className='text-center'>
            <h1 className='font-bold text-xl md:text-2xl'>
              {state === "Sign Up" ? "Create Account" : "Login"}
            </h1>
            <p className='font-bold text-sm md:text-base'>
              {state === "Sign Up" ? "Sign Up" : "Login"} to book appointment
            </p>
          </div>

          {state === "Sign Up" && (
            <div className='w-full'>
              <p className='font-bold capitalize text-sm md:text-md mb-1'>Full Name</p>
              <input
                className='w-full h-10 p-2 border-2 rounded-md text-sm'
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Enter name'
              />
            </div>
          )}

          <div className='w-full'>
            <p className='font-bold capitalize text-sm md:text-md mb-1'>Email</p>
            <input
              className='w-full h-10 p-2 border-2 rounded-md text-sm'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='Enter email'
            />
          </div>

          <div className='w-full'>
            <p className='font-bold capitalize text-sm md:text-md mb-1'>Password</p>
            <input
              className='w-full h-10 p-2 border-2 rounded-md text-sm'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='Enter password'
            />
          </div>

          <div className='mt-4'>
            <button
              type='submit'
              className='w-36 rounded-md h-10 bg-primary text-white cursor-pointer hover:bg-purple-700 transition text-sm'
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
          </div>

          <p
            className='text-black cursor-pointer mt-4 text-sm hover:underline'
            onClick={() =>
              setState((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"))
            }
          >
            {state === "Sign Up" ? "Already have an account? Login" : "Don't have an account? Sign Up"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;