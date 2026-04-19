"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

type HeroHeaderProps = {
  locale: AppLocale;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

export function HeroHeader({
  locale,
  isMenuOpen,
  onToggleMenu,
}: HeroHeaderProps) {
  const switcher = useTranslations("LanguageSwitcher");
  const [hasScrolled, setHasScrolled] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.scrollY > 1;
  });
  const nextLocale: AppLocale = locale === "en" ? "es" : "en";
  const currentLanguageCode =
    locale.charAt(0).toUpperCase() + locale.slice(1).toLowerCase();
  const nextLanguageLabel = switcher(nextLocale);
  const showGlass = hasScrolled || isMenuOpen;

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 1);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-300 ${
        showGlass
          ? "bg-brand-gradient border-b border-white/22 shadow-[0_14px_35px_rgba(1,15,38,0.42)]"
          : "border-b border-transparent bg-transparent"
      }`}
      style={
        showGlass
          ? {
              background:
                "var(--brand-gradient-primary, linear-gradient(270deg, #164780 0%, #001C42 100%))",
            }
          : undefined
      }
    >
      <div className="mx-auto flex h-[74px] w-full max-w-full items-center justify-between px-5 md:h-[82px] md:px-8">
        <Link href="/" locale={locale} aria-label="AgroTrust home">
          <Image
            src="/agrotrust_logo.png"
            alt="AgroTrust"
            width={217}
            height={48}
            className="h-8 w-auto md:h-10"
            priority
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            locale={nextLocale}
            aria-label={switcher("goTo", { language: nextLanguageLabel })}
            className="text-xl font-normal text-neutral transition hover:text-neutral/80"
          >
            {currentLanguageCode}
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? switcher("closeMenu") : switcher("openMenu")}
            onClick={onToggleMenu}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-[7px] border text-neutral transition ${
              showGlass
                ? "border-neutral/42 bg-neutral/[0.08] hover:bg-neutral/[0.14]"
                : "border-neutral/55 hover:bg-neutral/10"
            }`}
          >
            {isMenuOpen ? (
              <span className="text-[30px] leading-none">X</span>
            ) : (
              <span className="flex w-4 flex-col gap-1">
                <span className="h-0.5 w-full rounded bg-current" />
                <span className="h-0.5 w-full rounded bg-current" />
                <span className="h-0.5 w-full rounded bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
