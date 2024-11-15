import mongoose from "mongoose";

const userModel=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
    profileImg:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["boy","girl"],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true});
export const User= mongoose.model("User",userModel)