import { getTranslations } from "next-intl/server";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";
import { VsLcFeatureRow } from "./vs-lc-feature-row";

export async function VsLcSection() {
  const t = await getTranslations("VsLc");

  const leftItems = [
    t("leftItems.1"),
    t("leftItems.2"),
    t("leftItems.3"),
    t("leftItems.4"),
    t("leftItems.5"),
    t("leftItems.6"),
    t("leftItems.7"),
    t("leftItems.8"),
  ];

  const rightItems = [
    t("rightItems.1"),
    t("rightItems.2"),
    t("rightItems.3"),
    t("rightItems.4"),
    t("rightItems.5"),
    t("rightItems.6"),
    t("rightItems.7"),
    t("rightItems.8"),
  ];

  return (
    <section id="vs-lc" className="w-full bg-[#E6E8EB] py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-full px-5 md:px-8">
        <RevealOnScroll>
          <h2 className="text-center text-[30px] leading-[1.08] font-normal text-[#5E6368] sm:text-[34px] md:text-[56px]">
            <span className="font-bold text-[#123B46]">{t("titleBrand")}</span>{" "}
            <span>{t("titleVs")}</span>
            <br />
            {t("titleMain")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delayMs={70}>
          <p className="mx-auto mt-5 w-full text-center text-[15px] leading-[1.55] font-normal text-[#2D3136] sm:text-[16px] md:w-[88%] lg:w-[76%]">
            {t("description")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={140} className="mt-8 md:mt-10">
          <div className="mx-auto w-full lg:w-[88%] xl:w-[78%]">
            <div className="rounded-[4px] border border-[#CCD2D7] bg-[#E6E8EB] p-4 md:p-6">
              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="px-2 py-2 md:px-4">
                  <h3 className="pt-2 text-center text-[18px] leading-[1.2] font-bold text-[#23282D]">
                    {t("leftTitle")}
                  </h3>

                  <div className="mt-8">
                    {leftItems.map((item, index) => (
                      <VsLcFeatureRow
                        key={item}
                        text={item}
                        isFirst={index === 0}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-[3px] bg-[linear-gradient(90deg,#022F3A_0%,#2F4D59_100%)] p-3 md:p-4">
                  <h3 className="pb-3 text-center text-[30px] leading-none text-white sm:text-[36px] md:pb-4 md:text-[42px]">
                    <span className="font-bold">AGRO</span>
                    <span className="font-light italic">TRUST</span>
                  </h3>

                  <div className="rounded-[2px] bg-[#E6E8EB] px-4 md:px-6">
                    {rightItems.map((item, index) => (
                      <VsLcFeatureRow
                        key={item}
                        text={item}
                        showCheck
                        isFirst={index === 0}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={200}>
          <p className="mt-8 text-center text-[16px] leading-none font-semibold italic text-[#163C48]">
            {t("footer")}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
