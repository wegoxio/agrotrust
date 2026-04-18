"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type StepFlowSlide = {
  tab: string;
  title: string;
  description?: string;
  lead?: string;
  bullets?: string[];
  imageSrc: string;
  imageAlt: string;
};

type StepFlowCarouselProps = {
  slides: StepFlowSlide[];
  autoAdvanceMs?: number;
  previousLabel: string;
  nextLabel: string;
  goToStepLabel: string;
};

const TICK_MS = 80;

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`h-4.5 w-4.5 ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StepFlowCarousel({
  slides,
  autoAdvanceMs = 6400,
  previousLabel,
  nextLabel,
  goToStepLabel,
}: StepFlowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [cycleResetKey, setCycleResetKey] = useState(0);
  const autoTimeoutRef = useRef<number | null>(null);
  const totalSlides = slides.length;
  const safeIndex = totalSlides > 0 ? activeIndex % totalSlides : 0;

  const activeSlide = slides[safeIndex] ?? null;
  const activeProgress =
    autoAdvanceMs > 0 ? Math.min(elapsedMs / autoAdvanceMs, 1) : 0;

  const clearAutoTimeout = useCallback(() => {
    if (autoTimeoutRef.current != null) {
      window.clearTimeout(autoTimeoutRef.current);
      autoTimeoutRef.current = null;
    }
  }, []);

  const restartCycle = useCallback(() => {
    setElapsedMs(0);
    setCycleResetKey((current) => current + 1);
  }, []);

  useEffect(() => {
    if (totalSlides <= 1) {
      clearAutoTimeout();
      return;
    }

    clearAutoTimeout();
    const nextIndex = (activeIndex + 1) % totalSlides;
    autoTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex(nextIndex);
      setElapsedMs(0);
    }, autoAdvanceMs);

    return clearAutoTimeout;
  }, [activeIndex, autoAdvanceMs, clearAutoTimeout, cycleResetKey, totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1) return;

    const startedAt = Date.now();

    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setElapsedMs(elapsed >= autoAdvanceMs ? autoAdvanceMs : elapsed);
    }, TICK_MS);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, autoAdvanceMs, cycleResetKey, totalSlides]);

  const goToSlide = (index: number) => {
    if (totalSlides === 0) return;

    clearAutoTimeout();
    const normalizedIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    setActiveIndex(normalizedIndex);
    restartCycle();
  };

  const goNext = () => {
    if (totalSlides === 0) return;

    clearAutoTimeout();
    setActiveIndex((activeIndex + 1) % totalSlides);
    restartCycle();
  };

  const goPrevious = () => {
    if (totalSlides === 0) return;

    clearAutoTimeout();
    setActiveIndex((activeIndex - 1 + totalSlides) % totalSlides);
    restartCycle();
  };

  const progressByStep = useMemo(
    () =>
      slides.map((_, index) => {
        if (index < activeIndex) return 1;
        if (index > activeIndex) return 0;
        return activeProgress;
      }),
    [activeIndex, activeProgress, slides]
  );

  if (!activeSlide) {
    return null;
  }

  return (
    <div className="mt-9">
      <div className="border-b border-[#B8C0C9] pb-1">
        <div className="flex gap-2 overflow-x-auto">
          {slides.map((slide, index) => {
            const isCurrent = index === activeIndex;
            const isCompleted = index < activeIndex;

            return (
              <button
                key={slide.tab}
                type="button"
                onClick={() => goToSlide(index)}
                className="group min-w-max pb-2 text-left"
                aria-label={`${goToStepLabel} ${index + 1}: ${slide.tab}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] leading-none font-semibold transition-colors ${
                      isCurrent || isCompleted
                        ? "bg-primary text-white"
                        : "bg-[#AEB8C4] text-[#2D3A4B]"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <span
                    className={`text-[11px] leading-none transition-colors ${
                      isCurrent || isCompleted
                        ? "font-semibold text-[#12263F]"
                        : "font-normal text-[#2D3A4B]"
                    }`}
                  >
                    {slide.tab}
                  </span>
                </span>

                <span className="mt-2 block h-0.75 w-full rounded-full bg-[#D7DEE8]">
                  <span
                    className="block h-full rounded-full bg-primary transition-[width] duration-100 ease-linear"
                    style={{ width: `${progressByStep[index] * 100}%` }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-8 grid overflow-hidden rounded-sm border border-[#CFD6E0] md:grid-cols-[1.52fr_1fr]">
        <div className="relative min-h-55 sm:min-h-70 md:min-h-120">
          {slides.map((slide, index) => (
            <Image
              key={`${slide.tab}-image`}
              src={slide.imageSrc}
              alt={slide.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 70vw"
              className={`object-cover object-center transition-opacity duration-700 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>

        <div className="relative bg-[linear-gradient(180deg,#0B356F_0%,#0A3268_100%)] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12">
          <div key={activeIndex} className="stepflow-fade-in">
            <h3 className="text-[22px] leading-tight font-bold text-white sm:text-[30px] md:text-[40px]">
              {activeSlide.title}
            </h3>

            {activeSlide.lead ? (
              <p className="mt-4 text-[15px] leading-[1.65] font-light italic text-[#E8EFFB] sm:text-[16px]">
                {activeSlide.lead}
              </p>
            ) : null}

            {activeSlide.description ? (
              <p className="mt-4 text-[15px] leading-[1.75] font-normal text-[#E8EFFB] sm:text-[16px]">
                {activeSlide.description}
              </p>
            ) : null}

            {activeSlide.bullets?.length ? (
              <ul className="mt-4 list-disc pl-5 text-[15px] leading-[1.6] font-normal text-[#E8EFFB] sm:text-[16px]">
                {activeSlide.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          aria-label={previousLabel}
          onClick={goPrevious}
          className="absolute top-27.5 left-2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg border border-[#D0DAE8]/60 bg-[rgba(255,255,255,0.16)] text-[#EAF2FF] backdrop-blur-[2px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.24)] sm:top-35 sm:left-3 md:top-1/2 md:left-5 md:h-14 md:w-14"
        >
          <ArrowIcon direction="left" />
        </button>

        <button
          type="button"
          aria-label={nextLabel}
          onClick={goNext}
          className="absolute top-17.5 right-2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center roundedlg border border-[#D0DAE8]/60 bg-[rgba(255,255,255,0.16)] text-[#EAF2FF] backdrop-blur-[2px] transition-all duration-300 hover:bg-[rgba(255,255,255,0.24)] sm:top-35 sm:right-3 md:top-1/2 md:right-5 md:h-14 md:w-14"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
