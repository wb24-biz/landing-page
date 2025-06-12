import { CONFIG } from "@/shared/model/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface MachineTypeOption {
  type_id: number;
  unit: string;
  description: string;
}

interface MachineTypesApiResponse {
  status: string;
  data: MachineTypeOption[];
}

const getMachineTypes = async (): Promise<MachineTypeOption[]> => {
  const response = await axios.get<MachineTypesApiResponse>(
    `${CONFIG.API_BASE_URL}/machine/types`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (response.data && response.data.status === "success") {
    return response.data.data;
  }
  throw new Error("Failed to fetch machine types or invalid response format");
};

export function useFetchMachineTypes() {
  return useQuery<MachineTypeOption[], Error>({
    queryKey: ["machineTypes"],
    queryFn: getMachineTypes,
  });
}
