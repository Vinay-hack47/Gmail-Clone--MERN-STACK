import  { useEffect, useState } from 'react';
import Email from './Email';
import { useSelector } from 'react-redux';

const Emails = () => {

  const { emails } = useSelector((store) => store.app);
  const { searchText } = useSelector((store) => store.app);
  const [filterEmail, setFilterEmail] = useState([]);

  useEffect(() => {
    if (!emails || emails.length === 0) return; // Ensure emails exist before filtering

    const search = searchText?.toLowerCase().trim() || ""; // Trim for cleaner search

    

    const filteredEmails = emails.filter((email) => {
      const subject = email.subject?.toLowerCase() || "";
      const to = email.to?.toLowerCase() || "";
      const message = email.message?.toLowerCase() || "";

      return (
        subject.includes(search) || to.includes(search) || message.includes(search)
      );
    });

    setFilterEmail(filteredEmails);
  }, [searchText, emails] );

  return (
    <div>
      {filterEmail.length > 0 ? (
        filterEmail.map((email) => <Email key={email._id} email={email} />)
      ) : (
        <p className="text-gray-500 text-center">No matching emails found.</p>
      )}
    </div>
  );
};

export default Emails;
