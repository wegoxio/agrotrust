import Link from "next/link";
import { AboutFeatureIcon } from "./about-feature-icon";

type AboutFeatureCardProps = {
  variant: "origin" | "platform" | "sourcing";
  title: string;
  description: string;
  cta: string;
  href: string;
};

export function AboutFeatureCard({
  variant,
  title,
  description,
  cta,
  href,
}: AboutFeatureCardProps) {
  return (
    <article className="max-w-none md:max-w-[380px]">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-primary/70 bg-transparent">
        <AboutFeatureIcon variant={variant} />
      </div>

      <p className="mt-4 text-[15px] leading-[1.45] font-normal text-[#1F252B] sm:text-[16px]">
        <strong className="font-bold">{title}</strong> {description}
      </p>

      <Link
        href={href}
        className="group mt-4 inline-flex items-center gap-2 text-[16px] leading-none font-bold text-primary"
      >
        <span className="relative inline-flex">
          <span>{cta}</span>
          <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
        </span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-[16px] w-[16px] transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
        >
          <path
            d="M4 12H20"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <path
            d="M14 6L20 12L14 18"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </article>
  );
}
