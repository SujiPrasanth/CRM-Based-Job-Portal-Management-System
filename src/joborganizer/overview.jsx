import { useEffect, useState } from "react"

function Overview() {
    const [data, setdata] = useState([])
    useEffect(() => {
        async function dashboarddata() {
            try {
                const res = await fetch('https://crm-based-job-portal-management-system.onrender.com/api/dashboardoverview', {
                    credentials: "include"
                })

                const data = await res.json()
                if (!res.ok) {
                    alert(data.msg)
                    return
                } else {
                    console.log(data)
                    setdata(data)
                    return
                }
            } catch (err) {
                console.log(err)
            }
        }
        dashboarddata()
    }, [])
    return (
        <>
            <div className="mx-4 my-4">
                <p className="font-bold text-3xl">Overview</p>
                <div className="my-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-5">
                    <div className="flex items-center flex-col justify-center border  p-2  rounded-lg h-[100px] bg-gradient-to-r from-orange-300 to-orange-100">
                        <p className="font-semibold text-xl text-gray-700">Total Jobs</p>
                        <p className="font-bold text-2xl text-gray-900">{data.totaljob}</p>
                    </div>

                    <div className="flex items-center flex-col justify-center border  p-2  rounded-lg h-[100px] bg-gradient-to-r from-orange-300 to-orange-100">
                        <p className="font-semibold text-xl text-gray-700">Total Applicants</p>
                        <p className="font-bold text-2xl text-gray-900">{data.totalapplicants}</p>
                    </div>

                    <div className="flex items-center flex-col justify-center border  p-2  rounded-lg h-[100px] bg-gradient-to-r from-orange-300 to-orange-100">
                        <p className="font-semibold text-xl text-gray-700">Total Vacancy</p>
                        <p className="font-bold text-2xl text-gray-900">{data.totalvacancy}</p>
                    </div>

                    <div className="flex items-center flex-col justify-center border  p-2  rounded-lg h-[100px] bg-gradient-to-r from-orange-300 to-orange-100">
                        <p className="font-semibold text-xl text-gray-700">Max Vacancy by Role</p>
                        <p className="font-bold text-2xl text-gray-900">{data.maxvacancy}</p>
                    </div>

                    <div className="flex items-center flex-col justify-center border  p-2  rounded-lg h-[100px] bg-gradient-to-r from-orange-300 to-orange-100">
                        <p className="font-semibold text-xl text-gray-700">Selected</p>
                        <p className="font-bold text-2xl text-gray-900">{data.selected}</p>
                    </div>

                    <div className="flex items-center flex-col justify-center border  p-2  rounded-lg h-[100px] bg-gradient-to-r from-orange-300 to-orange-100">
                        <p className="font-semibold text-xl text-gray-700">Pending</p>
                        <p className="font-bold text-2xl text-gray-900">{data.pending}</p>
                    </div>

                    <div className="flex items-center flex-col justify-center border  p-2  rounded-lg h-[100px] bg-gradient-to-r from-orange-300 to-orange-100">
                        <p className="font-semibold text-xl text-gray-700">Max Role by Vacancy</p>
                        <p className="font-bold text-xl text-gray-900">{data.maxrole}</p>
                    </div>

                    <div className="flex items-center flex-col justify-center border  p-2  rounded-lg h-[100px] bg-gradient-to-r from-orange-300 to-orange-100">
                        <p className="font-semibold text-xl text-gray-700">Selection Rate</p>
                        <p className="font-bold text-xl text-gray-900">{data.selectionrate}%</p>
                    </div>
                </div>

                <div>
                    <p className="font-bold text-xl my-2">Recent Applicants</p>
                    <table>
                        <thead>
                            <tr className="border border-gray-100 bg-gray-100">
                                <td className="border border-gray-300 p-2 font-semibold text-lg">Userid</td>
                                <td className="border border-gray-300 p-2 font-semibold text-lg">Jobid</td>
                                <td className="border border-gray-300 p-2 font-semibold text-lg">Name</td>
                                <td className="border border-gray-300 p-2 font-semibold text-lg">Email</td>
                                <td className="border border-gray-300 p-2 font-semibold text-lg">Role</td>
                                <td className="border border-gray-300 p-2 font-semibold text-lg">Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recentapplicants?.length === 0 ? (<tr><td colSpan={5}>No Data Found</td></tr>) : (
                                data.recentapplicants?.map((item) =>
                                (
                                    <tr key={item._id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2">{item.userid?._id.slice(-4)}</td>
                                        <td className="border border-gray-300 p-2">{item.jobid?._id.slice(-4)}</td>
                                        <td className="border border-gray-300 p-2">{item.userid?.fullname}</td>        
                                        <td className="border border-gray-300 p-2">{item.userid?.email}</td>
                                        <td className="border border-gray-300 p-2">{item.jobid?.role}</td>
                                        <td className="border border-gray-300 p-2">{item.status}</td>
                                    </tr>
                                )
                                )
                            )}

                        </tbody>
                    </table>
                </div>
                {data && (
                    <div className="bg-white shadow-md rounded-xl p-5 mt-6">
                        <h2 className="text-xl font-bold mb-3">Summary</h2>

                        <p>You have posted <b>{data.totaljob}</b> jobs.</p>
                        <p>Total applicants: <b>{data.totalapplicants}</b></p>
                        <p>
                            Selected: <span className="text-green-600">{data.selected}</span> |
                            Pending: <span className="text-red-500">{data.pending}</span>
                        </p>
                        <p>Total vacancies: <b>{data.totalvacancy}</b></p>
                        <p>
                            Top role: <b>{data.maxrole}</b> ({data.maxvacancy} Vacancies)
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Overview