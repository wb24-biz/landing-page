import { CONFIG } from "@/shared/model/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface TariffOption {
  tariff_id: number;
  name: string;
  description: string;
  price: string;
  created_at: string;
}

interface TariffsApiResponse {
  status: string;
  data: TariffOption[];
}

const fetchTariffs = async (): Promise<TariffOption[]> => {
  const response = await axios.get<TariffsApiResponse>(
    `${CONFIG.API_BASE_URL}/tariffs`,
    {
      headers: {
        Accept: "application/json",
        // "Auth-User-Locale": "ua", // As per the API screenshot
      },
    }
  );
  if (response.data.status === "success" && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  throw new Error(
    "Failed to fetch tariffs: API responded with non-success status or unexpected data structure"
  );
};

export function useFetchTariffs() {
  return useQuery<TariffOption[], Error>({
    queryKey: ["tariffs"],
    queryFn: fetchTariffs,
  });
}
