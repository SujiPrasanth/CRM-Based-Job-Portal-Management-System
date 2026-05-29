export const isuser = async(req,res,next)=>{
    try{
        console.log(req.session.user);
        
        if(!req.session.user){
            return res.status(400).json({msg:'Login Required'})
        }

        if(req.session.user.role !=='user'){
            return res.status(400).json({msg:"Only User is Allowed"})
        }

        next()
    }catch(err){
        return res.status(500).json("Server error",err)
    }
}