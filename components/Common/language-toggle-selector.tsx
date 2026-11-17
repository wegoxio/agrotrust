"use client";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

type Props = {
  currentLocale: AppLocale;
  href?: "/" | "/dashboard" | "/privacy" | "/terms";
};

export function LanguageToggleSelector({
  currentLocale,
  href = "/privacy",
}: Props) {
  const isEnglish = currentLocale === "en";

  return (
    <div className="inline-flex rounded-lg border border-neutral-200 bg-white">
      <Link
        href={href}
        locale="en"
        className={`flex items-center justify-center rounded-l-md px-4 py-2 text-sm font-medium transition-all ${
          isEnglish
            ? "bg-[#164780] text-white shadow"
            : "text-neutral-600 hover:text-neutral-900"
        }`}
      >
        English
      </Link>

      <Link
        href={href}
        locale="es"
        className={`flex items-center justify-center rounded-r-md px-4 py-2 text-sm font-medium transition-all ${
          !isEnglish
            ? "bg-[#164780] text-white shadow"
            : "text-neutral-600 hover:text-neutral-900"
        }`}
      >
        Español
      </Link>
    </div>
  );
}
