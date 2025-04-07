import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req,res)=>{
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber ||!password || !role){
            return res.status(400).json({
                message:"something is missing",
                sucess:false
            }); 
        };
        const user = await user.findOne({email});
        if(user){
            return res.status(400).json({
                message:"user already exist eith emil Id.",
                sucess:false,
            });
        };
        const hashedpassword = await bcrypt.hash(password, 10);

        await user.create({
            fullname,
            email,
            phoneNumber, 
            password:hashedpassword, 
            role
        });
        return res.status(201).json({
            message:"Account created succesfully.",
            sucess:true,
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req,res)=>{
    try {
        const {email, password, role } = req.body;
        if(!email ||!password || !role){
            return res.status(400).json({
                message:"something is missing",
                sucess:false
            }); 
        }; 
        let user = await user.findOne({email});
        if(user){
            return res.status(400).json({
                message:"incorrect email or password.",
                success:false,
            })
        };
        const ispasswordmatch = await bcrypt.compare(password, user.password);
        if(!ispasswordmatch){
            return res.status(400).json({
                message:"incorrect email or password.",
                success:false,
            })    
        };
        // check role is correct or not
        if(role !== user.role){
            return res.status(400).json({
                message:"Account dosen't exist with current role",
                sucess:false,
            })
        };

        const tokendata = {
            userId:user._id
        }
        const token = await jwt.sign(tokendata, process.env.SECRET_KEY,{expireIn:'1d'})

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
        }
        return res.status(200).Cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message:`Welcome Back ${user.fullname}`,
            success:true,
        })
    } catch (error) {
        console.log(error);
    } 
}
export const logout = async (req,res)=>{
    try {
        return res.status(200).Cookie("token","",{maxAge:0}).json({
            message:"logged out successfully.",
            success:true,
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const updateProfile = async (req,res)=>{
    try {
        const {fullname, email, bio, phoneNumber, Skills} = req.body;
        const file = req.file; 
        if(!fullname || !email || !phoneNumber ||!bio || !Skills){
            return res.status(400).json({
                message:"something is missing",
                sucess:false
            }); 
        };

    ///  cloudinary will be add here 


        const skillsArray = Skills.split(",");
        const userId = req.Id; // middleware authentication
        let user = await user.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"user not found",
                sucess:false
            });
        };

    // updating data
        user.fullname = fullname,
        user.email = email,
        user.phoneNumber = phoneNumber,
        user.profilebio = bio,
        user.profile.skills = skillsArray,

        // resume section will be add here//

        await user.save();
        
        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile,
        }

        return req.status(200).json({
            message:"profile updated successfully",
            user,
            success:true
        });
    } catch (error) {
      console.log(error);
    }
} 