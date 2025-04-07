import mongoose from "mongoose";
const userschema = new mongoose.schema({
    fullname:{
        type:string,
        required:true
    },
    email:{
        type:string,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:string,
        required:true
    },
    role:{
        type:string,
        enum: ['student','recruiter'],
        required:true,
    },
    profile:{
        bio:{type:string},
        skils:[{type:string}],
        resume:{type:string},// url to resume file
        resumeOriginalName:{type:string},
        company:{type:mongoose.schema.types.objectId, ref:'company'},
        profilephoto:{
            type:string,
            default:""
        }
    },
},{timestamps:true});
module.exports = mongoose.model (user, userschema);
