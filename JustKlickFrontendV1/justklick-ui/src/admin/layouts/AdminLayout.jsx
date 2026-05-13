import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
    return (
        <div className="flex min-h-screen">

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 bg-gray-100 p-6">

                <Outlet />

            </div>

        </div>
    );
}

export default AdminLayout;