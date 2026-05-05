import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  ShieldCheck,
  Lock,
  UserCheck,
  Mail,
  Database,
  ScrollText,
  CheckCircle,
  AlertTriangle,
  Building2,
} from "lucide-react";

export default function PrivacyPolicy() {
  const updatedDate = "30 April 2026";
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const scrollToSection = () => {
      const targetId = location.hash.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const timer1 = setTimeout(scrollToSection, 150);
    const timer2 = setTimeout(scrollToSection, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [location.pathname, location.hash]);

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#071b46] via-[#0b2d64] to-[#071b46] px-4 py-16 text-white">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <ShieldCheck size={34} />
          </div>

          <h1 className="text-4xl font-extrabold md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-blue-100 md:text-base">
            Your privacy matters to us. This Privacy Policy explains how
            JustKlick collects, uses, stores and protects your information when
            you use our platform.
          </p>

          <p className="mt-5 text-sm font-semibold text-blue-100">
            Last Updated: {updatedDate}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-4 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[280px_1fr]">
          {/* SIDE CARD */}
          <aside className="h-fit rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-5 text-lg font-extrabold text-[#0b1f4d]">
              Page Overview
            </h2>

            <div className="space-y-4">
              <a href="#privacy-policy">
                <InfoItem icon={ShieldCheck} title="Privacy Policy" />
              </a>

              <a href="#terms-and-conditions">
                <InfoItem icon={ScrollText} title="Terms & Conditions" />
              </a>

              <a href="#user-data">
                <InfoItem icon={UserCheck} title="User Data" />
              </a>

              <a href="#secure-handling">
                <InfoItem icon={Lock} title="Secure Handling" />
              </a>

              <a href="#data-storage">
                <InfoItem icon={Database} title="Data Storage" />
              </a>

              <a href="#contact-support">
                <InfoItem icon={Mail} title="Contact Support" />
              </a>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="space-y-10">
            {/* PRIVACY POLICY */}
            <div
              id="privacy-policy"
              className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
            >
              <SectionHeader
                icon={ShieldCheck}
                iconClass="bg-blue-50 text-[#0b1f4d]"
                smallTitle="JustKlick"
                title="Privacy Policy"
              />

              <PolicySection title="1. Introduction">
                Welcome to JustKlick. We provide a student-friendly platform
                that helps users explore colleges, hostels, software training
                institutes and overseas education services. By using our
                website, you agree to the practices described in this Privacy
                Policy.
              </PolicySection>

              <PolicySection title="2. Information We Collect">
                We may collect personal information that you provide while using
                the platform, including your name, phone number, email address,
                location, enquiry details, wishlist activity and profile
                information. We may also collect non-personal information such
                as browser type, device details and general usage activity to
                improve the platform.
              </PolicySection>

              <PolicySection title="3. How We Use Your Information">
                We use your information to create and manage your account,
                process enquiries, save wishlist items, show relevant listings,
                improve user experience, provide support and communicate
                important updates related to the platform.
              </PolicySection>

              <PolicySection title="4. Enquiry Information">
                When you submit an enquiry for an institution or service
                provider, the details you provide may be used to connect you
                with the relevant institution or support team. Please ensure
                that the information you submit is accurate.
              </PolicySection>

              <PolicySection title="5. Wishlist and Profile Data">
                Your wishlist, saved items and profile details may be stored to
                provide a personalized experience. This helps you access your
                favourite listings and enquiry history easily.
              </PolicySection>

              <PolicySection title="6. Data Sharing">
                We do not sell your personal information. We may share necessary
                enquiry details with relevant institutions, service providers or
                support teams only for the purpose of assisting your request. We
                may also disclose information when required by law or to protect
                the safety and rights of our users and platform.
              </PolicySection>

              <PolicySection title="7. Data Security">
                We take reasonable technical and organizational measures to
                protect your information from unauthorized access, misuse, loss
                or alteration. However, no online platform can guarantee
                complete security, so users should also take care while sharing
                personal details online.
              </PolicySection>

              <PolicySection title="8. Cookies and Local Storage">
                Our platform may use cookies or browser local storage to improve
                functionality, maintain login sessions, store wishlist items and
                enhance the user experience. You can control cookies through
                your browser settings.
              </PolicySection>

              <PolicySection title="9. Third-Party Links">
                JustKlick may contain links to third-party websites or services.
                We are not responsible for the privacy practices, content or
                security of those external websites. Users should review their
                privacy policies separately.
              </PolicySection>

              <PolicySection title="10. User Rights">
                You may request access, correction or deletion of your personal
                information, subject to applicable laws and platform
                requirements. You may also contact us for questions related to
                your data or account.
              </PolicySection>

              <PolicySection title="11. Children’s Privacy">
                JustKlick is intended for students and users searching for
                educational services. If a minor uses the platform, we recommend
                guidance from a parent, guardian or responsible adult while
                submitting personal information.
              </PolicySection>

              <PolicySection title="12. Changes to This Privacy Policy">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with the updated date. Continued use
                of the platform means you accept the revised policy.
              </PolicySection>
            </div>

            {/* TERMS AND CONDITIONS */}
            <div
              id="terms-and-conditions"
              className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
            >
              <SectionHeader
                icon={ScrollText}
                iconClass="bg-red-50 text-red-500"
                smallTitle="JustKlick"
                title="Terms & Conditions"
              />

              <PolicySection title="1. Acceptance of Terms">
                By accessing or using JustKlick, you agree to follow these Terms
                & Conditions. If you do not agree with any part of these terms,
                you should stop using the platform.
              </PolicySection>

              <PolicySection title="2. Platform Purpose">
                JustKlick is an educational listing and student support platform
                that helps users explore colleges, hostels, software training
                institutes, overseas education services and related student
                services.
              </PolicySection>

              <PolicySection title="3. User Responsibilities">
                Users must provide accurate information while registering,
                submitting enquiries, saving wishlist items or contacting
                support. Users should not misuse the platform, submit false
                information, attempt unauthorized access or disturb the
                platform’s functionality.
              </PolicySection>

              <PolicySection title="4. Listings and Institution Information">
                JustKlick may display information about institutions, service
                providers, courses, fees, facilities, locations and contact
                details. We try to keep information useful and accurate, but
                users should verify final details directly with the respective
                institution or service provider before making decisions.
              </PolicySection>

              <PolicySection title="5. Enquiries and Communication">
                When you submit an enquiry, your details may be used by the
                JustKlick support team or relevant service provider to contact
                you. Submitting an enquiry does not guarantee admission, booking,
                placement, scholarship or service approval.
              </PolicySection>

              <PolicySection title="6. Account and Profile Use">
                Users are responsible for maintaining the confidentiality of
                their account details. Any activity performed through your
                account may be treated as your responsibility unless reported
                immediately.
              </PolicySection>

              <PolicySection title="7. Wishlist, Downloads and Saved Items">
                Features like wishlist, saved listings, downloads and enquiry
                history are provided to improve user experience. These features
                may depend on browser storage, account data or platform
                availability.
              </PolicySection>

              <PolicySection title="8. Third-Party Services">
                JustKlick may include links or references to third-party
                websites, institutions, consultants or service providers. We are
                not responsible for their services, pricing, policies, decisions
                or external website content.
              </PolicySection>

              <PolicySection title="9. Limitation of Liability">
                JustKlick is not liable for losses, damages, wrong decisions,
                admission outcomes, service delays or disputes between users and
                third-party institutions or service providers. Users should make
                decisions after proper verification.
              </PolicySection>

              <PolicySection title="10. Prohibited Activities">
                Users must not upload harmful content, misuse contact details,
                copy platform content without permission, attempt hacking,
                interfere with security, create fake enquiries or use the
                platform for illegal or misleading activities.
              </PolicySection>

              <PolicySection title="11. Changes to Terms">
                JustKlick may update these Terms & Conditions from time to time.
                Updated terms will be posted on this page. Continued use of the
                platform means you accept the revised terms.
              </PolicySection>

              <PolicySection title="12. Contact for Terms">
                For questions about these Terms & Conditions, you may contact
                the JustKlick support team through the contact page or support
                email.
              </PolicySection>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <TermsCard
                  icon={CheckCircle}
                  title="Use Responsibly"
                  text="Submit correct details and use the platform fairly."
                />

                <TermsCard
                  icon={Building2}
                  title="Verify Listings"
                  text="Confirm final details directly with institutions."
                />

                <TermsCard
                  icon={AlertTriangle}
                  title="No Guarantee"
                  text="Enquiries do not guarantee admission or service approval."
                />
              </div>
            </div>

            {/* USER DATA */}
            <div
              id="user-data"
              className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
            >
              <SectionHeader
                icon={UserCheck}
                iconClass="bg-green-50 text-green-600"
                smallTitle="Data Overview"
                title="User Data"
              />

              <PolicySection title="1. Personal Information">
                JustKlick may collect basic user details such as name, email
                address, phone number, location, profile details and submitted
                enquiry information. This data helps us provide better support
                and relevant student service recommendations.
              </PolicySection>

              <PolicySection title="2. Student Activity Data">
                We may store user actions such as wishlist items, saved
                listings, viewed categories, downloaded details and enquiry
                history. This helps users continue their search without losing
                important information.
              </PolicySection>

              <PolicySection title="3. Enquiry Data">
                When users submit enquiry forms, the submitted details may be
                stored to help the support team respond and connect users with
                suitable institutions or service providers.
              </PolicySection>

              <PolicySection title="4. Accuracy of Data">
                Users are responsible for providing correct and updated
                information. Incorrect contact details may prevent the support
                team or institutions from reaching the user.
              </PolicySection>
            </div>

            {/* SECURE HANDLING */}
            <div
              id="secure-handling"
              className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
            >
              <SectionHeader
                icon={Lock}
                iconClass="bg-purple-50 text-purple-600"
                smallTitle="Security Process"
                title="Secure Handling"
              />

              <PolicySection title="1. Responsible Data Use">
                User information is used only for platform-related purposes such
                as account management, support, enquiry handling, wishlist
                management and improving the student discovery experience.
              </PolicySection>

              <PolicySection title="2. Limited Access">
                Access to user information should be limited to authorized team
                members or service providers who need the information to process
                user requests or provide support.
              </PolicySection>

              <PolicySection title="3. Safe Communication">
                Contact details submitted by users may be used for support
                communication only. Users should avoid sharing sensitive
                financial, password or private account information through
                enquiry messages.
              </PolicySection>

              <PolicySection title="4. Misuse Prevention">
                JustKlick may restrict or remove accounts, enquiries or content
                if users misuse the platform, submit fake information, disturb
                services or attempt unauthorized access.
              </PolicySection>
            </div>

            {/* DATA STORAGE */}
            <div
              id="data-storage"
              className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
            >
              <SectionHeader
                icon={Database}
                iconClass="bg-orange-50 text-orange-500"
                smallTitle="Storage Policy"
                title="Data Storage"
              />

              <PolicySection title="1. Browser Storage">
                JustKlick may use browser local storage to save wishlist items,
                login-related information, recently viewed listings and basic
                user preferences. This helps improve speed and user experience.
              </PolicySection>

              <PolicySection title="2. Platform Storage">
                Enquiry details, profile information and account-related data
                may be stored in the platform database when backend integration
                is enabled. This helps support teams manage user requests
                properly.
              </PolicySection>

              <PolicySection title="3. Storage Duration">
                User data may be retained as long as needed for platform
                functionality, enquiry tracking, support, business requirements
                or legal compliance.
              </PolicySection>

              <PolicySection title="4. Deletion Requests">
                Users may contact the support team to request correction or
                deletion of their personal information, subject to platform,
                business and legal requirements.
              </PolicySection>
            </div>

            {/* CONTACT SUPPORT */}
            <div
              id="contact-support"
              className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
            >
              <SectionHeader
                icon={Mail}
                iconClass="bg-blue-50 text-blue-600"
                smallTitle="Need Help?"
                title="Contact Support"
              />

              <PolicySection title="1. Support Contact">
                If you have questions about privacy, data handling, terms,
                enquiries or your account, you can contact the JustKlick support
                team through the contact page or support email.
              </PolicySection>

              <PolicySection title="2. Response Time">
                The support team will try to respond as soon as possible.
                Response time may vary depending on request type, workload and
                availability.
              </PolicySection>

              <PolicySection title="3. User Requests">
                Users may contact support for account issues, enquiry updates,
                listing information, data correction, deletion requests or
                privacy-related questions.
              </PolicySection>
            </div>

            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm leading-7 text-gray-700">
                <span className="font-bold text-[#0b1f4d]">Note:</span> This is
                a general Privacy Policy and Terms & Conditions draft for your
                project. For production use, review it with your business/legal
                requirements before publishing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({ icon: Icon, iconClass, smallTitle, title }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}
      >
        <Icon size={24} />
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
          {smallTitle}
        </p>
        <h2 className="text-2xl font-extrabold text-[#0b1f4d]">{title}</h2>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#f5f7fb] p-4 transition hover:bg-[#eaf0ff]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1f4d] text-white">
        <Icon size={20} />
      </div>
      <p className="text-sm font-bold text-[#0b1f4d]">{title}</p>
    </div>
  );
}

function PolicySection({ title, children }) {
  return (
    <section className="border-b border-gray-100 py-6 last:border-b-0">
      <h2 className="mb-3 text-xl font-extrabold text-[#0b1f4d]">{title}</h2>
      <p className="text-sm leading-8 text-gray-600 md:text-base">
        {children}
      </p>
    </section>
  );
}

function TermsCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl bg-[#f5f7fb] p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
        <Icon size={22} />
      </div>

      <h3 className="mt-4 text-sm font-extrabold text-[#0b1f4d]">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
    </div>
  );
}