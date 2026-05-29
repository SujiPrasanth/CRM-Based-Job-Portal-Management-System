import { Outlet } from "react-router-dom"
import Adminbar from "../admin/adminbar"

function Adminlayout(){

    return(
        <>
        <div className="min-h-screen md:flex">
            <Adminbar />
            <div className="flex-1 ">
                <Outlet />
            </div>
        </div>
        </>
    )
}

export default Adminlayout
