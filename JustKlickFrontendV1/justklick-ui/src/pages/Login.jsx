import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectPath = location.state?.from || "/profile";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/login/", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("authUser", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedIn", "true");

      // Remove old frontend-only login data
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("user");
      localStorage.removeItem("profile");

      window.dispatchEvent(new CustomEvent("user-storage-updated"));

      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.non_field_errors?.[0] ||
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow"
      >
        <h1 className="text-3xl font-extrabold text-[#0b1f4d]">Login</h1>

        <p className="mt-2 text-gray-600">
          Login to save, share and download details.
        </p>

        {location.state?.message && (
          <div className="mt-5 rounded-xl bg-yellow-50 px-4 py-3 text-sm font-semibold text-yellow-700">
            {location.state.message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <input
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-6 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#ef233c]"
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="mt-4 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#ef233c]"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}