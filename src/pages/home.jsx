import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
function Home() {
    const navigate = useNavigate()
    const [data, setdata] = useState([])
    const [search, setsearch] = useState("")
    const [selectedrole, setselectedrole] = useState("")
    const roles = [
        "Software Engineer",
        "MERN Stack Developer",
        "Machine Learning",
        "Data Science",
        "Business Analyst",
        "HR Executive"
    ]
    const [index, setindex] = useState(0)
    const next = () => {
        console.log("left clicked")
        if (index < roles.length - 2) {
            setindex(index + 1)
        }
    }

    const prev = () => {
        if (index > 0) {
            setindex(index - 1)
        }
    }

    useEffect(() => {
        async function handlefetchdata() {
            const res = await fetch('https://crm-based-job-portal-management-system.onrender.com/api/fetchcompanydata')
            const data = await res.json()

            if (!res.ok) {
                setdata(null)
                return
            } else {
                setdata(data)
                return
            }
        }
        handlefetchdata()
    }, [])

    const filtereddata = data.filter((item) => {
        const matchSearch = search
            ? item.role.toLowerCase().includes(search.toLowerCase())
            : true

        const matchRole = selectedrole
            ? item.role === selectedrole
            : true

        return matchSearch && matchRole
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
            <div className="py-6 px-4">
                <div className="flex flex-col items-center justify-center pt-16">
                    <p className="text-red-500 bg-gray-100 rounded-full px-6 py-2 font-bold">No. 1 Job Hunt Website</p>
                    <div className="text-center leading-loose">
                        <p className="text-5xl font-bold text-center">Search, Apply &</p>
                        <p className="text-5xl font-bold text-center">Get Your <span className="text-violet-500">Dream Jobs</span></p>
                        <p className="py-6 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia libero, rem eligendi quo numquam tenetur?</p>
                    </div>
                    <div className="relative text-center">
                        <input value={search} onChange={
                            (e) => {
                                setsearch(e.target.value)
                                setselectedrole("")
                            }} type="text" name="" id="" placeholder="Find Your jobs" className="placeholder:tracking-wide pl-6 w-[60vw] sm:w-[35vw] shadow shadow-xl outline-none border border-gray-100 placeholder:px-3 rounded-full py-1" />
                        <FaSearch size={35} className="cursor-pointer absolute right-0 top-0 text-5xl rounded-full text-white bg-violet-400 px-2 py-1 " />
                    </div>

                    <div className="flex items-center gap-4 py-12 select-none">
                        <div onClick={() => prev()} className="cursor-pointer text-2xl">
                            <FaCircleChevronLeft />
                        </div>

                        <div className="overflow-hidden w-[280px] sm:w-[420px]">
                            <div className="flex gap-3 transition-transform duration-300" style={{ transform: `translateX(-${index * 210}px)` }}>
                                {roles.map((role, i) => (
                                    <p key={i} onClick={() => {
                                        if (selectedrole === role) {
                                            setselectedrole("")
                                        } else {
                                            setselectedrole(role)
                                        }
                                        setsearch("")
                                    }} className={`border cursor-pointer border-gray-200 px-4 py-2 rounded-full min-w-[200px] text-center ${selectedrole === role ? "bg-violet-500 text-white" : "border-gray-200"}`}>{role}</p>
                                ))}
                            </div>
                        </div>

                        <div onClick={() => next()} className="text-2xl cursor-pointer">
                            <FaCircleChevronRight />
                        </div>
                    </div>
                </div>
            </div >

            <div className="px-6 py-12">
                <div className="text-xl ">
                    <p className="text-3xl font-bold"><span className="text-violet-500">Latest & Top</span> Job Openings</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-6 md:px-0 px-2">

                        {filtereddata.length > 0 ? (filtereddata.slice(0, 6).map((item) => <div key={item._id} className="w-auto h-auto border border-bg-gary-100 shadow shadow-xl px-4 py-4 rounded-lg">
                            <div className="flex gap-3 items-center">
                                <div>
                                    <img src={`https://crm-based-job-portal-management-system.onrender.com/uploads/${item.companylogo}`} alt="" className="h-7 w-7" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xl font-bold">{item.companyname}</p>
                                    <p>{item.location}</p>
                                </div>
                            </div>

                            <p className="text-xl font-bold">{item.role}</p>
                            <p>{item.shortdescription}</p>
                            <div className="flex sm:gap-2 gap-1 my-3">
                                <p className="border py-1 font-bold text-blue-600 border-gray-150 rounded-md px-4 text-base cursor-pointer">{item.jobmode}</p> <p className="cursor-pointer border py-1 font-bold text-red-500 border-gray-150 rounded-md px-4 text-base">{item.jobtype}</p> <p className="cursor-pointer border py-1 font-bold text-violet-600 border-gray-150 rounded-md px-4 text-base">{item.salary}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => handleapply(item._id)} className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition">
                                    Apply
                                </button>
                                <div className="flex gap-2">
                                    <button onClick={() => handlesave(item._id)} className="w-1/2 py-2 bg-violet-600 text-white rounded-md font-semibold hover:bg-violet-700 transition">
                                        Save For Later
                                    </button>
                                    <button onClick={() => navigate(`/details/${item._id}`)} className="w-1/2 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition">
                                        view Details
                                    </button>
                                </div>

                            </div>
                        </div>)) : (<p>No Job Data Found</p>)}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home