import { useEffect, useState } from "react"
import { FaImage, FaBuilding, FaPhone, FaUserTie, FaMapMarkerAlt, FaUsers, FaAlignLeft, FaRupeeSign, FaBriefcase, FaClock, FaLaptopHouse } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
function Postjob() {
    const naviagte = useNavigate()
    const { id } = useParams()
    const [loading, setloading] = useState(false)
    const [formdata, setformdata] = useState({
        companyname: '',
        role: '',
        location: '',
        salary: '',
        vacancy: '',
        shortdescription: '',
        phoneno: '',
        jobdescription: '',
        skills: '',
        eligibility: '',
        jobtype: '',
        jobmode: ''
    })

    const [logo, setlogo] = useState(null)

    useEffect(() => {
        if (id) {
            const fetchjob = async () => {
                try {
                    const res = await fetch(`http://localhost:3001/api/jobdata/${id}`, {
                        credentials: "include"
                    })

                    const data = await res.json()

                    if (res.ok) {
                        console.log(data)
                        setformdata(
                            {
                                companyname: data.companyname || '',
                                role: data.role || '',
                                location: data.location || '',
                                salary: data.salary || '',
                                vacancy: data.vacancy || '',
                                shortdescription: data.shortdescription || '',
                                phoneno: data.phoneno || '',
                                jobdescription: data.jobdescription || '',
                                skills: data.skills || '',
                                eligibility: data.eligibility || '',
                                jobtype: data.jobtype || '',
                                jobmode: data.jobmode || ''
                            }
                        )
                    }
                } catch (err) {
                    console.log(err);

                }
            }
            fetchjob()
        }
    }, [id])

    function handlechange(e) {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    async function handlesubmit(e) {
        e.preventDefault()

        const formdataobj = new FormData()

        for (let key in formdata) {
            formdataobj.append(key, formdata[key])
        }
        formdataobj.append('logo', logo)

        try {
            setloading(true)

            const url = id ? `http://localhost:3001/api/jobpost/${id}` : 'http://localhost:3001/api/jobpost'
            const method = id ? "PATCH" : "POST"
            const res = await fetch(url, {
                method,
                credentials: "include",
                body: formdataobj
            })
            setloading(false)
            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            } else {
                alert(data.msg)
                setformdata({
                    companyname: '',
                    role: '',
                    location: '',
                    salary: '',
                    phoneno: '',
                    vacancy: '',
                    shortdescription: '',
                    jobdescription: '',
                    skills: '',
                    eligibility: '',
                    jobtype: '',
                    jobmode: ''
                })

                naviagte('/organizerjobs')
                return
            }

        } catch (err) {
            alert("Server not Connceted")
        }
    }
    return (
        <>
            <div className=" bg-gray-300 min-h-screen flex items-center justify-center">
                <div className="w-96 mx-4 bg-white rounded-lg shadow px-4 py-4 shadow-xl ">
                    <h1 className="font-bold text-3xl text-center">Post a Job</h1>
                    <div className="my-2">
                        <form onSubmit={handlesubmit}>
                            <div className="flex items-center my-2 p-1 rounded-lg focus-within:ring-1 focus-within:ring-indigo-400 border border-gray-300">
                                <FaBuilding className="" />
                                <input type="text" name="companyname" value={formdata.companyname} onChange={handlechange} required placeholder="Company Name" className="w-full bg-transparent outline-none p-2" />
                            </div>

                            <div className="flex items-center my-2 p-1 rounded-lg focus-within:ring-1 focus-within:ring-indigo-400 border border-gray-300">
                                <FaImage className="" />
                                <input type="file" onChange={(e) => setlogo(e.target.files[0])} placeholder="Choose Company logo" className="w-full bg-transparent outline-none p-2" />
                            </div>
                            <div className="flex items-center my-2 p-1 rounded-lg focus-within:ring-1 focus-within:ring-indigo-400 border border-gray-300">
                                <FaUserTie className="" />
                                <input type="text" name="role" value={formdata.role} onChange={handlechange} required placeholder="Role" className="w-full bg-transparent outline-none p-2" />
                            </div>

                            <div className="flex items-center my-2 p-1 rounded-lg focus-within:ring-1 focus-within:ring-indigo-400 border border-gray-300">
                                <FaPhone className="" />
                                <input type="tel" pattern="[0-9]{10}" name="phoneno" maxLength={10} minLength={10} value={formdata.phoneno} onChange={handlechange} required placeholder="Phoneno" className="w-full bg-transparent outline-none p-2" />
                            </div>

                            <div className="flex items-center my-2 p-1 rounded-lg focus-within:ring-1 focus-within:ring-indigo-400 border border-gray-300">
                                <FaMapMarkerAlt className="" />
                                <input type="text" name="location" value={formdata.location} onChange={handlechange} required placeholder="Location" className="w-full bg-transparent outline-none p-2" />
                            </div>

                            <div className="flex items-center my-2 p-1 rounded-lg focus-within:ring-1 focus-within:ring-indigo-400 border border-gray-300">
                                <FaUsers className="" />
                                <input type="text" name="vacancy" value={formdata.vacancy} onChange={handlechange} required placeholder="Vacancy" className="w-full bg-transparent outline-none p-2" />
                            </div>
                            <div className="flex items-start my-2 p-2 rounded-lg border border-gray-300 focus-within:ring-1 focus-within:ring-indigo-400">
                                <FaAlignLeft className="my-3" />

                                <textarea
                                    required name="shortdescription" value={formdata.shortdescription} onChange={handlechange}
                                    placeholder="Short Description (e.g. Hiring React Developer with 2+ years experience)"
                                    rows="1" maxLength="120"
                                    className="w-full bg-transparent outline-none p-2 resize-none"
                                ></textarea>
                            </div>
                            <div className="flex items-center my-2 p-1 rounded-lg focus-within:ring-1 focus-within:ring-indigo-400 border border-gray-300">
                                <FaRupeeSign className="" />
                                <input type="text" name="salary" value={formdata.salary} onChange={handlechange} required placeholder="Salary" className="w-full bg-transparent outline-none p-2" />
                            </div>
                            <div className="flex items-start my-2 p-2 rounded-lg border border-gray-300 focus-within:ring-1 focus-within:ring-indigo-400">
                                <FaBriefcase className="my-3" />
                                <textarea
                                    required name="jobdescription" value={formdata.jobdescription} onChange={handlechange}
                                    placeholder="Job Description" rows="2"
                                    className="w-full bg-transparent outline-none p-2 resize-none"
                                ></textarea>
                            </div>
                            <div className="flex items-start my-2 p-2 rounded-lg border border-gray-300 focus-within:ring-1 focus-within:ring-indigo-400">
                                <FaBriefcase className="my-3" />
                                <textarea
                                    required name="skills" value={formdata.skills} onChange={handlechange}
                                    placeholder="Skiils" rows="2"
                                    className="w-full bg-transparent outline-none p-2 resize-none"
                                ></textarea>
                            </div>
                            <div className="flex items-start my-2 p-2 rounded-lg border border-gray-300 focus-within:ring-1 focus-within:ring-indigo-400">
                                <FaBriefcase className="my-3" />
                                <textarea
                                    required name="eligibility" value={formdata.eligibility} onChange={handlechange}
                                    placeholder="Eligibility"  rows="2"
                                    className="w-full bg-transparent outline-none p-2 resize-none"
                                ></textarea>
                            </div>

                            <div className="flex gap-3 items-center my-2 p-1 rounded-lg focus-within:ring-1 focus-within:ring-indigo-400 border border-gray-300">

                                <FaClock className="" />
                                <p>Job Type:</p>
                                <select name="jobtype" value={formdata.jobtype} onChange={handlechange} id="" className="p-2">
                                    <option value="">Select Job Type</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Intern">Intern</option>
                                    <option value="Contractor">Contractor</option>
                                </select>
                            </div>

                            <div className="flex gap-3 items-center my-2 p-1 rounded-lg focus-within:ring-1 focus-within:ring-indigo-400 border border-gray-300">

                                <FaLaptopHouse className="" />
                                <p>Job Mode:</p>
                                <select required name="jobmode" value={formdata.jobmode} onChange={handlechange} id="" className="p-2">
                                    <option value="">Select Job Type</option>
                                    <option value="WFH">WFH</option>
                                    <option value="WFO">WFO</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            <button type='submit' disabled={loading} className="text-white font-bold bg-green-600 text-center p-2 rounded-lg w-full">{loading ? (id ? "Updating..." : "Posting...") : (id ? "Update Job" : "Submit")}</button>
                        </form>
                    </div>

                </div>
            </div>
        </>)
}

export default Postjob