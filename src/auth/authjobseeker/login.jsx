import { Link } from "react-router-dom"
import { useState } from "react"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
function Login() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    async function handlesignin() {
        try {
            const res = await fetch('http://localhost:3001/api/signin', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    email, password
                })
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            }
            if (data.user.role === 'user') {
                alert(data.msg)
                navigate('/')
                return
            }
        } catch (err) {
            alert("Server is Not Connected")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">

            <div className="text-black bg-white border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-3xl font-bold text-center mb-2">
                    Job Seeker
                </h2>
                <p className="text-center text-black font-semibold text-xl mb-6">
                    Welcome Back
                </p>


                <div className="flex items-center border border-gray-300 bg-white rounded-lg px-3 mb-4 focus-within:ring-2 focus-within:ring-indigo-400">
                    <FaEnvelope className="text-gray-500" />
                    <input   type="email" value={email} onChange={(e) => setemail(e.target.value)}  placeholder="Email Address"  className="w-full p-2 outline-none bg-transparent" />
                </div>

                <div className="flex items-center border border-gray-300 bg-white rounded-lg px-3 mb-4 focus-within:ring-2 focus-within:ring-indigo-400">
                    <FaLock className="text-gray-500" />
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" className="w-full p-2 outline-none bg-transparent" />

                    <button onClick={() => setShowPassword(!showPassword)} className="text-sm text-blue-500 px-2"  >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>


                <button onClick={handlesignin} className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 hover:shadow-lg transition duration-300">
                    Sign In
                </button>

                <p className="text-center text-black font-semibold mt-4">
                    Don’t have an account?
                    <Link to="/seekerlog" className="ml-1 text-blue-500 hover:underline"  >
                        Sign up
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Login