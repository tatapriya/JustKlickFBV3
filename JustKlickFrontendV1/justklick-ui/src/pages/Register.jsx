import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Please fill all required fields");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/register/", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("authUser", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedIn", "true");

      // Remove old frontend-only login data
      localStorage.removeItem("profile");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("user");

      window.dispatchEvent(new CustomEvent("user-storage-updated"));

      alert("Registration successful");
      navigate("/profile", { replace: true });
    } catch (err) {
      console.error("Register error:", err);

      const data = err.response?.data;

      if (data?.email?.[0]) {
        setError(data.email[0]);
      } else if (data?.phone?.[0]) {
        setError(data.phone[0]);
      } else if (data?.password?.[0]) {
        setError(data.password[0]);
      } else if (data?.name?.[0]) {
        setError(data.name[0]);
      } else if (data?.detail) {
        setError(data.detail);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 py-10">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow"
      >
        <h1 className="text-3xl font-extrabold text-[#0b1f4d]">Register</h1>

        <p className="mt-2 text-gray-600">Create your student account.</p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <input
          required
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-6 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#ef233c]"
        />

        <input
          type="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-4 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#ef233c]"
        />

        <input
          required
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="mt-4 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#ef233c]"
        />

        <input
          required
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="mt-4 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#ef233c]"
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
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}