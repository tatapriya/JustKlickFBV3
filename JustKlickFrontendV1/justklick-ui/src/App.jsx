import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingSideButtons from "./components/FloatingSideButtons";
import ScrollToTop from "./components/ScrollToTop";

// -------------------- Pages --------------------
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

// -------------------- Admin --------------------
import AdminLayout from "./admin/layouts/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Listings from "./admin/pages/Listings";
import Categories from "./admin/pages/Categories";
import Users from "./admin/pages/Users";
import Enquiries from "./admin/pages/Enquiries";


export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <FloatingSideButtons />

      <main className="min-h-screen">

        <Routes>

          {/* -------------------- PUBLIC ROUTES -------------------- */}

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

          {/* -------------------- ADMIN ROUTES (FIXED STRUCTURE) -------------------- */}

          <Route path="/admin" element={<AdminLayout />}>

            {/* Dashboard (default page) */}
            <Route index element={<Dashboard />} />

            {/* Admin Modules */}
            <Route path="listings" element={<Listings />} />
            <Route path="categories" element={<Categories />} />
            <Route path="users" element={<Users />} />
            <Route path="/admin/enquiries" element={<Enquiries />} />

          </Route>

        </Routes>

      </main>

      <Footer />
    </>
  );
}