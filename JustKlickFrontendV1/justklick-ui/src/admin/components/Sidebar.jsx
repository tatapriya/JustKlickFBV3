import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-64 bg-black text-white p-5 min-h-screen">

            <h2 className="text-2xl font-bold mb-6">
                Admin Panel
            </h2>

            <nav className="flex flex-col gap-4 text-sm">

                {/* DASHBOARD */}
                <Link to="/admin" className="hover:text-gray-300">
                    Dashboard
                </Link>

                {/* MANAGEMENT */}
                <p className="text-gray-400 mt-4">Management</p>

                <Link to="/admin/listings" className="hover:text-gray-300">
                    Listings
                </Link>

                <Link to="/admin/categories" className="hover:text-gray-300">
                    Categories
                </Link>



                {/* USERS */}
                <p className="text-gray-400 mt-4">Users</p>

                <Link to="/admin/users" className="hover:text-gray-300">
                    Users
                </Link>


                {/* CONTENT */}
                <p className="text-gray-400 mt-4">Content</p>

                <Link to="/admin/enquiries" className="hover:text-gray-300">
                    Enquiries
                </Link>

                <Link to="/admin/reviews" className="hover:text-gray-300">
                    Reviews
                </Link>


                {/* SYSTEM */}
                <p className="text-gray-400 mt-4">System</p>

                <Link to="/admin/settings" className="hover:text-gray-300">
                    Settings
                </Link>

                <Link to="/admin/logs" className="hover:text-gray-300">
                    Logs
                </Link>

            </nav>

        </div>
    );
}

export default Sidebar;