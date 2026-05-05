import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle,
  GraduationCap,
  HeartHandshake,
  Home,
  MapPin,
  MessageCircle,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";

export default function About() {
  const stats = [
    {
      value: "6+",
      label: "Student Categories",
      color: "from-red-500 to-rose-600",
    },
    {
      value: "50+",
      label: "Sample Listings",
      color: "from-blue-500 to-indigo-600",
    },
    {
      value: "10+",
      label: "Popular Locations",
      color: "from-emerald-500 to-teal-600",
    },
    {
      value: "24/7",
      label: "Easy Access",
      color: "from-orange-500 to-amber-500",
    },
  ];

  const services = [
    {
      title: "Colleges",
      icon: GraduationCap,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=900",
      description:
        "Explore colleges based on courses, location, ratings, fees and student preferences.",
    },
    {
      title: "Hostels & PGs",
      icon: Home,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900",
      description:
        "Find student-friendly hostel and PG options near educational hubs and city areas.",
    },
    {
      title: "Software Training",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
      description:
        "Discover training institutes for Java, Python, React, Full Stack and other career skills.",
    },
    {
      title: "Overseas Education",
      icon: Plane,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900",
      description:
        "Connect with overseas education consultants for study abroad guidance and support.",
    },
  ];

  const whyChooseUs = [
    {
      title: "Category Discovery",
      text: "Explore services category-wise without confusion.",
      icon: Building2,
    },
    {
      title: "Manual Location Search",
      text: "Search using any city, area or locality.",
      icon: MapPin,
    },
    {
      title: "Simple Enquiry",
      text: "Send enquiries quickly through a clean form.",
      icon: MessageCircle,
    },
    {
      title: "Student Friendly",
      text: "Designed for students and parents with easy navigation.",
      icon: Users,
    },
    {
      title: "Useful Details",
      text: "Check rating, fees, category, location and description.",
      icon: Star,
    },
    {
      title: "Easy Access",
      text: "Browse services anytime from desktop or mobile.",
      icon: Zap,
    },
  ];

  const process = [
    {
      title: "Search",
      icon: Search,
      description:
        "Search by category, course, city, area or service name based on your requirement.",
    },
    {
      title: "Explore",
      icon: Star,
      description:
        "View listing details, ratings, fees, location, category and description in one place.",
    },
    {
      title: "Enquire",
      icon: MessageCircle,
      description:
        "Send an enquiry and take the next step toward your education or career decision.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO MODULE */}
      <section className="relative overflow-hidden bg-[#071f4d]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400"
            alt="Students learning together"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071f4d] via-[#071f4d]/95 to-[#071f4d]/80" />
        </div>

        <div className="absolute left-10 top-16 h-32 w-32 animate-pulse rounded-full bg-[#ef233c]/20 blur-3xl" />
        <div className="absolute bottom-12 right-16 h-40 w-40 animate-pulse rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-[fadeUp_.8s_ease_both]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                <Sparkles size={16} className="text-[#ef233c]" />
                Student discovery made simple
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
                About <span className="text-[#ef233c]">JustKlick</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
                JustKlick is a student-focused platform that helps users find
                colleges, hostels, software training institutes, overseas
                education consultants, competitive exam coaching and career
                guidance services from one place.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/category/colleges"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition hover:-translate-y-1 hover:bg-[#d90429]"
                >
                  Explore Categories
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/enquiry"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#071f4d]"
                >
                  Send Enquiry
                </Link>
              </div>
            </div>

            <div className="relative animate-[fadeLeft_.9s_ease_both]">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#ef233c]/25 blur-2xl" />
              <div className="absolute -bottom-4 -right-4 h-28 w-28 rounded-full bg-blue-400/25 blur-2xl" />

              <div className="relative rounded-[34px] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1000"
                  alt="Students on campus"
                  className="h-[360px] w-full rounded-[26px] object-cover"
                />

                <div className="absolute -bottom-7 left-6 right-6 rounded-3xl bg-white p-5 shadow-xl">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#071f4d]">
                        6+
                      </h3>
                      <p className="mt-1 text-[11px] font-semibold text-gray-500">
                        Categories
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-extrabold text-[#071f4d]">
                        50+
                      </h3>
                      <p className="mt-1 text-[11px] font-semibold text-gray-500">
                        Listings
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-extrabold text-[#071f4d]">
                        10+
                      </h3>
                      <p className="mt-1 text-[11px] font-semibold text-gray-500">
                        Locations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATS MODULE */}
          <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/15"
                style={{
                  animation: `fadeUp .7s ease ${index * 120}ms both`,
                }}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.color}`}
                />
                <h3 className="text-3xl font-extrabold text-white">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm font-semibold text-blue-100">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE MODULE */}
      <section className="bg-[#f7f8fc] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative">
              <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full bg-[#ef233c]/10 blur-2xl" />
              <div className="overflow-hidden rounded-[34px] bg-white p-3 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1000"
                  alt="Students discussion"
                  className="h-[430px] w-full rounded-[26px] object-cover transition duration-500 hover:scale-[1.03]"
                />
              </div>

              <div className="absolute -bottom-6 -right-2 rounded-3xl bg-[#ef233c] p-5 text-white shadow-xl md:-right-6">
                <Users size={32} />
                <h3 className="mt-2 text-lg font-extrabold">Student First</h3>
                <p className="mt-1 max-w-[180px] text-xs leading-5 text-red-50">
                  Built to simplify student decisions.
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-[#ef233c]">
                Who We Are
              </p>

              <h2 className="text-3xl font-extrabold leading-tight text-[#071f4d] md:text-5xl">
                A smarter way to discover student services
              </h2>

              <p className="mt-6 text-sm leading-8 text-gray-600 md:text-base">
                Students and parents usually search across many platforms to
                find the right college, hostel, training institute or education
                consultant. JustKlick brings these options together in a simple,
                organized and student-friendly interface.
              </p>

              <p className="mt-4 text-sm leading-8 text-gray-600 md:text-base">
                Our platform is designed to make discovery easier through
                categories, search, location filters, listing details and enquiry
                options. It helps students save time and make better decisions.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#ef233c]">
                    <Target size={30} />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-[#071f4d]">
                    Our Mission
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    To make student service discovery simple, fast and
                    accessible for everyone.
                  </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#071f4d]">
                    <HeartHandshake size={30} />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-[#071f4d]">
                    Our Vision
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    To become a reliable student discovery platform for
                    education and career needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES MODULE */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-[#ef233c]">
              What We Offer
            </p>

            <h2 className="text-3xl font-extrabold text-[#071f4d] md:text-5xl">
              Everything students need in one platform
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-500 md:text-base">
              From colleges to career guidance, JustKlick helps students explore
              important services with useful information and easy navigation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#ef233c]/30 hover:shadow-xl"
                  style={{
                    animation: `fadeUp .7s ease ${index * 100}ms both`,
                  }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071f4d]/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#ef233c] shadow-lg">
                      <Icon size={28} />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-[#071f4d]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US MODULE */}
      <section className="bg-[#071f4d] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-[#ef233c]">
                Why Choose Us
              </p>

              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
                Built for easy student decision-making
              </h2>

              <p className="mt-5 text-sm leading-8 text-blue-100 md:text-base">
                JustKlick focuses on clean design, useful filters and simple
                actions so that students can quickly find what they are looking
                for without confusion.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {whyChooseUs.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="group rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
                      style={{
                        animation: `fadeUp .7s ease ${index * 80}ms both`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ef233c] text-white transition group-hover:bg-[#071f4d]">
                          <Icon size={18} />
                        </div>

                        <div>
                          <h3 className="text-sm font-extrabold text-white transition group-hover:text-[#071f4d]">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs leading-5 text-blue-100 transition group-hover:text-gray-500">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[28px] bg-white p-7 shadow-xl transition hover:-translate-y-2">
                <ShieldCheck className="text-[#ef233c]" size={38} />
                <h3 className="mt-5 text-xl font-extrabold text-[#071f4d]">
                  Organized Data
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  Listings are arranged category-wise to make browsing easier
                  for students.
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-7 shadow-xl transition hover:-translate-y-2 sm:mt-10">
                <MapPin className="text-[#ef233c]" size={38} />
                <h3 className="mt-5 text-xl font-extrabold text-[#071f4d]">
                  Location Search
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  Users can manually search by city, area or locality based on
                  their requirement.
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-7 shadow-xl transition hover:-translate-y-2 sm:-mt-10">
                <MessageCircle className="text-[#ef233c]" size={38} />
                <h3 className="mt-5 text-xl font-extrabold text-[#071f4d]">
                  Quick Enquiry
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  Students can quickly send enquiry details through a simple
                  form.
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-7 shadow-xl transition hover:-translate-y-2">
                <Building2 className="text-[#ef233c]" size={38} />
                <h3 className="mt-5 text-xl font-extrabold text-[#071f4d]">
                  Multi-Service
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  Colleges, hostels, training institutes and education services
                  can be explored from one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS MODULE */}
      <section className="bg-[#f7f8fc] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.2em] text-[#ef233c]">
              How It Works
            </p>

            <h2 className="text-3xl font-extrabold text-[#071f4d] md:text-5xl">
              Find the right service in 3 simple steps
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {process.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                  style={{
                    animation: `fadeUp .7s ease ${index * 120}ms both`,
                  }}
                >
                  <span className="absolute right-5 top-3 text-7xl font-extrabold text-gray-100">
                    0{index + 1}
                  </span>

                  <div className="relative z-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ef233c] text-white shadow-lg">
                      <Icon size={30} />
                    </div>

                    <h3 className="mt-6 text-2xl font-extrabold text-[#071f4d]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-500">
                      {item.description}
                    </p>

                    <div className="mt-6 h-1.5 w-20 rounded-full bg-[#ef233c]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA MODULE */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[36px] bg-[#071f4d] p-8 text-center shadow-2xl md:p-14">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#ef233c]/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
                Start exploring student services with JustKlick
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100 md:text-base">
                Search by category, city, area or service type and find the
                right option for your education journey.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/category/colleges"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-8 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#d90429]"
                >
                  Explore Now
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#071f4d]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(35px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeLeft {
            from {
              opacity: 0;
              transform: translateX(35px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </main>
  );
}