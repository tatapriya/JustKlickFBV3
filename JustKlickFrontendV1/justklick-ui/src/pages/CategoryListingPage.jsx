import { useMemo, useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import api from "../api/api";

const ratings = ["4.5 above", "4.0 above", "3.5 above"];

const slugAliases = {
  "software-training": "software-training",
  "training-institutes": "software-training",
  overseas: "overseas",
  "overseas-education": "overseas",
  more: "career-guidance",
};

const categoryTitles = {
  colleges: {
    title: "Colleges",
    subtitle: "Degree programs and institutions",
    mainFilterTitle: "College Type",
    feeMax: 250000,
  },
  hostels: {
    title: "Hostels",
    subtitle: "Rooms and student stay options",
    mainFilterTitle: "Hostel Type",
    feeMax: 20000,
  },
  overseas: {
    title: "Overseas Education",
    subtitle: "Abroad education consulting",
    mainFilterTitle: "Country",
    feeMax: 100000,
  },
  "software-training": {
    title: "Software Training",
    subtitle: "Learning and software courses",
    mainFilterTitle: "Training Type",
    feeMax: 100000,
  },
  "career-guidance": {
    title: "Career Guidance",
    subtitle: "Career support and counselling services",
    mainFilterTitle: "Service Type",
    feeMax: 50000,
  },
  exams: {
    title: "Competitive Exams",
    subtitle: "Exam coaching and preparation institutes",
    mainFilterTitle: "Exam Type",
    feeMax: 150000,
  },
};

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .trim();

const extractNumber = (value) => {
  if (typeof value === "number") return value;

  const number = String(value || "")
    .replace(/,/g, "")
    .match(/\d+/);

  return number ? Number(number[0]) : 0;
};

const splitTextToTags = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const categorySearchAliases = {
  colleges: ["college", "colleges"],
  hostels: ["hostel", "hostels", "pg", "room", "rooms"],
  overseas: [
    "overseas",
    "overseas education",
    "abroad",
    "study abroad",
    "visa",
    "ielts",
  ],
  "software-training": [
    "software",
    "software training",
    "training",
    "course",
    "courses",
    "python",
    "java",
    "react",
    "full stack",
    "frontend",
    "backend",
  ],
  "career-guidance": [
    "career",
    "career guidance",
    "counselling",
    "counseling",
  ],
  exams: ["exam", "exams", "competitive", "coaching"],
};

export default function CategoryListingPage() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const routeSlug = categorySlug || "colleges";
  const dataKey = slugAliases[routeSlug] || routeSlug;

  const pageInfo = categoryTitles[dataKey] || {
    title: "Category",
    subtitle: "Explore available listings",
    mainFilterTitle: "Category",
    feeMax: 500000,
  };

  const isOverseas = dataKey === "overseas";

  const urlSearch = searchParams.get("search") || "";
  const urlLocation = searchParams.get("location") || "";

  const [backendListings, setBackendListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState("");

  const [search, setSearch] = useState(urlSearch);
  const [manualLocation, setManualLocation] = useState(urlLocation);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedMainFilters, setSelectedMainFilters] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [feeRange, setFeeRange] = useState(pageInfo.feeMax);
  const [page, setPage] = useState(1);

  const perPage = 4;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setBackendError("");

        const response = await api.get(`/listings/?category=${dataKey}`);

        const normalizedListings = response.data.map((item) => {
          const tags = [
            ...splitTextToTags(item.courses),
            ...splitTextToTags(item.facilities),
          ];

          return {
            id: item.id,
            name: item.name,
            slug: item.slug,
            image:
              item.image ||
              "https://images.unsplash.com/photo-1562774053-701939374585?w=700",
            city: item.city || "",
            state: item.state || "Telangana",
            location: item.area || "",
            area: item.area || "",
            address: item.address || "",
            rating: Number(item.rating || 0),
            reviews: item.reviews || 0,
            fees: extractNumber(item.fee),
            feeLabel: item.fee || "Not specified",
            category:
              item.category_title ||
              pageInfo.mainFilterTitle ||
              item.category_slug ||
              "General",
            categorySlug: item.category_slug,
            description: item.description || "",
            courses: item.courses || "",
            facilities: item.facilities || "",
            tags,
            phone: item.phone || "",
            website: item.website || "",
            established: item.established || "",
            isRecommended: item.is_recommended,
            isActive: item.is_active,
            createdAt: item.created_at,
          };
        });

        setBackendListings(normalizedListings);
      } catch (error) {
        console.error("Backend listing fetch error:", error);
        setBackendError("Unable to fetch listings from backend.");
        setBackendListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [dataKey, pageInfo.mainFilterTitle]);

  const data = backendListings;

  useEffect(() => {
    setSearch(urlSearch);
    setManualLocation(urlLocation);
    setSelectedCities([]);
    setSelectedLocations([]);
    setSelectedMainFilters([]);
    setRatingFilter("");
    setSortBy("popularity");
    setFeeRange(pageInfo.feeMax);
    setPage(1);
  }, [dataKey, pageInfo.feeMax, urlSearch, urlLocation]);

  useEffect(() => {
    if (!urlLocation || normalize(urlLocation) === "near me") {
      return;
    }

    const value = normalize(urlLocation);

    if (isOverseas) {
      const matchedCountry = data.find((item) =>
        normalize(item.category).includes(value)
      );

      if (matchedCountry) {
        setSelectedMainFilters([matchedCountry.category]);
      }

      setPage(1);
      return;
    }

    const matchedCity = data.find((item) =>
      normalize(item.city).includes(value)
    );

    if (matchedCity) {
      setSelectedCities([matchedCity.city]);
      setSelectedLocations([]);
      setPage(1);
      return;
    }

    const matchedArea = data.find((item) =>
      normalize(item.location).includes(value)
    );

    if (matchedArea) {
      setSelectedCities([matchedArea.city]);
      setSelectedLocations([matchedArea.location]);
      setPage(1);
    }
  }, [urlLocation, data, isOverseas]);

  const cities = useMemo(() => {
    if (isOverseas) return [];
    return [...new Set(data.map((item) => item.city).filter(Boolean))];
  }, [data, isOverseas]);

  const locations = useMemo(() => {
    if (isOverseas) return [];

    if (selectedCities.length === 0) {
      return [];
    }

    return [
      ...new Set(
        data
          .filter((item) => selectedCities.includes(item.city))
          .map((item) => item.location)
          .filter(Boolean)
      ),
    ];
  }, [data, selectedCities, isOverseas]);

  const mainFilters = useMemo(() => {
    return [...new Set(data.map((item) => item.category).filter(Boolean))];
  }, [data]);

  const updateUrl = (nextSearch = search, nextLocation = manualLocation) => {
    const params = new URLSearchParams();

    if (nextSearch.trim()) {
      params.set("search", nextSearch.trim());
    }

    if (nextLocation.trim()) {
      params.set("location", nextLocation.trim());
    }

    setSearchParams(params);
  };

  const toggleFilter = (value, selected, setter) => {
    const updated = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    setter(updated);
    setPage(1);
  };

  const handleCityToggle = (city) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter((item) => item !== city)
      : [...selectedCities, city];

    setSelectedCities(updatedCities);
    setSelectedLocations([]);
    setPage(1);

    if (updatedCities.length === 1) {
      setManualLocation(updatedCities[0]);
      updateUrl(search, updatedCities[0]);
    } else {
      setManualLocation("");
      updateUrl(search, "");
    }
  };

  const handleLocationToggle = (area) => {
    const updatedLocations = selectedLocations.includes(area)
      ? selectedLocations.filter((item) => item !== area)
      : [...selectedLocations, area];

    setSelectedLocations(updatedLocations);
    setPage(1);

    if (updatedLocations.length === 1) {
      setManualLocation(updatedLocations[0]);
      updateUrl(search, updatedLocations[0]);
    } else if (selectedCities.length === 1) {
      setManualLocation(selectedCities[0]);
      updateUrl(search, selectedCities[0]);
    } else {
      setManualLocation("");
      updateUrl(search, "");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateUrl(search, manualLocation);
    setPage(1);
  };

  const filteredData = useMemo(() => {
    let result = data.filter((item) => {
      const searchValue = normalize(search);
      const locationValue = normalize(urlLocation);

      const categoryAliases = categorySearchAliases[dataKey] || [];

      const searchText = `
        ${item.name || ""}
        ${item.city || ""}
        ${item.state || ""}
        ${item.location || ""}
        ${item.category || ""}
        ${item.description || ""}
        ${item.address || ""}
        ${item.courses || ""}
        ${item.facilities || ""}
        ${(item.tags || []).join(" ")}
      `.toLowerCase();

      const locationText = `
        ${item.city || ""}
        ${item.location || ""}
        ${item.state || ""}
        ${item.category || ""}
        ${item.address || ""}
      `.toLowerCase();

      const isCategorySearch =
        categoryAliases.includes(searchValue) ||
        normalize(pageInfo.title) === searchValue;

      const matchesSearch =
        !searchValue || isCategorySearch || searchText.includes(searchValue);

      const matchesUrlLocation =
        !locationValue ||
        locationValue === "near me" ||
        locationText.includes(locationValue);

      const matchesCity =
        isOverseas ||
        selectedCities.length === 0 ||
        selectedCities.includes(item.city);

      const matchesLocation =
        isOverseas ||
        selectedLocations.length === 0 ||
        selectedLocations.includes(item.location);

      const matchesMainFilter =
        selectedMainFilters.length === 0 ||
        selectedMainFilters.includes(item.category);

      const matchesRating =
        !ratingFilter || Number(item.rating || 0) >= parseFloat(ratingFilter);

      const matchesFees = Number(item.fees || 0) <= feeRange;

      return (
        matchesSearch &&
        matchesUrlLocation &&
        matchesCity &&
        matchesLocation &&
        matchesMainFilter &&
        matchesRating &&
        matchesFees
      );
    });

    if (sortBy === "rating") {
      result = [...result].sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
      );
    }

    if (sortBy === "feesLow") {
      result = [...result].sort(
        (a, b) => Number(a.fees || 0) - Number(b.fees || 0)
      );
    }

    if (sortBy === "feesHigh") {
      result = [...result].sort(
        (a, b) => Number(b.fees || 0) - Number(a.fees || 0)
      );
    }

    return result;
  }, [
    data,
    search,
    urlLocation,
    selectedCities,
    selectedLocations,
    selectedMainFilters,
    ratingFilter,
    feeRange,
    sortBy,
    isOverseas,
    dataKey,
    pageInfo.title,
  ]);

  const totalPages = Math.ceil(filteredData.length / perPage);
  const currentData = filteredData.slice((page - 1) * perPage, page * perPage);

  const clearFilters = () => {
    setSearch("");
    setManualLocation("");
    setSelectedCities([]);
    setSelectedLocations([]);
    setSelectedMainFilters([]);
    setRatingFilter("");
    setSortBy("popularity");
    setFeeRange(pageInfo.feeMax);
    setPage(1);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#ef233c]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-700">{pageInfo.title}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
          <ScrollReveal direction="left" distance={70}>
            <aside className="h-fit rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-900">Filters</h2>

                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-[#ef233c] hover:underline"
                >
                  Clear All
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="mb-6">
                <p className="mb-2 text-xs font-bold text-gray-700">Search</p>

                <div className="flex gap-2">
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    placeholder={
                      isOverseas
                        ? "Search by consultancy or country..."
                        : "Search by name, city, area..."
                    }
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#ef233c]"
                  />

                  <button
                    type="submit"
                    className="rounded-md bg-[#071f4d] px-3 py-2 text-xs font-semibold text-white hover:bg-[#ef233c]"
                  >
                    Go
                  </button>
                </div>

                <p className="mb-2 mt-4 text-xs font-bold text-gray-700">
                  Manual Location
                </p>

                <div className="flex gap-2">
                  <input
                    value={manualLocation}
                    onChange={(e) => {
                      setManualLocation(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Type any city or area..."
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#ef233c]"
                  />

                  <button
                    type="submit"
                    className="rounded-md bg-[#ef233c] px-3 py-2 text-xs font-semibold text-white hover:bg-[#d90429]"
                  >
                    Apply
                  </button>
                </div>

                <p className="mt-2 text-[11px] text-gray-400">
                  Example: Hyderabad, hyd, KPHB, Ameerpet, Karimnagar
                </p>
              </form>

              {isOverseas ? (
                <FilterGroup
                  title="Country"
                  items={mainFilters}
                  selected={selectedMainFilters}
                  onToggle={(item) =>
                    toggleFilter(
                      item,
                      selectedMainFilters,
                      setSelectedMainFilters
                    )
                  }
                />
              ) : (
                <>
                  <FilterGroup
                    title="City"
                    items={cities}
                    selected={selectedCities}
                    onToggle={handleCityToggle}
                  />

                  {selectedCities.length > 0 && (
                    <FilterGroup
                      title={`Area / Location in ${selectedCities.join(", ")}`}
                      items={locations}
                      selected={selectedLocations}
                      onToggle={handleLocationToggle}
                    />
                  )}

                  <FilterGroup
                    title={pageInfo.mainFilterTitle}
                    items={mainFilters}
                    selected={selectedMainFilters}
                    onToggle={(item) =>
                      toggleFilter(
                        item,
                        selectedMainFilters,
                        setSelectedMainFilters
                      )
                    }
                  />
                </>
              )}

              <div className="mb-6 border-t border-gray-100 pt-4">
                <p className="mb-3 text-xs font-bold text-gray-700">
                  Fees Range
                </p>

                <input
                  type="range"
                  min="0"
                  max={pageInfo.feeMax}
                  step="1000"
                  value={feeRange}
                  onChange={(e) => {
                    setFeeRange(Number(e.target.value));
                    setPage(1);
                  }}
                  className="w-full accent-red-500"
                />

                <div className="mt-1 flex justify-between text-[10px] text-red-500">
                  <span>₹0</span>
                  <span>₹{feeRange.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="mb-3 text-xs font-bold text-gray-700">Rating</p>

                <div className="space-y-2">
                  {ratings.map((item) => {
                    const value = item.split(" ")[0];

                    return (
                      <label
                        key={item}
                        className="flex cursor-pointer items-center gap-2 text-xs text-gray-600"
                      >
                        <input
                          type="radio"
                          name={`${dataKey}-rating`}
                          checked={ratingFilter === value}
                          onChange={() => {
                            setRatingFilter(value);
                            setPage(1);
                          }}
                          className="accent-[#ef233c]"
                        />
                        ⭐ {item}
                      </label>
                    );
                  })}

                  {ratingFilter && (
                    <button
                      type="button"
                      onClick={() => {
                        setRatingFilter("");
                        setPage(1);
                      }}
                      className="mt-2 text-xs font-semibold text-[#ef233c]"
                    >
                      Clear rating
                    </button>
                  )}
                </div>
              </div>
            </aside>
          </ScrollReveal>

          <main>
            <ScrollReveal direction="up" distance={30}>
              <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {pageInfo.title}
                  </h1>

                  <p className="text-xs text-gray-500">
                    {loading
                      ? "Loading listings from backend..."
                      : `${pageInfo.subtitle} • Showing ${currentData.length} of ${filteredData.length} results`}
                  </p>

                  {backendError && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      {backendError}
                    </p>
                  )}
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 sm:w-44"
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="feesLow">Fees: Low to High</option>
                  <option value="feesHigh">Fees: High to Low</option>
                </select>
              </div>
            </ScrollReveal>

            {(search ||
              urlLocation ||
              selectedCities.length > 0 ||
              selectedLocations.length > 0 ||
              selectedMainFilters.length > 0 ||
              ratingFilter) && (
              <ScrollReveal direction="up" distance={25}>
                <div className="mb-4 flex flex-wrap gap-2">
                  {search && <ActiveChip label={`Search: ${search}`} />}

                  {urlLocation && (
                    <ActiveChip label={`Location: ${urlLocation}`} />
                  )}

                  {selectedCities.map((item) => (
                    <ActiveChip key={item} label={`City: ${item}`} />
                  ))}

                  {selectedLocations.map((item) => (
                    <ActiveChip key={item} label={`Area: ${item}`} />
                  ))}

                  {selectedMainFilters.map((item) => (
                    <ActiveChip
                      key={item}
                      label={`${
                        isOverseas ? "Country" : pageInfo.mainFilterTitle
                      }: ${item}`}
                    />
                  ))}

                  {ratingFilter && (
                    <ActiveChip label={`Rating: ${ratingFilter}+`} />
                  )}
                </div>
              </ScrollReveal>
            )}

            <div className="space-y-4">
              {loading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="grid gap-4 md:grid-cols-[180px_1fr_auto]">
                      <div className="h-36 rounded-lg bg-gray-200" />
                      <div>
                        <div className="h-4 w-1/2 rounded bg-gray-200" />
                        <div className="mt-3 h-3 w-2/3 rounded bg-gray-200" />
                        <div className="mt-5 h-3 w-full rounded bg-gray-200" />
                        <div className="mt-3 h-3 w-5/6 rounded bg-gray-200" />
                      </div>
                      <div className="h-9 w-24 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}

              {!loading &&
                currentData.map((item, index) => (
                  <ScrollReveal
                    key={item.id}
                    direction="up"
                    distance={45}
                    delay={index * 90}
                  >
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                      <div className="grid gap-4 md:grid-cols-[180px_1fr_auto]">
                        <Link to={`/category/${routeSlug}/${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-36 w-full cursor-pointer rounded-lg object-cover transition hover:scale-[1.02] md:w-[180px]"
                          />
                        </Link>

                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h2 className="text-base font-bold text-gray-900">
                                {item.name}
                              </h2>

                              <p className="mt-1 text-xs text-gray-500">
                                {isOverseas
                                  ? `${item.city}, ${item.state}`
                                  : `${item.location}, ${item.city}, ${item.state}`}
                              </p>
                            </div>

                            <p className="whitespace-nowrap text-xs font-semibold text-gray-700">
                              ⭐ {item.rating}{" "}
                              <span className="text-gray-400">
                                ({item.reviews})
                              </span>
                            </p>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {(item.tags || []).slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <p className="mt-3 max-w-2xl text-xs leading-5 text-gray-600">
                            {item.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-600">
                            <span className="font-semibold text-gray-800">
                              {isOverseas
                                ? "Country"
                                : pageInfo.mainFilterTitle}
                              : {item.category}
                            </span>

                            <span className="font-semibold text-gray-800">
                              Fees: {item.feeLabel}
                            </span>

                            {item.established && (
                              <span className="font-semibold text-gray-800">
                                Est: {item.established}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-end justify-end">
                          <Link
                            to={`/category/${routeSlug}/${item.id}`}
                            className="rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:border-[#ef233c] hover:text-[#ef233c]"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}

              {!loading && currentData.length === 0 && (
                <ScrollReveal direction="up" distance={40}>
                  <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                    <h3 className="text-sm font-bold text-gray-800">
                      No results found
                    </h3>
                    <p className="mt-2 text-xs text-gray-500">
                      Try searching with another location like Hyderabad, hyd,
                      KPHB, Ameerpet, Kukatpally or clear filters.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 rounded-md bg-[#071f4d] px-4 py-2 text-xs font-semibold text-white"
                    >
                      Clear Filters
                    </button>
                  </div>
                </ScrollReveal>
              )}
            </div>

            {!loading && totalPages > 1 && (
              <ScrollReveal direction="up" distance={30}>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="rounded-md border bg-white px-3 py-2 text-xs disabled:opacity-40"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (num) => (
                      <button
                        key={num}
                        onClick={() => setPage(num)}
                        className={`h-8 w-8 rounded-md text-xs font-semibold ${
                          page === num
                            ? "bg-[#071f4d] text-white"
                            : "border bg-white text-gray-600"
                        }`}
                      >
                        {num}
                      </button>
                    )
                  )}

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="rounded-md border bg-white px-3 py-2 text-xs disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </ScrollReveal>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function ScrollReveal({
  children,
  delay = 0,
  distance = 45,
  direction = "up",
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

  const getTransform = () => {
    if (visible) return "translate3d(0, 0, 0)";

    if (direction === "left") {
      return `translate3d(-${distance}px, 0, 0)`;
    }

    if (direction === "right") {
      return `translate3d(${distance}px, 0, 0)`;
    }

    return `translate3d(0, ${distance}px, 0)`;
  };

  return (
    <div
      ref={setNode}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 750ms ease ${delay}ms, transform 750ms ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function FilterGroup({ title, items, selected, onToggle }) {
  return (
    <div className="mb-6 border-t border-gray-100 pt-4">
      <p className="mb-3 text-xs font-bold text-gray-700">{title}</p>

      <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
        {items.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center gap-2 text-xs text-gray-600"
          >
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => onToggle(item)}
              className="accent-[#ef233c]"
            />
            {item}
          </label>
        ))}

        {items.length === 0 && (
          <p className="text-xs text-gray-400">No filters available</p>
        )}
      </div>
    </div>
  );
}

function ActiveChip({ label }) {
  return (
    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
      {label}
    </span>
  );
}