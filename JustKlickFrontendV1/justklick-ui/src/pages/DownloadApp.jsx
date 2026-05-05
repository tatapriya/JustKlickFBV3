import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Smartphone,
  ShieldCheck,
  Search,
  Heart,
  MessageCircle,
  QrCode,
  Star,
  GraduationCap,
} from "lucide-react";

export default function DownloadApp() {
  const appLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/download-app`
      : "https://justklick.co.in/download-app";

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=230x230&data=${encodeURIComponent(
    appLink
  )}`;

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071b46] px-4 py-14 text-white">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-2 text-xs font-bold text-red-100">
              <Smartphone size={15} />
              JUSTKLICK STUDENT APP
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight md:text-5xl">
              Download JustKlick App for Faster Student Search
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
              Find colleges, hostels, software training institutes, overseas
              education services, save your favourite options, and send enquiries
              easily from one student platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={qrCodeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-red-500 px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-red-600"
              >
                <Download size={18} />
                Download App
              </a>

              <a
                href="#qr-code"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <QrCode size={18} />
                Scan QR Code
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={17} className="text-green-300" />
                Secure
              </span>
              <span className="inline-flex items-center gap-2">
                <Star size={17} className="text-yellow-300" fill="currentColor" />
                Student Friendly
              </span>
              <span className="inline-flex items-center gap-2">
                <GraduationCap size={17} className="text-blue-200" />
                AP & TS Options
              </span>
            </div>
          </div>

          {/* PHONE MOCKUP */}
          <div className="flex justify-center">
            <div className="relative h-[520px] w-[270px] rounded-[42px] border-[10px] border-[#101828] bg-white shadow-2xl">
              <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-[#101828]" />

              <div className="h-full overflow-hidden rounded-[30px] bg-[#f5f7fb] pt-10">
                <div className="px-5">
                  <div className="rounded-3xl bg-[#071b46] p-5 text-white">
                    <p className="text-xs font-bold text-blue-100">
                      Welcome to
                    </p>
                    <h3 className="mt-1 text-2xl font-extrabold">
                      JustKlick
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-white/70">
                      Explore student options near your location.
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                        <Search size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0b1f4d]">
                          Search Options
                        </h4>
                        <p className="text-xs text-gray-500">
                          Colleges, hostels & training
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
                        <Heart size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0b1f4d]">
                          Save Wishlist
                        </h4>
                        <p className="text-xs text-gray-500">
                          Keep your favourite listings
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                        <MessageCircle size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0b1f4d]">
                          Send Enquiry
                        </h4>
                        <p className="text-xs text-gray-500">
                          Contact institutes quickly
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-red-500 p-4 text-center text-white">
                    <Download size={24} className="mx-auto" />
                    <p className="mt-2 text-sm font-extrabold">
                      Download Coming Soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR SECTION */}
      <section id="qr-code" className="px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <QrCode size={28} />
            </div>

            <h2 className="text-2xl font-extrabold text-[#0b1f4d]">
              Scan QR Code
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600">
              Scan this QR code using your mobile phone to open the JustKlick
              app download page.
            </p>

            <div className="mx-auto mt-7 w-fit rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
              <img
                src={qrCodeUrl}
                alt="JustKlick App QR Code"
                className="h-[230px] w-[230px]"
              />
            </div>

            <p className="mt-4 break-all text-xs text-gray-400">{appLink}</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-[#0b1f4d]">
              Why Download JustKlick App?
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              The app helps students access important student services faster.
              Students can search options, save favourites, compare listings,
              and send enquiries from one place.
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<Search size={22} />}
                title="Find Student Options"
                text="Search colleges, hostels, software training and overseas education."
              />

              <FeatureCard
                icon={<Heart size={22} />}
                title="Save Wishlist"
                text="Save your favourite options and check them later."
              />

              <FeatureCard
                icon={<MessageCircle size={22} />}
                title="Send Enquiries"
                text="Send your interest directly from the listing page."
              />

              <FeatureCard
                icon={<ShieldCheck size={22} />}
                title="Secure Access"
                text="Student profile, wishlist and enquiries are managed safely."
              />
            </div>

            <div className="mt-8 rounded-2xl bg-[#f5f7fb] p-5">
              <h3 className="font-extrabold text-[#0b1f4d]">
                App Status
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Mobile app download is currently coming soon. This page is ready
                for your app launch and QR sharing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-[#f9fafb] p-5 transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
        {icon}
      </div>

      <h3 className="font-extrabold text-[#0b1f4d]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
    </div>
  );
}