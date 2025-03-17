import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import SendEmail from './SendEmail'
import { useSelector } from 'react-redux'


const Body = () => {
  const { user } = useSelector(store => store.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  })
  return <>
    <Navbar></Navbar>
    <div className="absolute w-[30%] bottom-0 right-20 z-10">
      <SendEmail />
    </div>
    <div className='flex  bg-[#F8FAFD]' >
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </div>
  </>
}

export default Body
