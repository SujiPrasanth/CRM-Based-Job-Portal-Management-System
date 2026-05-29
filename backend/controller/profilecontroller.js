import Nuser from "../models/nuser.js";
import Userjob from "../models/userjobschema.js";

export const profiledata = async (req, res) => {
    try {
        const userid = req.session.user.id
        const profile = await Nuser.findOne({
            userid
        }).populate("userid", "email")

        const selected = await Userjob.countDocuments({ userid, status: "selected" })
        const selectedjobs = await Userjob.find({ userid, status: "selected" }).populate('jobid', 'role companyname')
        const pending = await Userjob.countDocuments({ userid, status: "pending" })
        const rejected = await Userjob.countDocuments({ userid, status: "rejected" })

        if (!profile) {
            return res.status(400).json({ msg: "No Data Found" })
        }
        const stats = {
            selected, pending, rejected
        }
        return res.status(200).json({ profile, stats, selectedjobs })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}


export const profileupdate = async (req, res) => {
    try {
        const userid = req.session.user.id
        const { fullname, skills, aboutme } = req.body
        const resume = req.file?.filename
        const skillarray = skills ? skills.split(",").map(s => s.trim()) : []

        const updatedata = { fullname, aboutme, skills: skillarray }

        if (resume) {
            updatedata.resume = resume
        }

        const profile = await Nuser.findOneAndUpdate(
            { userid },
            { $set: updatedata },
            { new: true, upsert: true }
        )

        if (!profile) {
            return res.status(400).json({ msg: "Profile Not Found" })
        }

        return res.status(200).json({ msg: "Profile Updated", profile })
    } catch (err) {
        return res.status(500).json({ msg: "Server Error", err })
    }
}

export const preprofile = async (req, res) => {
    try {
        const userid = req.session.user.id
        const data = await Nuser.findOne({ userid })
        console.log("data", data)
        return res.status(200).json(data)

    } catch (err) {
        return res.status(500).json({ msg: "Server Eroro", err })
    }
}


export const getuserdata = async (req, res) => {
    try {
        const { id } = req.params
        const profiledata = await Nuser.findOne({ userid: id }).populate("userid")
        console.log("Profile", profiledata)
        if (!profiledata) {
            return res.status(404).json({ msg: "No User Found" })
        }

        return res.status(200).json(profiledata)
    } catch (err) {
        return res.status(500).json({ msg: "Serevr error" })
    }
}