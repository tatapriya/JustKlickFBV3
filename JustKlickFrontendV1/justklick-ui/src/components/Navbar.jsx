import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  ChevronDown,
  User,
  MessageCircle,
  Menu,
  X,
  GraduationCap,
  BookOpen,
  Plane,
  Home as HomeIcon,
  Building2,
  Search,
  Navigation,
  Info,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [manualLocation, setManualLocation] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);

  const [downloadActive, setDownloadActive] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);

  const downloadTimerRef = useRef(null);
  const resetTimerRef = useRef(null);
  const locationBoxRef = useRef(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const popularLocations = [
    "Hyderabad",
    "Kukatpally",
    "Madhapur",
    "Ameerpet",
    "Secunderabad",
    "Karimnagar",
    "Warangal",
    "Vijayawada",
    "Guntur",
    "Visakhapatnam",
  ];

  const categories = [
    {
      name: "Colleges",
      path: "/category/colleges",
      icon: GraduationCap,
    },
    {
      name: "Hostels",
      path: "/category/hostels",
      icon: HomeIcon,
    },
    {
      name: "Overseas Education",
      path: "/category/overseas",
      icon: Plane,
    },
    {
      name: "Software Training",
      path: "/category/software-training",
      icon: BookOpen,
    },
    {
      name: "Competitive Exams",
      path: "/category/exams",
      icon: Building2,
    },
    {
      name: "Career Guidance",
      path: "/category/more",
      icon: GraduationCap,
    },
  ];

  useEffect(() => {
    return () => {
      if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        locationBoxRef.current &&
        !locationBoxRef.current.contains(event.target)
      ) {
        setLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getSearchCategoryPath = (text) => {
    const value = text.toLowerCase().trim();

    if (
      value.includes("hostel") ||
      value.includes("room") ||
      value.includes("pg")
    ) {
      return "/category/hostels";
    }

    if (
      value.includes("software") ||
      value.includes("training") ||
      value.includes("course") ||
      value.includes("java") ||
      value.includes("python") ||
      value.includes("react") ||
      value.includes("full stack") ||
      value.includes("frontend") ||
      value.includes("backend")
    ) {
      return "/category/software-training";
    }

    if (
      value.includes("overseas") ||
      value.includes("abroad") ||
      value.includes("ielts") ||
      value.includes("visa") ||
      value.includes("study abroad")
    ) {
      return "/category/overseas";
    }

    if (
      value.includes("exam") ||
      value.includes("competitive") ||
      value.includes("coaching")
    ) {
      return "/category/exams";
    }

    if (
      value.includes("career") ||
      value.includes("guidance") ||
      value.includes("counselling") ||
      value.includes("counseling")
    ) {
      return "/category/more";
    }

    return "/category/colleges";
  };

  const buildSearchUrl = (
    selectedLocation = location,
    typedSearch = searchText
  ) => {
    const params = new URLSearchParams();

    if (typedSearch.trim()) {
      params.set("search", typedSearch.trim());
    }

    if (selectedLocation.trim()) {
      params.set("location", selectedLocation.trim());
    }

    const queryString = params.toString();
    const path = getSearchCategoryPath(typedSearch);

    return queryString ? `${path}?${queryString}` : path;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const finalLocation = location.trim() || manualLocation.trim();

    navigate(buildSearchUrl(finalLocation, searchText));
    setLocationOpen(false);
    setMobileOpen(false);
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setManualLocation(selectedLocation);
    setLocationOpen(false);

    navigate(buildSearchUrl(selectedLocation, searchText));
    setMobileOpen(false);
  };

  const handleManualLocationSubmit = () => {
    const typedLocation = manualLocation.trim();

    if (!typedLocation) return;

    setLocation(typedLocation);
    setLocationOpen(false);

    navigate(buildSearchUrl(typedLocation, searchText));
    setMobileOpen(false);
  };

  const handleUseCurrentLocation = () => {
    const currentLocation = "Near Me";

    setLocation(currentLocation);
    setManualLocation(currentLocation);
    setLocationOpen(false);

    navigate(buildSearchUrl(currentLocation, searchText));
    setMobileOpen(false);
  };

  const clearSearch = () => {
    setSearchText("");
    setLocation("");
    setManualLocation("");
    navigate("/category/colleges");
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login", {
        state: {
          from: "/profile",
        },
      });
    }
  };

  const handleEnquiryClick = () => {
    navigate("/enquiry");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleDownloadApp = () => {
    navigate("/download-app");
  };

  const renderSearchBar = (mobile = false) => (
    <form
      onSubmit={handleSearchSubmit}
      className={`relative ${
        mobile ? "mb-4 w-full" : "hidden flex-1 lg:block"
      }`}
    >
      <div
        className={`flex items-center overflow-visible rounded-full border border-gray-200 bg-[#f9fafb] shadow-sm transition focus-within:border-[#ef233c] focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 ${
          mobile ? "h-[44px]" : "h-[42px] min-w-[360px] max-w-[520px]"
        }`}
      >
        <div ref={locationBoxRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setManualLocation(location);
              setLocationOpen(!locationOpen);
            }}
            className="flex h-[42px] items-center gap-1 border-r border-gray-200 px-3 text-sm font-semibold text-[#0b2a5b] hover:text-[#ef233c]"
            title="Select Location"
          >
            <MapPin size={17} />
            <span className="hidden max-w-[90px] truncate sm:inline">
              {location || "Location"}
            </span>
            <ChevronDown size={14} />
          </button>

          {locationOpen && (
            <div className="absolute left-0 top-12 z-[80] w-[280px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-bold text-[#0b2a5b]">
                  Select Location
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  Type any city or area manually
                </p>
              </div>

              <div className="border-b border-gray-100 p-3">
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 focus-within:border-[#ef233c]">
                  <MapPin size={15} className="shrink-0 text-gray-400" />

                  <input
                    type="text"
                    value={manualLocation}
                    onChange={(e) => {
                      setManualLocation(e.target.value);
                      setLocation(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleManualLocationSubmit();
                      }
                    }}
                    placeholder="Enter location manually"
                    className="w-full bg-transparent text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
                  />

                  {manualLocation && (
                    <button
                      type="button"
                      onClick={() => {
                        setManualLocation("");
                        setLocation("");
                      }}
                      className="text-xs font-bold text-gray-400 hover:text-[#ef233c]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleManualLocationSubmit}
                  className="mt-2 w-full rounded-lg bg-[#ef233c] px-3 py-2 text-xs font-bold text-white hover:bg-[#d90429]"
                >
                  Apply Location
                </button>
              </div>

              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left text-sm font-semibold text-[#ef233c] hover:bg-red-50"
              >
                <Navigation size={16} />
                Use current location
              </button>

              <div className="max-h-[240px] overflow-y-auto py-2">
                {popularLocations.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleLocationSelect(item)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium hover:bg-red-50 hover:text-[#ef233c] ${
                      location === item
                        ? "bg-red-50 text-[#ef233c]"
                        : "text-gray-700"
                    }`}
                  >
                    <MapPin size={15} />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 items-center px-3">
          <Search size={17} className="shrink-0 text-gray-400" />

          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search colleges, hostels, training..."
            className="w-full bg-transparent px-2 text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
          />

          {(searchText || location) && (
            <button
              type="button"
              onClick={clearSearch}
              className="mr-1 text-xs font-bold text-gray-400 hover:text-[#ef233c]"
              title="Clear Search"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          className="mr-1 flex h-[34px] items-center justify-center rounded-full bg-[#ef233c] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#d90429]"
        >
          Search
        </button>
      </div>
    </form>
  );

  const DownloadButton = ({ mobile = false }) => (
    <div
      className={`relative ${mobile ? "col-span-2 mx-auto mt-3" : "ml-2"}`}
      style={{
        perspective: "80rem",
        perspectiveOrigin: "50% 50% 0",
        width: mobile ? "10.8rem" : "10.6rem",
        height: mobile ? "2.45rem" : "2.35rem",
      }}
    >
      <div
        className={`relative h-full w-full transition-all duration-200 ease-linear [transform-style:preserve-3d] [transform-origin:50%_50%_0] ${
          downloadActive
            ? "[transform:rotateX(90deg)_translateZ(1.18rem)]"
            : "[transform:rotateX(0deg)]"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            handleDownloadApp();

            if (mobile) {
              setMobileOpen(false);
            }
          }}
          title="Download JustKlick App"
          className="absolute inset-0 flex h-full w-full items-center overflow-visible rounded-l-md border border-r-0 border-[#0b2a5b] bg-white pl-4 pr-[3.1rem] text-left text-[13px] font-semibold text-[#0b2a5b] shadow-sm transition hover:border-[#ef233c] hover:text-[#ef233c] [backface-visibility:hidden]"
        >
          <span className="whitespace-nowrap">Get App</span>

          <span
            className={`absolute right-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-md border border-[#0b2a5b] bg-white shadow-sm transition group-hover:-translate-y-1 ${
              mobile ? "h-[46px] w-[31px]" : "h-[50px] w-[34px]"
            }`}
          >
            <span className="absolute top-[6px] h-[2px] w-[11px] rounded-full bg-[#0b2a5b]" />
            <span className="absolute inset-[4px] rounded-[6px] bg-[#f8fbff]" />

            <span className="relative z-10 flex h-[22px] w-[22px] items-center justify-center">
              <span className="absolute top-[1px] h-[10px] w-[3px] animate-[downloadIconBounce_.55s_infinite_alternate] rounded-full bg-[#0b2a5b]" />
              <span className="absolute top-[8px] h-0 w-0 animate-[downloadIconBounce_.55s_infinite_alternate] border-l-[6px] border-r-[6px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#0b2a5b]" />
              <span className="absolute bottom-[1px] h-[7px] w-[18px] rounded-b-[3px] border-[2.5px] border-t-0 border-[#0b2a5b]" />
            </span>

            <span className="absolute bottom-[5px] h-[2px] w-[9px] rounded-full bg-[#cbd5e1]" />
          </span>
        </button>

        <div
          className={`absolute inset-0 h-full w-full overflow-hidden rounded-full border border-[#ef233c] bg-[#ef233c] text-center text-[13px] font-semibold text-white shadow-sm [transform:rotateX(270deg)] [transform-origin:top_center] ${
            mobile ? "leading-[2.45rem]" : "leading-[2.35rem]"
          }`}
        >
          <span
            className={`relative z-10 ${
              downloadDone
                ? "text-white"
                : "animate-[whitePulse_1s_infinite_alternate]"
            }`}
          >
            {downloadDone ? "Done!" : "Downloading..."}
          </span>

          <span
            className={`absolute bottom-0 top-0 block w-full transition-all duration-[4000ms] ease-linear ${
              downloadActive ? "right-0" : "right-full"
            }`}
            style={{
              backgroundImage:
                "linear-gradient(-45deg, rgba(255,255,255,0.12) 10%, rgba(255,255,255,0.22) 10%, rgba(255,255,255,0.22) 20%, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.22) 30%, rgba(255,255,255,0.22) 40%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.22) 60%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0.12) 70%, rgba(255,255,255,0.22) 70%, rgba(255,255,255,0.22) 80%, rgba(255,255,255,0.12) 80%, rgba(255,255,255,0.12) 90%, rgba(255,255,255,0.22) 90%, rgba(255,255,255,0.22))",
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <style>
        {`
          @keyframes downloadIconBounce {
            from {
              transform: translateY(-2px);
            }
            to {
              transform: translateY(0);
            }
          }

          @keyframes whitePulse {
            from {
              color: rgba(255, 255, 255, 0.45);
            }
            to {
              color: rgba(255, 255, 255, 1);
            }
          }
        `}
      </style>

      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-6">
        <Link to="/" className="shrink-0 leading-none">
          <div className="text-[26px] font-extrabold tracking-tight">
            <span className="text-[#ef233c]">Just</span>
            <span className="text-[#0b2a5b]">Klick</span>
          </div>

          <p className="mt-1 text-[10px] font-semibold text-gray-400">
            Student Platform
          </p>
        </Link>

        {renderSearchBar(false)}

        <div className="hidden items-center gap-5 lg:flex">
          <button
            onClick={() => navigate("/category/colleges")}
            className="text-sm font-semibold text-gray-700 hover:text-[#ef233c]"
          >
            Explore
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-[#ef233c]"
            >
              Categories <ChevronDown size={15} />
            </button>

            {open && (
              <div className="absolute left-0 top-10 z-[70] w-60 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
                {categories.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#ef233c]"
                    >
                      <Icon size={16} />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={handleAboutClick}
            className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
          >
            <Info size={15} />
            About Us
          </button>

          <button
            onClick={handleEnquiryClick}
            className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
          >
            <MessageCircle size={15} />
            Enquiry
          </button>

          <button
            onClick={handleProfileClick}
            className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
          >
            <User size={15} />
            Profile
          </button>

          <DownloadButton />
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 lg:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-4 lg:hidden">
          {renderSearchBar(true)}

          <div className="space-y-2">
            <button
              onClick={() => {
                navigate("/");
                setMobileOpen(false);
              }}
              className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-[#ef233c]"
            >
              Home
            </button>

            <button
              onClick={() => {
                navigate("/category/colleges");
                setMobileOpen(false);
              }}
              className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-[#ef233c]"
            >
              Explore
            </button>

            <button
              onClick={() => {
                handleAboutClick();
                setMobileOpen(false);
              }}
              className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-[#ef233c]"
            >
              About Us
            </button>

            <div className="rounded-md border border-gray-100 p-2">
              <p className="mb-2 px-2 text-xs font-bold text-gray-500">
                Categories
              </p>

              {categories.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setOpen(false);
                      setMobileOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-[#ef233c]"
                  >
                    <Icon size={16} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                handleEnquiryClick();
                setMobileOpen(false);
              }}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              Enquiry
            </button>

            <button
              onClick={() => {
                handleProfileClick();
                setMobileOpen(false);
              }}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              Profile
            </button>

            <DownloadButton mobile />
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;