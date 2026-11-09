"use client";

import { useTranslations } from "next-intl";
import { SmoothScrollLink } from "@/components/Common/smooth-scroll-link";

type SectionItem = {
  id: string;
  label: string;
};

type OnThisPageProps = {
  privacySections?: SectionItem[];
  smsSections?: SectionItem[];
  /** Sobrescribe el título "On this page" */
  title?: string;
  /** Sobrescribe el encabezado del primer grupo de secciones */
  sectionsTitle?: string;
};

export function OnThisPage({
  privacySections,
  smsSections,
  title,
  sectionsTitle,
}: OnThisPageProps) {
  const t = useTranslations("OnThisPage");

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-8 text-sm">
      <div className="sticky top-28 space-y-6">
        <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
          {title ?? t("title")}
        </h3>

        {/* Sección Privacy Policy */}
        {privacySections && privacySections.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-[#164780]">
              {sectionsTitle ?? t("privacy.title")}
            </h4>
            <ul className="space-y-2.5 text-neutral-600">
              {privacySections.map((item) => (
                <li key={item.id}>
                  <SmoothScrollLink
                    href={`#${item.id}`}
                    className="transition-colors hover:text-[#164780]"
                  >
                    {item.label}
                  </SmoothScrollLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Línea divisoria si hay ambas */}
        {privacySections && smsSections && (
          <hr className="border-neutral-200 my-4" />
        )}

        {/* Sección SMS Terms */}
        {smsSections && smsSections.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-[#164780]">{t("smsTerms.title")}</h4>
            <ul className="space-y-2.5 text-neutral-600">
              {smsSections.map((item) => (
                <li key={item.id}>
                  <SmoothScrollLink
                    href={`#${item.id}`}
                    className="transition-colors hover:text-[#164780]"
                  >
                    {item.label}
                  </SmoothScrollLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
