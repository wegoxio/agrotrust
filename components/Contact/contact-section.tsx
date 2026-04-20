"use client";

import {
  FormEvent,
  type ReactNode,
  type SelectHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";
import { RevealOnScroll } from "@/components/Animations/reveal-on-scroll";

type CountryOption = {
  code: CountryCode;
  name: string;
  dialCode: string;
  flag: string;
};

type ContactValues = {
  purpose: string;
  role: string;
  companyName: string;
  country: string;
  industry: string;
  fullName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  commodities: string[];
  volume: string;
  message: string;
};

const INITIAL_VALUES: ContactValues = {
  purpose: "",
  role: "",
  companyName: "",
  country: "",
  industry: "",
  fullName: "",
  email: "",
  phoneCountry: "US",
  phoneNumber: "",
  commodities: [],
  volume: "",
  message: "",
};

const PURPOSE_OPTIONS = [
  "requestSupply",
  "applyFinancing",
  "becomeProducer",
  "becomePartner",
  "generalInquiry",
] as const;
const ROLE_OPTIONS = [
  "buyerOfftaker",
  "producerExporter",
  "investorEntity",
  "bankEscrow",
  "warehouseManager",
  "logisticsShipping",
  "exchangePayment",
  "other",
] as const;
const COMMODITY_OPTIONS = ["cocoa", "coffee", "other"] as const;
const VOLUME_OPTIONS = ["small", "medium", "large"] as const;

function countryCodeToFlag(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (character) =>
      String.fromCodePoint(127397 + character.charCodeAt(0))
    );
}

function getCountryOptions(locale: string): CountryOption[] {
  const displayNames =
    typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function"
      ? new Intl.DisplayNames([locale], { type: "region" })
      : null;

  return getCountries()
    .map((code) => {
      const countryCode = code as CountryCode;
      const name = displayNames?.of(countryCode) || countryCode;
      return {
        code: countryCode,
        name,
        dialCode: `+${getCountryCallingCode(countryCode)}`,
        flag: countryCodeToFlag(countryCode),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

type StyledSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
};

function StyledSelect({ children, className = "", ...props }: StyledSelectProps) {
  return (
    <div className="relative mt-1.5">
      <select
        {...props}
        className={`h-11 w-full appearance-none rounded-[8px] border border-[#BCCBDB] bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F9FD_100%)] px-3 pr-10 text-[15px] text-[#1F2C39] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] outline-none transition-all duration-200 hover:border-[#96B0CB] hover:bg-[linear-gradient(180deg,#FFFFFF_0%,#F0F6FC_100%)] focus:border-[#5A8CC3] focus:ring-2 focus:ring-[#5A8CC3]/30 ${className}`}
      >
        {children}
      </select>

      <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-[#587696]">
        <svg aria-hidden viewBox="0 0 24 24" className="h-4.5 w-4.5">
          <path
            d="M7 10L12 15L17 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

type SearchableCountrySelectProps = {
  mode?: "country" | "dial";
  value: string;
  options: CountryOption[];
  placeholder: string;
  searchPlaceholder: string;
  noResultsLabel: string;
  onChange: (code: string) => void;
};

function SearchableCountrySelect({
  mode = "country",
  value,
  options,
  placeholder,
  searchPlaceholder,
  noResultsLabel,
  onChange,
}: SearchableCountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectedOption = options.find((option) => option.code === value);

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return options;
    }

    return options.filter((option) => {
      const byName = option.name.toLowerCase().includes(normalized);
      const byCode = option.code.toLowerCase().includes(normalized);
      const byDial = option.dialCode.toLowerCase().includes(normalized);
      return byName || byCode || byDial;
    });
  }, [options, query]);

  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node | null;
      if (targetNode && wrapperRef.current?.contains(targetNode)) {
        return;
      }

      setIsOpen(false);
      setQuery("");
    };

    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [isOpen]);

  const selectValue = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setQuery("");
  };

  const selectedLabel = selectedOption
    ? mode === "dial"
      ? `${selectedOption.flag} ${selectedOption.dialCode}`
      : `${selectedOption.flag} ${selectedOption.name}`
    : placeholder;

  return (
    <div ref={wrapperRef} className="relative mt-1.5">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`inline-flex h-11 w-full items-center justify-between rounded-[8px] border border-[#BCCBDB] bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F9FD_100%)] px-3 text-left text-[15px] text-[#1F2C39] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] outline-none transition-all duration-200 hover:border-[#96B0CB] hover:bg-[linear-gradient(180deg,#FFFFFF_0%,#F0F6FC_100%)] ${
          isOpen ? "border-[#5A8CC3] ring-2 ring-[#5A8CC3]/30" : ""
        }`}
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedLabel}</span>
        <span className="text-[#587696]">
          <svg aria-hidden viewBox="0 0 24 24" className="h-4.5 w-4.5">
            <path
              d="M7 10L12 15L17 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen ? (
        <div className="absolute top-[calc(100%+6px)] left-0 z-30 w-full rounded-[8px] border border-[#B8CADC] bg-white p-2 shadow-[0_14px_28px_rgba(6,29,56,0.18)]">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-[6px] border border-[#C5D1DC] bg-[#F7FAFD] px-3 text-[14px] text-[#1F2C39] outline-none transition-colors focus:border-[#5A8CC3]"
          />

          <ul className="mt-2 max-h-60 overflow-y-auto pr-0.5">
            {filteredOptions.length === 0 ? (
              <li className="px-2 py-2 text-[13px] text-[#6B7E91]">
                {noResultsLabel}
              </li>
            ) : (
              filteredOptions.map((option) => (
                <li key={option.code}>
                  <button
                    type="button"
                    onClick={() => selectValue(option.code)}
                    className={`flex w-full items-center justify-between rounded-[6px] px-2 py-2 text-left text-[14px] transition-colors hover:bg-[#EDF3F9] ${
                      option.code === value ? "bg-[#E7F0FA]" : ""
                    }`}
                  >
                    <span className="truncate text-[#23374A]">
                      {option.flag} {option.name}
                    </span>
                    <span className="ml-2 shrink-0 text-[#607A94]">
                      {option.dialCode}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function ContactSection() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const [values, setValues] = useState<ContactValues>(INITIAL_VALUES);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryOptions = useMemo(() => getCountryOptions(locale), [locale]);

  const toggleCommodity = (commodity: string) => {
    setValues((current) => {
      const exists = current.commodities.includes(commodity);
      return {
        ...current,
        commodities: exists
          ? current.commodities.filter((item) => item !== commodity)
          : [...current.commodities, commodity],
      };
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const requiredFilled =
      values.purpose &&
      values.role &&
      values.companyName.trim() &&
      values.fullName.trim() &&
      values.email.trim() &&
      values.commodities.length > 0;

    if (!requiredFilled) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locale,
        ...values,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Contact submission failed.");
        }

        setStatus("success");
        setValues(INITIAL_VALUES);
      })
      .catch(() => {
        setStatus("error");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
            {t("subtitle")}
          </p>
        </RevealOnScroll>

        <div className="mx-auto mt-8 w-full max-w-[1040px]">
          <RevealOnScroll delayMs={170}>
            <form
              onSubmit={onSubmit}
              className="rounded-[8px] border border-[#CBD4DE] bg-[#F7F9FC] p-5 shadow-[0_12px_28px_rgba(8,30,60,0.08)] sm:p-6 md:p-7"
            >
              <div className="grid gap-6">
                <div>
                  <h3 className="text-[18px] leading-none font-semibold text-[#20384E]">
                    {t("sections.purpose")}
                  </h3>
                  <label className="mt-3 block">
                    <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                      {t("form.purpose")}
                    </span>
                    <StyledSelect
                      required
                      value={values.purpose}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          purpose: event.target.value,
                        }))
                      }
                    >
                      <option value="">{t("form.purposePlaceholder")}</option>
                      {PURPOSE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {t(`form.purposeOptions.${option}`)}
                        </option>
                      ))}
                    </StyledSelect>
                  </label>
                </div>

                <div>
                  <h3 className="text-[18px] leading-none font-semibold text-[#20384E]">
                    {t("sections.companyType")}
                  </h3>
                  <label className="mt-3 block">
                    <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                      {t("form.role")}
                    </span>
                    <StyledSelect
                      required
                      value={values.role}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          role: event.target.value,
                        }))
                      }
                    >
                      <option value="">{t("form.rolePlaceholder")}</option>
                      {ROLE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {t(`form.roleOptions.${option}`)}
                        </option>
                      ))}
                    </StyledSelect>
                  </label>
                </div>

                <div>
                  <h3 className="text-[18px] leading-none font-semibold text-[#20384E]">
                    {t("sections.companyInfo")}
                  </h3>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                        {t("form.companyName")}
                      </span>
                      <input
                        type="text"
                        required
                        value={values.companyName}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            companyName: event.target.value,
                          }))
                        }
                        className="mt-1.5 h-11 w-full rounded-[6px] border border-[#C5D1DC] bg-white px-3 text-[15px] text-[#1F2C39] outline-none transition-colors focus:border-[#5A8CC3]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                        {t("form.country")}
                      </span>
                      <SearchableCountrySelect
                        value={values.country}
                        options={countryOptions}
                        placeholder={t("form.countryPlaceholder")}
                        searchPlaceholder={t("form.searchCountries")}
                        noResultsLabel={t("form.noCountryResults")}
                        onChange={(code) =>
                          setValues((current) => ({ ...current, country: code }))
                        }
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                        {t("form.industry")}
                      </span>
                      <input
                        type="text"
                        value={values.industry}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            industry: event.target.value,
                          }))
                        }
                        className="mt-1.5 h-11 w-full rounded-[6px] border border-[#C5D1DC] bg-white px-3 text-[15px] text-[#1F2C39] outline-none transition-colors focus:border-[#5A8CC3]"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-[18px] leading-none font-semibold text-[#20384E]">
                    {t("sections.contactInfo")}
                  </h3>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
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

                    <label className="block sm:col-span-2">
                      <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                        {t("form.phone")}
                      </span>
                      <div className="mt-1.5 grid gap-3 sm:grid-cols-[240px_1fr]">
                        <SearchableCountrySelect
                          mode="dial"
                          value={values.phoneCountry}
                          options={countryOptions}
                          placeholder={t("form.phoneCountryPlaceholder")}
                          searchPlaceholder={t("form.searchPhoneCountries")}
                          noResultsLabel={t("form.noCountryResults")}
                          onChange={(code) =>
                            setValues((current) => ({ ...current, phoneCountry: code }))
                          }
                        />
                        <input
                          type="tel"
                          value={values.phoneNumber}
                          onChange={(event) =>
                            setValues((current) => ({
                              ...current,
                              phoneNumber: event.target.value,
                            }))
                          }
                          placeholder={t("form.phoneNumberPlaceholder")}
                          className="h-11 w-full rounded-[8px] border border-[#BCCBDB] bg-[linear-gradient(180deg,#FFFFFF_0%,#F5F9FD_100%)] px-3 text-[15px] text-[#1F2C39] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)] outline-none transition-all duration-200 hover:border-[#96B0CB] hover:bg-[linear-gradient(180deg,#FFFFFF_0%,#F0F6FC_100%)] focus:border-[#5A8CC3] focus:ring-2 focus:ring-[#5A8CC3]/30"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-[18px] leading-none font-semibold text-[#20384E]">
                    {t("sections.transaction")}
                  </h3>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <fieldset className="sm:col-span-2">
                      <legend className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                        {t("form.commodities")}
                      </legend>
                      <div className="mt-2 flex flex-wrap gap-2.5">
                        {COMMODITY_OPTIONS.map((commodity) => {
                          const isSelected = values.commodities.includes(commodity);
                          return (
                            <label
                              key={commodity}
                              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[14px] transition-colors ${
                                isSelected
                                  ? "border-[#7FA3C8] bg-[#E5EEF8] text-[#163A5C]"
                                  : "border-[#CBD6E3] bg-white text-[#43576A]"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleCommodity(commodity)}
                                className="h-4 w-4 rounded border-[#9EB2C6] text-primary focus:ring-primary/40"
                              />
                              <span>{t(`form.commodityOptions.${commodity}`)}</span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <label className="block sm:col-span-2">
                      <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                        {t("form.volume")}
                      </span>
                      <StyledSelect
                        value={values.volume}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            volume: event.target.value,
                          }))
                        }
                      >
                        <option value="">{t("form.volumePlaceholder")}</option>
                        {VOLUME_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {t(`form.volumeOptions.${option}`)}
                          </option>
                        ))}
                      </StyledSelect>
                    </label>
                  </div>
                </div>

                <label className="block">
                  <span className="text-[13px] font-semibold tracking-[0.02em] text-[#304558]">
                    {t("form.message")}
                  </span>
                  <textarea
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
                  disabled={isSubmitting}
                  className="inline-flex min-h-[46px] items-center justify-center rounded-[4px] bg-primary px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#0A3973]"
                >
                  {isSubmitting ? t("form.submitting") : t("form.submit")}
                </button>

                <p className="text-[12px] leading-[1.45] text-[#637385]">
                  {t("form.confidentiality")}
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
