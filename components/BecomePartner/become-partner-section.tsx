import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";
import { SmoothScrollLink } from "@/components/Common/smooth-scroll-link";
import {
  BecomePartnerCarousel,
} from "./become-partner-carousel";
import type { BecomePartnerCardData } from "./become-partner-card";

export async function BecomePartnerSection() {
  const t = await getTranslations("BecomePartner");

  const cards: BecomePartnerCardData[] = [
    {
      title: t("cards.1.title"),
      subtitle: t("cards.1.subtitle"),
      description: t("cards.1.description"),
      imageSrc: "/images/becomePartner/become-partner-01.png",
      imageAlt: t("cards.1.imageAlt"),
    },
    {
      title: t("cards.2.title"),
      subtitle: t("cards.2.subtitle"),
      description: t("cards.2.description"),
      imageSrc: "/images/becomePartner/become-partner-02.png",
      imageAlt: t("cards.2.imageAlt"),
    },
    {
      title: t("cards.3.title"),
      subtitle: t("cards.3.subtitle"),
      description: t("cards.3.description"),
      imageSrc: "/images/becomePartner/become-partner-03.png",
      imageAlt: t("cards.3.imageAlt"),
    },
    {
      title: t("cards.4.title"),
      subtitle: t("cards.4.subtitle"),
      description: t("cards.4.description"),
      imageSrc: "/images/becomePartner/become-partner-04.png",
      imageAlt: t("cards.4.imageAlt"),
    },
    {
      title: t("cards.5.title"),
      subtitle: t("cards.5.subtitle"),
      description: t("cards.5.description"),
      imageSrc: "/images/becomePartner/become-partner-05.png",
      imageAlt: t("cards.5.imageAlt"),
    },
    {
      title: t("cards.6.title"),
      subtitle: t("cards.6.subtitle"),
      description: t("cards.6.description"),
      imageSrc: "/images/becomePartner/become-partner-06.png",
      imageAlt: t("cards.6.imageAlt"),
    },
    {
      title: t("cards.7.title"),
      subtitle: t("cards.7.subtitle"),
      description: t("cards.7.description"),
      imageSrc: "/images/becomePartner/become-partner-07.png",
      imageAlt: t("cards.7.imageAlt"),
    },
  ];

  return (
    <section id="partners" className="w-full bg-[#E6E8EB] py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-full px-5 md:px-8">
        <RevealOnScroll>
          <h2 className="text-[30px] leading-[1.08] font-normal text-[#5E6368] sm:text-[34px] md:text-[56px]">
            {t("title")}
          </h2>
        </RevealOnScroll>

        <div className="mt-4 grid gap-5 lg:grid-cols-2 lg:gap-10">
          <RevealOnScroll delayMs={70}>
            <div>
              <p className="text-[16px] leading-[1.4] font-semibold text-[#1F252C] md:text-[18px]">
                {t("leftTextPrefix")}{" "}
                <span className="text-primary">{t("leftTextHighlight")}</span>
              </p>

              <SmoothScrollLink
                href="#contact"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xs bg-primary px-7 text-[16px] leading-none font-semibold text-white transition-all duration-300 hover:bg-[#0A3973] sm:w-auto"
              >
                {t("cta")}
              </SmoothScrollLink>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={120}>
            <p className="text-[16px] leading-[1.55] font-normal text-[#4E565E] lg:pt-2 lg:text-right">
              {t("rightText")}
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delayMs={170}>
          <BecomePartnerCarousel
            cards={cards}
            previousLabel={t("controls.previous")}
            nextLabel={t("controls.next")}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
