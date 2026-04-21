import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";
import { StepFlowCarousel, type StepFlowSlide } from "./step-flow-carousel";

export async function StepFlowSection() {
  const t = await getTranslations("StepFlow");

  const slides: StepFlowSlide[] = [
    {
      tab: t("slides.1.tab"),
      title: t("slides.1.title"),
      description: t("slides.1.description"),
      imageSrc: "/images/stepFlow/step-flow-01.png",
      imageAlt: t("slides.1.imageAlt"),
    },
    {
      tab: t("slides.2.tab"),
      title: t("slides.2.title"),
      lead: t("slides.2.lead"),
      bullets: [
        t("slides.2.bullets.1"),
        t("slides.2.bullets.2"),
        t("slides.2.bullets.3"),
        t("slides.2.bullets.4"),
        t("slides.2.bullets.5"),
        t("slides.2.bullets.6"),
        t("slides.2.bullets.7"),
      ],
      imageSrc: "/images/stepFlow/step-flow-02.png",
      imageAlt: t("slides.2.imageAlt"),
    },
    {
      tab: t("slides.3.tab"),
      title: t("slides.3.title"),
      description: t("slides.3.description"),
      imageSrc: "/images/stepFlow/step-flow-03.png",
      imageAlt: t("slides.3.imageAlt"),
    },
    {
      tab: t("slides.4.tab"),
      title: t("slides.4.title"),
      description: t("slides.4.description"),
      imageSrc: "/images/stepFlow/step-flow-04.png",
      imageAlt: t("slides.4.imageAlt"),
    },
    {
      tab: t("slides.5.tab"),
      title: t("slides.5.title"),
      description: t("slides.5.description"),
      imageSrc: "/images/stepFlow/step-flow-05.png",
      imageAlt: t("slides.5.imageAlt"),
    },
    {
      tab: t("slides.6.tab"),
      title: t("slides.6.title"),
      description: t("slides.6.description"),
      imageSrc: "/images/stepFlow/step-flow-06.png",
      imageAlt: t("slides.6.imageAlt"),
    },
    {
      tab: t("slides.7.tab"),
      title: t("slides.7.title"),
      description: t("slides.7.description"),
      imageSrc: "/images/stepFlow/step-flow-07-v2.png",
      imageAlt: t("slides.7.imageAlt"),
    },
  ];

  return (
    <section id="step-flow" className="w-full bg-[#E6E8EB] py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-full px-5 md:px-8">
        <RevealOnScroll>
          <h2 className="text-center text-[30px] leading-none font-normal text-[#6A6F75] sm:text-[34px] md:text-[56px]">
            {t("title")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delayMs={80}>
          <p className="mt-4 text-center text-[16px] leading-[1.6] font-normal text-[#4B5258]">
            <span className="font-semibold text-primary">{t("descriptionHighlight")}</span>{" "}
            {t("descriptionSuffix")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={150}>
          <StepFlowCarousel
            slides={slides}
            previousLabel={t("controls.previous")}
            nextLabel={t("controls.next")}
            goToStepLabel={t("controls.goToStep")}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
