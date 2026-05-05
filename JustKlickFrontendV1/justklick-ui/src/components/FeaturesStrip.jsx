import {
    Zap,
    ShieldCheck,
    ThumbsUp,
    BadgeCheck,
    ArrowRight,
  } from "lucide-react";
  
  const featureStrip = [
    {
      icon: Zap,
      title: "Quick Response",
      text: "Get fast enquiry responses from listed institutions.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Details",
      text: "Reliable information with updated contact details.",
    },
    {
      icon: ThumbsUp,
      title: "Best Options",
      text: "Compare colleges, hostels and services easily.",
    },
    {
      icon: BadgeCheck,
      title: "Trusted Listing",
      text: "Find trusted listings from Andhra Pradesh and Telangana.",
    },
  ];
  
  export default function FeatureStrip() {
    const scrollToContact = () => {
      const contactSection = document.getElementById("contact-details-section");
  
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };
  
    return (
<section className="mx-auto mt-6 w-[92%] max-w-[1280px] overflow-hidden rounded-2xl border border-green-100 bg-[#dff3e2] shadow-md">        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {featureStrip.map((feature, index) => {
            const Icon = feature.icon;
  
            return (
              <button
                key={feature.title}
                type="button"
                onClick={scrollToContact}
                className={`group relative flex min-h-[150px] items-center gap-5 overflow-hidden px-6 py-9 text-left transition-all duration-700 ease-out hover:-translate-y-[3px] hover:bg-[#c9efd0] focus:outline-none ${
                  index !== featureStrip.length - 1
                    ? "border-b border-green-200 sm:border-r lg:border-b-0"
                    : ""
                }`}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[1400ms] ease-out group-hover:translate-x-full" />
  
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#28a745] text-white shadow-sm transition-all duration-700 ease-out group-hover:scale-105 group-hover:bg-[#ef233c]">
                  <Icon size={28} strokeWidth={2.5} />
                </span>
  
                <span className="relative z-10 flex-1">
                  <span className="block text-base font-extrabold text-[#061a35] transition-colors duration-700 group-hover:text-[#ef233c]">
                    {feature.title}
                  </span>
  
                  <span className="mt-2 block text-sm leading-relaxed text-gray-600">
                    {feature.text}
                  </span>
                </span>
  
                <ArrowRight
                  size={21}
                  className="relative z-10 shrink-0 -translate-x-2 text-[#ef233c] opacity-0 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                />
              </button>
            );
          })}
        </div>
      </section>
    );
  }