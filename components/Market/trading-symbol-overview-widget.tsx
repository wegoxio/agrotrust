"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { useLocale } from "next-intl";

type TradingSymbolOverviewWidgetProps = {
  symbol: string;
  mode: "intraday" | "live";
};

const WIDGET_SRC =
  "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";

export const TradingSymbolOverviewWidget = memo(function TradingSymbolOverviewWidget({
  symbol,
  mode,
}: TradingSymbolOverviewWidgetProps) {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetSymbol =
    symbol === "ICEUS:KC1!" || symbol === "KC1!" ? "CMCMARKETS:USCOFFEE" : symbol;

  const config = useMemo(
    () => ({
      lineWidth: 2,
      lineType: 0,
      chartType: "area",
      fontColor: "rgb(56, 66, 77)",
      gridLineColor: "rgba(31, 56, 88, 0.08)",
      volumeUpColor: "rgba(34, 171, 148, 0.5)",
      volumeDownColor: "rgba(247, 82, 95, 0.5)",
      backgroundColor: "#FFFFFF",
      widgetFontColor: "#1F3858",
      upColor: "#22ab94",
      downColor: "#f7525f",
      borderUpColor: "#22ab94",
      borderDownColor: "#f7525f",
      wickUpColor: "#22ab94",
      wickDownColor: "#f7525f",
      colorTheme: "light",
      isTransparent: false,
      locale: locale.startsWith("es") ? "es" : "en",
      chartOnly: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      valuesTracking: "1",
      changeMode: "price-and-percent",
      symbols: [[`${widgetSymbol}|${mode === "intraday" ? "60" : "1D"}`]],
      dateRanges:
        mode === "intraday"
          ? ["1d|15", "5d|30", "1m|60", "3m|120", "12m|1D", "all|1W"]
          : ["1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M"],
      fontSize: "10",
      headerFontSize: "medium",
      autosize: true,
      width: "100%",
      height: "100%",
      noTimeScale: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
    }),
    [locale, mode, widgetSymbol]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(config);

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [config]);

  return (
    <div className="tradingview-widget-container">
      <div
        ref={containerRef}
        className="h-[280px] w-full overflow-hidden rounded-[6px] border border-[#C7D3DF] bg-[#FFFFFF] sm:h-[310px] md:h-[340px]"
      />
      <div className="mt-1 px-1 text-right text-[11px] leading-none text-[#5C748E]">
        <a
          href={`https://www.tradingview.com/symbols/${widgetSymbol.replace(":", "-")}/`}
          rel="noopener nofollow"
          target="_blank"
          className="transition-colors hover:text-[#1F3858]"
        >
          Chart by TradingView
        </a>
      </div>
    </div>
  );
});
