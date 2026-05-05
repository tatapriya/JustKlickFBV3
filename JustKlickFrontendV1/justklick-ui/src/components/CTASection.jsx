import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  GraduationCap,
  Home,
  BookOpen,
  Globe2,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function CTASection() {
  const navigate = useNavigate();

  const [contactValue, setContactValue] = useState("");
  const [error, setError] = useState("");

  const categories = [
    {
      icon: <GraduationCap size={15} />,
      label: "Colleges",
      path: "/category/colleges",
    },
    {
      icon: <BookOpen size={15} />,
      label: "Training Institutes",
      path: "/category/software-training",
    },
    {
      icon: <Globe2 size={15} />,
      label: "Overseas Education",
      path: "/category/overseas",
    },
    {
      icon: <Home size={15} />,
      label: "Hostels",
      path: "/category/hostels",
    },
  ];

  const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(value);
  const isValidPhone = (value) => /^[6-9]\d{9}$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = contactValue.trim();

    if (!value) {
      setError("Please enter your email or phone number");
      return;
    }

    if (!isValidEmail(value) && !isValidPhone(value)) {
      setError("Enter a valid email or 10-digit mobile number");
      return;
    }

    setError("");

    navigate("/enquiry", {
      state: {
        contact: value,
        message:
          "I want help finding colleges, hostels, training institutes, or overseas education options.",
      },
    });
  };

  return (
    <section className="w-full bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[28px] bg-[#071f4d] px-6 py-8 shadow-[0_18px_45px_rgba(7,31,77,0.18)] md:px-10 lg:px-12">
          {/* Animated background glows */}
          <div className="absolute -right-20 -top-20 h-52 w-52 animate-[floatGlow_7s_ease-in-out_infinite] rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-52 w-52 animate-[floatGlow_8s_ease-in-out_infinite_reverse] rounded-full bg-[#ef233c]/25 blur-3xl" />

          {/* Animated small dots */}
          <span className="absolute left-8 top-8 hidden h-2.5 w-2.5 animate-ping rounded-full bg-white/40 md:block" />
          <span className="absolute bottom-10 right-12 hidden h-3 w-3 animate-bounce rounded-full bg-[#ef233c] md:block" />

          <div className="relative z-10 grid items-center gap-7 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mx-auto mb-3 inline-flex animate-[fadeUp_.7s_ease-out_both] items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-100 lg:mx-0">
                <Sparkles
                  size={13}
                  className="animate-pulse text-[#ff7b88]"
                />
                Student Discovery Platform
              </div>

              <h2 className="mx-auto max-w-2xl animate-[fadeUp_.8s_ease-out_both] text-2xl font-extrabold leading-tight text-white md:text-3xl lg:mx-0 lg:text-[34px]">
                Discover & Connect with Top Student Services
              </h2>

              <p className="mx-auto mt-3 max-w-2xl animate-[fadeUp_.95s_ease-out_both] text-sm leading-6 text-blue-100 lg:mx-0">
                Explore colleges, training institutes, overseas education and
                hostels in one place. Register once and send enquiries directly.
              </p>

              {/* Category Pills */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                {categories.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => navigate(item.path)}
                    style={{ animationDelay: `${index * 90}ms` }}
                    className="group relative inline-flex animate-[fadeUp_.65s_ease-out_both] items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#0b1f4d] hover:shadow-lg"
                  >
                    <span className="absolute inset-y-0 -left-10 w-8 rotate-12 bg-white/40 transition-all duration-700 group-hover:left-[120%]" />
                    <span className="relative text-[#ff7b88] transition group-hover:scale-110 group-hover:text-[#ef233c]">
                      {item.icon}
                    </span>
                    <span className="relative">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Trust Points */}
              <div className="mt-5 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-3">
                <TrustPoint text="Free enquiry" delay="0ms" />
                <TrustPoint text="AP & Telangana" delay="140ms" />
                <TrustPoint text="Quick callback" delay="280ms" />
              </div>
            </div>

            {/* Right Compact Form */}
            <div className="mx-auto w-full max-w-md animate-[slideIn_.85s_ease-out_both] rounded-[22px] bg-white p-4 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 animate-[softBounce_2.4s_ease-in-out_infinite] items-center justify-center rounded-xl bg-[#ef233c] text-white">
                  <Send size={18} />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-[#0b1f4d]">
                    Start Your Search
                  </h3>
                  <p className="text-xs font-medium text-gray-500">
                    Enter your email or mobile number.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5">
                <input
                  type="text"
                  value={contactValue}
                  onChange={(e) => {
                    setContactValue(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter email or phone number"
                  className={`h-11 w-full rounded-xl border px-4 text-sm outline-none transition duration-300 focus:ring-2 ${
                    error
                      ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                      : "border-gray-200 focus:border-[#ef233c] focus:ring-red-50"
                  }`}
                />

                {error && (
                  <p className="animate-[shake_.25s_ease-in-out] text-xs font-semibold text-red-500">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#ef233c] px-5 text-sm font-bold text-white transition hover:bg-[#d90429]"
                >
                  <span className="absolute inset-y-0 -left-12 w-10 rotate-12 bg-white/30 transition-all duration-700 group-hover:left-[120%]" />
                  <span className="relative">Get Started</span>
                  <ArrowRight
                    size={16}
                    className="relative transition group-hover:translate-x-1"
                  />
                </button>
              </form>

              <div className="mt-3 flex animate-[fadeUp_1s_ease-out_both] items-center justify-center gap-2 rounded-xl bg-[#f5f7fb] px-3 py-2 text-[11px] font-bold text-gray-600">
                <CheckCircle size={13} className="animate-pulse text-green-600" />
                Your enquiry will be saved in profile
              </div>
            </div>
          </div>

          <style>{`
            @keyframes floatGlow {
              0%, 100% {
                transform: translate3d(0, 0, 0) scale(1);
              }
              50% {
                transform: translate3d(16px, -12px, 0) scale(1.08);
              }
            }

            @keyframes fadeUp {
              from {
                opacity: 0;
                transform: translateY(16px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateX(26px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes softBounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-5px);
              }
            }

            @keyframes shake {
              0%, 100% {
                transform: translateX(0);
              }
              25% {
                transform: translateX(-3px);
              }
              75% {
                transform: translateX(3px);
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

function TrustPoint({ text, delay = "0ms" }) {
  return (
    <div
      style={{ animationDelay: delay }}
      className="flex animate-[fadeUp_.75s_ease-out_both] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-[11px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
    >
      <CheckCircle size={13} className="animate-pulse text-green-300" />
      {text}
    </div>
  );
}