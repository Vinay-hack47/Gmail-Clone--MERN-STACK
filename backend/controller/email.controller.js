
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
    const {to, subject, message} = req.body;
    if(!to || !subject || !message) return res.status(400).json({msg:"All fields are required"});

    const newEmail = await Email.create({
      to,
      subject,
      message,
      userId
    });

     // Prepare attachments
     const attachments = req.files.map(file => ({
      filename: file.originalname,
      path: path.join(__dirname, '..', 'uploads', file.filename),
    }));

     // Send email using Nodemailer
    const emailRes =  await sendEmail(to, subject, message, attachments);

      // Clean up uploaded files
    req.files.forEach(file => {
      fs.unlinkSync(file.path);
    });

    return res.status(200).json({msg: "Email created and sent successfully", success: true, newEmail})

  } catch (error) {
    console.log(error);
  }
} 
// // Middleware to handle file uploads
// export const uploadFiles = upload.array('attachments');

export const deleteEmail = async(req, res) => {
  try {
    const emailId = req.params.id;
    console.log("Deleting Email ID:", emailId); // ✅ Debugging
    
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