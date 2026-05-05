import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingSideButtons from "./components/FloatingSideButtons";

import Home from "./pages/Home";
import CategoryListingPage from "./pages/CategoryListingPage";
import CategoryPage from "./pages/CategoryPage";
import WishlistPage from "./pages/WishlistPage";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Enquiry from "./pages/Enquiry";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ComparePage from "./pages/ComparePage";
import DownloadApp from "./pages/DownloadApp";
import About from "./pages/About";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      {/* Right side student action buttons */}
      <FloatingSideButtons />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/categories" element={<Home />} />

          <Route
            path="/category/:categorySlug"
            element={<CategoryListingPage />}
          />

          <Route
            path="/category/:categorySlug/:id"
            element={<CategoryPage />}
          />

          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/enquiry" element={<Enquiry />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/download-app" element={<DownloadApp />} />
          <Route path="/about" element={<About />} />

          

        </Routes>
      </main>

      <Footer />
    </>
  );
}