import {
    ShieldCheck,
    SearchCheck,
    MapPin,
    Users,
    Star,
    Headphones,
    Sparkles,
  } from "lucide-react";
  import { motion } from "framer-motion";
  
  const features = [
    {
      icon: SearchCheck,
      title: "Easy Institution Search",
      desc: "Find colleges, hostels, software training institutes and overseas education services in one place.",
    },
    {
      icon: MapPin,
      title: "Location Based Results",
      desc: "Search options based on cities and areas across Andhra Pradesh and Telangana.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Information",
      desc: "View courses, fees, facilities, ratings and contact details before making a decision.",
    },
    {
      icon: Users,
      title: "Student Friendly Platform",
      desc: "Designed specially for students to compare, save, enquire and explore easily.",
    },
    {
      icon: Star,
      title: "Wishlist & Recommendations",
      desc: "Save your favourite options and explore recommended institutions based on your interest.",
    },
    {
      icon: Headphones,
      title: "Quick Enquiry Support",
      desc: "Send enquiries directly and connect with the right institution quickly.",
    },
  ];
  
  export default function WhyChooseUs() {
    return (
      <section className="relative overflow-hidden bg-[#f5f7fb] py-20">
        {/* Background Decorations */}
        <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-100px] h-80 w-80 rounded-full bg-indigo-200/50 blur-3xl" />
  
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-sm font-bold text-blue-700 shadow-sm">
              <Sparkles size={16} />
              Why Choose Us
            </div>
  
            <h2 className="text-3xl font-extrabold leading-tight text-[#0b1f4d] md:text-4xl">
              A Smarter Way to Find Your Right Student Option
            </h2>
  
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
              JustKlick helps students explore institutions, compare details,
              save favourites and send enquiries from one clean platform.
            </p>
          </motion.div>
  
          {/* Cards */}
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, index) => {
              const Icon = item.icon;
  
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 55 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="group relative min-h-[245px] overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-7 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:bg-white hover:shadow-[0_28px_70px_rgba(37,99,235,0.18)]"
                >
                  {/* Card Gradient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  
                  {/* Circle Decoration */}
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 transition-all duration-500 group-hover:scale-125 group-hover:bg-blue-500/20" />
  
                  <div className="relative z-10">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b1f4d] to-blue-600 text-white shadow-lg shadow-blue-200 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Icon size={29} />
                    </div>
  
                    <h3 className="mb-3 text-xl font-extrabold text-[#0b1f4d]">
                      {item.title}
                    </h3>
  
                    <p className="text-sm leading-7 text-gray-600">
                      {item.desc}
                    </p>
                  </div>
  
                  {/* Bottom Animated Line */}
                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-gradient-to-r from-[#0b1f4d] to-blue-500 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }