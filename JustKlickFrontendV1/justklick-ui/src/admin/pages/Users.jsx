import { useEffect, useState } from "react";
import api from "../../api/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("users/");

      console.log("Users API response:", res.data);

      setUsers(res.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      await api.delete(`users/${id}/`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // SEARCH FILTER
  const filteredUsers = users.filter((u) => {
    const name = (u.first_name || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    const term = search.toLowerCase();

    return name.includes(term) || email.includes(term);
  });

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="border p-2 mb-4 w-1/3 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LOADING */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t">

                  <td className="p-3">{user.id}</td>

                  <td className="p-3">{user.first_name}</td>

                  <td className="p-3">{user.email}</td>

                  <td className="p-3">{user.phone || "-"}</td>

                  <td className="p-3">{user.role || "student"}</td>

                  <td className="p-3">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Users;