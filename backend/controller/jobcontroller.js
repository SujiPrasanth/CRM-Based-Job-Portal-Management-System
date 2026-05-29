import Job from '../models/jobschema.js'

export const createjob = async (req, res) => {
    try {

        const { companyname, role, location, vacancy, shortdescription, phoneno, salary, jobdescription,skills,eligibility, jobtype, jobmode } = req.body
        const logo = req.file?.filename
        if (!jobmode || !jobtype) {
            return res.status(400).json({ msg: "Please Select Job Type and Mode" })
        }
        const job = await Job.create({
            companyname,
            companylogo: logo,
            role, location, phoneno,
            vacancy, shortdescription,
            salary, jobdescription,skills,
            eligibility,jobtype, jobmode,
            organizerid: req.session.user.id
        })

        return res.status(201).json({ msg: "Job Posted Successfully" }, job)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const jobdata = async (req, res) => {
    try {
        const organizerid = req.session.user.id
        if (!organizerid) {
            return res.status(400).json({ msg: 'Login Required' })
        }

        const jobs = await Job.find({ organizerid: organizerid })

        return res.status(200).json(jobs)
    } catch (err) {
        return res.status(500).json({ msg: "Server not Connected" })
    }
}

export const jobdataid = async (req, res) => {
    try {
        const { id } = req.params
        const jobid = await Job.findById(id)

        if (!jobid) {
            return res.status(400).json({ msg: "job Not Found" })
        }

        return res.status(200).json(jobid)
    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}

export const updatejob = async (req, res) => {
    try {

        const updatedata = {...req.body}
        if(req.file){
            updatedata.companylogo = req.file.filename
        }
        const job = await Job.findByIdAndUpdate(
            req.params.id, updatedata, { new: true }
        )
        return res.status(200).json({ msg: 'Job Updated Successfully', job })

    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}

export const deletejob = async (req, res) => {
    try {
        const { id } = req.params

        const jobdelete = await Job.findByIdAndDelete(id)
        if(!jobdelete){
            return res.status(400).json({msg:"Details Not Match"})
        }
        return res.status(200).json({msg:"Job Deleted Successfully"})

    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}