import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch  } from 'react-redux'
import {setAuthUser} from "../redux/appSlice";
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // const res = await axios.post("https://schedule-mail-app-gmail-clone.onrender.com/api/v1/user/login", userData, {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", userData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        
        navigate("/");
        toast.success(res.data.msg);
      }
    }
    catch (error) {
      console.log(error);
      toast.success(error?.response?.data?.msg)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-screen mt-30 gap-2'>
      <form onSubmit={submitHandler} className='flex flex-col p-4 bg-white w-[20%]'>
        <h1 className='font-bold uppercase my-2 text-2xl'>Login</h1>
        <input onChange={changeHandler} type="text" placeholder='Email' name='email' value={userData.email} className='my-2 border border:gray-400 rounded-md px-2 py-1' />
        <input onChange={changeHandler} type="text" placeholder='Password' name='password' value={userData.password} className='my-2 border border:gray-400 rounded-md px-2 py-1' />
        <button type='sumbit' className='bg-gray-800  px-2 py-1 my-2 text-white cursor-pointer'>Login</button>
      </form>
        <p>Don't have an  Account ?  <Link to={"/signup"} className='text-blue-600 font-medium'>SignUp</Link></p>
    </div>
  )
}

export default Login
