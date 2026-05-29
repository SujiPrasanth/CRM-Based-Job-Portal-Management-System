import { useEffect, useState } from "react"

function Applied() {

    const [data, setdata] = useState([])
    
    useEffect(() => {

        async function fetchdata() {
            try {
                const res = await fetch('https://crm-based-job-portal-management-system.onrender.com/api/getappliedjob', {
                    credentials: "include"
                })
                const data = await res.json()

                if (!res.ok) {
                    alert(data.msg)
                } else {
                    console.log(data)
                    setdata(data.applieddata)
                }
            } catch (err) {
                console.log(err)
            }

        }
        fetchdata()

    }, [])

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-32 mx-12">
                {
                    data.length > 0 ? (data.map((item) => {
                        const job = item.jobid
                        return <div key={item._id} className="w-auto border border-gray-200 shadow-lg px-4 py-4 rounded-lg">

                            <div className="flex gap-3 items-center">
                                <div>
                                    <img src={`https://crm-based-job-portal-management-system.onrender.com/uploads/${job.companylogo}`} alt="" className="h-7 w-7" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xl font-bold">{job.companyname}</p>
                                    <p>{job.location}</p>
                                </div>
                            </div>
                            <p className="text-lg font-semibold">{job.role}</p>

                            <p className="text-sm text-gray-600">
                                {job.shortdescription}
                            </p>

                            <div className="flex flex-wrap gap-2 my-3">
                                <p className="border py-1 font-bold text-blue-600 border-gray-300 rounded-md px-3 text-sm">
                                    {job.jobmode}
                                </p>
                                <p className="border py-1 font-bold text-red-500 border-gray-300 rounded-md px-3 text-sm">
                                    {job.jobtype}
                                </p>
                                <p className="border py-1 font-bold text-violet-600 border-gray-300 rounded-md px-3 text-sm">
                                    {job.salary}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition">
                                    Applied
                                </button>
                                
                            </div>
                        </div>
                    }
                    )) : (<p className="mt-12  mb-96 text-center text-xl font-bold">No Jobs Applied</p>)
                }
            </div>


        </>
    )
}

export default Applied