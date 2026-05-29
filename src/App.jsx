import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "./layout/mainlayout";
import Home from "./pages/home";
import Authlayout from "./layout/authlayout";
import Signup from "./auth/authjoborganizer/signup";
import Jobs from "./pages/jobs";
import Signin from "./auth/authjoborganizer/signin";
import Log from "./auth/authjobseeker/log";
import Login from "./auth/authjobseeker/login";
import Organizerlayout from "./layout/organizerlayout";
import Overview from "./joborganizer/overview";
import Organizerjobs from "./joborganizer/OrganizerJobs";
import Applications from "./joborganizer/organizerapplications";
import Companyprofile from "./joborganizer/comapnyprofile";
import Adminsignin from "./auth/authadmin/adminsignin";
import Postjob from "./joborganizer/postjob";
import Applied from "./pages/applied";
import Saved from "./pages/saved";
import Applicants from "./joborganizer/applicants";
import Profile from "./pages/profile";
import Profileedit from "./pages/profiledit";
import Details from "./pages/details";
import Viewuserprofile from "./joborganizer/viewuserprofile";
import Adminlayout from "./layout/adminlayout";
import Adminbar from "./admin/adminbar";
import Adminoverview from "./admin/adminoverview";
import Jobseekers from "./admin/jobseekers";
import Joborganizers from "./admin/joborganizers";
import Job from "./admin/jobs";
import Jobdetails from "./joborganizer/jobdetails";




const router = createBrowserRouter(
    [
        {
            element: <Mainlayout />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: '/jobs',
                    element: <Jobs />
                },
                {
                    path: '/applied',
                    element: <Applied />
                },
                {
                    path: 'savedjobs',
                    element: <Saved />
                },
                {
                    path: 'profile',
                    element: <Profile />
                },
                {
                    path: 'profileedit',
                    element: <Profileedit />
                },
                {
                    path: 'details/:id',
                    element: <Details />
                }
            ]
        },
        {
            element: <Authlayout />,
            children: [
                {
                    path: '/organizersignup',
                    element: <Signup />
                },
                {
                    path: '/organizersignin',
                    element: <Signin />
                },
                {
                    path: "/seekerlog",
                    element: <Log />
                },
                {
                    path: '/seekerlogin',
                    element: <Login />
                },
                {
                    path: "/adminsignin",
                    element: <Adminsignin />
                }
            ]
        },
        {
            element: <Organizerlayout />,
            children: [
                {
                    path: "/organizeroverview",
                    element: <Overview />
                },
                {
                    path: "/organizerapplicants",
                    element: <Applicants />
                },
                {
                    path: '/organizerjobs',
                    element: <Organizerjobs />
                },
                {
                    path: '/organizerapplications',
                    element: <Applications />
                },
                {
                    path: '/organizercomapnyprofile',
                    element: <Companyprofile />
                },
                ,
                {
                    path: '/postjob',
                    element: <Postjob />
                },
                {
                    path: '/postjob/:id',
                    element: <Postjob />
                },
                {
                    path: "/viewuserprofile/:id",
                    element: <Viewuserprofile />
                },
                {
                    path:'/jobdetails/:id',
                    element:<Jobdetails />
                }

            ]
        },
        {
            element: <Adminlayout />,
            children: [
                {
                    path: "/adminoverview",
                    element: <Adminoverview />
                },
                {
                    path: "/jobseeker",
                    element: <Jobseekers />
                },
                {
                    path: "/joborganizer",
                    element: <Joborganizers />
                },
                {
                    path: "/adminjobs",
                    element: <Job />
                }
            ]
        }
    ]
)

function App() {
    return (
        <>
            <RouterProvider router={router} ></RouterProvider>
        </>
    )
}

export default App