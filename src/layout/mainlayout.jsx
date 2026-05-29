import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa"
function Mainlayout() {

    return (
        <>
            <Navbar />
            <div className="mt-20">
                <Outlet />
            </div>
            <footer className="border border-gray-150 py-6">
                <div className="flex px-12 items-center justify-evenly">
                    <div className="flex flex-col justify-start ">
                        <p className="text-left font-bold text-base">
                            Job Hunt
                        </p>
                        <p className="text-left">©  2026 Your Company. All rights reserved.</p>
                    </div>

                    <div className="flex gap-4 text-2xl justify-end">
                        <a href="https://facebook.com" target="_blank">
                            <FaFacebook size={30} className="cursor-pointer" />
                        </a>
                        <a href="https://linkedin.com" target="_blank">
                            <FaLinkedin size={30} className="cursor-pointer" />
                        </a>
                        <a href="https://twitter.com" target="_blank">
                            <FaTwitter size={30} className="cursor-pointer" />
                        </a>
                    </div>
                </div>


            </footer>
        </>
    )
}
export default Mainlayout