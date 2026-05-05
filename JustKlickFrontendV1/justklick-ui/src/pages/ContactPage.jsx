import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Star,
  Headphones,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const supportMessages =
      JSON.parse(localStorage.getItem("supportMessages")) || [];

    const newMessage = {
      id: Date.now(),
      ...formData,
      status: "New",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "supportMessages",
      JSON.stringify([newMessage, ...supportMessages])
    );

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f7fb]">
      {/* HERO BANNER */}
      <section className="bg-[#f5f7fb] py-5">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="relative overflow-hidden rounded-[28px] bg-[#071f4d]">
            {/* BACKGROUND SHAPES */}
            <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute right-10 top-28 h-72 w-72 rounded-full bg-red-400/20" />
            <div className="absolute right-28 top-14 h-80 w-80 rounded-full bg-blue-300/20" />

            <div className="relative grid min-h-[440px] grid-cols-1 lg:grid-cols-[55%_45%]">
              {/* LEFT CONTENT */}
              <div className="flex flex-col justify-center px-10 py-12 lg:px-20">
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-blue-100">
                  <GraduationCap size={15} />
                  Student Support
                </div>

                <h1 className="max-w-[650px] text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-[52px]">
                  Get Support for Your Student Journey
                </h1>

                <p className="mt-5 max-w-[560px] text-sm leading-7 text-blue-50 md:text-base">
                  Contact JustKlick for help with colleges, training institutes,
                  overseas education, hostels and career-related student
                  services.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#contact-form"
                    className="inline-flex items-center gap-2 rounded-full bg-red-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-red-600"
                  >
                    Send Message
                    <ArrowRight size={17} />
                  </a>

                  <a
                    href="tel:+919000000000"
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#071f4d]"
                  >
                    Contact
                  </a>
                </div>
              </div>

              {/* RIGHT IMAGE DESIGN */}
              <div className="relative hidden items-center justify-center lg:flex">
                <div className="floating-image relative h-[330px] w-[330px]">
                  <div className="absolute inset-0 rounded-full bg-blue-300/20 p-4">
                    <div className="h-full w-full rounded-full bg-white/10 p-4">
                      <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
                        alt="Student support"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="absolute -left-28 top-20 rounded-xl bg-white px-4 py-3 shadow-xl">
                    <div className="flex items-center gap-2">
                      <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-xs font-extrabold text-[#071f4d]">
                        Quick Support
                      </span>
                    </div>
                  </div>

                  <div className="absolute -right-24 top-[190px] rounded-xl bg-white px-4 py-3 shadow-xl">
                    <div className="flex items-center gap-2">
                      <MapPin size={15} className="text-red-500" />
                      <span className="text-xs font-extrabold text-[#071f4d]">
                        AP & TS
                      </span>
                    </div>
                  </div>

                  <div className="absolute -bottom-5 left-20 rounded-xl bg-white px-4 py-3 shadow-xl">
                    <div className="flex items-center gap-2">
                      <Headphones size={15} className="text-red-500" />
                      <span className="text-xs font-extrabold text-[#071f4d]">
                        24hr Reply
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOBILE IMAGE */}
              <div className="px-10 pb-10 lg:hidden">
                <div className="floating-image relative mx-auto h-[260px] w-[260px] rounded-full bg-blue-300/20 p-4">
                  <div className="h-full w-full rounded-full bg-white/10 p-4">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
                      alt="Student support"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section id="contact-form" className="px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[36%_64%]">
          {/* LEFT CONTACT DETAILS */}
          <div className="space-y-5">
            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                Contact Details
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-[#071f4d]">
                Reach Our Team
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Contact us for student support, listing information, institution
                details, or enquiry-related assistance.
              </p>

              <div className="mt-5 space-y-3">
                <ContactItem
                  icon={<Phone size={18} />}
                  title="Phone"
                  value="+91 90000 00000"
                />

                <ContactItem
                  icon={<Mail size={18} />}
                  title="Email"
                  value="support@justklick.com"
                />

                <ContactItem
                  icon={<MapPin size={18} />}
                  title="Location"
                  value="Hyderabad, Telangana"
                />

                <ContactItem
                  icon={<Clock size={18} />}
                  title="Working Hours"
                  value="Monday - Saturday, 10:00 AM - 7:00 PM"
                />
              </div>
            </div>

            <div className="rounded-3xl bg-[#071f4d] p-5 text-white shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-blue-100">
                <MessageCircle size={22} />
              </div>

              <h3 className="mt-3 text-lg font-extrabold">
                Need Student Guidance?
              </h3>

              <p className="mt-2 text-sm leading-5 text-white/75">
                Send your query and our team will help you with colleges,
                hostels, training institutes, overseas education options and
                more.
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            {submitted ? (
              <div className="flex min-h-[390px] flex-col items-center justify-center text-center">
                <div className="flex h-18 w-18 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <CheckCircle size={40} />
                </div>

                <h2 className="mt-5 text-2xl font-extrabold text-[#071f4d]">
                  Message Sent Successfully
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
                  Thank you for contacting us. Our student support team will get
                  back to you soon.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl bg-red-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-600"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                  Send Message
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-[#071f4d]">
                  Write to Us
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Fill the form below and we will contact you shortly.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />

                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />

                    <InputField
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />

                    <InputField
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="College / Hostel / Training"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us how we can help you..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-[#fbfcff] px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-600 md:w-auto"
                  >
                    <Send size={17} />
                    Submit Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes floatingY {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .floating-image {
          animation: floatingY 4s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

function ContactItem({ icon, title, value }) {
  return (
    <div className="flex gap-3 rounded-2xl p-2 transition hover:bg-[#f5f7fb]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-extrabold text-[#071f4d]">{title}</h3>
        <p className="mt-0.5 text-sm leading-5 text-gray-600">{value}</p>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label} {name !== "subject" && <span className="text-red-500">*</span>}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-gray-200 bg-[#fbfcff] px-4 text-sm outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
      />
    </div>
  );
}