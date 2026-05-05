import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Heart,
  Phone,
  Mail,
  Globe,
  Navigation,
  Check,
  Share2,
  Download,
  Calendar,
  IndianRupee,
} from "lucide-react";

import api from "../api/api";
import LocationMap from "../components/LocationMap";
import FeaturesStrip from "../components/FeaturesStrip";

import { isUserLoggedIn } from "../utils/userStorage";

const slugAliases = {
  "software-training": "software-training",
  "training-institutes": "software-training",
  overseas: "overseas",
  "overseas-education": "overseas",
  more: "career-guidance",
};

const categoryLabels = {
  colleges: "Colleges",
  hostels: "Hostels",
  "software-training": "Software Training",
  overseas: "Overseas Education",
  "career-guidance": "More",
  exams: "Competitive Exams",
};

const splitTextToArray = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const extractNumber = (value) => {
  if (typeof value === "number") return value;

  const number = String(value || "")
    .replace(/,/g, "")
    .match(/\d+/);

  return number ? Number(number[0]) : 0;
};

const normalizeBackendListing = (item) => {
  const coursesArray = splitTextToArray(item.courses);
  const facilitiesArray = splitTextToArray(item.facilities);

  const items =
    coursesArray.length > 0
      ? coursesArray.map((course) => ({
          name: course,
          duration: "Contact for details",
          fee: item.fee || "N/A",
        }))
      : facilitiesArray.map((facility) => ({
          name: facility,
          duration: "Available",
          fee: item.fee || "N/A",
        }));

  return {
    id: item.id,
    name: item.name || "Listing",
    slug: item.slug || "",
    category: item.category_title || item.category_slug || "General",
    categorySlug: item.category_slug || "",
    city: item.city || "",
    state: item.state || "Telangana",
    location: item.area || "",
    area: item.area || "",
    address: item.address || "",
    image:
      item.image ||
      "https://images.unsplash.com/photo-1562774053-701939374585?w=700",
    rating: Number(item.rating || 0),
    reviews: item.reviews || 0,
    fees: extractNumber(item.fee),
    feeLabel: item.fee || "Not specified",
    description: item.description || "",
    tags: [...coursesArray, ...facilitiesArray],
    highlights:
      facilitiesArray.length > 0
        ? facilitiesArray
        : ["Verified listing", "Student friendly", "Contact support available"],
    itemsTitle:
      item.category_slug === "hostels"
        ? "Rooms"
        : item.category_slug === "overseas"
        ? "Services"
        : "Courses",
    items,
    established: item.established || "N/A",
    contact: {
      phone: item.phone || "N/A",
      email: item.email || "N/A",
      website: item.website || "N/A",
      address: item.address || `${item.area || ""}, ${item.city || ""}`,
    },
    raw: item,
  };
};

export default function CategoryPage() {
  const { categorySlug, id } = useParams();
  const navigate = useNavigate();

  const routeSlug = categorySlug || "colleges";
  const dataKey = slugAliases[routeSlug] || routeSlug;

  const [details, setDetails] = useState(null);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const categoryTitle = categoryLabels[dataKey] || "Category";
  const isHostel = dataKey === "hostels";
  const isOverseas = dataKey === "overseas";

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        setLoading(true);
        setBackendError("");

        const detailResponse = await api.get(`/listings/${id}/`);
        const normalizedDetails = normalizeBackendListing(detailResponse.data);

        setDetails(normalizedDetails);

        const recommendedResponse = await api.get(
          `/listings/?category=${normalizedDetails.categorySlug || dataKey}`
        );

        const recommended = recommendedResponse.data
          .filter((item) => String(item.id) !== String(id))
          .map(normalizeBackendListing)
          .slice(0, 4);

        setRecommendedItems(recommended);
      } catch (error) {
        console.error("Listing detail fetch error:", error);
        setBackendError("Unable to fetch listing details from backend.");
        setDetails(null);
        setRecommendedItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id, dataKey]);

  const tabs = useMemo(() => {
    if (!details) return ["Overview"];

    if (isHostel) {
      return ["Overview", "Rooms", "Fees", "Facilities", "Reviews", "Gallery"];
    }

    if (isOverseas) {
      return [
        "Overview",
        "Services",
        "Fees",
        "Facilities",
        "Reviews",
        "Gallery",
      ];
    }

    return [
      "Overview",
      details.itemsTitle || "Courses",
      "Fees",
      "Admission",
      "Facilities",
      "Reviews",
      "Gallery",
    ];
  }, [details, isHostel, isOverseas]);

  const checkLoginAndRun = (callback) => {
    if (!isUserLoggedIn()) {
      navigate("/login", {
        state: {
          from: `/category/${routeSlug}/${id}`,
          message: "Please login or register to continue.",
        },
      });
      return;
    }

    callback();
  };

  const handleShowInterest = () => {
    checkLoginAndRun(() => {
      navigate("/enquiry", {
        state: {
          id: details.id,
          itemId: details.id,
          category: routeSlug,
          categorySlug: routeSlug,
          dataKey,
          categoryTitle,
          itemName: details.name,
          name: details.name,
          title: details.name,
          city: details.city,
          location: details.location,
          state: details.state,
          image: details.image,
          rating: details.rating,
          reviews: details.reviews,
          link: `/category/${routeSlug}/${details.id}`,
        },
      });
    });
  };

  const handleSaveWishlist = () => {
    checkLoginAndRun(async () => {
      try {
        setWishlistLoading(true);
  
        const wishlistResponse = await api.post("/wishlist/", {
          listing: details.id,
        });
  
        const compareResponse = await api.post("/compare/", {
          listing: details.id,
        });
  
        const wishlistAlreadySaved = wishlistResponse.data?.created === false;
        const compareAlreadySaved = compareResponse.data?.created === false;
  
        if (wishlistAlreadySaved && compareAlreadySaved) {
          alert("Already saved in wishlist and compare");
        } else {
          alert("Saved to wishlist and compare");
        }
  
        window.dispatchEvent(new CustomEvent("user-storage-updated"));
      } catch (error) {
        console.error("Wishlist/Compare save error:", error);
  
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else if (error.response?.data?.listing?.[0]) {
          alert(error.response.data.listing[0]);
        } else {
          alert("Failed to save wishlist/compare");
        }
      } finally {
        setWishlistLoading(false);
      }
    });
  };

  const handleShare = () => {
    checkLoginAndRun(async () => {
      const shareUrl = `${window.location.origin}/category/${routeSlug}/${details.id}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: details.name,
            text: `Check this out: ${details.name}`,
            url: shareUrl,
          });
        } catch {
          console.log("Share cancelled");
        }
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard");
      }
    });
  };

  const saveDownloadToBackend = async () => {
    try {
      setDownloadLoading(true);

      const response = await api.post("/downloads/", {
        listing: details.id,
      });

      if (response.data?.created === false) {
        console.log("Already downloaded");
      }

      window.dispatchEvent(new CustomEvent("user-storage-updated"));
    } catch (error) {
      console.error("Download save error:", error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else if (error.response?.data?.listing?.[0]) {
        alert(error.response.data.listing[0]);
      } else {
        alert("Failed to save download in backend");
      }
    } finally {
      setDownloadLoading(false);
    }
  };

  const downloadTextFile = () => {
    const itemDetails = details.items
      ?.map(
        (item, index) =>
          `${index + 1}. ${item.name}
Duration: ${item.duration || "N/A"}
Fee: ${item.fee || "N/A"}`
      )
      .join("\n\n");

    const highlights = details.highlights
      ?.map((item, index) => `${index + 1}. ${item}`)
      .join("\n");

    const tags = details.tags?.join(", ");

    const fileContent = `
${details.name}

Category: ${categoryTitle}
Type: ${details.category || "N/A"}
Location: ${details.location || "N/A"}, ${details.city || "N/A"}, ${
      details.state || "N/A"
    }
Established: ${details.established || "N/A"}
Rating: ${details.rating || "N/A"}
Reviews: ${details.reviews || "N/A"}
Fees: ${details.feeLabel || "N/A"}

Tags:
${tags || "N/A"}

Description:
${details.description || "N/A"}

Highlights:
${highlights || "N/A"}

${details.itemsTitle || "Details"}:
${itemDetails || "N/A"}

Contact Details:
Phone: ${details.contact?.phone || "N/A"}
Email: ${details.contact?.email || "N/A"}
Website: ${details.contact?.website || "N/A"}
Address: ${details.contact?.address || "N/A"}
`;

    const safeFileName = details.name
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase();

    const blob = new Blob([fileContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeFileName}-details.txt`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    checkLoginAndRun(async () => {
      await saveDownloadToBackend();
      downloadTextFile();
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f6f9] px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-7 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#ef233c]" />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Loading details...
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Fetching listing details from backend.
          </p>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f6f9] px-4">
        <ScrollReveal>
          <div className="w-full max-w-md rounded-xl bg-white p-7 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Data not found</h2>

            <p className="mt-2 text-sm text-gray-500">
              {backendError || "This listing is not available in backend data."}
            </p>

            <button
              onClick={() => navigate(`/category/${routeSlug}`)}
              className="mt-5 rounded-md bg-[#ef233c] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d90429]"
            >
              Back to {categoryTitle}
            </button>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  const showItemsTab =
    activeTab === details.itemsTitle ||
    activeTab === "Rooms" ||
    activeTab === "Services" ||
    activeTab === "Courses";

  return (
    <div className="min-h-screen w-full bg-[#f6f6f9]">
      <main className="w-full overflow-hidden px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
        <ScrollReveal distance={25}>
          <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
            <Link to="/" className="font-medium hover:text-[#ef233c]">
              Home
            </Link>

            <span>/</span>

            <Link
              to={`/category/${routeSlug}`}
              className="font-medium hover:text-[#ef233c]"
            >
              {categoryTitle}
            </Link>

            <span>/</span>

            <span className="font-medium text-gray-700">{details.name}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80} distance={45}>
          <section className="w-full rounded-xl bg-white p-5 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[430px_1fr] xl:grid-cols-[500px_1fr]">
              <div>
                <img
                  src={details.image}
                  alt={details.name}
                  className="h-[280px] w-full rounded-xl object-cover lg:h-[360px]"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="mb-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {details.category}
                      </p>

                      <h1 className="text-2xl font-bold text-[#111827] md:text-3xl">
                        {details.name}
                      </h1>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={15} />
                          {details.location}, {details.city}, {details.state}
                        </span>

                        <span className="flex items-center gap-1">
                          <Calendar size={15} />
                          Est. {details.established || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                        <Star size={13} fill="currentColor" />
                        {details.rating || "N/A"}
                      </div>

                      <span className="text-sm text-gray-500">
                        ({details.reviews || 0} Reviews)
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(details.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {details.description}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <InfoBox label="Starting Fees" value={details.feeLabel} />
                    <InfoBox label="Location" value={details.city || "N/A"} />
                    <InfoBox
                      label={isOverseas ? "Country" : "Type"}
                      value={details.category || "N/A"}
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={handleShowInterest}
                    className="rounded-md bg-[#ef233c] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d90429]"
                  >
                    Show Interest
                  </button>

                  <button
                    onClick={handleSaveWishlist}
                    disabled={wishlistLoading}
                    className="flex items-center gap-2 rounded-md border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Heart size={15} />
                    {wishlistLoading ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 rounded-md border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Share2 size={15} />
                    Share
                  </button>

                  <button
                    onClick={handleDownload}
                    disabled={downloadLoading}
                    className="flex items-center gap-2 rounded-md border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Download size={15} />
                    {downloadLoading ? "Downloading..." : "Download"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={100} distance={40}>
          <div className="mt-4 w-full rounded-xl bg-white px-4 shadow-sm">
            <div className="flex gap-6 overflow-x-auto text-sm font-semibold text-gray-600">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 py-3 ${
                    activeTab === tab
                      ? "border-[#ef233c] text-[#ef233c]"
                      : "border-transparent hover:text-[#ef233c]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <section className="mt-5 grid w-full grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-5">
            {activeTab === "Overview" && (
              <ScrollReveal distance={45}>
                <Card>
                  <h2 className="text-lg font-bold text-gray-900">
                    About {details.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {details.description}
                  </p>

                  <h3 className="mt-5 text-base font-bold text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {(details.highlights || []).map((item, index) => (
                      <ScrollReveal key={item} delay={index * 60} distance={25}>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Check
                            size={15}
                            className="shrink-0 text-green-600"
                          />
                          {item}
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {showItemsTab && (
              <ScrollReveal distance={45}>
                <Card>
                  <h2 className="text-lg font-bold text-gray-900">
                    {details.itemsTitle || "Details"}
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {(details.items || []).map((item, index) => (
                      <ScrollReveal
                        key={`${item.name}-${index}`}
                        delay={index * 70}
                        distance={35}
                      >
                        <div className="rounded-lg border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md">
                          <h3 className="text-sm font-bold text-gray-900">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {item.duration || "N/A"}
                          </p>

                          <div className="mt-3 flex items-center gap-1 text-sm font-bold text-[#0b2a5b]">
                            <IndianRupee size={14} />
                            {String(item.fee || "N/A").replace("₹", "")}
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {activeTab === "Fees" && (
              <ScrollReveal distance={45}>
                <Card>
                  <h2 className="text-lg font-bold text-gray-900">
                    Fee Details
                  </h2>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[620px] border border-gray-200 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border-b p-3 text-left">
                            {isHostel
                              ? "Room Type"
                              : details.itemsTitle || "Name"}
                          </th>
                          <th className="border-b p-3 text-left">Duration</th>
                          <th className="border-b p-3 text-left">Fee</th>
                        </tr>
                      </thead>

                      <tbody>
                        {(details.items || []).map((item, index) => (
                          <tr key={`${item.name}-${index}`}>
                            <td className="border-b p-3">{item.name}</td>
                            <td className="border-b p-3">
                              {item.duration || "N/A"}
                            </td>
                            <td className="border-b p-3 font-bold text-[#0b2a5b]">
                              {item.fee || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {activeTab === "Admission" && !isHostel && !isOverseas && (
              <ScrollReveal distance={45}>
                <Card>
                  <h2 className="text-lg font-bold text-gray-900">
                    Admission Details
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Contact the institution directly for admission process,
                    eligibility, documents, and application deadlines.
                  </p>
                </Card>
              </ScrollReveal>
            )}

            {activeTab === "Facilities" && (
              <ScrollReveal distance={45}>
                <Card>
                  <h2 className="text-lg font-bold text-gray-900">
                    Facilities
                  </h2>

                  <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {(details.highlights || details.tags || []).map(
                      (item, index) => (
                        <ScrollReveal
                          key={`${item}-${index}`}
                          delay={index * 60}
                          distance={25}
                        >
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Check
                              size={15}
                              className="shrink-0 text-green-600"
                            />
                            {item}
                          </div>
                        </ScrollReveal>
                      )
                    )}
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {activeTab === "Reviews" && (
              <ScrollReveal distance={45}>
                <Card>
                  <h2 className="text-lg font-bold text-gray-900">Reviews</h2>

                  <div className="mt-3 rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-sm font-semibold text-white">
                        <Star size={14} fill="currentColor" />
                        {details.rating || "N/A"}
                      </div>

                      <p className="text-sm text-gray-600">
                        Based on {details.reviews || 0} reviews.
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            )}

            {activeTab === "Gallery" && (
              <ScrollReveal distance={45}>
                <Card>
                  <h2 className="text-lg font-bold text-gray-900">Gallery</h2>

                  <img
                    src={details.image}
                    alt={details.name}
                    className="mt-4 h-[320px] w-full rounded-lg object-cover"
                  />
                </Card>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={120} distance={45}>
            <aside className="h-fit rounded-xl bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold text-gray-900">
                Contact Details
              </h2>

              <div className="mt-4 space-y-4 text-sm text-gray-700">
                <p className="flex gap-3">
                  <Phone size={16} className="shrink-0 text-[#0b2a5b]" />
                  {details.contact?.phone || "N/A"}
                </p>

                <p className="flex gap-3 break-all">
                  <Mail size={16} className="shrink-0 text-[#0b2a5b]" />
                  {details.contact?.email || "N/A"}
                </p>

                <p className="flex gap-3 break-all">
                  <Globe size={16} className="shrink-0 text-[#0b2a5b]" />
                  {details.contact?.website || "N/A"}
                </p>

                <p className="flex gap-3">
                  <Navigation size={16} className="shrink-0 text-[#0b2a5b]" />
                  {details.contact?.address || "N/A"}
                </p>
              </div>

              <button
                onClick={handleShowInterest}
                className="mt-5 w-full rounded-md bg-[#071f4d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b2a5b]"
              >
                Enquire Now
              </button>
            </aside>
          </ScrollReveal>
        </section>

        <ScrollReveal delay={120} distance={50}>
          <LocationMap details={details} />
        </ScrollReveal>

        <ScrollReveal delay={140} distance={50}>
          <FeaturesStrip />
        </ScrollReveal>

        <ScrollReveal delay={160} distance={50}>
          <section className="mt-6 w-full rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Recommended {categoryTitle}
            </h2>

            {recommendedItems.length === 0 ? (
              <p className="mt-3 text-sm text-gray-500">
                No recommended listings available yet.
              </p>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recommendedItems.map((item, index) => (
                  <ScrollReveal
                    key={item.id}
                    delay={index * 80}
                    distance={40}
                  >
                    <Link
                      to={`/category/${routeSlug}/${item.id}`}
                      className="block rounded-lg border border-gray-200 p-3 transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-full rounded-md object-cover"
                      />

                      <h3 className="mt-3 text-sm font-bold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.location}, {item.city}
                      </p>

                      <p className="mt-2 text-xs font-semibold text-yellow-600">
                        ⭐ {item.rating} ({item.reviews})
                      </p>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </section>
        </ScrollReveal>
      </main>
    </div>
  );
}

function ScrollReveal({
  children,
  delay = 0,
  distance = 45,
  className = "",
}) {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [node]);

  return (
    <div
      ref={setNode}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0, 0, 0)"
          : `translate3d(0, ${distance}px, 0)`,
        transition: `opacity 750ms ease ${delay}ms, transform 750ms ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="w-full rounded-xl bg-white p-5 shadow-sm">{children}</div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-gray-900">{value}</p>
    </div>
  );
}