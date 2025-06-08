import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/features/hero"));
const EquipmentIntegration = dynamic(
  () => import("@/features/equipment-integration")
);
const TelemetryCategoriesGrid = dynamic(() => import("@/features/telemetry"));
const FunctionalFeatures = dynamic(
  () => import("@/features/functional-features"),
  {
    loading: () => (
      <div className="h-60 animate-pulse bg-slate-100 rounded-lg"></div>
    ),
  }
);
const PricingPlans = dynamic(() => import("@/features/pricing"));

export default function Home() {
  return (
    <main className="mx-auto">
      <Hero />
      <TelemetryCategoriesGrid />
      <FunctionalFeatures />
      <EquipmentIntegration />
      <PricingPlans />
      {/* Here */}
    </main>
  );
}
