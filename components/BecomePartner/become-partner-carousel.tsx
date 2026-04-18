"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BecomePartnerCard,
  type BecomePartnerCardData,
} from "./become-partner-card";

type BecomePartnerCarouselProps = {
  cards: BecomePartnerCardData[];
  previousLabel: string;
  nextLabel: string;
  autoplayMs?: number;
};

function getCardsPerView(width: number) {
  if (width < 768) return 1;
  if (width < 1280) return 2;
  return 4;
}

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

export function BecomePartnerCarousel({
  cards,
  previousLabel,
  nextLabel,
  autoplayMs = 5300,
}: BecomePartnerCarouselProps) {
  const [cardsPerView, setCardsPerView] = useState(1);
  const [positionIndex, setPositionIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardsCount = cards.length;

  const duplicatedCards = useMemo(() => [...cards, ...cards], [cards]);

  useEffect(() => {
    const update = () => setCardsPerView(getCardsPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goNext = () => {
    if (cardsCount <= 1) return;
    setIsTransitionEnabled(true);
    setPositionIndex((current) => current + 1);
  };

  const goPrevious = () => {
    if (cardsCount <= 1) return;

    if (positionIndex === 0) {
      setIsTransitionEnabled(false);
      setPositionIndex(cardsCount);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
          setPositionIndex(cardsCount - 1);
        });
      });
      return;
    }

    setIsTransitionEnabled(true);
    setPositionIndex((current) => current - 1);
  };

  useEffect(() => {
    if (cardsCount <= 1 || isPaused) return;

    const intervalId = window.setInterval(() => {
      setIsTransitionEnabled(true);
      setPositionIndex((current) => current + 1);
    }, autoplayMs);

    return () => window.clearInterval(intervalId);
  }, [autoplayMs, cardsCount, isPaused]);

  const handleTrackTransitionEnd = () => {
    if (positionIndex !== cardsCount) return;

    setIsTransitionEnabled(false);
    setPositionIndex(0);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
    });
  };

  const trackWidthPercent = (duplicatedCards.length / cardsPerView) * 100;
  const shiftPercentOfTrack = positionIndex * (100 / duplicatedCards.length);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-end gap-2 pb-4">
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
        ref={viewportRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          const nextFocus = event.relatedTarget as Node | null;
          const stillInside =
            !!nextFocus && !!viewportRef.current?.contains(nextFocus);

          if (!stillInside) {
            setIsPaused(false);
          }
        }}
      >
        <div
          className="flex"
          onTransitionEnd={handleTrackTransitionEnd}
          style={{
            width: `${trackWidthPercent}%`,
            transform: `translate3d(-${shiftPercentOfTrack}%, 0, 0)`,
            transition: isTransitionEnabled
              ? "transform 760ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
            willChange: "transform",
          }}
        >
          {duplicatedCards.map((card, index) => (
            <div
              key={`${card.title}-${index}`}
              className="px-2"
              style={{ width: `${100 / duplicatedCards.length}%` }}
            >
              <BecomePartnerCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
