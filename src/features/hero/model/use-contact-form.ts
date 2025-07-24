import { CONFIG } from "@/shared/model/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface ContactFormData {
  contact: string;
  message: string;
}

const submitContactForm = async (data: ContactFormData) => {
  const response = await axios.post(`${CONFIG.API_BASE_URL}/signup/question`, data);
  return response.data;
};

export function useContactForm() {
  return useMutation<any, Error, ContactFormData>({
    mutationFn: submitContactForm,
  });
}