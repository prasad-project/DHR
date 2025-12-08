/**
 * Google Maps API service wrapper
 */

/**
 * Load Google Maps script dynamically
 */
export const loadGoogleMapsScript = (
  apiKey: string,
  libraries: string[] = ["visualization"]
): Promise<typeof google> => {
  return new Promise((resolve, reject) => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      resolve(window.google);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(",")}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google && window.google.maps) {
        resolve(window.google);
      } else {
        reject(new Error("Google Maps failed to load"));
      }
    };

    script.onerror = () => {
      reject(new Error("Failed to load Google Maps script"));
    };

    document.head.appendChild(script);
  });
};

/**
 * Check if Google Maps is loaded
 */
export const isGoogleMapsLoaded = (): boolean => {
  return !!(window.google && window.google.maps);
};

/**
 * Get Google Maps API key from environment
 */
export const getGoogleMapsApiKey = (): string => {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
    "";

  if (!apiKey) {
    console.warn(
      "Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file"
    );
  }

  return apiKey;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google?: typeof google;
  }
}

