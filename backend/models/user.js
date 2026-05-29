import mongoose from "mongoose"

const userschema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    fullname:{
      type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","organizer"],
        required:true,
    }
},{timestamps:true})

const User = mongoose.model('User',userschema)

export default User