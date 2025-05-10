import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from "react-router-dom"
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDeleteOutline, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineDriveFileMove, MdOutlineMarkEmailUnread, MdOutlineReport, MdOutlineWatchLater } from 'react-icons/md';
import { BiArchiveIn } from "react-icons/bi";
import { IoMdMore } from 'react-icons/io';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { format, isToday, isYesterday, isThisYear } from "date-fns";



const Mail = () => {
  const {id} = useParams();

  const navigate = useNavigate();


  const { selectedEmail} = useSelector(store => store.app);

    const formatGmailDate = (dateString) => {
        const date = new Date(dateString);
        
        if (isToday(date)) {
          return format(date, "hh:mm a"); // Show time if today
        } else if (isYesterday(date)) {
          return "Yesterday";
        } else if (isThisYear(date)) {
          return format(date, "MMM dd"); // Show Month & Day if within the year
        } else {
          return format(date, "MMM dd, yyyy"); // Show full date if older
        }
      };

  const deleteEmail = async() =>{

    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/email/delete/${id}`,{
        withCredentials:true
      });
      

      if(res.data.success){
        toast.success(res.data.msg)
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.success(error.response.data.msg)  
      
    }
  }
  

  return (
    <div className='flex-1 rounded-xl mx-5'>
      <div className='flex items-center px-4 justify-between'>
        <div className='flex items-center gap-2 text-gray-700 py-2'>
          <div className='hover:bg-gray-200 cursor-pointer rounded-full p-2' onClick={() => navigate("/")}>
            <FaArrowLeft></FaArrowLeft>
          </div>

          <div className='flex items-center  gap-5 p-5'>
            <BiArchiveIn className='cursor-pointer'></BiArchiveIn>
            <MdOutlineReport className='cursor-pointer'></MdOutlineReport>
            <RiDeleteBin6Line onClick={deleteEmail} className='cursor-pointer'></RiDeleteBin6Line>
          </div>

          <div className='flex items-center gap-5 p-5'>
            <MdOutlineMarkEmailUnread className='cursor-pointer'></MdOutlineMarkEmailUnread>
            {/* <MdOutlineWatchLater></MdOutlineWatchLater> */}
            <MdOutlineDriveFileMove className='cursor-pointer'></MdOutlineDriveFileMove>
            <IoMdMore className='cursor-pointer'></IoMdMore>
          </div>

          <div className="flex items-center gap-3 text-gray-600 justify-end ml-180">
            <span className="text-sm">1-50 of 200</span>
            <MdKeyboardArrowLeft size={24} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full" />
            <MdKeyboardArrowRight size={24} className="cursor-pointer hover:bg-gray-200 p-1 rounded-full" />
          </div>
        </div>
      </div>

      <div className='h-[90vh] overflow-y-auto p-4'>
        <div className='flex items-center gap-2'>
          <h1 className='text-xl font-medium'>{selectedEmail?.subject}</h1>
          <span className='text-sm bg-gray-200 rounded-md px-2'>inbox</span>
        </div>
        <div className='flex-none text-gray-400 my-5 text-sm'>
          <p>{formatGmailDate(selectedEmail?.createdAt)}</p>
        </div>
        <div className='text-gray-500 text-sm'>
          <h1>{selectedEmail?.to}</h1>
          <span>to me</span>
        </div> 
        <div className='my-10'>
          <p>{selectedEmail?.message}</p>
        </div>
      </div>
    </div>
  )
}

export default Mail 
