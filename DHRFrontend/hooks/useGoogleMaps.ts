/**
 * Custom hook for loading Google Maps API
 */

import { getGoogleMapsApiKey } from "@/services/googleMapsService";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export interface UseGoogleMapsReturn {
  isLoaded: boolean;
  loadError: Error | undefined;
  google: typeof google | undefined;
}

export const useGoogleMaps = (): UseGoogleMapsReturn => {
  const apiKey = getGoogleMapsApiKey();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || "",
    libraries: ["visualization", "places"],
  });

  const [googleInstance, setGoogleInstance] = useState<typeof google | undefined>(
    typeof window !== "undefined" && window.google ? window.google : undefined
  );

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined" && window.google) {
      setGoogleInstance(window.google);
    }
  }, [isLoaded]);

  return {
    isLoaded,
    loadError: loadError as Error | undefined,
    google: googleInstance,
  };
};

