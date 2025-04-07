import mongoose from "mongoose";
 
const companyschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    logo:{
        type:String, //url to company logo
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:user,
    },
},{timestamps:true});
export const company =mongoose.model("company",companyschema);