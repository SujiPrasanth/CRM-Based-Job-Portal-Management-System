import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Profile() {

    const [data, setdata] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function checklogin() {
            try {
                const res = await fetch("http://localhost:3001/api/profile", {
                    credentials: "include"
                })
                const data = await res.json()
                if (!res.ok) {
                    alert(data.msg)
                    return
                } else {
                    console.log(data)
                    setdata(data)
                    return
                }

            } catch (err) {
                console.log(err)
            }
        }

        checklogin()
    }, [])


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            {
                data.length === 0 ? (<p className="font-semibold text-3xl">No Data Found</p>) : (
                    <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold">Profile</h1>
                            <button onClick={() => navigate("/profileedit")} className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition">
                                Edit Profile
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-xl font-semibold">{data.profile?.fullname}</p>
                            <p className="text-gray-600">{data.profile?.userid?.email}</p>
                        </div>

                        <div className="mb-6">
                            <p className="font-semibold text-xl mb-2">Skills</p>

                            <div className="flex flex-wrap gap-2">
                                {data.profile?.skills?.length > 0 ? (
                                    data.profile?.skills.map((skill, index) => (
                                        <span key={index} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                                            {skill}
                                        </span>))
                                ) : (
                                    <p className="text-gray-500">No skills Added</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="font-semibold text-xl mb-2">About Me</p>
                            <p className="text-gray-700">
                                {data.profile?.aboutme || "Add Aboutme"}
                            </p>
                        </div>

                        <div className="mb-6">
                            <p className="font-semibold text-xl mb-2">Activity</p>
                            <p className="text-gray-700">
                                <span>Selected : <span className="text-green-500">{data.stats.selected || "Not yet Updated"}</span></span>
                                <br />
                                <span>Pending : <span className="text-blue-500">{data.stats.pending || "Not yet Updated"}</span></span>
                                <br />
                                <span>Rejected : <span className="text-red-500">{data.stats.rejected || "Not yet Updated"}</span></span>
                            </p>
                        </div>

                        <div className="mb-6">
                            <p className="font-semibold text-xl mb-2">Selected Company</p>

                            {data.selectedjobs.length > 0 ? (
                                data.selectedjobs.map((item, index) => (
                                    <p key={index} className="text-gray-700">
                                        Selected : {item.jobid?.companyname} - {item.jobid?.role}
                                    </p>
                                ))
                            ) : (
                                <p className="text-gray-500">Not yet Updated</p>
                            )}
                        </div>

                        <div>
                            <p className="font-semibold text-xl mb-2">Resume</p>
                            {data.profile.resume ? (
                                <div className="flex gap-4">
                                    <a href={`http://localhost:3001/uploads/${data.profile?.resume}`} target="_blank"
                                        rel="noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" >
                                        View
                                    </a>
                                    <a href={`http://localhost:3001/uploads/${data.profile?.resume}`} download className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                                        Download
                                    </a>
                                </div>
                            ) : (
                                <p className="text-gray-500">No Resume Uploaded</p>
                            )}
                        </div>
                    </div>)}
        </div>
    )
}

export default Profile