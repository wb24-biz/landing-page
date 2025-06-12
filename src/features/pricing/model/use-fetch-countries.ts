import { CONFIG } from "@/shared/model/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface CountryOption {
  country_id: number;
  name: string;
  banner?: string; // Optional, as it might not be used in the Select
}

interface CountriesApiResponse {
  status: string;
  data: CountryOption[];
  // Add other fields from the API response if necessary, e.g., pagination
}

const getCountries = async (): Promise<CountryOption[]> => {
  const response = await axios.get<CountriesApiResponse>(
    `${CONFIG.API_BASE_URL}/countries?limit=30&offset=0`, // Consider making limit/offset dynamic if needed
    {
      headers: {
        Accept: "application/json",
        // "Auth-User-Locale": "ua",
      },
    }
  );
  if (response.data && response.data.status === "success") {
    return response.data.data;
  }
  throw new Error("Failed to fetch countries or invalid response format");
};

export function useFetchCountries() {
  return useQuery<CountryOption[], Error>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
}
