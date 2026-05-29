import { useEffect, useState } from "react";

function Applicants() {
    const [data, setdata] = useState([])

    useEffect(() => {

        async function getdata() {
            try {
                const res = await fetch('http://localhost:3001/api/applicants', {
                    credentials: "include"
                })


                const data = await res.json()
                console.log(data)
                if (!res.ok) {
                    alert(data.msg)
                    return
                } else {
                    setdata(data)
                    return
                }


            } catch (err) {
                console.log(err)
            }
        }
        getdata()
    }, [])

    return (
        <>
            <div className="mx-4 my-4">
                <div className="overflow-x-auto">
                    <h1 className="font-bold text-3xl mb-6">Applicants</h1>

                    <table className="min-w-full border border-gray-300">

                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 border text-left">User ID</th>
                                <th className="p-3 border text-left">Job ID</th>
                                <th className="p-3 border text-left">Full Name</th>
                                <th className="p-3 border text-left">Email</th>
                                <th className="p-3 border text-left">Role</th>
                                <th className="p-3 border text-left">Shortlisted</th>

                            </tr>
                        </thead>

                        <tbody>
                            {
                                data.length === 0 ? (<tr><td colSpan={4} className="text-center text-xl py-2">No Applicants Found</td></tr>) :
                                    (data.map((item) =>
                                        <tr key={item._id} className="hover:bg-gray-100/50">
                                            <td className="p-3 border">{item.userid._id.slice(-4)}</td>
                                            <td className="p-3 border">{item.jobid._id.slice(-4)}</td>
                                            <td className="p-3 border">{item.userid.fullname}</td>
                                            <td className="p-3 border">{item.userid.email}</td>
                                            <td className="p-3 border">{item.jobid.role}</td>
                                            <td className="p-3 border">{item.status === 'selected' ? "yes" : "no"}</td>

                                        </tr>))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
}

export default Applicants;