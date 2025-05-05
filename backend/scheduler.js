import cron from "node-cron";
import { Email } from "./models/email.model.js";
import { sendEmail } from "./emailService.js";

// Schedule a job to run every minute
cron.schedule("* * * * *", async () => {
  // console.log(`[${new Date()}] Checking for scheduled emails...`);

  const now = new Date();
  const emails = await Email.find({ deliveryDate: { $lte: now }, delivered: false });

  if (emails.length === 0) {
    // console.log(`[${new Date()}] No emails to send.`);
    return;
  }

  emails.forEach(async (email) => {
    try {
      // console.log(`[${new Date()}] Sending email to ${email.to}...`);
      
      await sendEmail(email.to, email.subject, email.message);
      email.delivered = true;
      await email.save();
      // console.log(`Email sent to ${email.to}`);
    } catch (error) {
      console.error(`Failed to send email to ${email.to}:`, error);
    }
  });
});