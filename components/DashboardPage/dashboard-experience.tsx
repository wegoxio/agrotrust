"use client";

import Image from "next/image";
import { useState } from "react";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { HeroHeader } from "@/components/Hero/hero-header";
import { HeroFullscreenMenu } from "@/components/Hero/hero-fullscreen-menu";

const SLIDES = [
  {
    title: "1. Transaction Tracking",
    description: "Follow every step — from warehouse to final payment",
  },
  {
    title: "2. Asset & Collateral Visibility",
    description: "Follow every step — from warehouse to final payment",
  },
  {
    title: "3. Shipment Monitoring",
    description: "Track cargo in real time with live location and ETA",
  },
  {
    title: "4. Document Control",
    description: "Follow every step — from warehouse to final payment",
  },
  {
    title: "5. Escrow & Payment Tracking",
    description: "Track cargo in real time with live location and ETA",
  },
  {
    title: "6. Data & Analytics",
    description: "Understand timelines, performance, and capital cycles",
  },
].map((slide, index) => ({
  ...slide,
  image: `/images/dashboard/dashboard-0${index + 1}.png`,
  alt: `${slide.title} dashboard preview`,
}));

export function DashboardExperience({ locale }: { locale: AppLocale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <HeroHeader
        locale={locale}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((current) => !current)}
        languageHref="/dashboard"
      />

      <section id="home" className="relative flex min-h-[64svh] items-center overflow-hidden md:min-h-[74vh]">
        <Image
          src="/images/Hero/hero_slide_1.webp"
          alt="Container vessel crossing the ocean"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,28,66,0.94)_0%,rgba(1,35,72,0.68)_46%,rgba(0,57,70,0.18)_100%)]" />

        <div className="relative z-10 w-full px-6 pb-12 pt-28 sm:px-8 md:pt-36">
          <h1 className="max-w-[760px] text-[clamp(2.5rem,5.2vw,5rem)] font-bold uppercase leading-[1.08] tracking-[-0.02em] text-white">
            Real-time trade<br />execution dashboard
          </h1>
          <p className="mt-5 max-w-[710px] text-[clamp(1rem,1.5vw,1.45rem)] font-light text-white/72">
            Track assets, shipments, documents, and payments — all in one place.
          </p>
        </div>
      </section>

      <section className="overflow-hidden bg-white px-5 py-16 text-[#626262] sm:px-8 md:py-24">
        <div className="mx-auto max-w-[1420px]">
          <div className="grid items-center gap-10 lg:grid-cols-[41%_59%] lg:gap-0">
            <div className="relative min-h-[240px] lg:min-h-[540px]">
              {SLIDES.map((slide, index) => (
                <div
                  key={slide.title}
                  aria-hidden={index !== activeIndex}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    index === activeIndex
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <h2 className="max-w-[560px] text-[clamp(2.1rem,3.5vw,3.45rem)] font-light leading-[1.12] tracking-[-0.025em]">
                    {slide.title}
                  </h2>
                  <p className="mt-5 max-w-[590px] text-[clamp(1rem,1.55vw,1.4rem)] font-medium leading-[1.4] text-[#151515]">
                    {slide.description}
                  </p>
                  <Link
                    href="/#contact"
                    className="mt-8 inline-flex w-fit min-w-[250px] items-center justify-center bg-[linear-gradient(90deg,#063468_0%,#184e87_100%)] px-8 py-5 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(1,44,100,0.2)]"
                  >
                    LEARN MORE
                  </Link>
                </div>
              ))}
            </div>

            <div className="relative aspect-[1.3] overflow-hidden rounded-t-[18px] bg-[linear-gradient(120deg,#00234e_0%,#174d84_100%)] p-[4%] pb-[9%] sm:aspect-[1.48]">
              {SLIDES.map((slide, index) => (
                <div
                  key={slide.image}
                  className={`absolute inset-[5%] bottom-[11%] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    index === activeIndex
                      ? "translate-x-0 scale-100 opacity-100"
                      : "pointer-events-none translate-x-5 scale-[0.985] opacity-0"
                  }`}
                  aria-hidden={index !== activeIndex}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1023px) 100vw, 59vw"
                    className="object-contain object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-20 -mt-3 grid grid-cols-3 gap-2 rounded-[14px] bg-[#dedede] p-3 shadow-sm sm:grid-cols-6 sm:gap-3 sm:p-4 lg:-mt-4">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${slide.title}`}
                aria-pressed={index === activeIndex}
                className={`group relative aspect-[1.52] cursor-pointer overflow-hidden rounded-[3px] border-2 bg-white transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-md ${
                  index === activeIndex
                    ? "border-[#176dad] shadow-[0_8px_20px_rgba(1,44,100,0.18)]"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 30vw, 16vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <HeroFullscreenMenu
        isOpen={isMenuOpen}
        backgroundSrc="/images/Hero/hero_slide_1.webp"
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
