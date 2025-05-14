# 📧 Scheduled Mail App(Gmail Clone) - MERN Stack Project

## 🚀 Project Overview
The **Gmail Clone** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to replicate the core functionalities of Gmail. It allows users to send, schedule, and manage emails seamlessly with a modern and intuitive user interface.

---

## 🌐 Live Demo
Check out the live version of the Gmail Clone:  
[https://scheduled-mail-app-gmail-clone.onrender.com](https://scheduled-mail-app-gmail-clone.onrender.com)

---

## 🛠️ Technologies Used

### **Frontend:**
- ⚛️ **React.js**: Component-based UI development.
- 🎨 **Tailwind CSS**: Modern styling for responsiveness.
- 🔗 **Axios**: API requests handling.
- 🛤️ **React Router**: Navigation and routing.
- ⚡ **Vite**: Fast frontend build tool.

### **Backend:**
- 🟢 **Node.js**: Backend runtime environment.
- 🚀 **Express.js**: Lightweight and scalable server framework.
- 🍃 **MongoDB**: NoSQL database for flexible data storage.
- 🏗️ **Mongoose**: ODM for MongoDB.
- ✉️ **Nodemailer**: Email sending service.
- ⏰ **Node-Cron**: Scheduling emails for future delivery.
- 📦 **Multer**: Middleware for handling file uploads.

### **Authentication:**
- 🔐 **JWT (JSON Web Tokens)**: Secure user authentication and access control.

---

## ✨ Features

### ✅ **User Authentication:**
- 📝 User Registration & Login with JWT-based authentication.
- 🔒 Secure access to protected routes.

### 📧 **Email Management:**
- ✉️ Send emails instantly.
- ⏰ Schedule emails for future delivery (up to 1 year in advance).
- 🗑️ Delete emails.
- 📂 View all sent and scheduled emails.

### 📤 **Attachments:**
- 📎 Upload and send attachments with emails.
- 🗂️ Attachments are securely managed and cleaned up after sending.

### 📅 **Scheduled Emails:**
- ⏰ View and manage scheduled emails.
- ✏️ Update scheduled emails before delivery.

---

## 🛠️ Setup Instructions

### Prerequisites:
- Node.js installed on your system.
- MongoDB instance running locally or on the cloud.
- A `.env` file with the following variables:
  ```
  MONGO_URI=<your_mongo_connection_string>
  SECRET_KEY=<your_secret_key>
  ```

### Steps to Run Locally:
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/gmail-clone.git
   cd gmail-clone
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. **Run the Application:**
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd frontend
     npm run dev
     ```

4. **Access the Application:**
   Open your browser and navigate to `http://localhost:5173`.

---

## 📋 API Endpoints

### **User Routes:**
1. **Register User**
   - **POST** `/api/v1/user/register`
   - **Request Body:**
     ```json
     {
       "fullname": "John Doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Response:**
     ```json
     {
       "msg": "User created successfully",
       "success": true
     }
     ```

2. **Login User**
   - **POST** `/api/v1/user/login`
   - **Request Body:**
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Response:**
     ```json
     {
       "msg": "John Doe logged in Successfully",
       "success": true,
       "user": { ...userDetails }
     }
     ```

3. **Logout User**
   - **GET** `/api/v1/user/logout`
   - **Response:**
     ```json
     {
       "msg": "User logout successfully",
       "success": true
     }
     ```

### **Email Routes:**
1. **Create Email**
   - **POST** `/api/v1/email/create`
   - **Request Body:**
     ```json
     {
       "to": "recipient@example.com",
       "subject": "Hello",
       "message": "This is a test email",
       "deliveryDate": "2023-12-31T12:00:00Z"
     }
     ```
   - **Response:**
     ```json
     {
       "msg": "Email created and sent successfully",
       "success": true,
       "newEmail": { ...emailDetails }
     }
     ```

2. **Get All Emails**
   - **GET** `/api/v1/email/getallemail`
   - **Response:**
     ```json
     {
       "msg": "All Emails",
       "success": true,
       "email": [ ...emails ]
     }
     ```

3. **Delete Email**
   - **DELETE** `/api/v1/email/delete/:id`
   - **Response:**
     ```json
     {
       "msg": "Email deleted Successfully",
       "success": true
     }
     ```

4. **Get Scheduled Emails**
   - **GET** `/api/v1/email/getscheduledemails`
   - **Response:**
     ```json
     {
       "msg": "All scheduled emails",
       "success": true,
       "emails": [ ...scheduledEmails ]
     }
     ```

5. **Update Scheduled Email**
   - **PUT** `/api/v1/email/update/:id`
   - **Request Body:**
     ```json
     {
       "to": "recipient@example.com",
       "subject": "Updated Subject",
       "message": "Updated Message",
       "deliveryDate": "2023-12-31T12:00:00Z"
     }
     ```
   - **Response:**
     ```json
     {
       "success": true,
       "email": { ...updatedEmailDetails }
     }
     ```

---

## 🌍 Deployment
- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express.js
- **Database:** MongoDB

---
