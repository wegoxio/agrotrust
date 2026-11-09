import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { FooterSection } from "@/components/Footer/footer-section";
import { routing } from "@/i18n/routing";
import { HeroSectionWrapper } from "@/components/Hero/hero-section-wrapper";
import { Breadcrumbs } from "@/components/Common/breadcrumbs";
import { OnThisPage } from "@/components/Common/on-this-page";
import { LanguageToggleSelector } from "@/components/Common/language-toggle-selector";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("Privacy");
  const tSms = await getTranslations("SmsTerms");
  const tNav = await getTranslations("OnThisPage");

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const privacyItems = [
    { id: "information-we-collect", label: tNav("privacy.items.information") },
    { id: "how-we-use-information", label: tNav("privacy.items.use") },
    { id: "text-messaging", label: tNav("privacy.items.sms") },
    { id: "how-we-share", label: tNav("privacy.items.sharing") },
    { id: "data-retention", label: tNav("privacy.items.retention") },
    { id: "your-choices", label: tNav("privacy.items.choices") },
    { id: "changes", label: tNav("privacy.items.changes") },
    { id: "contact", label: tNav("privacy.items.contact") },
  ];

  const smsItems = [
    { id: "program-description", label: tNav("smsTerms.items.program") },
    { id: "how-you-opt-in", label: tNav("smsTerms.items.optIn") },
    { id: "message-frequency", label: tNav("smsTerms.items.frequency") },
    { id: "costs", label: tNav("smsTerms.items.costs") },
    { id: "opting-out", label: tNav("smsTerms.items.optingOut") },
    { id: "help", label: tNav("smsTerms.items.help") },
    { id: "carriers", label: tNav("smsTerms.items.carriers") },
    { id: "privacy", label: tNav("smsTerms.items.privacy") },
    { id: "sms-contact", label: tNav("smsTerms.items.contact") },
  ];

  return (
    <main className="min-h-screen w-full">
      <HeroSectionWrapper
        locale={locale}
        languageHref="/privacy"
        showGlass={true}
      />

      <div className="mx-auto px-6 lg:px-28 pt-28 pb-12 bg-[#F0F1F2]">
        <Breadcrumbs
          items={[
            { label: t("breadcrumbs.home"), href: "/" },
            { label: t("breadcrumbs.legal") },
            { label: t("breadcrumbs.current") },
          ]}
        />
        <span className="text-xs font-semibold tracking-wider text-[#164780] uppercase mt-4 block">
          {t("badge")}
        </span>
        <h1 className="text-4xl lg:text-6xl font-normal text-[#001C42] mt-1">
          {t("title")}
        </h1>
        <div className="mt-6 text-lg text-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm lg:text-base text-gray-600">
            {t("lastUpdated")}
          </p>
          <div className="flex items-center gap-2">
            <LanguageToggleSelector currentLocale={locale} href="/privacy" />
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 lg:px-28 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <OnThisPage privacySections={privacyItems} smsSections={smsItems} />

          <div className="flex-1 space-y-12 text-neutral-800">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t("intro")}
              </p>
            </div>

            <section id="information-we-collect" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.information.title")}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.information.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
            </section>

            <section id="how-we-use-information" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.use.title")}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.use.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
            </section>

            <section id="text-messaging" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.sms.title")}
              </h2>
              <div className="space-y-3 text-neutral-700">
                {t
                  .raw("sections.sms.items")
                  .map((item: string, idx: number) => (
                    <p key={idx} className="leading-relaxed">
                      {item}
                    </p>
                  ))}
              </div>
            </section>

            <section id="how-we-share" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.sharing.title")}
              </h2>
              <p className="text-neutral-700">{t("sections.sharing.intro")}</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.sharing.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
            </section>

            <section id="data-retention" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.retention.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.retention.content")}
              </p>
            </section>

            <section id="your-choices" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.choices.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.choices.content")}
              </p>
            </section>

            <section id="changes" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.changes.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.changes.content")}
              </p>
            </section>

            <section id="contact" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.contact.title")}
              </h2>
              <p className="text-neutral-700 font-medium leading-relaxed">
                {t("sections.contact.content")}
              </p>
            </section>

            <hr className="border-neutral-200 my-12" />

            {/* SMS Terms Section */}
            <div id="sms-terms" className="space-y-10 text-neutral-800">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {tSms("title")}
                </h1>
                <p className="mt-2 text-sm text-neutral-500">
                  {tSms("lastUpdated")}
                </p>
              </div>

              <section id="program-description" className="space-y-2">
                <h2 className="text-xl font-semibold text-[#164780]">
                  {tSms("sections.program.title")}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {tSms("sections.program.content")}
                </p>
              </section>

              <section id="how-you-opt-in" className="space-y-2">
                <h2 className="text-xl font-semibold text-[#164780]">
                  {tSms("sections.optIn.title")}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {tSms("sections.optIn.content")}
                </p>
              </section>

              <section id="message-frequency" className="space-y-2">
                <h2 className="text-xl font-semibold text-[#164780]">
                  {tSms("sections.frequency.title")}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {tSms("sections.frequency.content")}
                </p>
              </section>

              <section id="costs" className="space-y-2">
                <h2 className="text-xl font-semibold text-[#164780]">
                  {tSms("sections.costs.title")}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {tSms("sections.costs.content")}
                </p>
              </section>

              <section id="opting-out" className="space-y-2">
                <h2 className="text-xl font-semibold text-[#164780]">
                  {tSms("sections.optingOut.title")}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {tSms("sections.optingOut.content")}
                </p>
              </section>

              <section id="help" className="space-y-2">
                <h2 className="text-xl font-semibold text-[#164780]">
                  {tSms("sections.help.title")}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {tSms("sections.help.content")}
                </p>
              </section>

              <section id="carriers" className="space-y-2">
                <h2 className="text-xl font-semibold text-[#164780]">
                  {tSms("sections.carriers.title")}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {tSms("sections.carriers.content")}
                </p>
              </section>

              <section id="privacy" className="space-y-2">
                <h2 className="text-xl font-semibold text-[#164780]">
                  {tSms("sections.privacy.title")}
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {tSms("sections.privacy.content")}
                </p>
              </section>

              <section id="sms-contact" className="space-y-2">
                <h2 className="text-xl font-semibold text-[#164780]">
                  {tSms("sections.contact.title")}
                </h2>
                <p className="text-neutral-700 font-medium leading-relaxed">
                  {tSms("sections.contact.content")}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
