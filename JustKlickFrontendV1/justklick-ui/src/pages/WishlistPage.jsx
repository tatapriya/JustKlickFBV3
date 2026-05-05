import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, MapPin, Star, Heart, ArrowRight } from "lucide-react";
import {
  WISHLIST_BASE_KEY,
  isUserLoggedIn,
  readUserItems,
  writeUserItems,
  clearOldWishlistKeys,
} from "../utils/userStorage";

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    clearOldWishlistKeys();

    const items = readUserItems(WISHLIST_BASE_KEY);
    setWishlist(items);
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/login", {
        state: {
          from: "/wishlist",
          message: "Please login or register to view your wishlist.",
        },
      });

      return;
    }

    loadWishlist();

    const handleStorageUpdate = () => {
      loadWishlist();
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("user-storage-updated", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("user-storage-updated", handleStorageUpdate);
    };
  }, [navigate]);

  const removeItem = (item) => {
    const updated = wishlist.filter(
      (wish) =>
        !(
          String(wish.id) === String(item.id) &&
          String(wish.categorySlug || wish.category) ===
            String(item.categorySlug || item.category)
        )
    );

    writeUserItems(WISHLIST_BASE_KEY, updated);
    setWishlist(updated);

    clearOldWishlistKeys();
  };

  const clearWishlist = () => {
    writeUserItems(WISHLIST_BASE_KEY, []);
    setWishlist([]);

    clearOldWishlistKeys();
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl bg-white p-7 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-500">
                Saved Listings
              </p>

              <h1 className="mt-2 text-3xl font-extrabold text-[#0b1f4d]">
                My Wishlist
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Your saved colleges, hostels, institutes and services will
                appear here.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {wishlist.length > 0 && (
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"
                >
                  Clear All
                </button>
              )}

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <Heart size={28} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Heart size={36} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#0b1f4d]">
              No wishlist items yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              Explore categories and save your favourite listings to view them
              later.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Now
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => {
              const itemLink =
                item.link ||
                `/category/${item.categorySlug || item.category}/${item.id}`;

              return (
                <div
                  key={`${item.categorySlug || item.category}-${item.id}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name || item.title}
                      onClick={() => navigate(itemLink)}
                      className="h-full w-full cursor-pointer object-cover transition duration-700 group-hover:scale-110"
                    />

                    <button
                      type="button"
                      onClick={() => removeItem(item)}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:scale-110 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={18} />
                    </button>

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold text-[#071b46]">
                      {item.categoryTitle || item.category || "Saved"}
                    </span>
                  </div>

                  <div className="p-5">
                    <Link to={itemLink}>
                      <h3 className="line-clamp-2 text-xl font-bold text-[#0b1f4d] transition hover:text-blue-600">
                        {item.name || item.title}
                      </h3>
                    </Link>

                    <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} />
                      {item.location || item.area || "N/A"},{" "}
                      {item.city || "N/A"}
                    </p>

                    <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700">
                      <Star size={15} fill="currentColor" />
                      {item.rating || "N/A"}
                    </p>

                    {item.addedAt && (
                      <p className="mt-3 text-xs text-gray-400">
                        Saved on{" "}
                        {new Date(item.addedAt).toLocaleDateString("en-IN")}
                      </p>
                    )}

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={() => navigate(itemLink)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0b1f4d] py-2 text-sm font-semibold text-white transition hover:bg-[#132d68]"
                      >
                        View
                        <ArrowRight size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => removeItem(item)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}