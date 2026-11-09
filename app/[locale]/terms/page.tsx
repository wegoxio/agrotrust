import { redirect } from "next/navigation";
import { getPathname } from "@/i18n/navigation";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Los "Términos de Servicio" (SMS Terms) se muestran actualmente dentro
  // de la Política de Privacidad. Redirigimos allí conservando el idioma.
  const pathname = getPathname({ locale, href: "/privacy" });

  redirect(`${pathname}#sms-terms`);
}
