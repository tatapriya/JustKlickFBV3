import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Home,
  BookOpen,
  Globe2,
  FileText,
  HelpCircle,
  ShieldCheck,
  Info,
  Send,
  UserPlus,
  Heart,
  MessageCircle,
} from "lucide-react";

import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const studentLinks = [
    {
      label: "Explore Colleges",
      path: "/category/colleges",
      icon: <GraduationCap size={15} />,
    },
    {
      label: "Find Hostels",
      path: "/category/hostels",
      icon: <Home size={15} />,
    },
    {
      label: "Software Training",
      path: "/category/software-training",
      icon: <BookOpen size={15} />,
    },
    {
      label: "Overseas Education",
      path: "/category/overseas",
      icon: <Globe2 size={15} />,
    },
    {
      label: "Competitive Exams",
      path: "/category/exams",
      icon: <FileText size={15} />,
    },
  ];

  const supportLinks = [
    {
      label: "About Us",
      path: "/about-us",
      icon: <Info size={15} />,
    },
    {
      label: "Submit Enquiry",
      path: "/enquiry",
      icon: <Send size={15} />,
    },
    {
      label: "Register",
      path: "/register",
      icon: <UserPlus size={15} />,
    },
    {
      label: "Wishlist",
      path: "/wishlist",
      icon: <Heart size={15} />,
    },
    {
      label: "Contact Support",
      path: "/contact",
      icon: <MessageCircle size={15} />,
    },
  ];

  const legalLinks = [

    {
      label: "Terms & Conditions",
      path: "/privacy-policy#terms-and-conditions",
    },
    {
      label: "Student Help",
      path: "/contact",
    },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon: <FaFacebookF size={17} />,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: <FaInstagram size={18} />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/",
      icon: <FaLinkedinIn size={18} />,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/",
      icon: <FaYoutube size={18} />,
    },
    {
      label: "Twitter",
      href: "https://twitter.com/",
      icon: <FaTwitter size={17} />,
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/919876543210",
      icon: <FaWhatsapp size={18} />,
    },
  ];

  return (
    <footer className="mt-10 w-full bg-[#071f4d] text-white">
      {/* CTA */}
      <div className="border-b border-white/10 bg-[#0b2a5b]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-extrabold">
              Need help choosing the right option?
            </h2>

            <p className="mt-1 text-sm leading-6 text-blue-100">
              Send an enquiry and get guidance for colleges, hostels, software
              training, overseas education, and competitive exams.
            </p>
          </div>

          <Link
            to="/enquiry"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef233c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d90429]"
          >
            <Send size={16} />
            Submit Enquiry
          </Link>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-14">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <Link to="/" className="inline-block">
              <h1 className="text-3xl font-extrabold tracking-tight">
                Just<span className="text-[#ef233c]">Klick</span>
              </h1>
            </Link>

            <p className="mt-4 text-sm leading-7 text-gray-300">
              JustKlick is a student discovery platform for finding colleges,
              hostels, software training institutes, overseas education
              consultants, and exam coaching options in Andhra Pradesh and
              Telangana.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:border-[#ef233c] hover:bg-[#ef233c] hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* FOR STUDENTS */}
          <div>
            <h3 className="mb-4 text-lg font-bold">For Students</h3>

            <ul className="space-y-3 text-sm text-gray-300">
              {studentLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 transition hover:text-white"
                  >
                    <span className="text-[#ef233c]">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* STUDENT SUPPORT */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Student Support</h3>

            <ul className="space-y-3 text-sm text-gray-300">
              {supportLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 transition hover:text-white"
                  >
                    <span className="text-[#ef233c]">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck size={17} className="text-green-400" />
                Student Friendly Platform
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-300">
                Search, shortlist, save, and enquire about student services in
                one place.
              </p>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>

            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <a
                  href="mailto:support@justklick.com"
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <Mail size={17} className="mt-0.5 shrink-0 text-[#ef233c]" />
                  <span>support@justklick.com</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <Phone size={17} className="mt-0.5 shrink-0 text-[#ef233c]" />
                  <span>+91 98765 43210</span>
                </a>
              </li>

              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hyderabad%2C%20Telangana%2C%20India"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <MapPin
                    size={17}
                    className="mt-0.5 shrink-0 text-[#ef233c]"
                  />
                  <span>Hyderabad, Telangana, India</span>
                </a>
              </li>
            </ul>

            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-[#ef233c] hover:bg-[#ef233c] hover:text-white"
            >
              <HelpCircle size={15} />
              Student Help Center
            </Link>
          </div>
        </div>

        {/* LEGAL + QUICK LINKS */}
        <div className="mb-6 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-bold text-white">Important Links</p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-300">
              {legalLinks.map((item) => (
                <Link
                  key={`${item.label}-${item.path}`}
                  to={item.path}
                  className="transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <Link to="/enquiry" className="transition hover:text-white">
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between border-t border-white/10 pt-5 text-sm text-gray-300 md:flex-row">
          <p>© 2026 JustKlick. All rights reserved.</p>

          <p className="mt-2 text-center text-xs text-gray-400 md:mt-0">
            Made for students in AP & Telangana
          </p>
        </div>
      </div>
    </footer>
  );
}