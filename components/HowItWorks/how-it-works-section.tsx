import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";
import { HowItWorksChip } from "./how-it-works-chip";

export async function HowItWorksSection() {
  const t = await getTranslations("HowItWorks");

  const chips = [
    t("chips.1"),
    t("chips.2"),
    t("chips.3"),
    t("chips.4"),
  ];

  return (
    <section id="how-it-works" className="relative w-full overflow-hidden">
      <Image
        src="/images/Hero/hero_slide_2.webp"
        alt={t("backgroundAlt")}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(104deg,rgba(3,28,76,0.92)_0%,rgba(5,44,111,0.78)_50%,rgba(18,85,166,0.52)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,20,53,0.46)_0%,rgba(3,20,53,0.72)_100%)]" />

      <div className="relative z-10 mx-auto max-w-full px-5 py-8 sm:py-10 md:px-8 md:py-14">
        <RevealOnScroll>
          <p className="text-[16px] leading-none font-bold tracking-[0.02em] text-[#BFD2ED] uppercase">
            {t("eyebrow")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={70}>
          <h2 className="mt-4 text-[30px] leading-[1.18] font-normal text-[#F2F7FF] sm:text-[36px] md:text-[56px]">
            {t("titlePrefix")}{" "}
            <span className="font-semibold text-[#5E8FD2]">{t("titleHighlight")}</span>{" "}
            {t("titleSuffix")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delayMs={130}>
          <p className="mt-5 text-[16px] leading-[1.6] font-normal text-[#E8F0FA]">
            {t("paragraph1")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={170}>
          <p className="mt-4 text-[16px] leading-[1.6] font-normal text-[#E8F0FA]">
            {t("paragraph2Prefix")}{" "}
            <span className="border-b border-[#648DC4] pb-[1px] font-semibold text-[#5D89C0]">
              {t("paragraph2Highlight")}
            </span>
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={220} className="mt-8 md:mt-10">
          <div className="rounded-[4px] border border-[rgba(216,227,246,0.32)] bg-[linear-gradient(180deg,rgba(95,136,192,0.24)_0%,rgba(52,98,161,0.22)_100%)] px-4 py-6 backdrop-blur-[2px] sm:px-5 sm:py-7 md:px-8 md:py-10">
            <div className="flex flex-col items-center">
              <svg
                aria-hidden
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#79A2DB]"
              >
                <path
                  d="M12 3L19 6V11.4C19 15.3 16.6 18.9 12 21C7.4 18.9 5 15.3 5 11.4V6L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.4 11.9L11.2 13.7L14.8 10.3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h3 className="mt-4 text-center text-[22px] leading-[1.2] font-normal text-[#F1F6FF] sm:text-[28px] md:text-[42px]">
                {t("cardTitle")}
              </h3>

              <div className="mt-6 grid w-full gap-3 md:grid-cols-2 md:gap-4">
                {chips.map((chip, index) => (
                  <RevealOnScroll key={chip} delayMs={300 + index * 70} yOffset={16}>
                    <HowItWorksChip label={chip} />
                  </RevealOnScroll>
                ))}
              </div>

              <p className="mt-6 text-center text-[16px] leading-[1.45] font-normal italic text-[#DEEAFB]">
                {t("cardFooter")}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
