import { useNavigate } from "react-router-dom";
import { categoryData } from "../data/categoryData";

const categories = [
  {
    title: "Colleges",
    dataKey: "colleges",
    slug: "colleges",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=700",
  },
  {
    title: "Software Training",
    dataKey: "training-institutes",
    slug: "software-training",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700",
  },
  {
    title: "Overseas Education",
    dataKey: "overseas-education",
    slug: "overseas",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700",
  },
  {
    title: "Hostels",
    dataKey: "hostels",
    slug: "hostels",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700",
  },
  {
    title: "Competitive Exams",
    dataKey: "exams",
    slug: "exams",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700",
  },
  {
    title: "More",
    dataKey: "career-guidance",
    slug: "more",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700",
  },
];

export default function ExploreCategories() {
  const navigate = useNavigate();

  return (
    <section id="explore-categories-section" className="bg-[#f7f8fc] py-16">
      <div className="mx-auto max-w-[1250px] px-6 text-center">
        <h2 className="text-[30px] font-extrabold text-[#0b1f4d]">
          Explore by Category
        </h2>

        <p className="mt-3 text-[14px] text-gray-500">
          Choose from institutions and services available in our sample data
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((item) => {
            const count = categoryData?.[item.dataKey]?.length || 0;

            return (
              <div
                key={item.slug}
                onClick={() => navigate(`/category/${item.slug}`)}
                className="cursor-pointer text-center"
              >
                <div className="mx-auto h-[190px] w-[150px] overflow-hidden rounded-2xl shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mt-4 text-[14px] font-bold text-[#0b1f4d]">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-[12px] text-gray-500">
                  {count > 0 ? `${count}+ Listings` : "No Listings"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}