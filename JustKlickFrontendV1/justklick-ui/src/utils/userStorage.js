export const WISHLIST_BASE_KEY = "wishlistItems";
export const DOWNLOADS_BASE_KEY = "downloadItems";
export const ENQUIRIES_BASE_KEY = "enquiryItems";
export const COMPARE_BASE_KEY = "compareItems";

export const isUserLoggedIn = () => {
  const token = localStorage.getItem("authToken");
  const user = localStorage.getItem("authUser");

  return Boolean(token && user);
};

export const getLoggedInUser = () => {
  try {
    const authUser = localStorage.getItem("authUser");

    if (!authUser) return null;

    const user = JSON.parse(authUser);

    return {
      id: user.id,
      name: user.first_name || user.name || "User",
      first_name: user.first_name || user.name || "User",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "student",
      location: user.location || user.city || "",
      city: user.city || "",
      state: user.state || "",
    };
  } catch (error) {
    console.error("User parse error:", error);
    return null;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
  localStorage.removeItem("isLoggedIn");

  // Old keys cleanup
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("user");
};

export const getUserKey = (user = null) => {
  const currentUser = user || getLoggedInUser();

  if (!currentUser) return "guest";

  return (
    currentUser.email ||
    currentUser.phone ||
    currentUser.id ||
    currentUser.name ||
    "guest"
  )
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-");
};

export const getStorageKey = (baseKey) => {
  return `${baseKey}_${getUserKey()}`;
};

export const readUserItems = (baseKey) => {
  try {
    const storageKey = getStorageKey(baseKey);
    const data = localStorage.getItem(storageKey);

    if (!data) return [];

    const parsed = JSON.parse(data);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Read storage error for ${baseKey}:`, error);
    return [];
  }
};

export const writeUserItems = (baseKey, items) => {
  try {
    const storageKey = getStorageKey(baseKey);

    localStorage.setItem(storageKey, JSON.stringify(items || []));

    window.dispatchEvent(new CustomEvent("user-storage-updated"));
  } catch (error) {
    console.error(`Write storage error for ${baseKey}:`, error);
  }
};

export const clearOldWishlistKeys = () => {
  try {
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);

      if (
        key &&
        (key === WISHLIST_BASE_KEY ||
          key === DOWNLOADS_BASE_KEY ||
          key === ENQUIRIES_BASE_KEY ||
          key === COMPARE_BASE_KEY)
      ) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error("Old storage cleanup error:", error);
  }
};