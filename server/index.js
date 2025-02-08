import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";

dotenv.config(); 
const app=express();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database Connection Established"))
.catch((err)=>console.log("Database Connection Failed",err))

app.use(
    cors({
         credentials: true,
         origin: "http://localhost:5173"
    })  
)


app.use("/",authRouter)

 app.listen(8080,
    ()=>{console.log("listening.....")}
 )