import axios from 'axios';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEmails } from '../redux/appSlice';

const useGetAllEmails = () => {

  const dispatch = useDispatch();
  const {emails} = useSelector(store => store.app);

  // console.log(emails);
  
  useEffect(() =>{
    const fetchEmails = async () =>{
      try{
        const res =await axios.get("http://localhost:8000/api/v1/email/getallemail", {
          withCredentials:true
        });
        dispatch(setEmails( res.data.email));
      }
      catch(error){
        console.log(error);
      }
    }
    fetchEmails();
  }, []);
}

export default useGetAllEmails
