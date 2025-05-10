import { IoMenu } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdSettings, MdOutlineApps } from "react-icons/md";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setOpen, setSearchText } from "../redux/appSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { setAuthUser } from "../redux/appSlice";
import { useNavigate } from "react-router-dom";



const Navbar = () => {

  const [text, setText] = useState("");
  const { user, open } = useSelector(store => store.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(text);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.msg)
        dispatch(setAuthUser(null));
        dispatch(setOpen(false));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(setSearchText(text));
  }, [text, dispatch]);


  // const {user} = useSelector(store => store.app)
  // const user = false;
  return (
    <div className="flex items-center justify-between px-4 py-2 shadow-md bg-white">

      {/* Left Section - Logo & Menu */}
      <div className="flex items-center gap-4">
        <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
          <IoMenu size={24} />
        </div>
        <div className="flex items-center gap-2">
          <img
            className="w-10"
            src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"
            alt="Gmail Logo"
          />
          <h1 className="text-xl font-medium text-gray-600">Gmail</h1>
        </div>
      </div>

      {
        user && (
          <>
            {/* Middle Section - Search Bar */}
            <div className="flex flex-grow max-w-2xl items-center bg-gray-100 px-4 py-2 rounded-full focus-within:bg-white focus-within:shadow-md transition">
              <IoMdSearch className="text-gray-500" size={20} />
              <input
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Search mail"
                className="w-full  outline-none px-2 bg-[#E9EEF6]"
              />
            </div>

            {/* Right Section - Icons */}
            <div className="flex items-center gap-4">
              <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
                <FaRegQuestionCircle size={20} />
              </div>
              <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
                <MdSettings size={22} />
              </div>
              <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
                <MdOutlineApps size={22} />
              </div>
              {/* <Avatar src="./images/Photo.jpg" size="40" round={true} /> */}
              <span onClick={logoutHandler} className="underline cursor-pointer">Logout</span>
              <Avatar src={user.profilePhoto} size="40" round={true} />

            </div>
          </>
        )
      }

    </div>
  );
};

export default Navbar;
