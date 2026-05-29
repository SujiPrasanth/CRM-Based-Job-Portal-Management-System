import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Applications() {

    const [data, setdata] = useState([])
    const navigate = useNavigate()
    const fetchdata = async () => {

        try {

            const res = await fetch('https://crm-based-job-portal-management-system.onrender.com/api/applications', {
                credentials: "include"
            })
            const data = await res.json()
            if (!res.ok) {
                alert(data.msg)
                return
            }
            else {
                console.log("DATA", data)
                setdata(data.applications)
                return
            }

        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        fetchdata()
    }, [])

    async function handlestatuschange(id, newstatus) {
        try {
            const confirmmessage = window.confirm(`Are You Sure want to Update Status to "${newstatus.toUpperCase()}"?`)
            if (!confirmmessage) return

            const res = await fetch(`https://crm-based-job-portal-management-system.onrender.com/api/updatestatus/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newstatus })
            })
            const data = await res.json()
            if (!res.ok) {
                alert(data.msg)
                return
            }
            else {
                await fetchdata()
                alert(data.msg)
                return
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <div className="my-6 mx-2 md:mx-6">
                <p className="font-bold text-2xl md:text-3xl">
                    Applications
                </p>
                <div className="my-3 overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2 text-left border border-white text-sm md:text-base">
                                    Job Id
                                </th>
                                <th className="p-2 text-left border border-white text-sm md:text-base">
                                    Name
                                </th>
                                <th className="p-2 text-left border border-white text-sm md:text-base">
                                    Email
                                </th>
                                <th className="p-2 text-left border border-white text-sm md:text-base">
                                    Role
                                </th>
                                <th className="p-2 text-left border border-white text-sm md:text-base">
                                    Action
                                </th>
                                <th className="p-2 text-left border border-white text-sm md:text-base">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-sm md:text-base">
                                        No data Found
                                    </td>
                                </tr>) : (data.map((item) => {
                                    return (
                                        <tr key={item._id} className="hover:bg-gray-100/50" >
                                            <td className="p-2 text-left border text-sm md:text-base">
                                                {item._id.slice(-4)}
                                            </td>
                                            <td className="p-2 text-left border text-sm md:text-base">
                                                {item.userid.fullname}
                                            </td>
                                            <td className="p-2 text-left border text-sm md:text-base">
                                                {item.userid.email}
                                            </td>
                                            <td className="p-2 text-left border text-sm md:text-base">
                                                {item.jobid.role}
                                            </td>
                                            <td className="p-2 text-left border">
                                                <button onClick={() => navigate(`/viewuserprofile/${item.userid._id}`)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg text-sm md:text-base">
                                                    View
                                                </button>
                                            </td>
                                            <td className="p-2 text-left border">
                                                <select value={item.status}
                                                    onChange={(e) => handlestatuschange(item._id, e.target.value)}
                                                    className="border rounded-md px-2 py-1 text-sm md:text-base">
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="selected">
                                                        Selected
                                                    </option>
                                                    <option value="rejected">
                                                        Reject
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Applications