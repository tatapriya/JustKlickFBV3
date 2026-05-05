import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  [
    {
      title: "Recommended Institutions",
      tag: "Student Needs",
      description:
        "Find hostels, overseas education consultants and useful student services.",
      bg: "bg-[#fff0f3]",
      items: [
        {
          title: "Boys Hostels",
          image:
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=500&q=80",
          link: "/category/hostels?type=boys",
        },
        {
          title: "Girls Hostels",
          image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
          link: "/category/hostels?type=girls",
        },
        {
          title: "Study Abroad",
          image:
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&q=80",
          link: "/category/overseas-education",
        },
        {
          title: "Visa Guidance",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
          link: "/category/visa-guidance",
        },
      ],
    },
    {
      title: "Popular Student Choices",
      tag: "Student Needs",
      description: "Popular choices students are checking this week.",
      bg: "bg-[#edf5ff]",
      items: [
        {
          title: "Hyderabad Hostels",
          image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80",
          link: "/category/hostels?city=Hyderabad",
        },
        {
          title: "Vijayawada Hostels",
          image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80",
          link: "/category/hostels?city=Vijayawada",
        },
        {
          title: "USA Admissions",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
          link: "/category/overseas-education?country=USA",
        },
        {
          title: "IELTS Coaching",
          image:
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80",
          link: "/category/software-training?course=IELTS",
        },
      ],
    },
  ],
  [
    {
      title: "Top Learning Options",
      tag: "Career Growth",
      description: "Explore training institutes and job-ready skill programs.",
      bg: "bg-[#eefcf3]",
      items: [
        {
          title: "Python Training",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80",
          link: "/category/software-training?course=Python",
        },
        {
          title: "Java Full Stack",
          image:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80",
          link: "/category/software-training?course=Java",
        },
        {
          title: "Web Development",
          image:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
          link: "/category/software-training?course=Web Development",
        },
        {
          title: "Data Analytics",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
          link: "/category/software-training?course=Data Analytics",
        },
      ],
    },
    {
      title: "Explore Nearby Colleges",
      tag: "Admissions",
      description: "Find colleges from Andhra Pradesh and Telangana.",
      bg: "bg-[#fff7e8]",
      items: [
        {
          title: "Hyderabad Colleges",
          image:
            "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=500&q=80",
          link: "/category/colleges?city=Hyderabad",
        },
        {
          title: "Vijayawada Colleges",
          image:
            "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=500&q=80",
          link: "/category/colleges?city=Vijayawada",
        },
        {
          title: "Vizag Colleges",
          image:
            "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=500&q=80",
          link: "/category/colleges?city=Visakhapatnam",
        },
        {
          title: "Guntur Colleges",
          image:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80",
          link: "/category/colleges?city=Guntur",
        },
      ],
    },
  ],
];

function RecommendedCard({ card, onNext, isAnimating }) {
  const navigate = useNavigate();

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] ${card.bg} p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-8 ${
        isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <button
        onClick={onNext}
        className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/60 text-[#071b46] backdrop-blur hover:scale-110 hover:bg-white"
      >
        <ArrowRight size={22} />
      </button>

      <div className="relative z-10">
        <h3 className="pr-14 text-2xl font-extrabold text-[#071b46]">
          {card.title}
        </h3>

        <p className="mt-3 text-sm font-bold text-blue-600">{card.tag}</p>

        <p className="mt-4 text-sm text-slate-600">{card.description}</p>

        <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {card.items.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.link)}
              className="group text-center"
            >
              <div className="h-[105px] overflow-hidden rounded-2xl bg-white shadow-sm sm:h-[115px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition"
                />
              </div>

              <p className="mt-2 text-sm font-bold text-[#061334] group-hover:text-blue-600">
                {item.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RecommendedSection() {
  const [leftSlide, setLeftSlide] = useState(0);
  const [rightSlide, setRightSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [leftAnimating, setLeftAnimating] = useState(false);
  const [rightAnimating, setRightAnimating] = useState(false);

  const changeSlidesWithDelay = () => {
    setLeftAnimating(true);
    setTimeout(() => {
      setLeftSlide((prev) => (prev + 1) % slides.length);
      setLeftAnimating(false);
    }, 250);

    setTimeout(() => {
      setRightAnimating(true);
      setTimeout(() => {
        setRightSlide((prev) => (prev + 1) % slides.length);
        setRightAnimating(false);
      }, 250);
    }, 1200);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(changeSlidesWithDelay, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="bg-white py-12 md:py-16">
      <div
        className="mx-auto w-[92%] max-w-[1400px] lg:w-[88%]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ✅ ONLY ONE MAIN HEADING */}
        <h2 className="mb-8 text-2xl md:text-3xl font-extrabold text-[#06275c]">
          Recommendations
        </h2>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <RecommendedCard
            card={slides[leftSlide][0]}
            onNext={changeSlidesWithDelay}
            isAnimating={leftAnimating}
          />
          <RecommendedCard
            card={slides[rightSlide][1]}
            onNext={changeSlidesWithDelay}
            isAnimating={rightAnimating}
          />
        </div>
      </div>
    </section>
  );
}