import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";
import { TradingSymbolOverviewWidget } from "./trading-symbol-overview-widget";

type MarketCard = {
  id: string;
  title: string;
  subtitle: string;
  symbol: string;
  mode: "intraday" | "live";
};

export async function MarketWidgetSection() {
  const t = await getTranslations("MarketWidget");

  const cards: MarketCard[] = [
    {
      id: "coffee-intraday",
      title: t("cards.2.title"),
      subtitle: t("cards.2.subtitle"),
      symbol: "KC1!",
      mode: "intraday",
    },
    {
      id: "coffee-live",
      title: t("cards.1.title"),
      subtitle: t("cards.1.subtitle"),
      symbol: "KC1!",
      mode: "live",
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

        <div className="mt-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
          {cards.map((card, index) => (
            <RevealOnScroll key={card.id} delayMs={170 + index * 60}>
              <article className="h-full min-w-0 rounded-[8px] border border-[#CBD6E2] bg-[#F9FBFD] p-4 shadow-[0_12px_26px_rgba(31,56,88,0.12)]">
                <div className="mb-3 border-b border-[#D4DEE8] pb-3">
                  <h3 className="text-[18px] leading-[1.2] font-semibold text-[#12365E]">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-[1.4] text-[#4D6782]">
                    {card.subtitle}
                  </p>
                </div>

                <TradingSymbolOverviewWidget symbol={card.symbol} mode={card.mode} />
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
