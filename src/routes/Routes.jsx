import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import Write from "../pages/Write";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/write" element={<Write/>}/>
        </Route>
    )
);

export default router;