import axios from "axios";
import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";

const useGetAllEmails = () => {
  const dispatch = useDispatch();
  const { emails } = useSelector((store) => store.app);

  useEffect(() =>{
    const fetchEmails = async () =>{
      try{
        const res =await axios.get("https://scheduled-mail-app-gmail-clone.onrender.com/api/v1/email/getallemail", {
          withCredentials:true
        });
        dispatch(setEmails( res.data.email));
      }
      catch(error){
        console.log(error);
      }
    }
    fetchEmails();
  }, [emails, dispatch]);

};

export default useGetAllEmails;
