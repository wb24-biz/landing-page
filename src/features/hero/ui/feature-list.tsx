import { FeatureItem } from "./feature-item";

const features = [
  { text: "Відстежування продаж в реальному часі" },
  { text: "Контроль залишків інгредієнтів та товарів" },
  { text: "Онлайн оплата по QR або NFC" },
  { text: "Фіскалізація продаж" },
  { text: "Миттєве сповіщення відмов" },
  { text: "Керування всіма типами вендингових мереж" },
];

export const FeatureList = () => {
  return (
    <ul className="space-y-4 ml-8 max-w-max">
      {features.map((feature, idx) => (
        <FeatureItem key={idx} text={feature.text} />
      ))}
    </ul>
  );
};
