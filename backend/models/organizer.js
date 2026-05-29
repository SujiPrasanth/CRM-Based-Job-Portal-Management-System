import mongoose from "mongoose";

const organizerschema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    // fullname:{
    //     type:String,
    //     required:true
    // },
    companyname:{
        type:String,
        required:true
    }
})

const Organizeruser = mongoose.model("Organizeruser",organizerschema)

export default Organizeruser