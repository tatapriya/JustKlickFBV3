import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function ExploreCategories() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const loadCategories = async () => {
    try {
      const res = await api.get("/categories/");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const visibleCategories = showAll
    ? categories
    : categories.slice(0, 5);

  const hasMore = categories.length > 5;

  return (
    <section className="bg-[#f7f8fc] py-16">

      <div className="mx-auto max-w-[1250px] px-6 text-center">

        <h2 className="text-[30px] font-extrabold text-[#0b1f4d]">
          Explore by Category
        </h2>

        <p className="mt-3 text-[14px] text-gray-500">
          Choose from available categories
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">

          {/* CATEGORY CARDS */}
          {visibleCategories.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/category/${item.slug}`)}
              className="cursor-pointer text-center"
            >

              <div className="mx-auto h-[190px] w-[150px] overflow-hidden rounded-2xl shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-lg">

                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700"
                  }
                  alt={item.title}
                  className="h-full w-full object-cover"
                />

              </div>

              <h3 className="mt-4 text-[14px] font-bold text-[#0b1f4d]">
                {item.title}
              </h3>

            </div>
          ))}

          {/* MORE CARD */}
          {!showAll && hasMore && (
            <div
              onClick={() => setShowAll(true)}
              className="cursor-pointer text-center"
            >

              <div className="mx-auto flex h-[190px] w-[150px] items-center justify-center rounded-2xl bg-black text-white shadow-md transition hover:-translate-y-2 hover:shadow-lg">

                <span className="text-lg font-bold">
                  More
                </span>

              </div>

              <h3 className="mt-4 text-[14px] font-bold text-[#0b1f4d]">
                View All
              </h3>

            </div>
          )}

        </div>

        {/* SHOW LESS BUTTON (optional) */}
        {showAll && hasMore && (
          <button
            onClick={() => setShowAll(false)}
            className="mt-8 px-4 py-2 bg-gray-200 rounded"
          >
            Show Less
          </button>
        )}

      </div>

    </section>
  );
}