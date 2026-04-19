"use client";

import React, { useEffect, useState } from "react";

const TV_WIDGET_SRC = "https://widgets.tradingview-widget.com/w/en/tv-mini-chart.js";

let scriptLoadPromise: Promise<void> | null = null;

function ensureTradingViewScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.customElements.get("tv-mini-chart")) {
    return Promise.resolve();
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TV_WIDGET_SRC}"]`
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load TradingView widget script.")),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = TV_WIDGET_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load TradingView widget script."));
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

export function TradingMiniChart({ symbol }: { symbol: string }) {
  const [isReady, setIsReady] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.customElements.get("tv-mini-chart") !== undefined;
  });

  useEffect(() => {
    let isMounted = true;

    ensureTradingViewScript()
      .then(() => {
        if (isMounted) {
          setIsReady(true);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsReady(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isReady) {
    return (
      <div className="h-[220px] w-full animate-pulse rounded-[4px] bg-[linear-gradient(180deg,#E8EFF7_0%,#DEE8F4_100%)] sm:h-[250px] md:h-[290px]" />
    );
  }

  return React.createElement("tv-mini-chart", {
    symbol,
    theme: "light",
    style: {
      display: "block",
      width: "100%",
      minWidth: "0",
      height: "clamp(220px, 34vw, 290px)",
    },
  });
}
