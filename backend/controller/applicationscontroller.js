import Userjob from "../models/userjobschema.js";
import Job from "../models/jobschema.js";

export const jobapplications = async (req, res) => {
    try {
        const organizerid = req.session.user.id;

        const jobs = await Job.find({ organizerid });

        const jobids = jobs.map(job => job._id);

        const applications = await Userjob.find({
            jobid: { $in: jobids },
            type: "applied"
        })
            .populate("userid", " fullname email")   
            .populate("jobid", "role");   

        return res.status(200).json({msg: "Applications fetched successfully",applications});

    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: "Server Error",error: err.message});
    }
};

export const updatestatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const updatestatus = await Userjob.findByIdAndUpdate(id, { status: status }, { returnDocument: "after" })
        return res.status(200).json({ msg: "Updated" })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}


export const getapplicants = async (req, res) => {
    try {
        const organizerid = req.session.user.id
        const jobs = await Job.find({ organizerid })
        const jobids = jobs.map(job => job._id)


        const applicants = await Userjob.find({ jobid: { $in: jobids },type:"applied" }).populate("userid","fullname email").populate("jobid", "role")
        console.log(applicants)
        return res.status(200).json(applicants)
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}