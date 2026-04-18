"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type DashboardSlide = {
  id: string;
  title: string;
  description: string;
  panelCode: string;
  panelMeta: string;
  panelOrigin: string;
  panelEvents: string[];
  imageSrc: string;
  imageAlt: string;
  previewLabel: string;
  previewAccent?: string;
};

type DashboardStackCarouselProps = {
  slides: DashboardSlide[];
  previousLabel: string;
  nextLabel: string;
  autoplayMs?: number;
  bottomSlogan: string;
};

const STACK_LAYOUT = [
  { x: 0, y: 0, scale: 1, opacity: 1, z: 60 },
  { x: 74, y: 0, scale: 1, opacity: 1, z: 50 },
  { x: 81, y: 0, scale: 1, opacity: 1, z: 40 },
  { x: 88, y: 0, scale: 1, opacity: 1, z: 30 },
  { x: 95, y: 0, scale: 1, opacity: 1, z: 20 },
];
const STACK_CARD_WIDTH_PERCENT = 72;

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

function normalizeRelativeIndex(
  index: number,
  activeIndex: number,
  total: number
) {
  return (index - activeIndex + total) % total;
}

export function DashboardStackCarousel({
  slides,
  previousLabel,
  nextLabel,
  autoplayMs = 5600,
  bottomSlogan,
}: DashboardStackCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const total = slides.length;
  const safeActiveIndex = total > 0 ? activeIndex % total : 0;

  const activeSlide = slides[safeActiveIndex];

  const previewCards = useMemo(
    () =>
      slides.map((slide, index) => {
        const relative = normalizeRelativeIndex(index, safeActiveIndex, total);
        return { slide, relative };
      }),
    [slides, safeActiveIndex, total]
  );

  const goNext = () => {
    if (total <= 1) return;
    setActiveIndex((current) => (current + 1) % total);
  };

  const goPrevious = () => {
    if (total <= 1) return;
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, autoplayMs);

    return () => window.clearInterval(intervalId);
  }, [autoplayMs, isPaused, total]);

  const maxVisible = STACK_LAYOUT.length;

  if (!activeSlide) {
    return null;
  }

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between gap-2 pb-4 sm:justify-end">
        <button
          type="button"
          aria-label={previousLabel}
          onClick={goPrevious}
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#C8D0D9] bg-[#ECEEF1] text-[#798391] transition-all duration-300 hover:border-[#B5C0CB] hover:bg-[#E1E6EC] hover:text-[#5B6776]"
        >
          <ArrowIcon direction="left" />
        </button>

        <button
          type="button"
          aria-label={nextLabel}
          onClick={goNext}
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#A8B8CC] bg-[#CFDCEC] text-primary transition-all duration-300 hover:border-[#90A7C3] hover:bg-[#C4D3E6]"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative h-130 overflow-hidden sm:h-155 md:h-190"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          const nextFocus = event.relatedTarget as Node | null;
          const stillInside =
            !!nextFocus && !!containerRef.current?.contains(nextFocus);
          if (!stillInside) {
            setIsPaused(false);
          }
        }}
      >
        {previewCards.map(({ slide, relative }) => {
          const isVisible = relative < maxVisible;
          const layout = STACK_LAYOUT[Math.min(relative, maxVisible - 1)];

          return (
            <article
              key={slide.id}
              aria-hidden={!isVisible}
              className="absolute top-0 left-0 h-full overflow-hidden rounded-sm border border-[#CBD2D9] bg-white"
              style={{
                left: isVisible ? `${layout.x}%` : "106%",
                transform: `translate3d(0, ${layout.y}px, 0) scale(${isVisible ? layout.scale : 0.98})`,
                width: `${STACK_CARD_WIDTH_PERCENT}%`,
                opacity: isVisible ? layout.opacity : 0,
                zIndex: layout.z,
                transition:
                  "left 760ms cubic-bezier(0.22, 1, 0.36, 1), " +
                  "transform 760ms cubic-bezier(0.22, 1, 0.36, 1), " +
                  "opacity 620ms ease-out",
                willChange: "left, transform, opacity",
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  width={12000}
                  height={500}
                  className="object-cover object-center"
                />
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-[22px] leading-[1.2] font-bold text-[#1B232A] sm:text-[26px] md:text-[38px]">
            {activeSlide.title}
          </h3>
          <p className="mt-1 text-[15px] leading-[1.45] font-normal text-[#3A434C] sm:text-[16px] md:text-[17px]">
            {activeSlide.description}
          </p>
        </div>

        <p className="text-left text-[15px] leading-[1.3] font-semibold text-primary underline decoration-[#6D90C4] underline-offset-3 sm:text-[16px] md:text-right md:leading-none">
          {bottomSlogan}
        </p>
      </div>
    </div>
  );
}
