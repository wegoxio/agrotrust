"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";

type ContactValues = {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  message: string;
};

const INITIAL_VALUES: ContactValues = {
  fullName: "",
  email: "",
  company: "",
  phone: "",
  interest: "trade",
  message: "",
};

const CONTACT_EMAIL = "info@agrotrust.com";

export function ContactSection() {
  const t = useTranslations("ContactForm");
  const [values, setValues] = useState<ContactValues>(INITIAL_VALUES);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFilled =
      values.fullName.trim() &&
      values.email.trim() &&
      values.company.trim() &&
      values.message.trim();

    if (!requiredFilled) {
      setStatus("error");
      return;
    }

    const subject = `[AgroTrust] ${t(`form.interestOptions.${values.interest}`)}`;
    const body = [
      `${t("form.fullName")}: ${values.fullName}`,
      `${t("form.email")}: ${values.email}`,
      `${t("form.company")}: ${values.company}`,
      `${t("form.phone")}: ${values.phone || "-"}`,
      `${t("form.interest")}: ${t(`form.interestOptions.${values.interest}`)}`,
      "",
      `${t("form.message")}:`,
      values.message,
    ].join("\n");

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setStatus("success");
    setValues(INITIAL_VALUES);
  };

  return (
    <section id="contact" className="w-full bg-[#E6E8EB] py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-full px-5 md:px-8">
        <RevealOnScroll>
          <p className="text-[16px] leading-none font-bold tracking-[0.02em] text-primary uppercase">
            {t("eyebrow")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={70}>
          <h2 className="mt-2 text-[30px] leading-[1.08] font-normal text-[#5E6368] sm:text-[34px] md:text-[56px]">
            {t("title")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delayMs={130}>
          <p className="mt-3 text-[15px] leading-[1.55] font-normal text-[#515960] sm:text-[16px]">
            {t("description")}
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.3fr] lg:gap-8">
          <RevealOnScroll delayMs={170}>
            <aside
              className="rounded-[8px] border border-[#2D5D94]/45 p-6 text-white"
              style={{
                background:
                  "var(--brand-gradient-primary, linear-gradient(270deg, #164780 0%, #001C42 100%))",
              }}
            >
              <h3 className="text-[24px] leading-[1.2] font-semibold">
                {t("infoTitle")}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#B7D1EE]">
                {t("infoText")}
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-[13px] leading-none font-semibold uppercase tracking-[0.08em] text-[#8FB2D8]">
                    {t("info.emailLabel")}
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 inline-flex text-[17px] text-white transition-colors hover:text-[#B8DEF7]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>

                <div>
                  <p className="text-[13px] leading-none font-semibold uppercase tracking-[0.08em] text-[#8FB2D8]">
                    {t("info.phoneLabel")}
                  </p>
                  <a
                    href="tel:+1234567890"
                    className="mt-1 inline-flex text-[17px] text-white transition-colors hover:text-[#B8DEF7]"
                  >
                    +1 (234) 567-890
                  </a>
                </div>

                <div>
                  <p className="text-[13px] leading-none font-semibold uppercase tracking-[0.08em] text-[#8FB2D8]">
                    {t("info.responseLabel")}
                  </p>
                  <p className="mt-1 text-[16px] text-white">
                    {t("info.responseValue")}
                  </p>
                </div>
              </div>
            </aside>
          </RevealOnScroll>

          <RevealOnScroll delayMs={220}>
            <form
              onSubmit={onSubmit}
              className="rounded-[8px] border border-[#CBD4DE] bg-[#F7F9FC] p-5 shadow-[0_12px_28px_rgba(8,30,60,0.08)] sm:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                    {t("form.fullName")}
                  </span>
                  <input
                    type="text"
                    required
                    value={values.fullName}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        fullName: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-11 w-full rounded-[6px] border border-[#C5D1DC] bg-white px-3 text-[15px] text-[#1F2C39] outline-none transition-colors focus:border-[#5A8CC3]"
                  />
                </label>

                <label className="block">
                  <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                    {t("form.email")}
                  </span>
                  <input
                    type="email"
                    required
                    value={values.email}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-11 w-full rounded-[6px] border border-[#C5D1DC] bg-white px-3 text-[15px] text-[#1F2C39] outline-none transition-colors focus:border-[#5A8CC3]"
                  />
                </label>

                <label className="block">
                  <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                    {t("form.company")}
                  </span>
                  <input
                    type="text"
                    required
                    value={values.company}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        company: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-11 w-full rounded-[6px] border border-[#C5D1DC] bg-white px-3 text-[15px] text-[#1F2C39] outline-none transition-colors focus:border-[#5A8CC3]"
                  />
                </label>

                <label className="block">
                  <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                    {t("form.phone")}
                  </span>
                  <input
                    type="tel"
                    value={values.phone}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-11 w-full rounded-[6px] border border-[#C5D1DC] bg-white px-3 text-[15px] text-[#1F2C39] outline-none transition-colors focus:border-[#5A8CC3]"
                  />
                </label>
              </div>

              <div className="mt-4 grid gap-4">
                <label className="block">
                  <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                    {t("form.interest")}
                  </span>
                  <select
                    value={values.interest}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        interest: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-11 w-full rounded-[6px] border border-[#C5D1DC] bg-white px-3 text-[15px] text-[#1F2C39] outline-none transition-colors focus:border-[#5A8CC3]"
                  >
                    <option value="trade">{t("form.interestOptions.trade")}</option>
                    <option value="capital">{t("form.interestOptions.capital")}</option>
                    <option value="partnership">
                      {t("form.interestOptions.partnership")}
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                    {t("form.message")}
                  </span>
                  <textarea
                    required
                    rows={6}
                    value={values.message}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    className="mt-1.5 w-full rounded-[6px] border border-[#C5D1DC] bg-white px-3 py-2.5 text-[15px] text-[#1F2C39] outline-none transition-colors focus:border-[#5A8CC3]"
                    placeholder={t("form.messagePlaceholder")}
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-[4px] bg-primary px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#0A3973]"
                >
                  {t("form.submit")}
                </button>

                <p className="text-[12px] leading-[1.45] text-[#637385]">
                  {t("form.disclaimer")}
                </p>
              </div>

              {status === "error" ? (
                <p className="mt-3 text-[14px] font-medium text-[#C13A4E]">
                  {t("form.error")}
                </p>
              ) : null}

              {status === "success" ? (
                <p className="mt-3 text-[14px] font-medium text-[#1D6C4D]">
                  {t("form.success")}
                </p>
              ) : null}
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
