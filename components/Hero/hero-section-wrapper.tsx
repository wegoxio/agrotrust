"use client";

import { useEffect, useState } from "react";
import { HeroHeader } from "@/components/Hero/hero-header";
import { HeroFullscreenMenu } from "@/components/Hero/hero-fullscreen-menu";
import { OPEN_HERO_MENU_EVENT } from "@/components/Hero/hero-menu-events";
import type { AppLocale } from "@/i18n/routing";

type HeroSectionWrapperProps = {
  locale: AppLocale;
  languageHref?: "/" | "/dashboard" | "/privacy" | "/terms";
  showGlass?: boolean;
};

export function HeroSectionWrapper({
  locale,
  languageHref,
  showGlass,
}: HeroSectionWrapperProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onOpenMenu = () => setIsMenuOpen(true);
    window.addEventListener(OPEN_HERO_MENU_EVENT, onOpenMenu);

    return () => window.removeEventListener(OPEN_HERO_MENU_EVENT, onOpenMenu);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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
        languageHref={languageHref}
        forceGlass={showGlass}
      />

      <HeroFullscreenMenu
        isOpen={isMenuOpen}
        backgroundSrc="/images/Hero/hero_slide_1.webp"
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
