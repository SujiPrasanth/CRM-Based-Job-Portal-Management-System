import { useState } from "react"
import { FaEnvelope, FaUserLock } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
function Adminsignin() {

    const navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    async function handlesignin() {
        try {
            const res = await fetch('http://localhost:3001/api/signin', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            }

            if (data.user.role === 'admin') {
                console.log(data)
                alert('Login Succesfull')
                navigate('/adminoverview')
            }

        } catch (err) {
            alert(err.messaage)
            alert("Error Connecting to Server")
        }

    }

    return (
        <>
            <div className="h-screen bg-gray-300 flex items-center justify-center ">
                <div className=" bg-white w-full max-w-md rounded-lg shadow shadow-xl p-6 mx-4">
                    <h1 className="text-center font-bold text-3xl">Admin Login</h1>
                    <p className="text-center font-semibold text-xl">Welcome Back</p>
                    <div className="flex items-center gap-2 border border-gray-300 mt-2 mb-3 focus-within:ring-2 focus-within:ring-indigo-400 rounded-lg py-2 px-3 ">
                        <FaEnvelope className="text-gray-500" />
                        <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} name="" id="" placeholder="Email Addresss " className="w-full bg-transparent outline-none" />
                    </div>
                    <div className="flex items-center gap-2 border border-gray-300 mt-2  mb-3 focus-within:ring-2 focus-within:ring-indigo-400 rounded-lg py-2 px-3 ">
                        <FaUserLock className="text-gray-500" />
                        <input type="text" value={password} onChange={(e)=>setpassword(e.target.value)} name="" id="" placeholder="Password" className="w-full bg-transparent outline-none" />
                    </div>
                    <button onClick={handlesignin} className="w-full py-2 bg-gradient-to-r font-bold rounded-lg text-white from-indigo-500 to-purple-500 p-3">Submit</button>
                </div>
            </div>
        </>
    )
}
export default Adminsignin