import { z } from "zod";

export interface RegisterNetworkMessages {
  registrarNameRequired: string;
  emailInvalid: string;
  emailRequired: string;
  phoneInvalid: string;
  networkNameRequired: string;
  networkTypeRequired: string;
  networkTypeNumeric: string;
  tariffRequired: string;
  tariffNumeric: string;
  countryRequired: string;
  countryNumeric: string;
}

export function createRegisterNetworkSchema(m: RegisterNetworkMessages) {
  return z.object({
    registrarName: z.string().min(1, m.registrarNameRequired),
    email: z.string().email(m.emailInvalid).min(1, m.emailRequired),
    phone: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^\+\d{7,15}$/.test(val), {
        message: m.phoneInvalid,
      }),
    networkName: z.string().min(1, m.networkNameRequired),
    networkType: z
      .string()
      .min(1, m.networkTypeRequired)
      .refine((val: string) => /^\d+$/.test(val), {
        message: m.networkTypeNumeric,
      }),
    tariff: z
      .string()
      .min(1, m.tariffRequired)
      .refine((val: string) => /^\d+$/.test(val), {
        message: m.tariffNumeric,
      }),
    country: z
      .string()
      .min(1, m.countryRequired)
      .refine((val: string) => /^\d+$/.test(val), {
        message: m.countryNumeric,
      }),
    additional: z.string().optional().or(z.literal("")),
  });
}

export type RegisterNetworkFormData = z.infer<
  ReturnType<typeof createRegisterNetworkSchema>
>;

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
