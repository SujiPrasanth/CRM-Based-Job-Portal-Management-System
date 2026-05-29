import { useEffect, useState } from "react"
import { FaRegSquare, FaCheckSquare, FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function Jobs() {

    const navigate = useNavigate()

    const [checkedlocation, setcheckedlocation] = useState([])

    const [data, setdata] = useState([])
    const locations = ["Chennai", "Bengaluru", "Hyderabad", "Gurgaon"]

    const toggleLocation = (location) => {

        if (checkedlocation.includes(location)) {
            setcheckedlocation(
                checkedlocation.filter(item => item !== location)
            )
        } else {
            setcheckedlocation([...checkedlocation, location])
        }

    }

    const [checkedrole, setcheckedrole] = useState([])
    const roles = ["Software Engineer", "Data Scientist", "Mern Stack", "Data Analyst", "Hr Manager"]

    const togglerole = (role) => {
        if (checkedrole.includes(role)) {
            setcheckedrole(
                checkedrole.filter((item) => item !== role)
            )
        } else {
            setcheckedrole(
                [...checkedrole, role]
            )
        }
    }


    useEffect(() => {

        async function fetchdata() {
            const res = await fetch('https://crm-based-job-portal-management-system.onrender.com/api/fetchcompanydata', {
                credentials: "include"
            })
            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            } else {
                console.log(data);
                setdata(data)
            }
        }

        fetchdata()
    }, [])


    const filtereddata = data.filter((item) => {
        const locationchecked = checkedlocation.length === 0 || checkedlocation.includes(item.location)

        const rolechecked = checkedrole.length === 0 || checkedrole.includes(item.role)

        return locationchecked && rolechecked
    })


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
            <div className="min-h-screen pb-3 px-3 flex gap-3 ">
                <div className="flex flex-col  sm:w-[210px] w-[150px] border border-gray-100 shadow shadow-xl">
                    <div className="py-3 px-3 ">
                        <p className="font-bold text-2xl">Filter Jobs</p>
                        <p className="font-bold text-2xl py-2">Location</p>

                        {locations.map((location, i) =>
                            <div key={i} onClick={() => { toggleLocation(location) }} className="flex gap-3 items-center" >
                                {checkedlocation.includes(location) ? <FaCheckSquare size={15} className="cursor-pointer" /> : <FaRegSquare size={15} className="cursor-pointer" />}
                                <p className="cursor-pointer">{location}</p>
                            </div>
                        )}
                    </div>

                    <div className="py-2 px-3">
                        <p className="font-bold text-2xl">Role</p>
                        {roles.map((role, i) => (
                            <div key={i} onClick={() => togglerole(role)} className="flex gap-3 items-center">
                                {checkedrole.includes(role) ? <FaCheckSquare size={15} className="cursor-pointer" /> : <FaRegSquare size={15} className="cursor-pointer" />}
                                <p className="break-words py-1 cursor-pointer">{role}</p>
                            </div>
                        )
                        )}
                    </div>
                </div>

                <div className="flex-1">

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-6">

                        {filtereddata.length > 0 ? (filtereddata.map((item) =>
                            <div key={item._id} className="w-full border border-gray-200 shadow-lg px-4 py-4 rounded-lg">

                                <div className="flex gap-3 items-center">
                                    <div>
                                        <img src={`https://crm-based-job-portal-management-system.onrender.com/uploads/${item.companylogo}`} alt="" className="h-7 w-7" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xl font-bold">{item.companyname}</p>
                                        <p>{item.location}</p>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold">{item.role}</p>

                                <p className="text-sm text-gray-600">
                                    {item.shortdescription}
                                </p>

                                <div className="flex flex-wrap gap-2 my-3">
                                    <p className="border py-1 font-bold text-blue-600 border-gray-300 rounded-md px-3 text-sm">
                                        {item.jobmode}
                                    </p>
                                    <p className="border py-1 font-bold text-red-500 border-gray-300 rounded-md px-3 text-sm">
                                        {item.jobtype}
                                    </p>
                                    <p className="border py-1 font-bold text-violet-600 border-gray-300 rounded-md px-3 text-sm">
                                        {item.salary}
                                    </p>


                                </div>

                                <div className="flex flex-col gap-2">
                                    <button onClick={() => handleapply(item._id)} className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition">
                                        Apply
                                    </button> 
                                    <div className="flex gap-2">
                                        <button onClick={() => handlesave(item._id)} className="w-1/2 py-2 bg-violet-600 text-white rounded-md font-semibold hover:bg-violet-700 transition">
                                            Save For Later
                                        </button>
                                        <button onClick={()=>navigate(`/details/${item._id}`)} className="hover:bg-blue-600 border py-1 w-1/2 font-bold text-white bg-blue-500 border-gray-300 rounded-md px-3 text-sm transition">
                                            View Details
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )) : (
                            <div>No Data Found</div>
                        )}

                    </div>
                </div>

            </div>
        </>
    )
}

export default Jobs