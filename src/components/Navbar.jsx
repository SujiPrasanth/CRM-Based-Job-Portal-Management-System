import { useEffect, useRef, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import logout from '../assets/logout.png'
import { FaBars } from "react-icons/fa"
function Navbar() {
    const [open, setopen] = useState(false)
    const [showmenu, setshowmenu] = useState(false)
    const linkclass = ({ isActive }) => isActive ? "text-orange-600 text-xl font-semibold" : "font-semibold text-black text-xl hover:text-orange-600"
    const navigate = useNavigate()

    const menuref = useRef()

    useEffect(() => {
        function handleoutside(event) {
            if (menuref.current && !menuref.current.contains(event.target)) {
                setshowmenu(false)
            }
        }
        document.addEventListener("mousedown", handleoutside)

        return () => {
            document.removeEventListener("mousedown", handleoutside)
        }

    }, [])

    async function handlelogout() {
        const confirmmsg = window.confirm("Are you sure want to Signout?")
        if (!confirmmsg) return
        try {
            const res = await fetch('https://crm-based-job-portal-management-system.onrender.com/api/userlogout', {
                method: "POST",
                credentials: "include"
            })
            const data = await res.json()
            if (!res.ok) {
                alert(data.msg)
                navigate('/seekerlogin')
                return
            } else {
                alert(data.msg)
                navigate('/')
                return
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div ref={menuref} className="bg-white left-0 fixed top-0 w-full py-4 border border-gray-200 lg:px-32 md:px-24 px-4 z-10">
                <div className="flex items-center justify-between  p-2">
                    <div>
                        <p className="font-bold text-4xl">Job<span className="text-violet-500 text-4xl">Portal</span></p>
                    </div>
                    <div className="hidden md:flex text-xl items-center gap-6">
                        <NavLink to='/' className={linkclass}>Home</NavLink>
                        <NavLink to='/jobs' className={linkclass}>Jobs</NavLink>
                        <NavLink to='/applied' className={linkclass}>Applied</NavLink>
                        <NavLink to='/savedjobs' className={linkclass}>Saved Jobs</NavLink>
                        <div className="cursor-pointer" onClick={() => setshowmenu(prev => !prev)}>
                            <img src={logout} alt="" />
                        </div>
                    </div>

                    <div className="md:hidden flex gap-3 text-right">
                        <div className="cursor-pointer" onClick={() => setshowmenu(prev => !prev)}>
                            <img src={logout} alt="" />
                        </div>
                        <button onClick={() => setopen(!open)}><FaBars size={24} /></button>
                    </div>
                </div>

                {open &&
                    <div className="flex flex-col gap-3 px-4 md:hidden">
                        <NavLink to='/' className={linkclass} onClick={() => setopen(false)} >Home</NavLink>
                        <NavLink to='/jobs' className={linkclass} onClick={() => setopen(false)} >Jobs</NavLink>
                        <NavLink to='/applied' className={linkclass} onClick={() => setopen(false)} >Applied</NavLink>
                        <NavLink to='/savedjobs' className={linkclass} onClick={() => setopen(false)} >Saved Jobs</NavLink>

                    </div>
                }

                {showmenu &&
                    <div className="flex flex-col gap-2 bg-white w-36 absolute right-0 top-14 border border-gray-100 shadow shadow-lg rounded-lg p-3 ">
                        <NavLink to="/profile" className={linkclass} onClick={() => setshowmenu(false)} > Profile</NavLink>
                        <NavLink to="/seekerlogin" className={linkclass} onClick={() => setshowmenu(false)} >Job Seeker</NavLink>
                        <NavLink to="/organizersignin" className={linkclass} onClick={() => setshowmenu(false)} >Job Oranzier</NavLink>
                        <NavLink to="/adminsignin" className={linkclass} onClick={() => setshowmenu(false)} >Admin</NavLink>
                        <p className="text-xl text-red-600 cursor-pointer" onClick={() => handlelogout()} >signout</p>
                    </div>

                }

            </div>


        </>
    )
}

export default Navbar