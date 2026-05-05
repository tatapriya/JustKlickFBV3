import { Link } from "react-router-dom";

const recommended = [
  {
    title: "Top Colleges",
    desc: "Explore popular colleges in AP and Telangana.",
    link: "/category/colleges",
    image:
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Best Hostels",
    desc: "Find safe and comfortable student hostels.",
    link: "/category/hostels",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Software Training",
    desc: "Learn full stack, Python, Java and more.",
    link: "/category/software-training",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80",
  },
];

export default function RecommendedSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-[#0b1f4d]">
          Recommendations
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {recommended.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="group overflow-hidden rounded-3xl bg-[#f5f7fb] shadow transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-[#0b1f4d]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}