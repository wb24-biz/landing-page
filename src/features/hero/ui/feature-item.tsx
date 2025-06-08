import Image from "next/image";

export const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-center gap-3">
    <Image src="/icons/check.svg" alt="Check" width={24} height={24} />
    <span className="text-white text-base font-normal">{text}</span>
  </li>
);
