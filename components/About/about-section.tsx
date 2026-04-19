import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";
import { AboutFeatureCard } from "./about-feature-card";

export async function AboutSection() {
  const t = await getTranslations("About");

  const cards = [
    {
      key: "origin" as const,
      href: "#how-it-works",
      title: t("cards.origin.title"),
      description: t("cards.origin.description"),
      cta: t("cards.origin.cta"),
    },
    {
      key: "platform" as const,
      href: "#platform",
      title: t("cards.platform.title"),
      description: t("cards.platform.description"),
      cta: t("cards.platform.cta"),
    },
    {
      key: "sourcing" as const,
      href: "#sourcing",
      title: t("cards.sourcing.title"),
      description: t("cards.sourcing.description"),
      cta: t("cards.sourcing.cta"),
    },
  ];

  return (
    <section id="about" className="w-full bg-[#E6E8EB] py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-full px-5 md:px-8">
        <RevealOnScroll>
          <p className="text-[16px] leading-none font-bold tracking-[0.02em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={80}>
          <h2 className="mt-3 max-w-[820px] text-[30px] leading-[1.1] font-normal tracking-[0px] text-[#5B5F63] sm:text-[34px] md:text-[56px]">
            {t("title")}
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid gap-x-12 gap-y-8 md:mt-14 md:grid-cols-3 md:gap-y-10 items-baseline-last">
          {cards.map((card, index) => (
            <RevealOnScroll key={card.key} delayMs={120 + index * 90}>
              <AboutFeatureCard
                variant={card.key}
                href={card.href}
                title={card.title}
                description={card.description}
                cta={card.cta}
              />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delayMs={260} className="mt-10 md:mt-12">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] sm:aspect-[16/7.5] md:aspect-[16/4.75]">
            <Image
              src="/images/about/about-01.jpg"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 1400px"
              className="object-cover"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
