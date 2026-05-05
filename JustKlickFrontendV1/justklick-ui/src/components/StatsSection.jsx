import { Building2, Home, GraduationCap, Send, TrendingUp } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: Building2,
    value: 500,
    suffix: "+",
    label: "Colleges Listed",
    desc: "Explore trusted colleges across AP & Telangana.",
  },
  {
    icon: Home,
    value: 300,
    suffix: "+",
    label: "Hostels Available",
    desc: "Find student-friendly hostels by city and area.",
  },
  {
    icon: GraduationCap,
    value: 250,
    suffix: "+",
    label: "Training Institutes",
    desc: "Discover software training institutes near you.",
  },
  {
    icon: Send,
    value: 1000,
    suffix: "+",
    label: "Student Enquiries",
    desc: "Students connected with institutions easily.",
  },
];

function AnimatedNumber({ value, suffix = "", start }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 80,
    damping: 20,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    motionValue.set(value);

    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return () => unsubscribe();
  }, [start, value, motionValue, springValue]);

  return (
    <>
      {displayValue}
      {suffix}
    </>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.25,
  });

  return (
    <section ref={sectionRef} className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  filter: "blur(0px)",
                }
              : {}
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-bold text-blue-700">
            <TrendingUp size={16} />
            Platform Highlights
          </div>

          <h2 className="text-3xl font-extrabold text-[#0b1f4d] md:text-4xl">
            Trusted by Students to Explore Better Options
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            JustKlick brings colleges, hostels, training institutes and overseas
            education services into one simple student-friendly platform.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 [perspective:1200px]">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  rotateX: -75,
                  y: 40,
                  transformOrigin: "top",
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        rotateX: 0,
                        y: 0,
                      }
                    : {}
                }
                transition={{
                  duration: 0.75,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                  rotateX: 6,
                }}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow duration-500 [transform-style:preserve-3d] hover:border-blue-100 hover:shadow-[0_25px_55px_rgba(37,99,235,0.16)]"
              >
                {/* Animated Shine */}
                <div className="absolute inset-y-0 -left-24 w-20 skew-x-[-18deg] bg-white/70 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" />

                {/* Soft Corner Circle */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-50 transition-all duration-500 group-hover:scale-150 group-hover:bg-blue-100" />

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={
                      isInView
                        ? {
                            scale: 1,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.45,
                      delay: index * 0.12 + 0.35,
                      type: "spring",
                      stiffness: 180,
                      damping: 12,
                    }}
                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b1f4d] text-white shadow-md transition-all duration-500 group-hover:bg-blue-600"
                  >
                    <Icon size={27} />
                  </motion.div>

                  <h3 className="text-4xl font-extrabold text-[#0b1f4d]">
                    <AnimatedNumber
                      value={item.value}
                      suffix={item.suffix}
                      start={isInView}
                    />
                  </h3>

                  <p className="mt-2 text-base font-bold text-[#0b1f4d]">
                    {item.label}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {item.desc}
                  </p>
                </div>

                {/* Pulse Dot Decoration */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          scale: [0, 1.25, 1],
                          opacity: [0, 1, 0.7],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    delay: index * 0.12 + 0.5,
                  }}
                  className="absolute left-5 top-5 h-2.5 w-2.5 rounded-full bg-blue-500"
                />

                {/* Bottom Gradient Line */}
                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#0b1f4d] to-blue-500 transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}