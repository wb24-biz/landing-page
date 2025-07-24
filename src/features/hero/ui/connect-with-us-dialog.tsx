import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Textarea } from "@/shared/ui/kit/textarea";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import { useContactForm } from "../model/use-contact-form";

export function ConnectWithUsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("ConnectWithUsDialog");
  const [formData, setFormData] = useState({ contact: '', message: '' });
  const contactFormMutation = useContactForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    contactFormMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ contact: '', message: '' });
        // Close dialog after successful submission
        setTimeout(() => {
          onOpenChange(false);
        }, 2000);
      },
      onError: (error) => {
        console.error('Error submitting form:', error);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onOpenChange}>
        <div className="fixed inset-0 bg-[#00235BE5]" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[700px] transform overflow-hidden rounded-4xl bg-white px-4 py-12 md:p-14 text-left align-middle shadow-xl transition-all relative">
            <DialogTitle className="text-4xl text-[#00235B] font-extrabold text-center mb-2 ">
              {t("title")}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute cursor-pointer top-4 right-6 text-gray-400 hover:text-gray-500 transition-all"
              >
                <span className="sr-only">{t("closeButtonSR")}</span>
                <X
                  className="h-8 w-8 hover:text-[#136EFF]"
                  aria-hidden="true"
                />
              </button>
            </DialogTitle>
            <div className="text-xl text-center mb-8 text-[#00235B]">
              {t("subtitle")}
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder={t("contactPlaceholder")}
                  required
                  disabled={contactFormMutation.isPending}
                  className="h-12 text-xl placeholder:text-lg col-span-2"
                />
              </div>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t("questionPlaceholder")}
                rows={5}
                required
                disabled={contactFormMutation.isPending}
                className="placeholder:text-lg text-xl mb-6 col-span-2"
              />
              
              {contactFormMutation.isSuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {t("successMessage")}
                </div>
              )}
              
              {contactFormMutation.isError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {t("errorMessage")}
                </div>
              )}
              
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="xl"
                  variant="primaryBlue"
                  disabled={contactFormMutation.isPending || !formData.contact.trim() || !formData.message.trim()}
                  className="font-bold text-lg"
                >
                  {contactFormMutation.isPending ? t("submittingButton") : t("submitButton")}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
