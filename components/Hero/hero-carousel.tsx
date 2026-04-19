"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { HeroHeader } from "./hero-header";
import { HeroSlideIndicator } from "./hero-slide-indicator";
import { HeroFullscreenMenu } from "./hero-fullscreen-menu";

const AUTOPLAY_INTERVAL_MS = 5500;

type HeroCarouselProps = {
  locale: AppLocale;
};

export function HeroCarousel({ locale }: HeroCarouselProps) {
  const hero = useTranslations("Hero");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const slides = useMemo(
    () => [
      {
        src: "/images/Hero/hero_slide_1.webp",
        alt: hero("slide1Alt"),
        title: hero("slide1Title"),
        description: hero("slide1Description"),
        cta: hero("slide1Cta"),
      },
      {
        src: "/images/Hero/hero_slide_2.webp",
        alt: hero("slide2Alt"),
        title: hero("slide2Title"),
        description: hero("slide2Description"),
        cta: hero("slide2Cta"),
      },
      {
        src: "/images/Hero/hero_slide_3.webp",
        alt: hero("slide3Alt"),
        title: hero("slide3Title"),
        description: hero("slide3Description"),
        cta: hero("slide3Cta"),
      },
    ],
    [hero]
  );

  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (slides.length <= 1 || isMenuOpen) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [slides.length, isMenuOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <HeroHeader
        locale={locale}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      <section
        id="home"
        className="relative flex min-h-[78svh] w-full overflow-hidden sm:min-h-[82svh] md:min-h-[86vh]"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-[54%_42%] scale-[1.45] sm:object-[52%_42%] sm:scale-[1.28] md:object-center md:scale-100"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(94deg,rgba(4,28,72,0.88)_0%,rgba(4,28,72,0.72)_34%,rgba(4,28,72,0.42)_66%,rgba(4,28,72,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,19,54,0.3)_0%,rgba(3,19,54,0.48)_100%)]" />

        <div className="relative z-10 flex w-full flex-1">
          <div className="flex w-full flex-col items-center justify-end px-4 pt-[124px] pb-26 text-center sm:items-start sm:px-5 sm:pt-[112px] sm:pb-24 sm:text-left md:items-start md:justify-start md:px-8 md:pt-40 md:pb-20">
            <h1 className="max-w-202 text-pretty text-[30px] leading-[1.06] font-bold tracking-[0px] text-neutral sm:text-[36px] md:text-[55px] md:leading-22.5">
              {activeSlide.title}
            </h1>

            <p className="relative mt-4 max-w-174.5 text-[15px] leading-[1.5] font-light tracking-[0px] text-neutral/88 sm:mt-5 sm:text-[17px] sm:leading-6.2 md:-top-px md:text-[24px] md:leading-8">
              {activeSlide.description}
            </p>

            <div className="mt-8 flex w-full justify-center sm:mt-10 sm:justify-start">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center border border-neutral/70 px-6 py-3 text-[14px] leading-none font-semibold text-neutral transition-all hover:bg-neutral/12 sm:px-8 sm:py-4 sm:text-[15px]"
              >
                {activeSlide.cta}
              </button>
            </div>
          </div>
        </div>

        <HeroSlideIndicator
          activeIndex={activeIndex}
          totalSlides={slides.length}
          onSelect={setActiveIndex}
        />
      </section>

      <HeroFullscreenMenu
        isOpen={isMenuOpen}
        backgroundSrc={activeSlide.src}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
