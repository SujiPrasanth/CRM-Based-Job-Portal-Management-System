import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Organizerjobs() {

    const [data, setdata] = useState([])

    const navigate = useNavigate()

    useEffect(() => {

        async function fetchdata() {
            const res = await fetch('http://localhost:3001/api/jobdata', {
                credentials: 'include'
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            }
            else {
                console.log(data)
                setdata(data)
                return
            }
        }

        fetchdata()

    }, [])

    async function handledelete(id) {

        try {

            const confirmdelete = window.confirm("Are You Sure Want to Delete Job?")

            if (!confirmdelete) return

            const res = await fetch(`http://localhost:3001/api/deletejob/${id}`, {
                method: "DELETE",
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
                return
            }

            else {

                setdata((prev) => prev.filter((item) => item._id !== id))

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
            <div className="mx-2 md:mx-8 my-4">

                <div className="overflow-x-auto">

                    <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">

                        <p className="font-bold text-2xl md:text-3xl">
                            Jobs
                        </p>

                        <button
                            onClick={() => navigate('/postjob')}
                            className="bg-green-600 rounded-lg py-2 px-3 cursor-pointer font-semibold text-sm md:text-xl text-white w-full md:w-auto"
                        >
                            + Post Job
                        </button>

                    </div>

                    <div className="my-6">

                        <table className="min-w-full border border-gray-300">

                            <thead className="bg-gray-300">

                                <tr>

                                    <th className="p-3 border border-white text-sm md:text-xl text-left">
                                        Job Id
                                    </th>

                                    <th className="p-3 border border-white text-sm md:text-xl text-left">
                                        Role
                                    </th>

                                    <th className="p-3 border border-white text-sm md:text-xl text-left">
                                        Company
                                    </th>

                                    <th className="p-3 border border-white text-sm md:text-xl text-left">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    data.length > 0 ?

                                        (
                                            data.map((item) =>

                                                <tr
                                                    key={item._id}
                                                    className="hover:bg-gray-100/50"
                                                >

                                                    <td className="p-3 border text-sm md:text-lg">
                                                        {item._id.slice(-4)}
                                                    </td>

                                                    <td className="p-3 border text-sm md:text-lg">
                                                        {item.role}
                                                    </td>

                                                    <td className="p-3 border text-sm md:text-lg">
                                                        {item.companyname}
                                                    </td>

                                                    <td className="p-3 border">

                                                        <div className="flex flex-col md:flex-row gap-2">

                                                            <button
                                                                className="bg-violet-500 hover:bg-violet-600 px-3 py-1 text-sm md:text-base rounded-lg text-white"
                                                                onClick={() => navigate(`/jobdetails/${item._id}`)}
                                                            >
                                                                View
                                                            </button>

                                                            <button
                                                                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 text-sm md:text-base rounded-lg text-white"
                                                                onClick={() => navigate(`/postjob/${item._id}`)}
                                                            >
                                                                Update
                                                            </button>

                                                            <button
                                                                className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm md:text-base rounded-lg text-white"
                                                                onClick={() => handledelete(item._id)}
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                        :

                                        (
                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center p-4 text-lg md:text-xl"
                                                >
                                                    No Jobs Found
                                                </td>

                                            </tr>
                                        )

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Organizerjobs