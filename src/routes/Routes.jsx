import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}/>
        </Route>
    )
);

export default router;