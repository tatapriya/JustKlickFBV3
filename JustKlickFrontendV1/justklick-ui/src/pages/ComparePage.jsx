import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GitCompare,
  MapPin,
  Star,
  Trash2,
  Eye,
  Package,
  Phone,
  Mail,
  Globe,
  Plus,
  Building2,
  CheckCircle,
} from "lucide-react";

import api from "../api/api";
import { isUserLoggedIn } from "../utils/userStorage";

export default function ComparePage() {
  const navigate = useNavigate();

  const [compareItems, setCompareItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapWishlistToCompare = (item) => {
    return {
      id: item.listing_id,
      wishlistId: item.id,

      name: item.listing_name || "Listing",
      title: item.listing_name || "Listing",

      categorySlug: item.category_slug,
      categoryTitle: item.category_title,

      city: item.city || "",
      location: item.area || "",
      state: item.state || "",

      image:
        item.image ||
        "https://images.unsplash.com/photo-1562774053-701939374585?w=700",

      rating: item.rating || "",
      reviews: item.reviews || 0,
      description: item.description || "",

      phone: item.phone || "N/A",
      email: item.email || "N/A",
      website: item.website || "N/A",

      link:
        item.category_slug && item.listing_id
          ? `/category/${item.category_slug}/${item.listing_id}`
          : "",
    };
  };

  const loadCompareData = async () => {
    if (!isUserLoggedIn()) {
      navigate("/login", {
        replace: true,
        state: {
          from: "/compare",
          message: "Please login to compare saved listings.",
        },
      });
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/wishlist/");
      const mappedData = response.data.map(mapWishlistToCompare);

      setCompareItems(mappedData);
    } catch (error) {
      console.error("Compare wishlist fetch error:", error);
      setCompareItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompareData();

    const handleStorageUpdate = () => {
      loadCompareData();
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("user-storage-updated", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("user-storage-updated", handleStorageUpdate);
    };
  }, []);

  const removeFromCompare = async (item) => {
    if (!item?.id) {
      alert("Listing ID missing");
      return;
    }

    try {
      await api.delete(`/wishlist/${item.id}/`);

      await loadCompareData();

      window.dispatchEvent(new CustomEvent("user-storage-updated"));

      alert("Removed from compare");
    } catch (error) {
      console.error("Remove compare item error:", error);
      alert("Failed to remove item");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-gray-200 border-t-[#ef233c]" />
            <p className="mt-4 text-sm font-semibold text-gray-500">
              Loading compare data...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-[28px] bg-[#071f4d] shadow-sm">
          <div className="relative p-6 sm:p-8">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#ef233c]/20 blur-2xl" />
            <div className="absolute -bottom-16 left-1/3 h-44 w-44 rounded-full bg-blue-400/20 blur-2xl" />

            <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ef233c] text-white shadow-lg">
                  <GitCompare size={26} />
                </div>

                <div>
                  <h1 className="text-2xl font-extrabold text-white md:text-3xl">
                    Compare Saved Listings
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                    Review your saved colleges, hostels, training institutes and
                    education consultants in one clean comparison view.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white">
                      {compareItems.length} Saved Items
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white">
                      Backend Synced
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/category/colleges")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-[#071f4d] shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-100"
              >
                <Plus size={17} />
                Add More Listings
              </button>
            </div>
          </div>
        </section>

        {compareItems.length === 0 ? (
          <div className="rounded-[28px] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-gray-400">
              <Package size={44} />
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-gray-900">
              No items to compare
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Save any listing to your wishlist. It will automatically appear
              here for comparison.
            </p>

            <button
              onClick={() => navigate("/category/colleges")}
              className="mt-7 rounded-2xl bg-[#ef233c] px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#d90429]"
            >
              Explore Listings
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {compareItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[26px] border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-52 w-full object-cover"
                    />

                    <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-[#071f4d] shadow-sm">
                      {item.categoryTitle || "Listing"}
                    </div>

                    <button
                      onClick={() => removeFromCompare(item)}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-red-600 shadow-sm transition hover:bg-red-600 hover:text-white"
                      title="Remove"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-extrabold leading-snug text-[#071f4d]">
                        {item.name}
                      </h2>

                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-extrabold text-yellow-700">
                        <Star size={14} fill="currentColor" />
                        {item.rating || "N/A"}
                      </span>
                    </div>

                    <p className="mt-3 flex items-center gap-2 text-sm font-medium text-gray-500">
                      <MapPin size={16} className="shrink-0 text-[#ef233c]" />
                      {item.location || "N/A"}, {item.city || "N/A"}
                    </p>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                      {item.description || "No description available."}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <MiniInfo
                        label="Reviews"
                        value={item.reviews || 0}
                      />
                      <MiniInfo
                        label="State"
                        value={item.state || "N/A"}
                      />
                    </div>

                    <div className="mt-5 space-y-3 rounded-2xl bg-gray-50 p-4">
                      <ContactLine icon={<Phone size={15} />} value={item.phone} />
                      <ContactLine icon={<Mail size={15} />} value={item.email} />
                      <ContactLine icon={<Globe size={15} />} value={item.website} />
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => navigate(item.link)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#071f4d] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#0b2a5b]"
                      >
                        <Eye size={16} />
                        View Details
                      </button>

                      <button
                        onClick={() => removeFromCompare(item)}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-200 text-red-600 transition hover:bg-red-50"
                        title="Remove"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <section className="mt-8 rounded-[28px] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#071f4d]">
                  <Building2 size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-[#071f4d]">
                    Quick Comparison
                  </h2>
                  <p className="text-sm text-gray-500">
                    Compare important fields side by side.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-separate border-spacing-0 overflow-hidden rounded-2xl text-sm">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 bg-[#071f4d] px-5 py-4 text-left font-extrabold text-white">
                        Feature
                      </th>

                      {compareItems.map((item) => (
                        <th
                          key={item.id}
                          className="bg-[#071f4d] px-5 py-4 text-left font-extrabold text-white"
                        >
                          {item.name}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    <CompareRow
                      label="Category"
                      values={compareItems.map(
                        (item) => item.categoryTitle || "N/A"
                      )}
                    />

                    <CompareRow
                      label="Location"
                      values={compareItems.map(
                        (item) =>
                          `${item.location || "N/A"}, ${item.city || "N/A"}`
                      )}
                    />

                    <CompareRow
                      label="Rating"
                      values={compareItems.map((item) => item.rating || "N/A")}
                    />

                    <CompareRow
                      label="Reviews"
                      values={compareItems.map((item) => item.reviews || 0)}
                    />

                    <CompareRow
                      label="Contact"
                      values={compareItems.map((item) => item.phone || "N/A")}
                    />

                    <CompareRow
                      label="Best For"
                      values={compareItems.map((item) => (
                        <span className="inline-flex items-center gap-2 font-bold text-green-700">
                          <CheckCircle size={15} />
                          {item.categoryTitle || "Students"}
                        </span>
                      ))}
                    />
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function MiniInfo({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-extrabold text-[#071f4d]">
        {value}
      </p>
    </div>
  );
}

function ContactLine({ icon, value }) {
  return (
    <p className="flex items-center gap-2 break-all text-xs font-semibold text-gray-600">
      <span className="text-[#ef233c]">{icon}</span>
      {value || "N/A"}
    </p>
  );
}

function CompareRow({ label, values }) {
  return (
    <tr>
      <td className="sticky left-0 z-10 border-b border-gray-100 bg-gray-50 px-5 py-4 font-extrabold text-[#071f4d]">
        {label}
      </td>

      {values.map((value, index) => (
        <td
          key={index}
          className="border-b border-gray-100 bg-white px-5 py-4 align-top text-gray-700"
        >
          {value}
        </td>
      ))}
    </tr>
  );
}