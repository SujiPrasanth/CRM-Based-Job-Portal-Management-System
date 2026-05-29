import { useState, useEffect } from "react"

function Adminoverview() {

    const [data, setdata] = useState(null)

    useEffect(() => {

        async function fetchdata() {

            try {

                const res = await fetch("https://crm-based-job-portal-management-system.onrender.com/api/admindashboard", {
                    credentials: "include"
                })

                const data = await res.json()

                if (!res.ok) {
                    alert(data.msg)
                } else {
                    console.log(data)
                    setdata(data)
                }

            } catch (err) {
                console.log(err)
            }

        }

        fetchdata()

    }, [])

    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen text-2xl font-bold">
                Loading...
            </div>
        )
    }

    return (
        <>
            <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

                <h1 className="text-3xl font-bold mb-8">
                    Admin Overview
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div className="bg-white shadow-lg rounded-xl p-5">
                        <h2 className="text-gray-500 text-lg">Total Users</h2>
                        <p className="text-3xl font-bold mt-2">
                            {data.dashboard.totalusers}
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-5">
                        <h2 className="text-gray-500 text-lg">Total Organizers</h2>
                        <p className="text-3xl font-bold mt-2">
                            {data.dashboard.totalorganizers}
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-5">
                        <h2 className="text-gray-500 text-lg">Total Jobs</h2>
                        <p className="text-3xl font-bold mt-2">
                            {data.dashboard.totaljobs}
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-5">
                        <h2 className="text-gray-500 text-lg">Applications</h2>
                        <p className="text-3xl font-bold mt-2">
                            {data.dashboard.totalapplications}
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-5">
                        <h2 className="text-gray-500 text-lg">Selected</h2>
                        <p className="text-3xl font-bold mt-2 text-green-600">
                            {data.dashboard.selected}
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-5">
                        <h2 className="text-gray-500 text-lg">Pending</h2>
                        <p className="text-3xl font-bold mt-2 text-yellow-500">
                            {data.dashboard.pending}
                        </p>
                    </div>
                </div>

                <div className="mt-10 bg-white rounded-xl shadow-lg p-5 overflow-x-auto">
                    <h1 className="text-2xl font-bold mb-5">Recent Job Seekers</h1>
                    <table className="w-full min-w-[500px]">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-3">Name</th>
                                <th className="text-left p-3">Email</th>
                                <th className="text-left p-3">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.seekers.map((item) => (
                                <tr key={item._id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{item.fullname}</td>
                                    <td className="p-3">{item.email}</td>
                                    <td className="p-3 capitalize">{item.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                
                <div className="mt-10 bg-white rounded-xl shadow-lg p-5 overflow-x-auto">
                    <h1 className="text-2xl font-bold mb-5"> Organizers</h1>

                    <table className="w-full min-w-[500px]">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-3">Company</th>
                                <th className="text-left p-3">Name</th>
                                <th className="text-left p-3">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.organizers.map((item) => (
                                <tr key={item._id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{item.companyname}</td>
                                    <td className="p-3">{item.userid?.fullname}</td>
                                    <td className="p-3">{item.userid?.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className="mt-10 bg-white rounded-xl shadow-lg p-5 overflow-x-auto">

                    <h1 className="text-2xl font-bold mb-5">    Jobs</h1>
                    <table className="w-full min-w-[500px]">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-3">Company</th>
                                <th className="text-left p-3">Role</th>
                                <th className="text-left p-3">Location</th>
                                <th className="text-left p-3">Salary</th>
                            </tr>
                        </thead>

                        <tbody>

                            {data.jobs.map((item) => (
                                <tr key={item._id} className="border-b hover:bg-gray-100">
                                    <td className="p-3"> {item.companyname} </td>
                                    <td className="p-3"> {item.role} </td>
                                    <td className="p-3">  {item.location}  </td>
                                    <td className="p-3">  {item.salary} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Adminoverview