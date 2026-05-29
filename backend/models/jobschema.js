import mongoose from 'mongoose'

const jobschema = mongoose.Schema({
    organizerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyname: {
        type: String,
        required: true
    },
    companylogo: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    vacancy: {
        type: Number,
        required: true
    },
    shortdescription: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    jobdescription: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    eligibility: {
        type: String,
        required: true
    },
    jobtype: {
        type: String,
        enum: ['Full Time', 'Part Time', 'Intern', 'Contractor'],
        required: true
    },
    jobmode: {
        type: String,
        enum: ['WFH', 'WFO', 'Hybrid'],
        required: true
    },

}, { timestamps: true })

const Job = mongoose.model('Job', jobschema)

export default Job