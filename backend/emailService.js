import nodemailer from 'nodemailer';
import dotenv from "dotenv"

dotenv.config();

console.log('USER:', process.env.USER); // Debugging
console.log('APP_PASSWORD:', process.env.APP_PASSWORD); // Debugging


const transporter = nodemailer.createTransport({
  // service: 'gmail', // You can use any email service
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.USER, // Your email address
    pass: process.env.APP_PASSWORD, // Your email password or app-specific password
  },
});

export const sendEmail = async (to, subject, message, attachments = []) => {

  // const user = req.id;
  // console.log(user);
  

  const mailOptions = {
    from: process.env.USER,
    to,
    subject,
    text: message,
    attachments, // Attachments array
  };

  try {
    await transporter.sendMail(mailOptions);
    // res.json({msg: "Email sent successfully to"})
    console.log("Email sent successfully");
    
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail