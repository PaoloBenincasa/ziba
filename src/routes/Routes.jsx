import { createBrowserRouter, createRoutesFromElements, Route, Outlet, Navigate } from "react-router";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import Write from "../pages/Write";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import PublicProfile from "../pages/PublicProfile";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";

function ProtectedRoutes(params) {
    const session = useContext(SessionContext);

    if (!session) {
        return <Navigate to={'/signin'} />
    }

    return <Outlet />
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/profile/:id" element={<PublicProfile />} />


            <Route element={<ProtectedRoutes/>}>            
                <Route path="/write" element={<Write/>}/>
                <Route path="/profile" element={<Profile/>}/>
                
            </Route>
        </Route>
    )
);

export default router;