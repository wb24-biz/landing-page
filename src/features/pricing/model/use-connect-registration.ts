import { CONFIG } from "@/shared/model/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  RegisterNetworkApiPayload,
  RegisterNetworkFormData,
} from "./register-network-schema";

const registerNetworkApiCall = async (data: RegisterNetworkApiPayload) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/signup/new`, data);
  return response.data;
};

export function useConnectRegistration() {
  return useMutation<any, Error, RegisterNetworkFormData>({
    mutationFn: async (formData: RegisterNetworkFormData) => {
      const apiPayload: RegisterNetworkApiPayload = {
        user_name: formData.registrarName,
        user_email: formData.email,
        user_phone: formData.phone || undefined,
        domain_name: formData.networkName,
        domain_type: parseInt(formData.networkType, 10),
        tariff_id: parseInt(formData.tariff, 10),
        country_id: parseInt(formData.country, 10),
        details: formData.additional || undefined,
      };
      return registerNetworkApiCall(apiPayload);
    },
  });
}
