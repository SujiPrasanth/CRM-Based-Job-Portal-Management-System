import { NavLink, useNavigate } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import { useState } from "react"

function Sidebar() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const linkclass = ({ isActive }) =>
        `text-left p-2 my-2 font-semibold text-xl ${isActive
            ? "rounded-lg bg-black text-white"
            : "rounded-lg hover:bg-gray-200"
        }`

    async function handlelogout() {
        const confirmmsg = window.confirm("Are you Sure want to Signout?")
        if (!confirmmsg) return
        try {
            const res = await fetch('http://localhost:3001/api/logout', {
                credentials: "include",
                method: "POST"
            })
            const data = await res.json()
            if (!res.ok) {
                alert(data.msg)
                return
            }
            else {
                alert(data.msg)
                navigate('/')
            }

        } catch (err) {
            console.log(err);

        }
    }
    return (
        <>
            <div className="md:hidden flex justify-between items-center p-4 bg-gray-200 ">
                <h1 className="font-bold text-xl">Job Organizer</h1>
                <FaBars size={25} className="cursor-pointer" onClick={() => setOpen(true)} />
            </div>

            <div className={`fixed top-0 left-0 h-screen w-64 bg-gray-100 p-3 shadow-xl transform transition-transform duration-300 z-50   ${open ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:static md:block`} >
                <h1 className="font-bold text-2xl text-center my-3 hidden md:block">
                    Job Organizer
                </h1>

                <div className="flex flex-col">

                    <NavLink to='/organizeroverview' className={linkclass} onClick={() => setOpen(false)}>Overview</NavLink>
                    <NavLink to='/organizerapplicants' className={linkclass} onClick={() => setOpen(false)}>Applicants</NavLink>
                    <NavLink to='/organizerjobs' className={linkclass} onClick={() => setOpen(false)}>Jobs</NavLink>
                    <NavLink to='/organizerapplications' className={linkclass} onClick={() => setOpen(false)}>Applications</NavLink>
                    <NavLink to='/organizercomapnyprofile' className={linkclass} onClick={() => setOpen(false)}>Company profile</NavLink>

                    <button className="text-red-500 hover:bg-gray-200 p-2 rounded-lg text-left text-xl" onClick={() => handlelogout()}  >
                        Sign Out
                    </button>

                </div>
            </div>


            {open && (
                <div className="fixed inset-0 bg-black opacity-40 z-40 md:hidden" onClick={() => setOpen(false)}></div>
            )}
        </>
    )
}

export default Sidebar