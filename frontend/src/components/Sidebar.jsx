import React from "react";
import { MdOutlineInbox, MdOutlineStar, MdSend, MdOutlineDrafts, MdDelete, MdReportGmailerrorred} from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/appSlice";


const Sidebar = () => {

  
  const dispatch = useDispatch();
  const { open } = useSelector(store => store.app.open);

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4 flex flex-col">
      
      {/* Compose Button */}
      <button onClick={() =>{
        dispatch(setOpen(true));
        console.log("Clicked Compose - Open State:", open);
        
      }}  className="flex items-center gap-3 bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition">
        <IoMdCreate size={20} />
        <span>Compose</span>
      </button>

      {/* Menu Items */}
      <div className="mt-4">
        <SidebarItem Icon={MdOutlineInbox} text="Inbox" active />
        <SidebarItem Icon={MdOutlineStar} text="Starred" />
        <SidebarItem Icon={MdSend} text="Sent" />
        <SidebarItem Icon={MdOutlineDrafts} text="Drafts" />
        <SidebarItem Icon={MdReportGmailerrorred} text="Spam" />
        <SidebarItem Icon={IoIosArrowDown} text="More" />
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ Icon, text, active }) => {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition 
      ${active ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}>
      <Icon size={20} className="text-gray-600" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
};

export default Sidebar;
