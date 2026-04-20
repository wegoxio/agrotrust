import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { HeroCarousel } from "@/components/Hero/hero-carousel";
import { CompaniesCarousel } from "@/components/Companies/companies-carousel";
import { AboutSection } from "@/components/About/about-section";
import { MarketWidgetSection } from "@/components/Market/market-widget-section";
import { PlatformSection } from "@/components/Platform/platform-section";
import { HowItWorksSection } from "@/components/HowItWorks/how-it-works-section";
import { StepFlowSection } from "@/components/StepFlow/step-flow-section";
import { VsLcSection } from "@/components/Comparison/vs-lc-section";
import { BecomePartnerSection } from "@/components/BecomePartner/become-partner-section";
import { ContactSection } from "@/components/Contact/contact-section";
import { FooterSection } from "@/components/Footer/footer-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main className="mx-auto flex min-h-screen w-full flex-col">
      <HeroCarousel locale={locale as AppLocale} />
      <CompaniesCarousel />
      <AboutSection />
      <MarketWidgetSection />
      <PlatformSection />
      <HowItWorksSection />
      <StepFlowSection />
      <VsLcSection />
      <BecomePartnerSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
