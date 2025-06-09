import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CONFIG } from "@/shared/model/config"; // Attempting alias path
import { RegisterNetworkFormData, RegisterNetworkApiPayload } from "./register-network-schema";
// To show notifications, you can use a library like 'sonner' or 'react-toastify'
// import { toast } from "sonner";

const registerNetworkApiCall = async (data: RegisterNetworkApiPayload) => {
  // The API endpoint is /signup/new as per your screenshot
  const response = await axios.post(`${CONFIG.API_BASE_URL}/signup/new`, data);
  return response.data;
};

export function useConnectRegistration() {
  return useMutation<any, Error, RegisterNetworkFormData>({
    mutationFn: async (formData: RegisterNetworkFormData) => {
      const apiPayload: RegisterNetworkApiPayload = {
        user_name: formData.registrarName,
        user_email: formData.email,
        user_phone: formData.phone || undefined, // API might expect undefined for empty optional fields
        domain_name: formData.networkName,
        domain_type: parseInt(formData.networkType, 10), // Zod schema ensures this is a numeric string
        tariff_id: parseInt(formData.tariff, 10),       // Zod schema ensures this is a numeric string
        country_id: parseInt(formData.country, 10),     // Zod schema ensures this is a numeric string
        details: formData.additional || undefined,
      };
      return registerNetworkApiCall(apiPayload);
    },
    // onSuccess and onError are handled in the component for better context (e.g., closing dialog)
  });
}