"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { CompanyLogoItem, type CompanyLogo } from "./company-logo-item";

const BASE_SPEED_PX_PER_SEC = 90;
const SMOOTHING = 0.08;
const STOP_THRESHOLD_PX_PER_SEC = 0.5;

export function CompaniesCarousel() {
  const t = useTranslations("Companies");
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const setRef = useRef<HTMLDivElement | null>(null);
  const setWidthRef = useRef(0);
  const positionRef = useRef(0);
  const currentSpeedRef = useRef(BASE_SPEED_PX_PER_SEC);
  const targetSpeedRef = useRef(BASE_SPEED_PX_PER_SEC);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const logos = useMemo<CompanyLogo[]>(
    () => [
      {
        name: "ItalBank",
        href: "https://www.italbank.com/",
        src: "/images/companies/logo-ital-bank.png",
        alt: t("italBankAlt"),
        width: 210,
        height: 58,
      },
      {
        name: "DEFISA",
        href: "https://instagram.com/defisa_ve/",
        src: "/images/companies/logo-defisa.png",
        alt: t("defisaAlt"),
        width: 220,
        height: 54,
      },
      {
        name: "AVEX",
        href: "https://avex.com.ve/",
        src: "/images/companies/logo-avex.png",
        alt: t("avexAlt"),
        width: 228,
        height: 68,
      },
      {
        name: "Bolpriaven",
        href: "https://www.bolpriaven.net/",
        src: "/images/companies/logo_bolpriaven.png",
        alt: t("bolpriavenAlt"),
        width: 255,
        height: 66,
      },
      {
        name: "Agroinvest",
        href: "https://www.agroinvestcb.com/inicio",
        src: "/images/companies/logo-agroinvest.png",
        alt: t("agroinvestAlt"),
        width: 238,
        height: 80,
        imageClassName: "h-8 sm:h-9 md:h-[56px]",
      },
      {
        name: "Brisas del Gil",
        href: "https://www.instagram.com/brisasdelgil/",
        src: "/images/companies/logo-brisas-del-gil.png",
        alt: t("brisasDelGilAlt"),
        width: 220,
        height: 120,
        imageClassName: "h-8 sm:h-9 md:h-[58px]",
      },
      {
        name: "Conduit",
        href: "https://conduitpay.com/",
        src: "/images/companies/logo-conduit.png",
        alt: t("conduitAlt"),
        width: 213,
        height: 40,
      },
      {
        name: "FECVE Lab",
        href: "https://www.fecvelab.com",
        src: "/images/companies/logo-fecve-lab.png",
        alt: t("fecveLabAlt"),
        width: 260,
        height: 95,
      },
      {
        name: "Italcambio",
        href: "https://www.italcambio.com/",
        src: "/images/companies/logo-italcambio.png",
        alt: t("italcambioAlt"),
        width: 250,
        height: 52,
      },
    ],
    [t]
  );

  useEffect(() => {
    const el = setRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setWidthRef.current = el.offsetWidth;
    });

    setWidthRef.current = el.offsetWidth;
    observer.observe(el);

    return () => observer.disconnect();
  }, [logos.length]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (trackRef.current) {
        trackRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      return;
    }

    const step = (time: number) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = time;
      }

      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const speedDelta = targetSpeedRef.current - currentSpeedRef.current;
      currentSpeedRef.current +=
        speedDelta * SMOOTHING;
      if (
        Math.abs(speedDelta) < STOP_THRESHOLD_PX_PER_SEC &&
        targetSpeedRef.current === 0
      ) {
        currentSpeedRef.current = 0;
      }

      positionRef.current -= currentSpeedRef.current * dt;

      const width = setWidthRef.current;
      if (width > 0 && positionRef.current <= -width) {
        positionRef.current += width;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, []);

  const pauseCarousel = () => {
    targetSpeedRef.current = 0;
  };

  const resumeCarousel = () => {
    targetSpeedRef.current = BASE_SPEED_PX_PER_SEC;
  };

  return (
    <section id="network" className="w-full border-t-4 border-primary bg-white py-8 md:py-10">
      <div className="mx-auto max-w-full px-4 md:px-10">
        <div
          ref={containerRef}
          className="overflow-hidden"
          onMouseEnter={pauseCarousel}
          onMouseLeave={resumeCarousel}
          onFocusCapture={pauseCarousel}
          onBlurCapture={(event) => {
            const nextFocusedElement = event.relatedTarget as Node | null;
            const stillInside =
              !!nextFocusedElement &&
              !!containerRef.current?.contains(nextFocusedElement);

            if (!stillInside) {
              resumeCarousel();
            }
          }}
        >
          <div ref={trackRef} className="flex w-max will-change-transform">
            <div ref={setRef} className="flex items-center">
              {logos.map((logo) => (
                <CompanyLogoItem
                  key={`set-a-${logo.name}`}
                  logo={logo}
                  showDivider
                />
              ))}
            </div>

            <div className="flex items-center" aria-hidden>
              {logos.map((logo) => (
                <CompanyLogoItem
                  key={`set-b-${logo.name}`}
                  logo={logo}
                  showDivider
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[15px] leading-[1.55] font-normal italic text-[#69737D] sm:text-[16px] sm:leading-6 md:text-[18px] md:leading-6.5">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
