import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js"
import emailRoutes from "./routes/email.route.js"
import './scheduler.js'; // Import the scheduler

dotenv.config();
connectDB();


const PORT = 8000;
const app = express();

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials:true
}
app.use(cors(corsOptions));

//routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/email", emailRoutes);

app.get("/" ,(req,res) =>{
  res.send("Hello World");
})

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`);
})

