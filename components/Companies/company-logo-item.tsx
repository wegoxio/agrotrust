"use client";

import Image from "next/image";

export type CompanyLogo = {
  name: string;
  href?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  imageClassName?: string;
};

type CompanyLogoItemProps = {
  logo: CompanyLogo;
  showDivider: boolean;
};

export function CompanyLogoItem({ logo, showDivider }: CompanyLogoItemProps) {
  const baseClass = `inline-flex shrink-0 items-center justify-center px-5 sm:px-7 md:px-10 ${
    showDivider ? "border-r border-[#A9B3BD]" : ""
  }`;

  const logoImage = (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={`h-9 w-auto object-contain sm:h-8 md:h-10 ${
        logo.imageClassName ?? ""
      }`}
    />
  );

  if (!logo.href) {
    return <div className={baseClass}>{logoImage}</div>;
  }

  return (
    <a
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={logo.alt}
      className={baseClass}
    >
      {logoImage}
    </a>
  );
}
