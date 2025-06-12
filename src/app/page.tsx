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
      <section id="service">
        <Hero />
      </section>
      <section id="telemetry" className="w-full container mx-auto py-8">
        <TelemetryCategoriesGrid />
      </section>
      <section
        id="functional"
        className="py-16 rounded-[40px] my-12 bg-[url('/images/frame.svg')] bg-center bg-no-repeat bg-cover"
      >
        <FunctionalFeatures />
      </section>
      <section
        id="equipment"
        className="relative overflow-hidden px-12 py-12 container mx-auto rounded-3xl"
      >
        <EquipmentIntegration />
      </section>
      <section id="pricing" className="mx-auto container py-12">
        <PricingPlans />
      </section>
      {/* Here */}
    </main>
  );
}
