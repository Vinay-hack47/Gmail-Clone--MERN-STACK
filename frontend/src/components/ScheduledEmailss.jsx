import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCaretDown, FaUserFriends } from 'react-icons/fa';
import { IoMdMore, IoMdRefresh } from 'react-icons/io';
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ScheduledEmail from './ScheduledEmails';
import { GoTag } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { setScheduledEmails } from '../redux/appSlice';
import useGetAllScheduledEmails from '../hooks/useGetAllScheduledEmails';
// import { FaUserFriends } from 'react-icons/fa'

const ScheduledEmailss = () => {


  const mailType = [
    {
      icon : <MdInbox size={20} />,
      text : "Primary"
    },
    {
      icon : <GoTag size={20} />,
      text : "Promotions"
    },
    {
      icon : <FaUserFriends size={20} />,
      text : "Social"
    },
  ]

  const [selected, setSelected] = useState(0);

  return (
    <div className='flex-1 bg-[#F8FAFD] rounded-xl mx-5 '>
    <div className="flex items-center justify-between px-2 py-3 my-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-2 rounded">
          <MdCropSquare size={20} />
          <FaCaretDown size={14} />
        </div>
        <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <IoMdRefresh size={20} />
        </div>
        <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
          <IoMdMore size={20} />
        </div>
      </div>

      <div className="flex items-center gap-3 text-gray-600">
        <span className="text-sm">1-50 of 200</span>
        <MdKeyboardArrowLeft size={24} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full" />
        <MdKeyboardArrowRight size={24} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full" />
      </div>
    </div>

    <div className='h-90vh overflow-y-auto'>
      <div className='flex items-center gap-1'>
          {
            mailType.map((item , index) =>{
              return (
                <button onClick={() => setSelected(index)} className={` ${selected === index ? "border-b-4 border-b-blue-600 text-blue-600" : "border-b-4 border-b-transparent text-blue-600"}flex items-center gap-5 p-4 w-52 hover:bg-gray-200`}>
                    {item.icon}
                    <span>{item.text}</span>
                </button>
              )
            })
          }
      </div>

    </div>
    <ScheduledEmail></ScheduledEmail>
    
    {/* <div>
      <h2 className='text-2xl mb-4'>Scheduled Emails</h2>
      {scheduledEmails.map((email) => (
        <div className='className=flex flex-col mb-5' key={email._id}>
          <p>To: {email.to}</p>
          <p>Subject: {email.subject}</p>
          <p>Message: {email.message}</p>
          <p>Delivery Date: {new Date(email.deliveryDate).toLocaleString()}</p>
          <button onClick={() => deleteEmail(email._id)}>Cancel</button>
        </div>
      ))}
    </div> */}
  </div>

  )
}

export default ScheduledEmailss