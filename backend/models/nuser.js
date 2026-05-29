import mongoose from "mongoose";

const nuserschema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    // fullname:{
    //     type:String,
    //     required:true
    // },
    skills:[{
        type:String
    }],
    aboutme:{
        type:String
    },
    resume:{
        type:String
    }
},{timestamps:true})

const Nuser = mongoose.model('Nuser',nuserschema)
export default Nuser