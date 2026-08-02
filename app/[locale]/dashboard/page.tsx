import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { DashboardExperience } from "@/components/DashboardPage/dashboard-experience";
import { FooterSection } from "@/components/Footer/footer-section";
import { routing, type AppLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <main className="min-h-screen w-full">
      <DashboardExperience locale={locale as AppLocale} />
      <FooterSection />
    </main>
  );
}
