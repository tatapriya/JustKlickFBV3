import Hero from "../components/Hero";
import ExploreCategories from "../components/ExploreCategories";
import RecommendedSection from "../components/RecommendedSection";
import HowItWorks from "../components/HowItWorks";
import CTASection from "../components/CTASection";
import ScrollReveal from "../components/ScrollReveal";
import FAQSection from  "../components/FAQSection";
import WhyChooseUs from "../components/WhyChooseUs";
import StatsSection from "../components/StatsSection";

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-white">
      <ScrollReveal distance={35}>
        <Hero />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <RecommendedSection />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <ExploreCategories />
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <HowItWorks />
      </ScrollReveal>

      <ScrollReveal delay={140}>
        <CTASection />
      </ScrollReveal>


      <ScrollReveal delay={160}>
        <WhyChooseUs />
      </ScrollReveal>

      <ScrollReveal delay={180}>
        <StatsSection />
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <FAQSection />
      </ScrollReveal>


    </main>
  );
}