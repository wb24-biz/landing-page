import EquipmentIntegration from "@/features/equipment-integration";
import Faq from "@/features/faq";
import FunctionalFeatures from "@/features/functional-features";
import Hero from "@/features/hero";
import PricingPlans from "@/features/pricing";
import TelemetryCategoriesGrid from "@/features/telemetry";

export default function Home() {
  return (
    <main className="mx-auto">
      <section id="service">
        <Hero />
      </section>
      <TelemetryCategoriesGrid />
      <section
        id="functional"
        className="py-16 rounded-[40px] my-12 bg-[url('/images/frame.svg')] bg-center bg-no-repeat bg-cover"
      >
        <FunctionalFeatures />
      </section>
      <EquipmentIntegration />
      <section id="pricing" className="mx-auto container py-12">
        <PricingPlans />
      </section>
      <Faq />
    </main>
  );
}
