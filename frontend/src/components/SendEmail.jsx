import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setEmails, setOpen } from '../redux/appSlice';
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const SendEmail = () => {

  const navigate = useNavigate();

  const { open } = useSelector(store => store.app);


  const dispatch = useDispatch();

  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
    // userId: ""
  });

  const [attachments, setAttachments] = useState([]);
  const [previews, setPreviews] = useState([]);
  console.log(previews);

  const changeHandler = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  }


  const fileChangeHandler = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);

    const filePreviews = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, src: reader.result, type:file.type });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePreviews).then(previews => {
      setPreviews(previews);
    });
  };


  const sumbitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('to', emailData.to);
    formData.append('subject', emailData.subject);
    formData.append('message', emailData.message);
    for (let i = 0; i < attachments.length; i++) {
      formData.append('attachments', attachments[i]);
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v1/email/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });


      dispatch(setEmails(res.data.email))
      if (res.data.success) {
        toast.success(res.data.msg)
      }
      console.log(res.data)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
      if (error.response.data.msg === "User not authenticated") {
        navigate("/login")
      }
    }
  };



  return (
    <div className={` ${open ? "block" : "hidden"} fixed bottom-0 right-0 w-96 bg-white shadow-xl shadow-slate-600 rounded-t-md`}>
      <div className='flex items-center justify-between px-3 py-2 bg-[$F2F6FC]'>
        <h1>New Message</h1>
        <div onClick={() => dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
          <RxCross2 size={"20px"}></RxCross2>
        </div>
      </div>

      <form onSubmit={sumbitHandler} className='flex flex-col p-3 gap-2'>
        <input onChange={changeHandler} type="text" placeholder='To' name="to" value={emailData.to} className='outline-none py-1' />
        <input onChange={changeHandler} type="text" placeholder='Subject' name="subject" value={emailData.subject} className='outline-none py-1' />
        <textarea onChange={changeHandler} rows={"10"} cols={"30"} name="message" value={emailData.message} className='outline-none py-1' ></textarea>



        <input type="file" multiple onChange={fileChangeHandler} className='outline-none py-1' />

        <div className="flex flex-wrap gap-2 mt-2">
          {previews.map((file, index) => (
              <div key={index} className="w-24 h-24 border border-gray-300 rounded-md overflow-hidden">
              {file.type.startsWith('image/') ? (
                <img src={file.src} alt={file.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR202VPZfMD9kdS4yqx2x8aeg6DYlFypnBNBA&s" alt="default" className="w-12 h-12" />
                  <span className="text-sm text-gray-500"></span>
                </div>
              )}
            </div>
          ))}
        </div>


        <button type="submit" onClick={() => dispatch(setOpen(false))} className="bg-blue-700 rounded-full p-2 hover: cursor-pointer">Send</button>
      </form>
    </div>
  )
};

export default SendEmail;
