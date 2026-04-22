import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { SmoothScrollLink } from "@/components/Common/smooth-scroll-link";
import { FooterNewsMenuLink } from "./footer-news-menu-link";

function LinkedInIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M6.8 8.2a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Zm-1.5 2.1H8.3V19H5.3v-8.7Zm4.8 0h2.9v1.2h.1c.4-.8 1.4-1.6 2.8-1.6 3 0 3.6 2 3.6 4.5V19h-3v-4c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2V19h-3v-8.7Z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M4.2 4h4l3.6 5.1L16 4h3.8l-6.2 7.1L20.4 20h-4l-4-5.7L7.4 20H3.6l6.8-7.8L4.2 4Zm3 1.9 9.1 12.3h1.2L8.5 5.9H7.2Z"
      />
    </svg>
  );
}

type FooterHashHref = `#${string}`;

type FooterQuickLink = {
  id: string;
  href: FooterHashHref;
  label: string;
  opensMenu?: boolean;
};

type FooterEcosystemLink = {
  id: string;
  href: FooterHashHref;
  label: string;
};

export async function FooterSection() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  const quickLinks: FooterQuickLink[] = [
    { id: "about", href: "#about", label: t("quickLinks.about") },
    { id: "platform", href: "#platform", label: t("quickLinks.platform") },
    { id: "how-it-works", href: "#how-it-works", label: t("quickLinks.howItWorks") },
    { id: "partners", href: "#partners", label: t("quickLinks.partners") },
    { id: "news", href: "#dashboard", label: t("quickLinks.news"), opensMenu: true },
    { id: "contact", href: "#contact", label: t("quickLinks.contact") },
  ];
  const ecosystemLinks: FooterEcosystemLink[] = [
    { id: "network", href: "#network", label: t("ecosystem.network") },
    { id: "step-flow", href: "#step-flow", label: t("ecosystem.stepFlow") },
    { id: "vs-lc", href: "#vs-lc", label: t("ecosystem.comparison") },
    { id: "dashboard", href: "#market-widget", label: t("ecosystem.dashboard") },
  ];

  return (
    <footer
      id="footer"
      className="w-full py-8 md:py-10"
      style={{
        background:
          "var(--brand-gradient-primary, linear-gradient(270deg, #164780 0%, #001C42 100%))",
      }}
    >
      <div className="mx-auto max-w-full px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_1fr] md:gap-12">
          <div className="max-w-[480px]">
            <SmoothScrollLink href="#home" aria-label="AgroTrust home" className="inline-flex">
              <Image
                src="/agrotrust_logo.svg"
                alt="AgroTrust"
                width={217}
                height={48}
                className="h-9 w-auto md:h-11"
              />
            </SmoothScrollLink>

            <p className="mt-4 text-[16px] leading-[1.6] font-normal text-[#8FAECC]">
              {t("tagline")}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={t("social.linkedinUrl")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("social.linkedin")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white transition-colors hover:bg-white/22"
              >
                <LinkedInIcon />
              </a>

              <a
                href={t("social.xUrl")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("social.x")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white transition-colors hover:bg-white/22"
              >
                <XIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[32px] leading-none font-semibold text-white">
              {t("quickLinksTitle")}
            </h3>

            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  {link.opensMenu ? (
                    <FooterNewsMenuLink
                      label={link.label}
                      className="inline-flex cursor-pointer text-[16px] leading-[1.25] font-normal text-[#8FAECC] transition-colors hover:text-white"
                    />
                  ) : (
                    <SmoothScrollLink
                      href={link.href}
                      className="inline-flex text-[16px] leading-[1.25] font-normal text-[#8FAECC] transition-colors hover:text-white"
                    >
                      {link.label}
                    </SmoothScrollLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[32px] leading-none font-semibold text-white">
              {t("groups.ecosystem")}
            </h3>

            <p className="mt-4 max-w-[360px] text-[16px] leading-[1.5] text-[#8FAECC]">
              {t("compliance")}
            </p>

            <ul className="mt-4 space-y-3">
              {ecosystemLinks.map((link) => (
                <li key={link.id}>
                  <SmoothScrollLink
                    href={link.href}
                    className="inline-flex text-[16px] leading-[1.25] font-normal text-[#8FAECC] transition-colors hover:text-white"
                  >
                    {link.label}
                  </SmoothScrollLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#2A5D95] pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-[15px] leading-[1.45] text-[#8FAECC]">
              {t("rights", { year })}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#"
                className="text-[15px] leading-none text-[#8FAECC] transition-colors hover:text-white"
              >
                {t("bottom.privacyPolicy")}
              </a>
              <a
                href="#"
                className="text-[15px] leading-none text-[#8FAECC] transition-colors hover:text-white"
              >
                {t("bottom.termsOfService")}
              </a>
              <a
                href="#"
                className="text-[15px] leading-none text-[#8FAECC] transition-colors hover:text-white"
              >
                {t("bottom.legal")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
