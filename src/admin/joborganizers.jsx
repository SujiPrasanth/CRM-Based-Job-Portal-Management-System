import { useState, useEffect } from "react"
function Joborganizers() {
    const [data, setdata] = useState([])
    useEffect(() => {
        async function fethcdata() {
            const res = await fetch('http://localhost:3001/api/joborganizer', {
                credentials: "include"
            })

            const data = await res.json()
            if (!res.ok) {
                alert(data.msg)
            } else {
                console.log(data);

                setdata(data.organizers)
            }
        }
        fethcdata()
    }, [])
    return (
        <>
            <div className="mx-4 my-4">
                <div className="overflow-x-auto">
                    <h1 className="font-bold text-3xl mb-6">Jobs</h1>

                    <table className="min-w-full border border-gray-300">

                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 border text-left">User ID</th>
                                <th className="p-3 border text-left">Company Name</th>
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
                                            <td className="p-3 border">{item.companyname}</td>
                                            <td className="p-3 border">{item.userid.fullname}</td>
                                            <td className="p-3 border">{item.userid.email}</td>

                                        </tr>))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}

export default Joborganizers