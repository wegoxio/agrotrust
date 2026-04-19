"use client";

import Image from "next/image";

type HeroNewsCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  cta: string;
};

export function HeroNewsCard({
  imageSrc,
  imageAlt,
  title,
  cta,
}: HeroNewsCardProps) {
  return (
    <article className="group relative h-[220px] overflow-hidden rounded-[4px] sm:h-[280px] md:h-[360px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 360px"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.34)_48%,rgba(0,0,0,0.86)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="max-w-[290px] text-[22px] leading-[1.08] font-semibold text-neutral sm:text-[24px] md:text-[28px]">
          {title}
        </h3>

        <button
          type="button"
          className="mt-3 inline-flex h-10 items-center gap-2.5 rounded-full border border-neutral/43 bg-[linear-gradient(180deg,rgba(82,82,82,0.42)_0%,rgba(18,18,18,0.72)_100%)] px-5 text-[15px] leading-none font-normal text-neutral shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_8px_16px_rgba(0,0,0,0.24)] backdrop-blur-[6px] transition-all duration-300 group-hover:border-neutral/58 sm:mt-4 sm:h-[35px] sm:px-8 sm:text-[15px]"
        >
          <span>{cta}</span>
          <span aria-hidden className="text-[15px] sm:text-[20px]">
            {"->"}
          </span>
        </button>
      </div>
    </article>
  );
}
