import React from 'react'
import { MdCropSquare } from 'react-icons/md'
import { IoIosStarOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { setSelectedEmail } from '../redux/appSlice';
import { format, isToday, isYesterday, isThisYear } from "date-fns";



const Email = ({email}) => { 
  const navigate = useNavigate();
  // const {selectedEmail} = useSelector((store => store.app));
  // console.log(selectedEmail);
  
  const dispatch = useDispatch();
  // console.log(email);

  const handleEmailClick = () =>{
    dispatch(setSelectedEmail(email))
    navigate(`/mail/${email._id}`);
  }

    // Function to format date like Gmail
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
  
  return (
    <div className='flex items-center justify-between boarder-b border-grey-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md'  onClick={handleEmailClick}>
      <div className='flex items-center gap-4'>
        <div className='text-gray-400'>
          <MdCropSquare size={"20px"} />
        </div>
        <div className='text-gray-400'>
          <IoIosStarOutline size={"20px"} />
        </div>
        <div>
          <h1 className='font-semibold'>{email?.subject}</h1>
        </div>
      </div>
      <div className='flex-1 ml-4'>
        {email?.message}
      </div>
      <div className='flex-none text-gray text-sm'>
        <p>{formatGmailDate(email?.createdAt)}</p>
      </div>
    </div>
  )
}

export default Email
