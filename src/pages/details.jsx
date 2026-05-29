import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
function Details() {
    const { id } = useParams()
    const [data, setdata] = useState()
    useEffect(() => {
        async function fetchdata() {
            try {
                const res = await fetch(`https://crm-based-job-portal-management-system.onrender.com/api/fetchcompanydata/${id}`, {
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
        fetchdata()
    }, [])

    const handleapply = async (jobid) => {
        try {

            const res = await fetch(`https://crm-based-job-portal-management-system.onrender.com/api/applyjob`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobid })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            } else {
                alert(data.msg)
                return
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handlesave = async (jobid) => {
        try {

            const res = await fetch(`https://crm-based-job-portal-management-system.onrender.com/api/savejob`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobid })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            } else {
                alert(data.msg)
                return
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {
                !data ? (<p className="my-32 font-semibold text-3xl">No Data Found</p>) : (



                    <div key={data._id} className="min-h-screen mt-32 md:mx-12 mx-6">


                        <div className="flex gap-6 items-center">
                            <img src={`https://crm-based-job-portal-management-system.onrender.com/uploads/${data.companylogo}`} alt="" className="h-32 w-32" />
                            <div>
                                <p className="font-bold text-3xl">{data.companyname}</p>
                                <p className="font-semibold text-gray-600 ">{data.location}</p>
                                <p className="font-semibold text-xl">{data.role}</p>

                            </div>

                        </div>
                        <div className="my-6">
                            <p className="text-xl">{data.shortdescription}</p>
                            <div className="flex gap-3 my-2">
                                <span className="font-bold rounded-lg border border-gray-300 px-2 py-1 text-blue-500">{data.jobtype}</span>
                                <span className="font-bold rounded-lg border border-gray-300 px-2 py-1 text-red-500">{data.jobmode}</span>
                                <span className="font-bold rounded-lg border border-gray-300 px-2 py-1 text-blue-500">{data.salary}</span>
                            </div>
                            <span className="font-bold text-xl text-gray-600">Description:</span>
                            <p className="text-xl text-justify">{data.jobdescription}</p>
                            <div className="mt-1">
                                <span className="font-bold text-xl text-gray-600 ">Skills:</span>
                                {data.skills.split(',').map((skill, index) => (
                                    <p key={index} className="text-xl">
                                        • {skill}
                                    </p>
                                ))}
                            </div>

                            <div className="mt-1">
                                <span className="font-bold text-xl text-gray-600">Eligibility:</span>
                                {data.eligibility.split(',').map((item, index) => (
                                    <p key={index} className="text-xl">
                                        • {item}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="flex  gap-3">
                            <button onClick={() => handleapply(data._id)} className="bg-green-600 hover:bg-green-700 w-96 border rounded-lg px-2 py-2 text-white font-bold">Apply</button>
                            <button onClick={() => handlesave(data._id)} className="bg-violet-600 hover:bg-violet-700 w-96 border rounded-lg px-2 py-2 text-white font-bold">Save for later</button>
                        </div>
                    </div>)}
        </>
    )
}

export default Details