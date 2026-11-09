import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { FooterSection } from "@/components/Footer/footer-section";
import { routing } from "@/i18n/routing";
import { HeroSectionWrapper } from "@/components/Hero/hero-section-wrapper";
import { Breadcrumbs } from "@/components/Common/breadcrumbs";
import { OnThisPage } from "@/components/Common/on-this-page";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("TermsOfService");
  const tNav = await getTranslations("TermsOfService.OnThisPage");

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const termsItems = [
    {
      id: "acceptance",
      label: tNav("termsOfService.items.acceptance"),
    },
    {
      id: "whatDoes",
      label: tNav("termsOfService.items.whatDoes"),
    },
    {
      id: "whatDoesNot",
      label: tNav("termsOfService.items.whatDoesNot"),
    },
    {
      id: "participants",
      label: tNav("termsOfService.items.participants"),
    },
    {
      id: "kyc",
      label: tNav("termsOfService.items.kyc"),
    },
    {
      id: "funds",
      label: tNav("termsOfService.items.funds"),
    },
    {
      id: "data",
      label: tNav("termsOfService.items.data"),
    },
    {
      id: "risk",
      label: tNav("termsOfService.items.risk"),
    },
    {
      id: "limitation",
      label: tNav("termsOfService.items.limitation"),
    },
    {
      id: "suspension",
      label: tNav("termsOfService.items.suspension"),
    },
  ];

  return (
    <main className="min-h-screen w-full">
      <HeroSectionWrapper
        locale={locale}
        languageHref="/terms"
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
      </div>

      <div className="mx-auto px-6 lg:px-28 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <OnThisPage
            privacySections={termsItems}
            title={tNav("title")}
            sectionsTitle={tNav("termsOfService.title")}
          />

          <div className="flex-1 space-y-12 text-neutral-800">
            <section id="acceptance" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.acceptance.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.acceptance.subsections.agreement.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.acceptance.subsections.relationship.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.acceptance.subsections.eligibility.content")}
              </p>
              <div className="space-y-2">
                <p className="text-neutral-700 leading-relaxed font-medium">
                  {t("sections.acceptance.subsections.definitions.content")}
                </p>
                <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                  {t
                    .raw(
                      "sections.acceptance.subsections.definitions.termsList",
                    )
                    .map(
                      (
                        item: { term: string; definition: string },
                        idx: number,
                      ) => (
                        <li key={idx}>
                          <strong>{item.term}</strong> {item.definition}
                        </li>
                      ),
                    )}
                </ul>
              </div>
            </section>

            <section id="whatDoes" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.whatDoes.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.whatDoes.subsections.ourRole.content")}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.whatDoes.subsections.ourRole.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
              <p className="text-neutral-700 leading-relaxed pt-2">
                {t("sections.whatDoes.subsections.transactionWorks.content")}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.whatDoes.subsections.transactionWorks.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
              <p className="text-neutral-700 leading-relaxed pt-2">
                {t(
                  "sections.whatDoes.subsections.proprietaryStructure.content",
                )}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.whatDoes.subsections.communications.content")}
              </p>
            </section>

            <section id="whatDoesNot" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.whatDoesNot.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.whatDoesNot.subsections.noSolicitation.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed pt-2">
                {t("sections.whatDoesNot.subsections.notALender.content")}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.whatDoesNot.subsections.notALender.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
              <p className="text-neutral-700 leading-relaxed pt-2">
                {t(
                  "sections.whatDoesNot.subsections.noHandlingOfFunds.content",
                )}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t(
                  "sections.whatDoesNot.subsections.noCreditDecisions.content",
                )}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.whatDoesNot.subsections.noGuarantee.content")}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.whatDoesNot.subsections.noGuarantee.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
              <p className="text-neutral-700 leading-relaxed pt-2">
                {t("sections.whatDoesNot.subsections.noFiduciary.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.whatDoesNot.subsections.noDutyToMonitor.content")}
              </p>
            </section>

            <section id="participants" className="space-y-6">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.participants.title")}
              </h2>

              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-900">
                  {t(
                    "sections.participants.subsections.independentParties.title",
                  )}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {t(
                    "sections.participants.subsections.independentParties.content",
                  )}
                </p>

                <div className="overflow-x-auto border border-neutral-200 rounded-lg shadow-sm">
                  <table className="w-full text-left border-collapse border border-neutral-200">
                    <thead>
                      <tr className="bg-neutral-100 border-b border-neutral-200 text-[#164780]">
                        <th className="p-4 font-semibold w-1/3 border-r border-neutral-200">
                          {t(
                            "sections.participants.subsections.independentParties.tableHeaders.participant",
                          )}
                        </th>
                        <th className="p-4 font-semibold w-2/3">
                          {t(
                            "sections.participants.subsections.independentParties.tableHeaders.responsibility",
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 text-neutral-700">
                      {t
                        .raw(
                          "sections.participants.subsections.independentParties.tableRows",
                        )
                        .map(
                          (
                            row: {
                              participant: string;
                              responsibility: string;
                            },
                            idx: number,
                          ) => (
                            <tr key={idx} className="hover:bg-neutral-50">
                              <td className="p-4 font-semibold text-[#164780] align-top border-r border-neutral-200">
                                {row.participant}
                              </td>
                              <td className="p-4 leading-relaxed align-top">
                                {row.responsibility}
                              </td>
                            </tr>
                          ),
                        )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-semibold text-neutral-900">
                  {t(
                    "sections.participants.subsections.useOfDesignatedProviders.title",
                  )}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {t(
                    "sections.participants.subsections.useOfDesignatedProviders.content",
                  )}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-semibold text-neutral-900">
                  {t(
                    "sections.participants.subsections.accurateInformation.title",
                  )}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {t(
                    "sections.participants.subsections.accurateInformation.content",
                  )}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-semibold text-neutral-900">
                  {t("sections.participants.subsections.noDeviation.title")}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {t("sections.participants.subsections.noDeviation.content")}
                </p>
              </div>
            </section>

            <section id="kyc" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.kyc.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.kyc.subsections.ownResponsibility.content")}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.kyc.subsections.ownResponsibility.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
              <p className="text-neutral-700 leading-relaxed pt-2">
                {t("sections.kyc.subsections.regulatedInstitutions.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.kyc.subsections.documentsPassed.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.kyc.subsections.yourRepresentations.content")}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.kyc.subsections.yourRepresentations.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
              <p className="text-neutral-700 leading-relaxed pt-2">
                {t("sections.kyc.subsections.agroTrustRights.content")}
              </p>
            </section>

            <section id="funds" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.funds.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.funds.subsections.escrow.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.funds.subsections.bewareOfFraud.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.funds.subsections.digitalAssets.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.funds.subsections.structuringFee.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.funds.subsections.bundledFees.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.funds.subsections.taxes.content")}
              </p>
            </section>

            <section id="data" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.data.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.data.subsections.confidentialInformation.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.data.subsections.intellectualProperty.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.data.subsections.yourContent.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.data.subsections.privacy.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t(
                  "sections.data.subsections.electronicCommunications.content",
                )}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.data.subsections.textMessages.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.data.subsections.acceptableUse.content")}
              </p>
            </section>

            <section id="risk" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.risk.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.risk.subsections.risksYouAccept.content")}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.risk.subsections.risksYouAccept.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
              <p className="text-neutral-700 leading-relaxed pt-2">
                {t("sections.risk.subsections.asIsPlatform.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.risk.subsections.informationOnly.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.risk.subsections.noReliance.content")}
              </p>
            </section>

            <section id="limitation" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.limitation.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t(
                  "sections.limitation.subsections.noLiabilityForThirdParties.content",
                )}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.limitation.subsections.excludedLosses.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.limitation.subsections.liabilityCap.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.limitation.subsections.basisOfTheBargain.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.limitation.subsections.indemnity.content")}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                {t
                  .raw("sections.limitation.subsections.indemnity.items")
                  .map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
              </ul>
              <p className="text-neutral-700 leading-relaxed pt-2">
                {t("sections.limitation.subsections.timeLimit.content")}
              </p>
            </section>

            <section id="suspension" className="space-y-4">
              <h2 className="text-xl font-semibold text-[#164780]">
                {t("sections.suspension.title")}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t(
                  "sections.suspension.subsections.suspensionAndTermination.content",
                )}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.suspension.subsections.survival.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.suspension.subsections.governingLaw.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.suspension.subsections.disputes.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.suspension.subsections.changes.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed">
                {t("sections.suspension.subsections.general.content")}
              </p>
              <p className="text-neutral-700 leading-relaxed font-medium">
                {t("sections.suspension.subsections.contact.content")}
              </p>
            </section>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
