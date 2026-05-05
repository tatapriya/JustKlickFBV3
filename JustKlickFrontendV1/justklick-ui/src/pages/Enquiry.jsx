import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
  Star,
} from "lucide-react";

import api from "../api/api";
import {
  getLoggedInUser,
  isUserLoggedIn,
} from "../utils/userStorage";

export default function Enquiry() {
  const navigate = useNavigate();
  const location = useLocation();

  const enquiryState = location.state || {};
  const loggedUser = getLoggedInUser();

  const listing = useMemo(() => {
    const id = enquiryState.id || enquiryState.itemId;
    const categorySlug = enquiryState.categorySlug || enquiryState.category;

    return {
      id,
      itemId: id,
      category: enquiryState.category || categorySlug || "",
      categorySlug: categorySlug || "",
      dataKey: enquiryState.dataKey || "",
      categoryTitle:
        enquiryState.categoryTitle || enquiryState.category || categorySlug || "",
      name:
        enquiryState.name ||
        enquiryState.itemName ||
        enquiryState.title ||
        "",
      title:
        enquiryState.title ||
        enquiryState.itemName ||
        enquiryState.name ||
        "",
      itemName:
        enquiryState.itemName ||
        enquiryState.name ||
        enquiryState.title ||
        "",
      location: enquiryState.location || "",
      city: enquiryState.city || "",
      state: enquiryState.state || "",
      image: enquiryState.image || "",
      rating: enquiryState.rating || "",
      reviews: enquiryState.reviews || "",
      link:
        enquiryState.link ||
        (categorySlug && id ? `/category/${categorySlug}/${id}` : ""),
    };
  }, [enquiryState]);

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/login", {
        replace: true,
        state: {
          from: location.pathname,
          message: "Please login or register to send enquiry.",
        },
      });
      return;
    }

    setFormData({
      studentName: loggedUser?.name || "",
      email: loggedUser?.email || "",
      phone: loggedUser?.phone || "",
      message: "",
    });
  }, [navigate, location.pathname]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserLoggedIn()) {
      navigate("/login", {
        replace: true,
        state: {
          from: location.pathname,
          message: "Please login or register to send enquiry.",
        },
      });
      return;
    }

    if (!formData.studentName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    if (!listing.id || !listing.categorySlug) {
      alert("Listing details are missing. Please open enquiry from listing page.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        listing: Number(listing.id),
        listing_name: listing.name || listing.itemName || listing.title,
        category: listing.categorySlug,
        name: formData.studentName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      };

      await api.post("/enquiries/", payload);

      alert("Enquiry submitted successfully");

      navigate("/profile", {
        replace: true,
        state: {
          activeTab: "enquiries",
          refreshProfile: Date.now(),
        },
      });
    } catch (error) {
      console.error("Enquiry submit error:", error);

      const data = error.response?.data;

      if (data?.listing?.[0]) {
        alert(`Listing error: ${data.listing[0]}`);
      } else if (data?.name?.[0]) {
        alert(data.name[0]);
      } else if (data?.phone?.[0]) {
        alert(data.phone[0]);
      } else if (data?.email?.[0]) {
        alert(data.email[0]);
      } else {
        alert("Failed to submit enquiry. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f6f9] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="font-medium hover:text-[#ef233c]">
            Home
          </Link>
          <span>/</span>
          {listing.categorySlug && (
            <>
              <Link
                to={`/category/${listing.categorySlug}`}
                className="font-medium hover:text-[#ef233c]"
              >
                {listing.categoryTitle || listing.category}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="font-medium text-gray-700">Enquiry</span>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm hover:text-[#ef233c]"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <section className="mb-5 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {listing.image ? (
              <img
                src={listing.image}
                alt={listing.name}
                className="h-24 w-full rounded-lg object-cover sm:w-32"
              />
            ) : (
              <div className="flex h-24 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400 sm:w-32">
                <Building2 size={28} />
              </div>
            )}

            <div className="flex-1">
              <p className="mb-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {listing.categoryTitle || listing.category || "Selected Listing"}
              </p>

              <h1 className="text-xl font-bold text-[#111827]">
                {listing.name || "Listing"}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin size={15} />
                  {listing.location || "N/A"}, {listing.city || "N/A"}
                </span>

                {listing.rating && (
                  <span className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                    <Star size={13} fill="currentColor" />
                    {listing.rating}
                  </span>
                )}
              </div>
            </div>

            {listing.link && (
              <Link
                to={listing.link}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                View Listing
              </Link>
            )}
          </div>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold text-[#111827]">
              Send Enquiry
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Fill your contact details below. Your enquiry will be saved in
              PostgreSQL and visible in your profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <InputBox
                icon={<User size={16} />}
                label="Student Name"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

              <InputBox
                icon={<Mail size={16} />}
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <InputBox
                icon={<Phone size={16} />}
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />

              <InputBox
                icon={<Building2 size={16} />}
                label="Selected Listing"
                name="listing"
                value={listing.name || ""}
                readOnly
                placeholder="Selected listing"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Message
              </label>

              <div className="relative">
                <MessageCircle
                  size={16}
                  className="absolute left-4 top-4 text-[#0b2a5b]"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your enquiry message..."
                  className="w-full resize-none rounded-lg border border-gray-200 bg-white px-11 py-3 text-sm text-gray-700 outline-none transition focus:border-[#ef233c] focus:ring-2 focus:ring-red-50"
                />
              </div>
            </div>

            <div className="flex flex-col justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ef233c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d90429] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={16} />
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function InputBox({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0b2a5b]">
          {icon}
        </span>

        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`h-11 w-full rounded-lg border border-gray-200 px-11 text-sm text-gray-700 outline-none transition focus:border-[#ef233c] focus:ring-2 focus:ring-red-50 ${
            readOnly ? "bg-gray-50 text-gray-500" : "bg-white"
          }`}
        />
      </div>
    </div>
  );
}