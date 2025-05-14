import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScheduledEmails } from "../redux/appSlice";


const useGetAllScheduledEmails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllScheduledEmails = async () => {
      try {
        const res = await axios.get(
          "https://scheduled-mail-app-gmail-clone.onrender.com/api/v1/email/scheduled",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setScheduledEmails(res.data.emails));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllScheduledEmails();
  }, [dispatch]);
};


export default useGetAllScheduledEmails;
