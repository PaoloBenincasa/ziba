import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import Write from "../pages/Write";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/write" element={<Write/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Route>
    )
);

export default router;