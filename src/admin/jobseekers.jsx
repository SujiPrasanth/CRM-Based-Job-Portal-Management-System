import { useState, useEffect } from "react"
function Jobseekers() {
    const [data, setdata] = useState([])
    useEffect(() => {
        async function fethcdata() {
            const res = await fetch('https://crm-based-job-portal-management-system.onrender.com/api/jobseeker', {
                credentials: "include"
            })

            const data = await res.json()
            if (!res.ok) {
                alert(data.msg)
            } else {
                console.log(data);

                setdata(data.seekers)
            }
        }
        fethcdata()
    }, [])
    return (
        <>
            <div className="mx-4 my-4">
                <div className="overflow-x-auto">
                    <h1 className="font-bold text-3xl mb-6">Job Seekers</h1>

                    <table className="min-w-full border border-gray-300">

                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 border text-left">User ID</th>
                                <th className="p-3 border text-left">Full Name</th>
                                <th className="p-3 border text-left">Email</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data.length === 0 ? (<tr><td colSpan={4} className="text-center text-xl py-2">No Applicants Found</td></tr>) :
                                    (data.map((item) =>
                                        <tr key={item._id} className="hover:bg-gray-100/50">
                                            <td className="p-3 border">{item._id.slice(-4)}</td>
                                            <td className="p-3 border">{item.fullname}</td>
                                            <td className="p-3 border">{item.email}</td>

                                        </tr>))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}

export default Jobseekers