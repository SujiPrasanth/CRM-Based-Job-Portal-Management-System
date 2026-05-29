import Job from "../models/jobschema.js"

export const companyfetchdata = async (req, res) => {
    try {
        const companydata = await Job.find().sort({ createdAt: -1 })
        if (!companydata) {
            return res.status(400).json({ msg: "No Data Found" })
        }

        return res.status(200).json(companydata)
    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}

export const companyfetchdatabyid = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        
        const companydata = await Job.findById({_id:id})
        if (!companydata) {
            return res.status(400).json({ msg: "No Data Found" })
        }

        return res.status(200).json(companydata)
    } catch (err) {
        return res.status(500).json({ msg: "Server Error" })
    }
}