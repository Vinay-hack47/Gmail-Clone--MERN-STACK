import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js"
import emailRoutes from "./routes/email.route.js"
import './scheduler.js'; // Import the scheduler
import path from "path"

dotenv.config();
connectDB();


const PORT = 8000;
const app = express();

const _dirname = path.resolve();

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


app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_,res) =>{
  res.sendFile(path.resolver(_dirname, "frontend", "dist", "index.html"));
})

app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`);
})

