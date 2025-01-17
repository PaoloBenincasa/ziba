import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";

export default function Layout() {
    return (
        <div>
            <Navbar />
            <Outlet />

        </div>
    )
}