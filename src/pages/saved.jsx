import { useEffect, useState } from "react"

function Saved() {

    const [data, setdata] = useState([])

    useEffect(() => {

        async function fetchdata() {
            try {
                const res = await fetch('http://localhost:3001/api/getsavedjob', {
                    credentials: "include"
                })
                const data = await res.json()

                if (!res.ok) {
                    alert(data.msg)
                } else {
                    console.log(data)
                    setdata(data.savedjobdata)
                }
            } catch (err) {
                console.log(err)
            }

        }
        fetchdata()

    }, [])


    const handleapply = async (jobid, savedid) => {
        try {
            const res = await fetch('http://localhost:3001/api/applyjob', {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobid })
            })

            const data = await res.json()
            if (!res.ok) {
                alert(data.msg)
                return
            }

            await fetch('http://localhost:3001/api/removesavedjob', {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: savedid })
            })
            
            setdata(prev => prev.filter(item => item._id !== savedid))
        } catch (err) {
            console.log(err)
        }
    }

    const handleremove = async(savedid)=>{
        try{
            const res = await fetch('http://localhost:3001/api/removesavedjob',{
                method:"DELETE",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id:savedid})
            })
            if(!res.ok){
                alert(data.msg)
                return
            }

            setdata(prev=>prev.filter(item=>item._id!==savedid))
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-32 mx-12">
                {
                    data.length > 0 ? (data.map((item) => {
                        const job = item.jobid
                        return( <div key={item._id} className="w-auto border border-gray-200 shadow-lg px-4 py-4 rounded-lg">

                            <div className="flex gap-3 items-center">
                                <div>
                                    <img src={`http://localhost:3001/uploads/${job.companylogo}`} alt="" className="h-7 w-7" />
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

                            <div className="flex  gap-2">
                                <button onClick={() => handleapply(item.jobid._id, item._id)} className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition">
                                    Apply
                                </button>
                                <button onClick={() => handleremove(item._id)} className="w-full py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition">
                                    Remove
                                </button>
                            </div>
                        </div>)
                    }
                    )) : (<p className="mt-12  mb-96 text-center text-xl font-bold">No Saved Found</p>)
                }
            </div>


        </>
    )
}

export default Saved