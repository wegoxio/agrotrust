"use client";

import { OPEN_HERO_MENU_EVENT } from "@/components/Hero/hero-menu-events";

type FooterNewsMenuLinkProps = {
  label: string;
  className?: string;
};

export function FooterNewsMenuLink({ label, className }: FooterNewsMenuLinkProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_HERO_MENU_EVENT))}
      className={className}
    >
      {label}
    </button>
  );
}
