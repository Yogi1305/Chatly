// Importing required modules
import express from 'express';
import connectDB from './config/databases.js';
import userRoute from "./routes/userRoute.js";
import otpRoute from "./routes/otpRoute.js";
import messageRoute from "./routes/messageRoute.js";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app,server } from "./socket/socket.js";
import passwordRoute from './routes/passwordRoute.js';

// if your using import then always uses fileformat;


// Configure dotenv to load environment variables from .env file
dotenv.config();

// Create an instance of an Express application
// const app = express();
const PORT = process.env.PORT || 8080;
// middlesware
app.use(cors({
    origin: 'https://chatly13.vercel.app', // specify the frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], 
    credentials:true
  }));
app.use(express.urlencoded({extended:true}));
 app.use(express.json());
 app.use(cookieParser());
// routes

app.use("/api/v1/user",userRoute);

app.use("/api/v1/message/",messageRoute);
app.use("/api/v1/otp",otpRoute);
app.use("/api/v1/password",passwordRoute);






// Start the server
// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Server is listening on port no ${PORT}`);
// });
connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database:', err);
        process.exit(1); // Exit the process if DB connection fails
    });
