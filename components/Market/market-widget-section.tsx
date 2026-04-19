import React from "react";
import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";
import { TradingMiniChart } from "./trading-mini-chart";

type MarketCard = {
  id: string;
  title: string;
  subtitle: string;
  symbol: string;
};

const widgetThemeVars: React.CSSProperties & Record<`--${string}`, string> = {
  colorScheme: "light",
  "--tv-widget-background-color": "#f2f6fb",
  "--tv-widget-text-color": "#31485f",
  "--tv-widget-price-text-color": "#1f334b",
  "--tv-widget-accent-color": "#2f5f95",
  "--tv-widget-positive-color": "#2d9a72",
  "--tv-widget-positive-area-top-color": "rgba(45, 154, 114, 0.18)",
  "--tv-widget-positive-area-bottom-color": "rgba(45, 154, 114, 0.04)",
  "--tv-widget-negative-color": "#d66576",
  "--tv-widget-negative-area-top-color": "rgba(214, 101, 118, 0.16)",
  "--tv-widget-negative-area-bottom-color": "rgba(214, 101, 118, 0.03)",
  "--tv-widget-scales-font-color": "#5d748d",
  "--tv-widget-tooltip-text-color": "#ecf3fc",
  "--tv-widget-tooltip-background-color": "#22456d",
};

export async function MarketWidgetSection() {
  const t = await getTranslations("MarketWidget");

  const cards: MarketCard[] = [
    {
      id: "coffee-a",
      title: t("cards.1.title"),
      subtitle: t("cards.1.subtitle"),
      symbol: "FPMARKETS:COFFEE",
    },
    {
      id: "coffee-b",
      title: t("cards.2.title"),
      subtitle: t("cards.2.subtitle"),
      symbol: "FPMARKETS:COFFEE",
    },
    {
      id: "coffee-c",
      title: t("cards.3.title"),
      subtitle: t("cards.3.subtitle"),
      symbol: "FPMARKETS:COFFEE",
    },
  ];

  return (
    <section id="market-widget" className="w-full bg-[#E6E8EB] py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-full px-5 md:px-8">
        <RevealOnScroll>
          <p className="text-[16px] leading-none font-bold tracking-[0.02em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={70}>
          <h2 className="mt-2 text-[30px] leading-[1.08] font-normal text-[#5E6368] sm:text-[34px] md:text-[56px]">
            {t("title")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delayMs={130}>
          <p className="mt-3 text-[15px] leading-[1.55] font-normal text-[#515960] sm:text-[16px]">
            {t("description")}
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => (
            <RevealOnScroll key={card.id} delayMs={170 + index * 60}>
              <article className="h-full min-w-0 rounded-[8px] border border-[#C6D1DD] bg-[linear-gradient(180deg,#F8FBFF_0%,#EEF3F9_100%)] p-4 shadow-[0_12px_26px_rgba(1,22,54,0.08)]">
                <div className="mb-3 border-b border-[#D4DEE8] pb-3">
                  <h3 className="text-[18px] leading-[1.2] font-semibold text-[#1F2A36]">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-[1.4] text-[#617285]">
                    {card.subtitle}
                  </p>
                </div>

                <div
                  className="min-w-0 overflow-hidden rounded-[6px] border border-[#D2DDE9] bg-[#F2F6FB]"
                  style={widgetThemeVars}
                >
                  <TradingMiniChart symbol={card.symbol} />
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
