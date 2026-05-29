import { useEffect, useState } from "react";

function Companyprofile() {

    const [data, setdata] = useState([])
    useEffect(() => {
        async function fethcdata() {
            const res = await fetch('https://crm-based-job-portal-management-system.onrender.com/api/companydata', {
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.msg)
            } else {
                console.log(data);

                setdata(data)
            }
        }
        fethcdata()
    }, [])

    return (
        <div className="my-6 mx-6">

            <h1 className="font-bold text-3xl mb-6">Company Profile</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">

                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border text-left">Id</th>
                            <th className="p-3 border text-left">Recuiter Name</th>
                            <th className="p-3 border text-left">Company Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((company) => (
                            <tr key={company._id} >
                                <td className="p-3 border">{company._id.slice(-6)}</td>
                                <td className="p-3 border">{company.userid.fullname}</td>
                                <td className="p-3 border">{company.companyname}</td>  
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default Companyprofile;