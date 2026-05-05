import { Search, FileText, Send } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "STEP 1",
    title: "Search Institutions",
    desc: "Find colleges, institutes, hostels and overseas options.",
  },
  {
    icon: FileText,
    step: "STEP 2",
    title: "View Details",
    desc: "Check courses, location, facilities, reviews and contact info.",
  },
  {
    icon: Send,
    step: "STEP 3",
    title: "Send Enquiry",
    desc: "Submit enquiry and connect with the right institution.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full overflow-hidden bg-white py-16">
      <style>
        {`
          @keyframes slowGlow {
            0%, 100% {
              box-shadow: 0 0 0 rgba(37, 99, 235, 0);
            }
            50% {
              box-shadow: 0 0 22px rgba(37, 99, 235, 0.45);
            }
          }

          @keyframes lineMove {
            0% {
              transform: scaleX(0);
              opacity: 0.2;
            }
            100% {
              transform: scaleX(1);
              opacity: 1;
            }
          }

          @keyframes iconSoftScale {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.06);
            }
          }

          .step-item:hover .step-icon {
            animation: slowGlow 2s ease-in-out infinite,
                       iconSoftScale 2s ease-in-out infinite;
            background: #2563eb;
            color: #ffffff;
            border-color: #2563eb;
          }

          .step-item:hover .step-title {
            color: #2563eb;
          }

          .step-item:hover .step-number {
            color: #ef233c;
          }

          .step-line {
            transform-origin: left center;
          }

          .step-item:hover .step-line {
            animation: lineMove 1.4s ease forwards;
          }
        `}
      </style>

      <div className="mx-auto w-[92%] max-w-[1180px] text-center">
        <h2 className="text-3xl font-extrabold text-[#061a35] md:text-4xl">
          How It Works
        </h2>

        <p className="mt-3 text-sm text-gray-600 md:text-base">
          Simple steps to find your perfect institution
        </p>

        <div className="relative mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="step-item group relative flex flex-col items-center text-center"
              >
                {/* Hover line from current icon to next icon */}
                {index !== steps.length - 1 && (
                  <span className="step-line pointer-events-none absolute left-1/2 top-[40px] z-0 hidden h-[2px] w-full scale-x-0 bg-[#ef233c] md:block" />
                )}

                {/* Icon */}
                <div
                  className={`step-icon relative z-10 flex h-20 w-20 items-center justify-center rounded-full border text-blue-600 shadow-sm transition-all duration-700 ease-out ${
                    index === 2
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-blue-100 bg-[#f2f7ff]"
                  }`}
                >
                  <Icon size={31} strokeWidth={2.3} />
                </div>

                <p className="step-number mt-6 text-xs font-bold tracking-wider text-[#ef233c] transition-colors duration-700">
                  {item.step}
                </p>

                <h3 className="step-title mt-3 text-xl font-extrabold text-[#061a35] transition-colors duration-700">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-[310px] text-sm leading-7 text-gray-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}