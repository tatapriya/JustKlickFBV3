import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Send,
  MessageCircleQuestion,
} from "lucide-react";

const faqs = [
  {
    question: "What is JustKlick?",
    answer:
      "JustKlick is a student platform where users can explore colleges, hostels, software training institutes and overseas education services in one place.",
  },
  {
    question: "How can I search for colleges or hostels?",
    answer:
      "You can select a category, choose your city or area, and filter the results based on fees, rating, facilities and location.",
  },
  {
    question: "Can I save listings to my wishlist?",
    answer:
      "Yes. After logging in, you can save colleges, hostels or institutes to your wishlist and view them later from your profile page.",
  },
  {
    question: "How can I contact an institution?",
    answer:
      "Open any listing details page and use the contact, show interest, share or download options to connect with the institution.",
  },
  {
    question: "Are the listings verified?",
    answer:
      "The platform is designed to show trusted and updated listing details such as contact information, location, facilities and basic institution details.",
  },
  {
    question: "Can I download listing details?",
    answer:
      "Yes. Logged-in users can download listing details from the category inner page using the download option.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [question, setQuestion] = useState("");

  const handleSend = () => {
    if (!question.trim()) return;
    alert("Your question has been submitted.");
    setQuestion("");
  };

  return (
    <section className="relative overflow-hidden bg-white py-16">
      <style>
        {`
          @keyframes faqFadeUp {
            0% {
              opacity: 0;
              transform: translateY(24px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes faqFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes faqGlow {
            0%, 100% {
              box-shadow: 0 10px 24px rgba(6, 182, 212, 0.18);
            }
            50% {
              box-shadow: 0 16px 38px rgba(6, 182, 212, 0.32);
            }
          }

          .faq-animate {
            animation: faqFadeUp 0.9s ease both;
          }

          .faq-illustration {
            animation: faqFloat 3.5s ease-in-out infinite;
          }

          .faq-send-btn:hover {
            animation: faqGlow 1.7s ease-in-out infinite;
          }
        `}
      </style>


      <div className="relative z-10 mx-auto w-[92%] max-w-[1250px]">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#061a35] md:text-4xl">
            Frequently Ask Question
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Find answers about colleges, hostels, institutes and student
            services.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[58%_42%]">
          {/* LEFT FAQ LIST */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={`${faq.question}-${index}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="faq-animate overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-all duration-500"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  >
                    <span className="text-sm font-bold text-[#061a35]">
                      {faq.question}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-white shadow-md transition-all duration-300 hover:scale-105">
                      {isOpen ? (
                        <ChevronUp size={18} strokeWidth={2.5} />
                      ) : (
                        <ChevronDown size={18} strokeWidth={2.5} />
                      )}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-gray-100 px-6 pb-5 pt-1 text-sm leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#28a745]"
              >
                <ChevronDown size={18} className="rotate-90" />
              </button>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#28a745]"
              >
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>

          {/* RIGHT ASK QUESTION */}
          <div className="faq-animate rounded-3xl bg-white px-6 py-8 text-center shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
            <div className="faq-illustration relative mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-cyan-50">
              <HelpCircle
                size={92}
                strokeWidth={2.2}
                className="text-cyan-500"
              />

              <div className="absolute bottom-6 right-7 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#28a745] shadow-md">
                <MessageCircleQuestion size={24} />
              </div>
            </div>

            <h3 className="mt-6 text-2xl font-extrabold text-[#061a35]">
              Any Question?
            </h3>

            <p className="mx-auto mt-3 max-w-[360px] text-sm leading-6 text-gray-500">
              You can ask anything you want to know about colleges, hostels,
              training institutes or overseas education.
            </p>

            <div className="mx-auto mt-8 max-w-[420px] text-left">
              <label className="mb-2 block text-sm font-semibold text-gray-600">
                Let me know.
              </label>

              <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 shadow-sm transition-all duration-300 focus-within:border-cyan-400 focus-within:shadow-md">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder="Enter Here"
                  className="h-12 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setQuestion("")}
                  className="text-lg text-gray-300 transition hover:text-red-400"
                >
                  ×
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSend}
              className="faq-send-btn mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-10 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-200 transition-all duration-500 hover:-translate-y-1 hover:bg-[#28a745]"
            >
              <Send size={17} />
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}