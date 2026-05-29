import { Link, useNavigate } from "react-router-dom"
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"
import { useState } from "react"

function Log() {
    const navigate = useNavigate()
    const [fullname, setfullname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    async function handlesignup() {

        try {
            const res = await fetch('http://localhost:3001/api/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullname, email, password, role: 'user'
                })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
            } else {
                alert(data.msg)
                setfullname("")
                setemail("")
                setpassword("")
                navigate('/seekerlogin')
            }

        } catch (err) {
            console.log(err)
            alert("Error Connecting to Server")
        }

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 ">

            <div className="text-black bg-white border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-3xl font-bold text-center  mb-2">
                    Job Seeker
                </h2>
                <p className="text-center text-black font-semibold text-xl mb-6">
                    Create your account
                </p>

                <div className="flex items-center border border-gray-300 bg-white rounded-lg px-3 mb-4 focus-within:ring-2 focus-within:ring-indigo-400">
                    <FaUser className="text-gray-500" />
                    <input type="text" value={fullname} onChange={(e) => setfullname(e.target.value)}
                        placeholder="Full Name" className="w-full p-2 outline-none bg-transparent" />
                </div>


                <div className="flex items-center border border-gray-300 bg-white rounded-lg px-3 mb-4 focus-within:ring-2 focus-within:ring-indigo-400">
                    <FaEnvelope className="text-gray-500" />
                    <input type="email" value={email} onChange={(e) => setemail(e.target.value)}
                        placeholder="Email Address" className="w-full p-2 outline-none bg-transparent" />
                </div>

                <div className="flex items-center border border-gray-300 bg-white rounded-lg px-3 mb-4 focus-within:ring-2 focus-within:ring-indigo-400">
                    <FaLock className="text-gray-500" />
                    <input type="password" value={password}
                        onChange={(e) => setpassword(e.target.value)} placeholder="Password"
                        className="w-full p-2 outline-none bg-transparent" />
                </div>

                <button onClick={handlesignup} className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 hover:shadow-lg transition duration-300">
                    Sign Up
                </button>


                <p className="text-center  text-black font-semibold mt-4">
                    Already have an account?
                    <Link to="/seekerlogin" className="ml-1 text-blue-500 font-semibold hover:underline">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Log