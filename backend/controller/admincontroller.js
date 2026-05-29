import Job from "../models/jobschema.js"
import Userjob from "../models/userjobschema.js"
import User from "../models/user.js"
import organizers from "../models/organizer.js"
import Organizeruser from "../models/organizer.js";


export const jobseekers = async (req, res) => {
    try {
        const seekers = await User.find({ role: "user" }).select("fullname email role")
        if (!seekers) {
            return res.status(404).json({ msg: "No Data Found" })
        }
        return res.status(200).json({ msg: "fetched", seekers })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}

export const joborganizers = async (req, res) => {
    try {

        const organizers = await Organizeruser.find().populate({ path: "userid", select: "fullname email role" })

        if (organizers.length === 0) {
            return res.status(404).json({ msg: "No Data Found" })
        }
        console.log(organizers)
        return res.status(200).json({ msg: "Fetched Successfully", organizers })

    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}

export const getjobs = async (req, res) => {
    try {
        const jobs = await Job.find()
        if (!jobs.length === 0) {
            return res.status(404).json({ msg: "No Data Found" })
        }
        return res.status(200).json({ msg: "Fetched Successfully", jobs })

    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}

export const getapplication = async (req, res) => {
    try {
        const application = await Userjob.find().populate({ path: "userid", select: "fullname email" }).populate({ path: "jobid", select: "companyname role" })
        console.log(application)
        if (!application.length === 0) {
            return res.status(404).json({ msg: "No Data Found" })
        }
        return res.status(200).json({ msg: "Fetched Successfully", application })

    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}

export const admindashboard = async (req, res) => {
    try {

        const totalusers = await User.countDocuments({ role: "user" })
        const totalorganizers = await User.countDocuments({ role: "organizer" })
        const totaljobs = await Job.countDocuments()
        const totalapplications = await Userjob.countDocuments()
        const selected = await Userjob.countDocuments({ status: "selected" })
        const pending = await Userjob.countDocuments({ status: "pending" })
        console.log(totalusers)
        console.log(totalorganizers)
        console.log(totaljobs)
        console.log(totalapplications)
        console.log(selected)
        console.log(pending)
        console.log("finsih")
        const seekers = await User.find({ role: "user" }).select("fullname email role").sort({ createdAt: -1 }).limit(5)
        const organizers = await Organizeruser.find().populate({ path: "userid", select: "fullname email role" }).sort({ createdAt: -1 }).limit(5)
        const jobs = await Job.find().select("companyname role location salary").sort({ createdAt: -1 }).limit(5)
        console.log(seekers)
        console.log("end")
        console.log(organizers)
        console.log("end")
        console.log(jobs)
        return res.status(200).json({
            msg: "Fetched Successfully",
            dashboard: {
                totalusers,
                totalorganizers,
                totaljobs,
                totalapplications,
                selected,
                pending
            }, seekers, organizers, jobs
        })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}