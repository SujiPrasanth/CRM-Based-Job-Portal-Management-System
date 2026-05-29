import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Viewuserprofile() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setdata] = useState(null)

    useEffect(() => {
        async function fetchdata() {
            try {
                const res = await fetch(`https://crm-based-job-portal-management-system.onrender.com/api/getuserdata/${id}`, {
                    credentials: "include"
                })
                const data = await res.json()

                if (!res.ok) {
                    alert(data.msg)
                    return
                }

                setdata(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchdata()
    }, [id])

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">

            <div className="w-full max-w-2xl">

                <button onClick={() => navigate('/organizerapplications')} className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
                    ← Go Back
                </button>


                {!data ? (
                    <p className="text-xl font-semibold text-gray-600">Loading...</p>
                ) : (
                    <div className="bg-white shadow-xl rounded-2xl p-6 border">


                        <div className="mb-4 border-b pb-3">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {data.userid.fullname}
                            </h2>
                            <p className="text-gray-500 text-sm">
                                {data.userid.email}
                            </p>
                        </div>


                        <div className="space-y-3 text-gray-700">

                            <p>
                                <span className="font-semibold">User ID:</span> {data._id}
                            </p>

                            <p>
                                <span className="font-semibold">About Me:</span><br />
                                <span className="text-gray-600">{data.aboutme}</span>
                            </p>


                            <div>
                                <span className="font-semibold">Skills:</span>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {data.skills[0].split(" ").map((s, i) => (
                                        <span
                                            key={i}
                                            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>


                        <div className="mt-6">
                            <a href={`https://crm-based-job-portal-management-system.onrender.com/uploads/${data.resume}`} target="_blank" rel="noreferrer" className="inline-block bg-gradient-to-r from-violet-500 to-purple-600 hover:opacity-90 text-white px-5 py-2 rounded-lg shadow-md transition" >
                                View Resume
                            </a>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Viewuserprofile