"use client";

import { useTranslations } from "next-intl";

type HeroSlideIndicatorProps = {
  activeIndex: number;
  totalSlides: number;
  onSelect: (index: number) => void;
};

export function HeroSlideIndicator({
  activeIndex,
  totalSlides,
  onSelect,
}: HeroSlideIndicatorProps) {
  const hero = useTranslations("Hero");

  if (totalSlides <= 1) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center sm:bottom-10 md:bottom-12">
      <div className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-[#5B88B2]/70 bg-[linear-gradient(180deg,#1B4F80_0%,#14406C_100%)] px-2.5 py-1.5 shadow-[0_10px_24px_rgba(2,24,57,0.48),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(7,29,67,0.72)] sm:gap-2 sm:px-[13px] sm:py-[7px]">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={hero("goToSlide", { index: index + 1 })}
            aria-current={index === activeIndex}
            onClick={() => onSelect(index)}
            className={`rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "h-4 w-4 bg-[#F3F7FB] shadow-[0_2px_6px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.9)] sm:h-5 sm:w-5"
                : "h-3.5 w-3.5 bg-[#8FA7BE] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_3px_rgba(0,0,0,0.25)] hover:bg-[#ADC0D2] sm:h-4 sm:w-4"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
