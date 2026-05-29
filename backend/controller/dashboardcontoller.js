import Job from "../models/jobschema.js"
import Userjob from "../models/userjobschema.js"
export const dashboard = async (req, res) => {
    try {

        const organizerid = req.session.user.id
        const jobs = await Job.find({ organizerid })
        const jobids = jobs.map(job => job._id)
        

        const applicants = await Userjob.find({
            jobid: { $in: jobids }
        })

        const totaljob = jobs.length
        const totalapplicants = applicants.length

        const selected = applicants.filter(a => a.status === "selected").length
        const pending = applicants.filter(a => a.status !== 'selected').length
        
        const selectionrate = Math.round((selected/totalapplicants)*100)
        
        const totalvacancy = jobs.reduce((sum,job)=>sum+Number(job.vacancy),0)

        const rolemap = {}
        jobs.forEach(job=>{
            if(rolemap[job.role]){
                rolemap[job.role]+=Number(job.vacancy)
            }else{
                rolemap[job.role] = Number(job.vacancy)
            }
        })

        
        let maxvacancy = 0
        let maxrole =""

        for(let role in rolemap){
            if(rolemap[role]>maxvacancy){
                maxvacancy=rolemap[role]
                maxrole=role
            }
        }

        const recentapplicants = await Userjob.find({
            jobid:{$in:jobids},type:"applied"
        }).sort({createdAt:-1}).limit(5)
        .populate("userid","fullname email").populate("jobid","role")
        console.log(recentapplicants)
        return res.status(200).json({ totaljob, totalapplicants, selected, pending,selectionrate ,totalvacancy,rolemap,maxrole,maxvacancy,recentapplicants})
    } catch (err) {
        return res.status(500).json("Server Error", err.message)
    }
}