import { z } from "zod";

export const registerNetworkSchema = z.object({
  registrarName: z.string().min(1, "Ім'я реєстратора є обов'язковим"),
  email: z
    .string()
    .email("Неправильний формат електронної адреси")
    .min(1, "Електронна адреса є обов'язковою"),
  phone: z.string().optional().or(z.literal("")), // Allow empty string or make it truly optional
  networkName: z.string().min(1, "Найменування мережі є обов'язковим"),
  networkType: z
    .string()
    .min(1, "Тип мережі є обов'язковим")
    .refine((val: string) => /^\d+$/.test(val), {
      message: "Тип мережі повинен бути числовим ID",
    }),
  tariff: z
    .string()
    .min(1, "Тариф є обов'язковим")
    .refine((val: string) => /^\d+$/.test(val), {
      message: "Тариф повинен бути числовим ID",
    }),
  country: z
    .string()
    .min(1, "Країна є обов'язковою")
    .refine((val: string) => /^\d+$/.test(val), {
      message: "Країна повинна бути числовим ID",
    }),
  additional: z.string().optional().or(z.literal("")), // Allow empty string
});

export type RegisterNetworkFormData = z.infer<typeof registerNetworkSchema>;

// This is the structure your API expects
export interface RegisterNetworkApiPayload {
  user_name: string;
  user_email: string;
  user_phone?: string;
  domain_name: string;
  domain_type: number;
  country_id: number;
  tariff_id: number;
  details?: string;
}
