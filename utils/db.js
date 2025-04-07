import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected sucessfully");
    }catch (error){
        console.log("erron mongoDB not connected");
    }
}
export default connectDB;