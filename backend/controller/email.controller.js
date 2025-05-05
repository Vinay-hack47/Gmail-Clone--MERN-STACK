
import { Email } from "../models/email.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../emailService.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




export const createEmail = async (req,res) =>{
  try {
    const userId = req.id;
    const {to, subject, message, deliveryDate} = req.body;
    if(!to || !subject || !message || !deliveryDate) return res.status(400).json({msg:"All fields are required"});

    //Validate delivery date (max 1 year from now)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const deliveryDateObj = new Date(deliveryDate);

    if (deliveryDateObj > maxDate) {
      return res.status(400).json({ msg: "Delivery date cannot exceed 1 year from now" });
    }

    // Prepare attachments
    const attachments = req.files.map(file => ({
     filename: file.originalname,
     path: path.join(__dirname, '..', 'uploads', file.filename),
   }));

    // If the delivery date is in the future, save the email for scheduling
    if (deliveryDateObj > new Date()) {
      const newEmail = await Email.create({
        to,
        subject,
        message,
        userId,
        deliveryDate: deliveryDateObj,
        delivered: false,
      });

      // Clean up uploaded files
      req.files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return res.status(200).json({ msg: "Email scheduled successfully", success: true, newEmail });
    }



    const newEmail = await Email.create({
      to,
      subject,
      message,
      userId,
      deliveryDate,
      delivered:false,
    });


     // Send email using Nodemailer
    const emailRes =  await sendEmail(to, subject, message, attachments);

      // Clean up uploaded files
    req.files.forEach(file => {
      fs.unlinkSync(file.path);
    });

    return res.status(200).json({msg: "Email created and sent successfully", success: true, newEmail , emailRes})

  } catch (error) {
    console.log(error);
  }
} 
// // Middleware to handle file uploads
// export const uploadFiles = upload.array('attachments');

export const deleteEmail = async(req, res) => {
  try {
    const emailId = req.params.id;
    
    if(!emailId) return res.status(400).json({msg:"Email id is required"});

    const email = await Email.findByIdAndDelete(emailId);
    if(!email) return res.status(400).json({msg: "Email not found"});

    return res.status(200).json({msg:"Email deleted Successfully", success:true , email})
  } catch (error) {
    console.log(error);
  }
}


export const getAllEmailById = async (req, res) =>{
  try {
    const userId = req.id;
    
    if(!userId) return res.status(200).json({msg: "User id is required"})

    const email = await Email.find({userId});
    
    if(!email) return res.status(400).json({msg: "Email not found"});

    // const user = await User.find({});
    // console.log(user);
    

    return res.status(200).json({msg: `All Emails `, success: true, email});

  } catch (error) {
    console.log(error);
    
  }

}

export const getScheduledEmails = async(req,res) =>{
  try {
    const userId = req.id;
    const emails = await Email.find({userId , delivered:false});

    return res.status(200).json({msg: "All scheduled emails", success:true, emails});
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Internal Server Error", success:false});
  }
}


export const updateScheduledEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { to, subject, message, deliveryDate } = req.body;

    const email = await Email.findByIdAndUpdate(
      id,
      { to, subject, message, deliveryDate },
      { new: true }
    );

    if (!email) return res.status(404).json({ msg: "Email not found" });

    return res.status(200).json({ success: true, email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};