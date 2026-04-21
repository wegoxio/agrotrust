"use client";

import Image from "next/image";

type HeroNewsCardProps = {
  imageSrc: string;
  imageAlt: string;
  imageLink: string;
  title: string;
  cta: string;
};

export function HeroNewsCard({
  imageSrc,
  imageAlt,
  imageLink,
  title,
  cta,
}: HeroNewsCardProps) {
  return (
    <article className="group relative h-[250px] overflow-hidden rounded-[4px] sm:h-[300px] md:h-[360px]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 48vw, 360px"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,rgba(0,0,0,0.34)_48%,rgba(0,0,0,0.86)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="max-w-[300px] text-[16px] leading-[1.14] font-semibold text-neutral sm:text-[21px] md:text-[28px]">
          {title}
        </h3>

        <a
          href={imageLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex h-9 items-center gap-2.5 rounded-full border border-neutral/43 bg-[linear-gradient(180deg,rgba(82,82,82,0.42)_0%,rgba(18,18,18,0.72)_100%)] px-4 text-[13px] leading-none font-normal text-neutral shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_8px_16px_rgba(0,0,0,0.24)] backdrop-blur-[6px] transition-all duration-300 group-hover:border-neutral/58 sm:mt-4 sm:h-[35px] sm:px-8 sm:text-[15px]"
        >
          <span>{cta}</span>
          <span aria-hidden className="text-[15px] sm:text-[20px]">
            {"->"}
          </span>
        </a>
      </div>
    </article>
  );
}
