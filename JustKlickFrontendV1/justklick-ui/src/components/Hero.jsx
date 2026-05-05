import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  MapPin,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const slides = [
  {
    tag: "COLLEGES",
    title: "Find the Best Colleges",
    desc: "Explore engineering, degree, MBA and professional colleges in one trusted platform.",
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200",
    link: "/category/colleges",
  },
  {
    tag: "SOFTWARE TRAINING",
    title: "Build Your IT Career",
    desc: "Discover software training institutes for React, Python, Java, AI, Data Science and more.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    link: "/category/software-training",
  },
  {
    tag: "OVERSEAS EDUCATION",
    title: "Study Abroad Guidance",
    desc: "Connect with overseas consultants for admissions, visa support and test preparation.",
    img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200",
    link: "/category/overseas-education",
  },
  {
    tag: "HOSTELS",
    title: "Find Safe Student Hostels",
    desc: "Search boys hostels, girls hostels and PG rooms near colleges and training institutes.",
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200",
    link: "/category/hostels",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="bg-[#f5f7fb] py-6">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-[#071b46] min-h-[440px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                current === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#071b46]/95 via-[#0b2a5b]/80 to-[#123c7c]/40" />

              <div className="relative z-10 grid min-h-[440px] grid-cols-1 items-center lg:grid-cols-[55%_45%]">
                {/* LEFT */}
                <div className="px-8 py-12 lg:px-20">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold text-blue-200 backdrop-blur">
                    <GraduationCap size={14} />
                    {slide.tag}
                  </div>

                  <h1 className="max-w-[560px] text-[34px] md:text-[42px] font-extrabold leading-tight text-white">
                    {slide.title}
                  </h1>

                  <p className="mt-4 max-w-[520px] text-[14px] leading-6 text-white/80">
                    {slide.desc}
                  </p>

                  <div className="mt-6 flex gap-4">
                    <Link
                      to={slide.link}
                      className="group flex items-center gap-2 rounded-full bg-red-500 px-6 py-2.5 text-[13px] font-semibold text-white transition hover:bg-red-600"
                    >
                      Explore Now
                      <ArrowRight
                        size={14}
                        className="transition group-hover:translate-x-1"
                      />
                    </Link>

                    <Link
                      to="/contact"
                      className="rounded-full border border-white/40 px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-white/10"
                    >
                      Contact
                    </Link>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="relative hidden items-center justify-center lg:flex">
                  <div className="relative h-[320px] w-[320px] animate-[float_4s_ease-in-out_infinite] rounded-full bg-white/10 p-4">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>

                  <div className="absolute left-6 top-20 animate-[float_3.5s_ease-in-out_infinite] rounded-xl bg-white px-4 py-2 shadow">
                    <p className="flex items-center gap-1 text-[11px] font-semibold text-[#0b1f4d]">
                      <Star
                        size={12}
                        className="text-yellow-500"
                        fill="currentColor"
                      />
                      Verified Institutes
                    </p>
                  </div>

                  <div className="absolute bottom-20 right-10 animate-[float_4.5s_ease-in-out_infinite] rounded-xl bg-white px-4 py-2 shadow">
                    <p className="flex items-center gap-1 text-[11px] font-semibold text-[#0b1f4d]">
                      <MapPin size={12} className="text-red-500" />
                      AP & TS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur hover:bg-white/30"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-7 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
        `}
      </style>
    </section>
  );
}