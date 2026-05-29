import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Profileedit() {
    const navigate = useNavigate()
    const [formdata, setformdata] = useState({
        fullname: "",
        skills: "",
        aboutme: "",

    })
    const [resume, setresume] = useState(null)

    function handlechnage(e) {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

   async function handlesubmit(e){
        e.preventDefault()

        const formdataobj = new FormData()
        
        for (let key in formdata){
            formdataobj.append(key,formdata[key])
        }

        formdataobj.append('resume',resume)

        try{
            const res = await fetch(`https://crm-based-job-portal-management-system.onrender.com/api/profileupdate`,{
                method:"PATCH",
                credentials:"include",
                body:formdataobj
                
            })
            const data =await res.json()

            if(!res.ok){
                alert(data.msg)
            }else{
                alert(data.msg)
                navigate('/profile')
            }
        }catch(err){
            console.log(err)
        }
    } 

    useEffect(() => {
    async function fetchProfile() {
        try {
            const res = await fetch("https://crm-based-job-portal-management-system.onrender.com/api/profiledata", {
                credentials: "include"
            })

            const data = await res.json()

            if (res.ok) {
                console.log(data)
                setformdata({
                    fullname: data.fullname || "",
                    skills: data.skills || "",
                    aboutme: data.aboutme || ""
                })
            } else {
                alert(data.msg)
            }
        } catch (err) {
            console.log(err)
        }
    }

    fetchProfile()
}, [])


    return (
        <div className="flex items-center justify-center bg-gray-100 h-screen">
            <div className="w-96 bg-white p-6 rounded-md shadow shadow-md">
                <p className="font-bold text-4xl text-center">Update Profile</p>
                <form onSubmit={handlesubmit}>
                    <div className="my-2 p-1 border border-gray-300 focus-within:ring-1 focus-within:ring-indigo-400 rounded-md">
                        <input type="text" name="fullname" required onChange={handlechnage} value={formdata.fullname} id="" className="outline-none bg-transparent w-full" placeholder="Full Name" />
                    </div>

                    <div className="my-2 p-1 border border-gray-300 focus-within:ring-1 focus-within:ring-indigo-400 rounded-md">
                        <textarea type="text" name="skills" required onChange={handlechnage} value={formdata.skills} id="" className="outline-none bg-transparent w-full" placeholder="Skills" />
                    </div>

                    <div className="my-2 p-1 border border-gray-300 focus-within:ring-1 focus-within:ring-indigo-400 rounded-md">
                        <textarea type="text" name="aboutme" required onChange={handlechnage} value={formdata.aboutme} id="" className="outline-none bg-transparent w-full" placeholder="About Me" />
                    </div>

                    <div className="my-2 p-1 border border-gray-300 focus-within:ring-1 focus-within:ring-indigo-400 rounded-md">
                        <input type="file" onChange={(e) => setresume(e.target.files[0])} id="" className="outline-none bg-transparent w-full" />
                    </div>
                    <button className="bg-green-600 py-1 px-2 rounded-lg text-white w-full text-center hover:scale-105 hover:shadow-lg duration-300 transition">Update</button>
                </form>
            </div>
        </div>

    )
}

export default Profileedit