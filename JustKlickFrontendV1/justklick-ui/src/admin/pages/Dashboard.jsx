import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from "recharts";

function Dashboard() {

    const barData = [
        { name: "Listings", value: 120 },
        { name: "Users", value: 80 },
        { name: "Enquiries", value: 50 },
        { name: "Reviews", value: 70 }
    ];

    const pieData = [
        { name: "Active", value: 300 },
        { name: "Inactive", value: 100 }
    ];

    const COLORS = ["#4f46e5", "#22c55e"];

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <h1 className="text-3xl font-bold">
                Admin Dashboard
            </h1>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-4 gap-4">

                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-gray-500">Total Listings</h3>
                    <p className="text-2xl font-bold">120</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-gray-500">Users</h3>
                    <p className="text-2xl font-bold">80</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-gray-500">Enquiries</h3>
                    <p className="text-2xl font-bold">50</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-gray-500">Reviews</h3>
                    <p className="text-2xl font-bold">70</p>
                </div>

            </div>

            {/* CHARTS SECTION */}
            <div className="grid grid-cols-2 gap-6">

                {/* BAR CHART */}
                <div className="bg-white p-4 rounded shadow">

                    <h2 className="font-semibold mb-4">
                        Platform Overview
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>

                        <BarChart data={barData}>

                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />

                            <Bar dataKey="value" fill="#3b82f6" />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                {/* PIE CHART */}
                <div className="bg-white p-4 rounded shadow">

                    <h2 className="font-semibold mb-4">
                        Status Distribution
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>

                        <PieChart>

                            <Pie
                                data={pieData}
                                dataKey="value"
                                outerRadius={100}
                                label
                            >

                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />
                                ))}

                            </Pie>

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;