import { NavLink, useNavigate } from "react-router-dom"
import { FaBars } from "react-icons/fa"
import { useState } from "react"

function Adminbar() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const linkclass = ({ isActive }) => `text-left p-2 my-2 font-semibold text-xl ${isActive
            ? "rounded-lg bg-black text-white"
            : "rounded-lg hover:bg-gray-200"
        }`

    async function handlelogout() {
        const confirmmsg = window.confirm("Are you Sure want to Signout?")
        if (!confirmmsg) return
        try {
            const res = await fetch('http://localhost:3001/api/adminlogout', {
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
                <h1 className="font-bold text-xl">Admin</h1>
                <FaBars size={25} className="cursor-pointer" onClick={() => setOpen(true)} />
            </div>

            <div className={`fixed top-0 left-0 h-screen w-64 bg-gray-100 p-3 shadow-xl transform transition-transform duration-300 z-50   ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`} >
                <h1 className="font-bold text-2xl text-center my-3 hidden md:block">
                    Admin
                </h1>

                <div className="flex flex-col">

                    <NavLink to='/adminoverview' className={linkclass} onClick={() => setOpen(false)}>Overview</NavLink>
                    <NavLink to='/jobseeker' className={linkclass} onClick={() => setOpen(false)}>Job Seekers</NavLink>
                    <NavLink to='/joborganizer' className={linkclass} onClick={() => setOpen(false)}>Organziers</NavLink>
                    <NavLink to='/adminjobs' className={linkclass} onClick={() => setOpen(false)}>Jobs</NavLink>
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

export default Adminbar