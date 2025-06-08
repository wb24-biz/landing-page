import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";

export default function LanguageSelector() {
  const languages = [
    { code: "UA", label: "Українська" },
    { code: "EN", label: "English" },
    { code: "RU", label: "Русский" },
  ];

  return (
    <Popover>
      <PopoverTrigger className="z-50 cursor-pointer  rounded-full">
        <div className="w-14 font-semibold z-50 h-14 p-2 bg-[#002869] hover:bg-[#0057b7] hover:text-[#ffd700] hover:font-bold transition-all duration-300 flex items-center justify-center rounded-full text-white text-sm">
          UA
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className="w-full text-left px-3 py-2 flex items-center hover:bg-slate-100 rounded-md"
          >
            {lang.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
