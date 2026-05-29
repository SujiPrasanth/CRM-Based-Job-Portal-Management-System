import Userjob from "../models/userjobschema.js";

export const applyjob = async(req,res)=>{
    try{

        const {jobid}=req.body
        const userid=req.session.user.id

        const exist = await Userjob.findOne({jobid,userid,type:"applied"})
        if(exist){
            return res.status(400).json({msg:"Alerady Apply for the Job"})
        }

        const job = await Userjob.create({
            userid,jobid,type:'applied'
        })

        return res.status(201).json({msg:"Applied Successfully",job})

    }catch(err){
        return res.status(500).json("Server Error",err)
    }
}

export const savejob = async(req,res)=>{
    try{
        
        const userid=req.session.user.id
        const {jobid}=req.body

        const exist = await Userjob.findOne({jobid,userid,type:"saved"})
        if(exist){
            return res.status(400).json({msg:"Already Job is Saved"})
        }

        const job = await Userjob.create({
            userid,jobid,type:'saved'
        })

        return res.status(201).json({msg:"Job is Saved",job})

    }catch(err){
        return res.status(500).json({msg:"Server Error",err})
    }
}


export const getappliedjob = async(req,res)=>{
    try{
        const userid = req.session.user.id

        const applieddata = await Userjob.find({userid,type:"applied"}).populate('jobid')
        return res.status(200).json({msg:"Fetchedd",applieddata})
    }catch(err){
        return res.status(500).json({msg:"Server Error",err})
    }
}

export const getsavedjob = async(req,res)=>{
    try{
        const userid = req.session.user.id
    const savedjobdata = await Userjob.find({userid,type:"saved"}).populate('jobid')
    return res.status(200).json({msg:"Fetched",savedjobdata})
    }catch(err){
        return res.status(500).json({msg:"Server Error",err})
    }
}

export const removejob = async(req,res)=>{
    try{
        const {id}=req.body

        await Userjob.findByIdAndDelete(id)
        return res.json({msg:"Removed Successfully"})

    }catch(err){
        return res.statsu(500).json({msg:"Server Error",err})
    }
}