import { FunctionalFeaturesList } from "./ui/functional-features-list";

const FunctionalFeatures = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-[38px] font-bold text-[#00235B] text-center mb-2">
        Функціональні можливості
      </h2>
      <p className="text-center text-lg text-[#6A7281] mb-12 max-w-3xl mx-auto">
        Використання нашого сервісу дасть змогу ваш вендінговий бізнес
        контролювати в режимі онлайн 24/7, максимально оптимізувати і звести до
        нуля простої обладнання, а також значно скоротити витрати на
        обслуговування, та збільшити доходи.
      </p>
      <FunctionalFeaturesList />
    </div>
  );
};

export default FunctionalFeatures;
