import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    requirement:{
        type:String,
        required:true,
    },
    salary:{
        type:number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobtype:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        ref:'company',
        required:true,
    },
    created_by:{
        type:mongoose.Schema.type.objectId,
        required:true,
        ref:'user'
    },
    application:{
        type:mongoose.Schema.type.objectId,
        ref:'aplication',
    }

},{timestamps:true});
export const job = mongoose.model("JOB", jobschema);