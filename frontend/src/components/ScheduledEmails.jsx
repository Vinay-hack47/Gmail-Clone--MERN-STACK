import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useGetAllScheduledEmails from '../hooks/useGetAllScheduledEmails';
import ScheduledEmail from './ScheduledEmail';

const ScheduledEmails = () => {
  useGetAllScheduledEmails();

  const {scheduledEmails} = useSelector(store => store.app);
  console.log(scheduledEmails);



  const { searchText } = useSelector((store) => store.app);
  const [filterEmail, setFilterEmail] = useState([]);
  
  useEffect(() => {
    if (!scheduledEmails || scheduledEmails.length === 0) return; // Ensure emails exist before filtering

    const search = searchText?.toLowerCase().trim() || ""; // Trim for cleaner search

    // console.log("Filtering Emails..."); // Debugging step
    // console.log("Emails:", emails);
    // console.log("Searched Text:", searchText);

    const filteredEmails = scheduledEmails.filter((email) => {
      const subject = email.subject?.toLowerCase() || "";
      const to = email.to?.toLowerCase() || "";
      const message = email.message?.toLowerCase() || "";

      return (
        subject.includes(search) || to.includes(search) || message.includes(search)
      );
    });

    setFilterEmail(filteredEmails);
  }, [searchText, scheduledEmails] );



  return (
    <div>
      {filterEmail.length > 0 ? (
        filterEmail.map((email) => <ScheduledEmail key={email._id} email={email} />)
      ) : (
        <p className="text-gray-500 text-center">No matching emails found.</p>
      )}
    </div>
  );
}

export default ScheduledEmails
