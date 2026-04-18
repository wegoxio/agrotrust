import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";
import {
  DashboardStackCarousel,
  type DashboardSlide,
} from "./dashboard-stack-carousel";

export async function DashboardSection() {
  const t = await getTranslations("Dashboard");

  const slides: DashboardSlide[] = [
    {
      id: "tracking",
      title: t("slides.1.title"),
      description: t("slides.1.description"),
      panelCode: t("slides.1.panelCode"),
      panelMeta: t("slides.1.panelMeta"),
      panelOrigin: t("slides.1.panelOrigin"),
      panelEvents: [
        t("slides.1.events.1"),
        t("slides.1.events.2"),
        t("slides.1.events.3"),
        t("slides.1.events.4"),
        t("slides.1.events.5"),
      ],
      imageSrc: "/images/dashboard/dashboard-01.png",
      imageAlt: t("slides.1.imageAlt"),
      previewLabel: t("slides.1.previewLabel"),
    },
    {
      id: "documents",
      title: t("slides.2.title"),
      description: t("slides.2.description"),
      panelCode: t("slides.2.panelCode"),
      panelMeta: t("slides.2.panelMeta"),
      panelOrigin: t("slides.2.panelOrigin"),
      panelEvents: [
        t("slides.2.events.1"),
        t("slides.2.events.2"),
        t("slides.2.events.3"),
        t("slides.2.events.4"),
        t("slides.2.events.5"),
      ],
      imageSrc: "/images/dashboard/dashboard-02.png",
      imageAlt: t("slides.2.imageAlt"),
      previewLabel: t("slides.2.previewLabel"),
    },
    {
      id: "quality",
      title: t("slides.3.title"),
      description: t("slides.3.description"),
      panelCode: t("slides.3.panelCode"),
      panelMeta: t("slides.3.panelMeta"),
      panelOrigin: t("slides.3.panelOrigin"),
      panelEvents: [
        t("slides.3.events.1"),
        t("slides.3.events.2"),
        t("slides.3.events.3"),
        t("slides.3.events.4"),
        t("slides.3.events.5"),
      ],
      imageSrc: "/images/dashboard/dashboard-03.png",
      imageAlt: t("slides.3.imageAlt"),
      previewLabel: t("slides.3.previewLabel"),
    },
    {
      id: "settlement",
      title: t("slides.4.title"),
      description: t("slides.4.description"),
      panelCode: t("slides.4.panelCode"),
      panelMeta: t("slides.4.panelMeta"),
      panelOrigin: t("slides.4.panelOrigin"),
      panelEvents: [
        t("slides.4.events.1"),
        t("slides.4.events.2"),
        t("slides.4.events.3"),
        t("slides.4.events.4"),
        t("slides.4.events.5"),
      ],
      imageSrc: "/images/dashboard/dashboard-04.png",
      imageAlt: t("slides.4.imageAlt"),
      previewLabel: t("slides.4.previewLabel"),
    },
    {
      id: "audit",
      title: t("slides.5.title"),
      description: t("slides.5.description"),
      panelCode: t("slides.5.panelCode"),
      panelMeta: t("slides.5.panelMeta"),
      panelOrigin: t("slides.5.panelOrigin"),
      panelEvents: [
        t("slides.5.events.1"),
        t("slides.5.events.2"),
        t("slides.5.events.3"),
        t("slides.5.events.4"),
        t("slides.5.events.5"),
      ],
      imageSrc: "/images/dashboard/dashboard-05.png",
      imageAlt: t("slides.5.imageAlt"),
      previewLabel: t("slides.5.previewLabel"),
    },
  ];

  return (
    <section id="dashboard" className="w-full bg-[#E6E8EB] py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-full px-5 md:px-8">
        <RevealOnScroll>
          <p className="text-[16px] leading-none font-bold tracking-[0.02em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={60}>
          <h2 className="mt-2 text-[30px] leading-[1.08] font-normal text-[#5E6368] sm:text-[34px] md:text-[56px]">
            {t("title")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <p className="mt-3 text-[15px] leading-[1.55] font-normal text-[#515960] sm:text-[16px]">
            {t("description")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={170}>
          <DashboardStackCarousel
            slides={slides}
            previousLabel={t("controls.previous")}
            nextLabel={t("controls.next")}
            bottomSlogan={t("bottomSlogan")}
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
