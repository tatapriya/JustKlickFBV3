// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import {
//   MapPin,
//   ChevronDown,
//   User,
//   MessageCircle,
//   Menu,
//   X,
//   GraduationCap,
//   BookOpen,
//   Plane,
//   Home as HomeIcon,
//   Building2,
//   Search,
//   Navigation,
//   Info,
//   Bell,
//   Download,
// } from "lucide-react";

// import api from "../api/api";

// function Navbar() {
//   const navigate = useNavigate();

//   const [open, setOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const [searchText, setSearchText] = useState("");
//   const [location, setLocation] = useState("");
//   const [manualLocation, setManualLocation] = useState("");
//   const [locationOpen, setLocationOpen] = useState(false);

//   const [downloadActive, setDownloadActive] = useState(false);
//   const [downloadDone, setDownloadDone] = useState(false);

//   const [notificationsOpen, setNotificationsOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   const downloadTimerRef = useRef(null);
//   const resetTimerRef = useRef(null);
//   const locationBoxRef = useRef(null);

//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//   const authUser = JSON.parse(
//     localStorage.getItem("authUser")
//   );

//   const isAdmin = authUser?.role === "admin";

//   const unreadNotifications = notifications.filter(
//     (item) => item.admin_reply && !item.reply_seen
//   ).length;

//   const popularLocations = [
//     "Hyderabad",
//     "Kukatpally",
//     "Madhapur",
//     "Ameerpet",
//     "Secunderabad",
//     "Karimnagar",
//     "Warangal",
//     "Vijayawada",
//     "Guntur",
//     "Visakhapatnam",
//   ];

//   const categories = [
//     {
//       name: "Colleges",
//       path: "/category/colleges",
//       icon: GraduationCap,
//     },
//     {
//       name: "Hostels",
//       path: "/category/hostels",
//       icon: HomeIcon,
//     },
//     {
//       name: "Overseas Education",
//       path: "/category/overseas",
//       icon: Plane,
//     },
//     {
//       name: "Software Training",
//       path: "/category/software-training",
//       icon: BookOpen,
//     },
//     {
//       name: "Competitive Exams",
//       path: "/category/exams",
//       icon: Building2,
//     },
//     {
//       name: "Career Guidance",
//       path: "/category/more",
//       icon: GraduationCap,
//     },
//   ];

//   useEffect(() => {
//     return () => {
//       if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
//       if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
//     };
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (
//         locationBoxRef.current &&
//         !locationBoxRef.current.contains(event.target)
//       ) {
//         setLocationOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, []);

//   useEffect(() => {
//     if (isLoggedIn && !isAdmin) {
//       fetchNotifications();
//     }
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const res = await api.get("/enquiries/my/");
//       setNotifications(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getSearchCategoryPath = (text) => {
//     const value = text.toLowerCase().trim();

//     if (
//       value.includes("hostel") ||
//       value.includes("room") ||
//       value.includes("pg")
//     ) {
//       return "/category/hostels";
//     }

//     if (
//       value.includes("software") ||
//       value.includes("training") ||
//       value.includes("course") ||
//       value.includes("java") ||
//       value.includes("python") ||
//       value.includes("react") ||
//       value.includes("full stack") ||
//       value.includes("frontend") ||
//       value.includes("backend")
//     ) {
//       return "/category/software-training";
//     }

//     if (
//       value.includes("overseas") ||
//       value.includes("abroad") ||
//       value.includes("ielts") ||
//       value.includes("visa") ||
//       value.includes("study abroad")
//     ) {
//       return "/category/overseas";
//     }

//     if (
//       value.includes("exam") ||
//       value.includes("competitive") ||
//       value.includes("coaching")
//     ) {
//       return "/category/exams";
//     }

//     if (
//       value.includes("career") ||
//       value.includes("guidance") ||
//       value.includes("counselling") ||
//       value.includes("counseling")
//     ) {
//       return "/category/more";
//     }

//     return "/category/colleges";
//   };

//   const buildSearchUrl = (
//     selectedLocation = location,
//     typedSearch = searchText
//   ) => {
//     const params = new URLSearchParams();

//     if (typedSearch.trim()) {
//       params.set("search", typedSearch.trim());
//     }

//     if (selectedLocation.trim()) {
//       params.set("location", selectedLocation.trim());
//     }

//     const queryString = params.toString();
//     const path = getSearchCategoryPath(typedSearch);

//     return queryString ? `${path}?${queryString}` : path;
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();

//     const finalLocation = location.trim() || manualLocation.trim();

//     navigate(buildSearchUrl(finalLocation, searchText));
//     setLocationOpen(false);
//     setMobileOpen(false);
//   };

//   const handleLocationSelect = (selectedLocation) => {
//     setLocation(selectedLocation);
//     setManualLocation(selectedLocation);
//     setLocationOpen(false);

//     navigate(buildSearchUrl(selectedLocation, searchText));
//     setMobileOpen(false);
//   };

//   const handleManualLocationSubmit = () => {
//     const typedLocation = manualLocation.trim();

//     if (!typedLocation) return;

//     setLocation(typedLocation);
//     setLocationOpen(false);

//     navigate(buildSearchUrl(typedLocation, searchText));
//     setMobileOpen(false);
//   };

//   const handleUseCurrentLocation = () => {
//     const currentLocation = "Near Me";

//     setLocation(currentLocation);
//     setManualLocation(currentLocation);
//     setLocationOpen(false);

//     navigate(buildSearchUrl(currentLocation, searchText));
//     setMobileOpen(false);
//   };

//   const clearSearch = () => {
//     setSearchText("");
//     setLocation("");
//     setManualLocation("");
//     navigate("/category/colleges");
//   };

//   const handleProfileClick = () => {
//     if (isLoggedIn) {
//       navigate("/profile");
//     } else {
//       navigate("/login", {
//         state: {
//           from: "/profile",
//         },
//       });
//     }
//   };

//   const handleEnquiryClick = () => {
//     navigate("/enquiry");
//   };

//   const handleAboutClick = () => {
//     navigate("/about");
//   };

//   const handleDownloadApp = () => {
//     navigate("/download-app");
//   };

//   const renderSearchBar = (mobile = false) => (
//     <form
//       onSubmit={handleSearchSubmit}
//       className={`relative ${
//         mobile ? "mb-4 w-full" : "hidden flex-1 lg:block"
//       }`}
//     >
//       <div
//         className={`flex items-center overflow-visible rounded-full border border-gray-200 bg-[#f9fafb] shadow-sm transition focus-within:border-[#ef233c] focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 ${
//           mobile ? "h-[44px]" : "h-[42px] min-w-[360px] max-w-[520px]"
//         }`}
//       >
//         <div ref={locationBoxRef} className="relative">
//           <button
//             type="button"
//             onClick={() => {
//               setManualLocation(location);
//               setLocationOpen(!locationOpen);
//             }}
//             className="flex h-[42px] items-center gap-1 border-r border-gray-200 px-3 text-sm font-semibold text-[#0b2a5b] hover:text-[#ef233c]"
//           >
//             <MapPin size={17} />
//             <span className="hidden max-w-[90px] truncate sm:inline">
//               {location || "Location"}
//             </span>
//             <ChevronDown size={14} />
//           </button>
//         </div>

//         <div className="flex flex-1 items-center px-3">
//           <Search size={17} className="shrink-0 text-gray-400" />

//           <input
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             placeholder="Search colleges, hostels, training..."
//             className="w-full bg-transparent px-2 text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
//           />

//           {(searchText || location) && (
//             <button
//               type="button"
//               onClick={clearSearch}
//               className="mr-1 text-xs font-bold text-gray-400 hover:text-[#ef233c]"
//             >
//               ✕
//             </button>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="mr-1 flex h-[34px] items-center justify-center rounded-full bg-[#ef233c] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#d90429]"
//         >
//           Search
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
//       <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-6">
//         <Link to="/" className="shrink-0 leading-none">
//           <div className="text-[26px] font-extrabold tracking-tight">
//             <span className="text-[#ef233c]">Just</span>
//             <span className="text-[#0b2a5b]">Klick</span>
//           </div>

//           <p className="mt-1 text-[10px] font-semibold text-gray-400">
//             Student Platform
//           </p>
//         </Link>

//         {renderSearchBar(false)}

//         <div className="hidden items-center gap-5 lg:flex">
//           <button
//             onClick={() => navigate("/category/colleges")}
//             className="text-sm font-semibold text-gray-700 hover:text-[#ef233c]"
//           >
//             Explore
//           </button>

//           <div className="relative">
//             <button
//               onClick={() => setOpen(!open)}
//               className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-[#ef233c]"
//             >
//               Categories <ChevronDown size={15} />
//             </button>

//             {open && (
//               <div className="absolute left-0 top-10 z-[70] w-60 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
//                 {categories.map((item) => {
//                   const Icon = item.icon;

//                   return (
//                     <button
//                       key={item.name}
//                       onClick={() => {
//                         navigate(item.path);
//                         setOpen(false);
//                       }}
//                       className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#ef233c]"
//                     >
//                       <Icon size={16} />
//                       {item.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="hidden items-center gap-2 lg:flex">
//           {isAdmin && (
//             <button
//               onClick={() => navigate("/admin")}
//               className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
//             >
//               Admin Panel
//             </button>
//           )}

//           <button
//             onClick={handleAboutClick}
//             className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
//           >
//             <Info size={15} />
//             About Us
//           </button>

//           <button
//             onClick={handleEnquiryClick}
//             className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
//           >
//             <MessageCircle size={15} />
//             Enquiry
//           </button>

//           <button
//             onClick={handleDownloadApp}
//             className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
//           >
//             <Download size={15} />
//             Download App
//           </button>

//           {!isAdmin && isLoggedIn && (
//             <div className="relative">
//               <button
//                 onClick={() =>
//                   setNotificationsOpen(!notificationsOpen)
//                 }
//                 className="relative flex h-[36px] w-[36px] items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
//               >
//                 <Bell size={18} />

//                 {unreadNotifications > 0 && (
//                   <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
//                     {unreadNotifications}
//                   </span>
//                 )}
//               </button>

//               {notificationsOpen && (
//                 <div className="absolute right-0 top-12 z-[100] max-h-[400px] w-[340px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
//                   <div className="border-b border-gray-100 p-4">
//                     <h3 className="text-sm font-bold text-gray-800">
//                       Notifications
//                     </h3>
//                   </div>

//                   {notifications.filter(
//                     (item) => item.admin_reply
//                   ).length === 0 ? (
//                     <p className="p-4 text-sm text-gray-500">
//                       No notifications available
//                     </p>
//                   ) : (
//                     notifications
//                       .filter((item) => item.admin_reply)
//                       .map((item) => (
//                         <div
//                           key={item.id}
//                           className="border-b border-gray-100 p-4 hover:bg-gray-50"
//                         >
//                           <p className="text-sm font-semibold text-[#0b2a5b]">
//                             {item.listing_title}
//                           </p>

//                           <p className="mt-1 text-xs text-gray-500">
//                             Status: {item.status}
//                           </p>

//                           <p className="mt-2 text-sm text-gray-700">
//                             {item.admin_reply}
//                           </p>
//                         </div>
//                       ))
//                   )}
//                 </div>
//               )}
//             </div>
//           )}

//           <button
//             onClick={handleProfileClick}
//             className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
//           >
//             <User size={15} />
//             Profile
//           </button>
//         </div>

//         <button
//           onClick={() => setMobileOpen(!mobileOpen)}
//           className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 lg:hidden"
//         >
//           {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Navbar;


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
  Bell,
} from "lucide-react";

import api from "../api/api";

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

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [notifications, setNotifications] = useState([]);

  const downloadTimerRef = useRef(null);
  const resetTimerRef = useRef(null);
  const locationBoxRef = useRef(null);

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const authUser = JSON.parse(
    localStorage.getItem("authUser")
  );

  const isAdmin = authUser?.role === "admin";

  const unreadNotifications = notifications.filter(
    (item) => item.admin_reply && !item.reply_seen
  ).length;

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
      if (downloadTimerRef.current)
        clearTimeout(downloadTimerRef.current);

      if (resetTimerRef.current)
        clearTimeout(resetTimerRef.current);
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

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn && !isAdmin) {
      fetchNotifications();
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/enquiries/my/");
      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      params.set(
        "location",
        selectedLocation.trim()
      );
    }

    const queryString = params.toString();

    const path = getSearchCategoryPath(
      typedSearch
    );

    return queryString
      ? `${path}?${queryString}`
      : path;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const finalLocation =
      location.trim() || manualLocation.trim();

    navigate(
      buildSearchUrl(
        finalLocation,
        searchText
      )
    );

    setLocationOpen(false);
    setMobileOpen(false);
  };

  const handleLocationSelect = (
    selectedLocation
  ) => {
    setLocation(selectedLocation);
    setManualLocation(selectedLocation);
    setLocationOpen(false);

    navigate(
      buildSearchUrl(
        selectedLocation,
        searchText
      )
    );

    setMobileOpen(false);
  };

  const handleManualLocationSubmit = () => {
    const typedLocation =
      manualLocation.trim();

    if (!typedLocation) return;

    setLocation(typedLocation);
    setLocationOpen(false);

    navigate(
      buildSearchUrl(
        typedLocation,
        searchText
      )
    );

    setMobileOpen(false);
  };

  const handleUseCurrentLocation = () => {
    const currentLocation = "Near Me";

    setLocation(currentLocation);
    setManualLocation(currentLocation);
    setLocationOpen(false);

    navigate(
      buildSearchUrl(
        currentLocation,
        searchText
      )
    );

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

  const renderSearchBar = (
    mobile = false
  ) => (
    <form
      onSubmit={handleSearchSubmit}
      className={`relative ${mobile
        ? "mb-4 w-full"
        : "hidden flex-1 lg:block"
        }`}
    >
      <div
        className={`flex items-center overflow-visible rounded-full border border-gray-200 bg-[#f9fafb] shadow-sm transition focus-within:border-[#ef233c] focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 ${mobile
          ? "h-[44px]"
          : "h-[42px] min-w-[360px] max-w-[520px]"
          }`}
      >
        <div
          ref={locationBoxRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setManualLocation(location);
              setLocationOpen(!locationOpen);
            }}
            className="flex h-[42px] items-center gap-1 border-r border-gray-200 px-3 text-sm font-semibold text-[#0b2a5b] hover:text-[#ef233c]"
          >
            <MapPin size={17} />

            <span className="hidden max-w-[90px] truncate sm:inline">
              {location || "Location"}
            </span>

            <ChevronDown size={14} />
          </button>
        </div>

        <div className="flex flex-1 items-center px-3">
          <Search
            size={17}
            className="shrink-0 text-gray-400"
          />

          <input
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
            placeholder="Search colleges, hostels, training..."
            className="w-full bg-transparent px-2 text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400"
          />

          {(searchText || location) && (
            <button
              type="button"
              onClick={clearSearch}
              className="mr-1 text-xs font-bold text-gray-400 hover:text-[#ef233c]"
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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-6">
        <Link
          to="/"
          className="shrink-0 leading-none"
        >
          <div className="text-[26px] font-extrabold tracking-tight">
            <span className="text-[#ef233c]">
              Just
            </span>

            <span className="text-[#0b2a5b]">
              Klick
            </span>
          </div>

          <p className="mt-1 text-[10px] font-semibold text-gray-400">
            Student Platform
          </p>
        </Link>

        {renderSearchBar(false)}

        <div className="hidden items-center gap-5 lg:flex">
          <button
            onClick={() =>
              navigate("/category/colleges")
            }
            className="text-sm font-semibold text-gray-700 hover:text-[#ef233c]"
          >
            Explore
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-[#ef233c]"
            >
              Categories
              <ChevronDown size={15} />
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
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
            >
              Admin Panel
            </button>
          )}

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

          {!isAdmin && (
            <button
              onClick={handleDownloadApp}
              className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
            >
              <Navigation size={15} />
              Download App
            </button>
          )}

          {!isAdmin && isLoggedIn && (
            <div className="relative">
              <button
                onClick={() =>
                  setNotificationsOpen(
                    !notificationsOpen
                  )
                }
                className="relative flex h-[36px] w-[36px] items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
              >
                <Bell size={18} />

                {unreadNotifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-[100] max-h-[420px] w-[360px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <h3 className="text-sm font-bold text-gray-800">
                      Notifications
                    </h3>

                    <button
                      onClick={() =>
                        setNotificationsOpen(false)
                      }
                      className="text-xs font-semibold text-red-500"
                    >
                      Close
                    </button>
                  </div>

                  {notifications.filter(
                    (item) =>
                      item.admin_reply &&
                      !item.reply_seen
                  ).length === 0 ? (
                    <p className="p-4 text-sm text-gray-500">
                      No notifications available
                    </p>
                  ) : (
                    notifications
                      .filter(
                        (item) =>
                          item.admin_reply &&
                          !item.reply_seen
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          className="border-b border-gray-100 p-4 hover:bg-gray-50"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div
                              onClick={() => {
                                navigate(
                                  "/enquiry",
                                  {
                                    state: {
                                      enquiryData:
                                        item,
                                      openNotification: true,
                                    },
                                  }
                                );

                                setNotificationsOpen(
                                  false
                                );
                              }}
                              className="flex-1 cursor-pointer"
                            >
                              <p className="text-sm font-semibold text-[#0b2a5b]">
                                {item.listing_title}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                Status: {item.status}
                              </p>

                              <p className="mt-2 line-clamp-3 text-sm text-gray-700">
                                {item.admin_reply}
                              </p>

                              <p className="mt-2 text-xs font-semibold text-[#ef233c]">
                                Click to view
                              </p>
                            </div>

                            <button
                              onClick={async () => {
                                try {
                                  await api.patch(
                                    `/enquiries/${item.id}/`,
                                    {
                                      reply_seen: true,
                                    }
                                  );

                                  setNotifications(
                                    (prev) =>
                                      prev.filter(
                                        (n) =>
                                          n.id !==
                                          item.id
                                      )
                                  );
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-600 hover:bg-red-100"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleProfileClick}
            className="flex h-[36px] items-center gap-1 rounded-full border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
          >
            <User size={15} />
            Profile
          </button>
        </div>

        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 lg:hidden"
        >
          {mobileOpen ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;