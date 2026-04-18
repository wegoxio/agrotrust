import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";
import { PlatformAccordion } from "./platform-accordion";

export async function PlatformSection() {
  const t = await getTranslations("OurPlatform");

  const steps = [
    {
      title: t("steps.1.title"),
      description: t("steps.1.description"),
    },
    {
      title: t("steps.2.title"),
      description: t("steps.2.description"),
    },
    {
      title: t("steps.3.title"),
      description: t("steps.3.description"),
    },
    {
      title: t("steps.4.title"),
      description: t("steps.4.description"),
    },
  ];

  return (
    <section id="platform" className="w-full bg-[#E6E8EB] py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-full px-5 md:px-8">
        <div className="grid gap-7 sm:gap-8 lg:grid-cols-[1.04fr_1.1fr] lg:items-start lg:gap-10">
          <RevealOnScroll>
            <div>
              <p className="text-[16px] leading-none font-bold tracking-[0.02em] text-primary uppercase">
                {t("eyebrow")}
              </p>

              <h2 className="mt-2 text-[30px] leading-[1.08] font-normal text-[#5A5F65] sm:text-[34px] md:text-[56px]">
                {t("title")}
              </h2>

              <p className="mt-4 text-[15px] leading-[1.62] font-normal text-[#1D242A] sm:text-[16px]">
                {t("description")}
              </p>

              <PlatformAccordion steps={steps} />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={140} yOffset={32}>
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src="/images/our-platform/our-platform-01.png"
                alt={t("imageAlt")}
                width={1100}
                height={1260}
                className="h-auto w-full object-cover"
              />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
