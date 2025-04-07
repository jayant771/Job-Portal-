import mongoose from "mongoose";

const applicationschema = new mongoose.Schema({
    jobs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job',
        required:true,
    },
    
    applicants:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    Status:{
        type:mostring,
        enum:['pending','accepted','rejeced'],
        required:true,
    },
},{timestamps:true});
export const application = mongoose.model("application", applicationschema);