import React, { useState } from "react";
import { MdOutlineInbox, MdOutlineStar, MdSend, MdOutlineDrafts, MdDelete, MdReportGmailerrorred } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/appSlice";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {

  const [activeItem, setActiveItem] = useState("Inbox");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { open } = useSelector(store => store.app.open);

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4 flex flex-col">

      {/* Compose Button */}
      <button onClick={() => {
        dispatch(setOpen(true));

      }} className="flex items-center gap-3 bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-red-600 transition">
        <IoMdCreate size={20} />
        <span>Compose</span>
      </button>

      {/* Menu Items */}
      {/* <div className="mt-4">
        <SidebarItem Icon={MdOutlineInbox} text="Inbox" active />
        <SidebarItem Icon={MdOutlineStar} text="Starred" />
        <SidebarItem Icon={MdSend} text="Sent" />
        <SidebarItem Icon={MdOutlineDrafts} text="Drafts" />
        <SidebarItem Icon={MdReportGmailerrorred} text="Spam" />
        <SidebarItem Icon={MdReportGmailerrorred} text="Scheduled" />
        <SidebarItem Icon={IoIosArrowDown} text="More" />
      </div> */}

      <div className="mt-4">
        <SidebarItem Icon={MdOutlineInbox} text="Inbox" active={activeItem === "Inbox"} onClick={() => {
          setActiveItem("Inbox");
          navigate("/")
        }
        } />
        <SidebarItem Icon={MdOutlineStar} text="Starred" active={activeItem === "Starred"} onClick={() => setActiveItem("Starred")} />
        <SidebarItem Icon={MdSend} text="Sent" active={activeItem === "Sent"} onClick={() => setActiveItem("Sent")} />
        <SidebarItem Icon={MdOutlineDrafts} text="Drafts" active={activeItem === "Drafts"} onClick={() => setActiveItem("Drafts")} />
        <SidebarItem Icon={MdReportGmailerrorred} text="Spam" active={activeItem === "Spam"} onClick={() => setActiveItem("Spam")} />
        <SidebarItem Icon={MdReportGmailerrorred} text="Scheduled" active={activeItem === "Scheduled"} onClick={() => {
          setActiveItem("Scheduled");
          navigate("/scheduled-email")
        }
        } />
        <SidebarItem Icon={IoIosArrowDown} text="More" active={activeItem === "More"} onClick={() => setActiveItem("More")}
        />
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ Icon, text, active, onClick }) => {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition 
      ${active ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`} onClick={onClick}>
      <Icon size={20} className="text-gray-600" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
};

export default Sidebar;
