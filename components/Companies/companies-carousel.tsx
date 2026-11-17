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
        name: "Stanzione",
        href: "https://stanzione.com/",
        src: "/images/companies/logo-stanzione.png",
        alt: t("stanZioneAlt"),
        width: 491,
        height: 195,
      },
      {
        name: "DEFISA",
        href: "https://defisa.com",
        src: "/images/companies/logo-defisa.png",
        alt: t("defisaAlt"),
        width: 844,
        height: 121,
      },
      {
        name: "AVEX",
        href: "https://avex.com.ve/",
        src: "/images/companies/logo-avex.png",
        alt: t("avexAlt"),
        width: 381,
        height: 155,
      },
      {
        name: "Brige",
        href: "https://bridge.xyz/",
        src: "/images/companies/logo-bridge.png",
        alt: t("bridgeAlt"),
        width: 605,
        height: 165,
      },
      {
        name: "FECVE Lab",
        href: "https://www.fecvelab.com",
        src: "/images/companies/logo-fecve-lab.png",
        alt: t("fecveLabAlt"),
        width: 390,
        height: 133,
      },
      {
        name: "Italcambio",
        href: "https://www.italcambio.com/",
        src: "/images/companies/logo-italcambio.png",
        alt: t("italcambioAlt"),
        width: 780,
        height: 138,
      },
      {
        name: "Depositos Industriales",
        href: "https://www.instagram.com/depositos_industriales_sa?igsh=MWRkcjkzeHZ0czhvdg%3D%3D",
        src: "/images/companies/logo-depositos.png",
        alt: t("depositosAlt"),
        width: 240,
        height: 240,
      },
      {
        name: "Triangulo de Mocoties",
        href: "https://www.instagram.com/triangulodemocoties/",
        src: "/images/companies/logo-triangulo.png",
        alt: t("trianguloAlt"),
        width: 671,
        height: 147,
      },
      {
        name: "Activo Banco Universal",
        href: "https://www.bancoactivo.com/",
        src: "/images/companies/logo-banco-universal.png",
        alt: t("bancoUniversalAlt"),
        width: 799,
        height: 132,
      },
      {
        name: "Impulsa Venture Capital",
        href: "https://www.impulsa.vc/",
        src: "/images/companies/logo-impulsa.png",
        alt: t("impulsaAlt"),
        width: 599,
        height: 165,
      },
      {
        name: "Nuvira",
        href: "https://www.nuvira.io/",
        src: "/images/companies/logo-nuvira.png",
        alt: t("nuviraAlt"),
        width: 555,
        height: 174,
      },
      {
        name: "StoneX",
        href: "https://www.stonex.com/",
        src: "/images/companies/logo-stonex.png",
        alt: t("stonexAlt"),
        width: 670,
        height: 147,
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
    // La marquesina de partners se desplaza siempre (igual que el Hero) y se
    // pausa al pasar el mouse o al enfocar un logo.
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
