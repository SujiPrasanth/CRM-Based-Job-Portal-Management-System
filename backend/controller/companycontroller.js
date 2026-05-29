import Organizeruser from "../models/organizer.js"

export const companydata = async (req,res)=>{
    try{

        const organizerid = req.session.user.id
        if(!organizerid){
            return res.status(400).json({msg:'Login Required'})
        }
        const companys =  await Organizeruser.find({userid:organizerid}).populate("userid","fullname")
        return res.status(200).json(companys)
    }catch(err){
        return res.status(500).json({msg:'Server error'})
    }
}