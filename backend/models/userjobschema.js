import mongoose from 'mongoose'


const userjobschema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jobid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    type: {
        type: String,
        enum: ['applied', 'saved']
    },
    status: {
        type: String,
        enum: ['pending', 'selected', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true })

const Userjob = mongoose.model("Userjob", userjobschema)

export default Userjob