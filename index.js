import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import router from "./routes/user.route.js"


const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express(); 

//middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions ={
    origin:'http//localhost:5173',
    credentials:true,
};
app.use(cors(corsOptions));

//app.use;
// api.use("/api/user",userRoute);
app.use("/api/users", router);


app.listen(PORT ,()=>{
    connectDB();
    console.log(`server is running on port ${PORT}`);
});