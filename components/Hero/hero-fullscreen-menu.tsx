"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { HeroNewsCard } from "./hero-news-card";

type HeroFullscreenMenuProps = {
  isOpen: boolean;
  backgroundSrc: string;
  onClose: () => void;
};

export function HeroFullscreenMenu({
  isOpen,
  backgroundSrc,
  onClose,
}: HeroFullscreenMenuProps) {
  const menu = useTranslations("OverlayMenu");
  const [newsPageIndex, setNewsPageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const intervalId = window.setInterval(() => {
      setNewsPageIndex((currentIndex) => (currentIndex + 1) % 2);
    }, 5200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isOpen]);

  const navItems = [
    { label: menu("about"), href: "#about" },
    { label: menu("platform"), href: "#platform" },
    { label: menu("howItWorks"), href: "#how-it-works" },
    { label: menu("partners"), href: "#partners" },
    { label: menu("contact"), href: "#contact" },
  ];

  const newsItems = useMemo(
    () => [
      {
        imageSrc: "/images/latestNews/latestNews-01.png",
        imageLink: "https://thecostaricanews.com/venezuela-grows-the-best-coffee-in-the-world-according-to-international-experts/",
        imageAlt: menu("news1Alt"),
        title: menu("news1Title"),
      },
      {
        imageSrc: "/images/latestNews/latestNews-02.png",
        imageLink: 'https://www.cafeimports.com/europe/venezuela',
        imageAlt: menu("news2Alt"),
        title: menu("news2Title"),
      },
      {
        imageSrc: "/images/latestNews/latestNews-03.png",
        imageLink: "https://www.linkedin.com/pulse/importance-fine-aroma-cacao-global-market-case-venezuelan-0kmxe/",
        imageAlt: menu("news3Alt"),
        title: menu("news3Title"),
      },
      {
        imageSrc: "/images/latestNews/latestNews-04.png",
        imageLink: "https://www.foxnews.com/world/venezuela-produces-some-of-the-worlds-best-chocolate-but-profiting-from-it-is-another-story",
        imageAlt: menu("news4Alt"),
        title: menu("news4Title"),
      },
    ],
    [menu]
  );

  const newsSlides = useMemo(
    () => [newsItems.slice(0, 2), newsItems.slice(2, 4)],
    [newsItems]
  );

  return (
    <div
      className={`fixed inset-0 z-[11000] h-[100dvh] w-screen overflow-hidden transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="relative h-full w-full overflow-x-hidden overflow-y-auto overscroll-contain bg-[#051B44] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <Image
          src={backgroundSrc}
          alt={menu("backgroundAlt")}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(2,30,47,0.9)_0%,rgba(2,56,67,0.78)_46%,rgba(1,53,64,0.76)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_70%,rgba(0,153,161,0.22)_0%,rgba(0,153,161,0)_44%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,26,54,0.52)_0%,rgba(3,18,40,0.68)_100%)]" />

        <div
          className={`relative z-10 flex min-h-full w-full flex-col px-4 pt-4 pb-6 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 sm:pt-5 md:px-7 ${
            isOpen ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.995]"
          }`}
        >
          <header className="flex items-start justify-between">
            <Link href="/" aria-label="AgroTrust home" onClick={onClose}>
              <Image
                src="/agrotrust_logo.svg"
                alt="AgroTrust"
                width={217}
                height={38}
                className="mt-1 h-7 w-auto md:h-10"
                priority
              />
            </Link>

            <button
              type="button"
              aria-label={menu("closeMenu")}
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/68 bg-[linear-gradient(180deg,rgba(202,221,230,0.24)_0%,rgba(97,119,131,0.2)_100%)] text-[30px] leading-none text-neutral shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_10px_22px_rgba(0,0,0,0.2)] backdrop-blur-[10px] transition-all duration-300 hover:bg-[linear-gradient(180deg,rgba(218,232,238,0.32)_0%,rgba(108,131,142,0.24)_100%)] sm:h-11 sm:w-11 sm:text-[36px]"
            >
              X
            </button>
          </header>

          <div className="mt-8 grid flex-1 content-start gap-8 sm:mt-10 sm:gap-10 lg:mt-12 lg:grid-cols-[300px_minmax(0,700px)] lg:gap-12">
            <nav
              className={`self-start transition-all duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:pt-7 ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0"
              }`}
            >
              <ul className="space-y-4 sm:space-y-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="group inline-flex text-[20px] leading-[1.05] font-normal text-[#C4D2D8] transition-all duration-300 hover:text-white sm:text-[24px]"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white/82 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <section
              className={`transition-all duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-3 opacity-0"
              }`}
            >
              <h2 className="text-[20px] leading-none font-bold text-neutral sm:text-[24px]">
                {menu("latestNews")}
              </h2>

              <div className="mt-4 w-full max-w-[760px] overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                  style={{ transform: `translateX(-${newsPageIndex * 100}%)` }}
                >
                  {newsSlides.map((slide, slideIndex) => (
                    <div key={`slide-${slideIndex}`} className="w-full shrink-0">
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {slide.map((item) => (
                          <HeroNewsCard
                            key={item.imageSrc}
                            imageSrc={item.imageSrc}
                            imageAlt={item.imageAlt}
                            imageLink={item.imageLink}
                            title={item.title}
                            cta={menu("readMore")}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <footer className="mt-8 border-t border-[#A9CFD7]/46 pt-4 text-left text-[16px] leading-tight font-light text-[#B6C7CE] sm:text-[18px] md:mt-auto md:pt-5 md:text-[20px] lg:text-right">
            &copy; {menu("copyright")}
          </footer>
        </div>
      </div>
    </div>
  );
}
