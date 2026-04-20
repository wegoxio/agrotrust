import { getCountryCallingCode, type CountryCode } from "libphonenumber-js/min";

export const runtime = "nodejs";

type SupportedLocale = "en" | "es";

type ContactPayload = {
  locale?: string;
  purpose?: string;
  role?: string;
  companyName?: string;
  country?: string;
  industry?: string;
  fullName?: string;
  email?: string;
  phoneCountry?: string;
  phoneNumber?: string;
  commodities?: string[];
  volume?: string;
  message?: string;
};

type NormalizedContact = {
  locale: SupportedLocale;
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

const PURPOSE_VALUES = [
  "requestSupply",
  "applyFinancing",
  "becomeProducer",
  "becomePartner",
  "generalInquiry",
] as const;
const ROLE_VALUES = [
  "buyerOfftaker",
  "producerExporter",
  "investorEntity",
  "bankEscrow",
  "warehouseManager",
  "logisticsShipping",
  "exchangePayment",
  "other",
] as const;
const COMMODITY_VALUES = ["cocoa", "coffee", "other"] as const;
const VOLUME_VALUES = ["small", "medium", "large"] as const;

const COPY = {
  en: {
    adminSubjectPrefix: "[AgroTrust Contact]",
    customerSubject: "We received your inquiry | AgroTrust",
    customerTitle: "Thank you for contacting AgroTrust",
    customerIntro:
      "Your inquiry has been received successfully. Our team will contact you shortly with next steps.",
    customerOutro:
      "All inquiries are handled confidentially within our secure platform.",
    internalTitle: "New Contact Inquiry",
    internalIntro:
      "A new contact form submission was received through the AgroTrust website.",
    purposeLabel: "Contact Purpose",
    roleLabel: "Role / Company Type",
    companyNameLabel: "Company Name",
    countryLabel: "Country",
    industryLabel: "Industry / Sector",
    fullNameLabel: "Full Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone / WhatsApp",
    commoditiesLabel: "Transaction Interest",
    volumeLabel: "Estimated Volume",
    messageLabel: "Message",
    notProvided: "Not provided",
    purposeOptions: {
      requestSupply: "Request Supply (Buyer / Offtaker)",
      applyFinancing: "Apply for Financing / Investment Opportunities",
      becomeProducer: "Become a Producer",
      becomePartner: "Become a Partner",
      generalInquiry: "General Inquiry",
    },
    roleOptions: {
      buyerOfftaker: "Buyer / Offtaker",
      producerExporter: "Producer / Exporter",
      investorEntity: "Investor / Financing Entity",
      bankEscrow: "Bank / Escrow Provider",
      warehouseManager: "Warehouse / Collateral Manager",
      logisticsShipping: "Logistics / Shipping Company",
      exchangePayment: "Exchange / Payment Platform",
      other: "Other",
    },
    commodityOptions: {
      cocoa: "Cocoa",
      coffee: "Coffee",
      other: "Other Commodities",
    },
    volumeOptions: {
      small: "Small (1-5 containers)",
      medium: "Medium (5-20 containers)",
      large: "Large (20+ containers)",
    },
  },
  es: {
    adminSubjectPrefix: "[Contacto AgroTrust]",
    customerSubject: "Hemos recibido tu solicitud | AgroTrust",
    customerTitle: "Gracias por contactar a AgroTrust",
    customerIntro:
      "Tu solicitud fue recibida correctamente. Nuestro equipo te contactara pronto con los proximos pasos.",
    customerOutro:
      "Todas las solicitudes se gestionan de forma confidencial dentro de nuestra plataforma segura.",
    internalTitle: "Nueva Solicitud de Contacto",
    internalIntro:
      "Se recibio una nueva solicitud desde el formulario de contacto del sitio AgroTrust.",
    purposeLabel: "Proposito de contacto",
    roleLabel: "Rol / Tipo de empresa",
    companyNameLabel: "Nombre de la empresa",
    countryLabel: "Pais",
    industryLabel: "Industria / Sector",
    fullNameLabel: "Nombre completo",
    emailLabel: "Correo electronico",
    phoneLabel: "Telefono / WhatsApp",
    commoditiesLabel: "Interes de transaccion",
    volumeLabel: "Volumen estimado",
    messageLabel: "Mensaje",
    notProvided: "No especificado",
    purposeOptions: {
      requestSupply: "Solicitar suministro (Comprador / Offtaker)",
      applyFinancing: "Aplicar para financiamiento / oportunidades de inversion",
      becomeProducer: "Convertirme en productor",
      becomePartner: "Convertirme en aliado",
      generalInquiry: "Consulta general",
    },
    roleOptions: {
      buyerOfftaker: "Comprador / Offtaker",
      producerExporter: "Productor / Exportador",
      investorEntity: "Inversionista / entidad de financiamiento",
      bankEscrow: "Banco / proveedor escrow",
      warehouseManager: "Almacen / gestor de colateral",
      logisticsShipping: "Empresa de logistica / shipping",
      exchangePayment: "Plataforma de cambio / pagos",
      other: "Otro",
    },
    commodityOptions: {
      cocoa: "Cacao",
      coffee: "Cafe",
      other: "Otros commodities",
    },
    volumeOptions: {
      small: "Pequeno (1-5 contenedores)",
      medium: "Mediano (5-20 contenedores)",
      large: "Grande (20+ contenedores)",
    },
  },
} as const;

function isAllowed<T extends readonly string[]>(
  value: string,
  list: T
): value is T[number] {
  return list.includes(value);
}

function toLocale(rawLocale: string | undefined): SupportedLocale {
  return rawLocale?.toLowerCase().startsWith("es") ? "es" : "en";
}

function sanitizeString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getCountryName(code: string, locale: SupportedLocale) {
  if (!code) return "";
  const displayNames =
    typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function"
      ? new Intl.DisplayNames([locale], { type: "region" })
      : null;
  return displayNames?.of(code.toUpperCase()) || code.toUpperCase();
}

function getDialCode(code: string) {
  try {
    return `+${getCountryCallingCode(code.toUpperCase() as CountryCode)}`;
  } catch {
    return "";
  }
}

function normalizePayload(raw: ContactPayload): NormalizedContact | null {
  const locale = toLocale(raw.locale);
  const purpose = sanitizeString(raw.purpose, 60);
  const role = sanitizeString(raw.role, 60);
  const companyName = sanitizeString(raw.companyName, 140);
  const country = sanitizeString(raw.country, 6).toUpperCase();
  const industry = sanitizeString(raw.industry, 120);
  const fullName = sanitizeString(raw.fullName, 120);
  const email = sanitizeString(raw.email, 160).toLowerCase();
  const phoneCountry = sanitizeString(raw.phoneCountry, 6).toUpperCase();
  const phoneNumber = sanitizeString(raw.phoneNumber, 32);
  const volume = sanitizeString(raw.volume, 24);
  const message = sanitizeString(raw.message, 3000);
  const commoditiesRaw = Array.isArray(raw.commodities) ? raw.commodities : [];
  const commodities = commoditiesRaw
    .map((item) => sanitizeString(item, 30))
    .filter((item): item is (typeof COMMODITY_VALUES)[number] =>
      isAllowed(item, COMMODITY_VALUES)
    );

  const hasRequired =
    isAllowed(purpose, PURPOSE_VALUES) &&
    isAllowed(role, ROLE_VALUES) &&
    companyName.length > 0 &&
    fullName.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    email.length > 0 &&
    commodities.length > 0;

  if (!hasRequired) {
    return null;
  }

  return {
    locale,
    purpose,
    role,
    companyName,
    country,
    industry,
    fullName,
    email,
    phoneCountry,
    phoneNumber,
    commodities,
    volume: isAllowed(volume, VOLUME_VALUES) ? volume : "",
    message,
  };
}

function renderEmailLayout(params: {
  title: string;
  preheader: string;
  intro: string;
  body: string;
  locale: SupportedLocale;
  siteUrl?: string;
}) {
  const logoUrl = params.siteUrl
    ? `${params.siteUrl.replace(/\/$/, "")}/agrotrust_logo.png`
    : "";

  const safeTitle = escapeHtml(params.title);
  const safePreheader = escapeHtml(params.preheader);
  const safeIntro = escapeHtml(params.intro);

  return `<!doctype html>
<html lang="${params.locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
  </head>
  <body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,sans-serif;color:#1f2c39;">
    <span style="display:none !important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">${safePreheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:720px;background:#ffffff;border:1px solid #d6dfea;border-radius:10px;overflow:hidden;">
            <tr>
              <td style="padding:24px;background:linear-gradient(270deg,#164780 0%,#001c42 100%);">
                ${
                  logoUrl
                    ? `<img src="${escapeHtml(logoUrl)}" alt="AgroTrust" width="174" style="display:block;max-width:100%;height:auto;" />`
                    : '<p style="margin:0;font-size:28px;line-height:1;font-weight:700;color:#ffffff;">AGROTRUST</p>'
                }
              </td>
            </tr>
            <tr>
              <td style="padding:26px 26px 14px 26px;">
                <h1 style="margin:0 0 10px 0;font-size:27px;line-height:1.15;font-weight:700;color:#24374b;">${safeTitle}</h1>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#455b70;">${safeIntro}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 26px 26px 26px;">
                ${params.body}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderInfoTable(copy: (typeof COPY)[SupportedLocale], data: NormalizedContact) {
  const purpose = copy.purposeOptions[data.purpose as keyof typeof copy.purposeOptions];
  const role = copy.roleOptions[data.role as keyof typeof copy.roleOptions];
  const countryName = data.country
    ? getCountryName(data.country, data.locale)
    : copy.notProvided;
  const commodityList = data.commodities
    .map((item) => copy.commodityOptions[item as keyof typeof copy.commodityOptions])
    .join(", ");
  const volume = data.volume
    ? copy.volumeOptions[data.volume as keyof typeof copy.volumeOptions]
    : copy.notProvided;
  const dialCode = data.phoneCountry ? getDialCode(data.phoneCountry) : "";
  const phone = data.phoneNumber
    ? `${dialCode} ${data.phoneNumber}`.trim()
    : dialCode || copy.notProvided;

  const rows: Array<[string, string]> = [
    [copy.purposeLabel, purpose],
    [copy.roleLabel, role],
    [copy.companyNameLabel, data.companyName],
    [copy.countryLabel, countryName],
    [copy.industryLabel, data.industry || copy.notProvided],
    [copy.fullNameLabel, data.fullName],
    [copy.emailLabel, data.email],
    [copy.phoneLabel, phone],
    [copy.commoditiesLabel, commodityList || copy.notProvided],
    [copy.volumeLabel, volume],
    [copy.messageLabel, data.message || copy.notProvided],
  ];

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;overflow:hidden;border:1px solid #d4dee8;border-radius:8px;">
    ${rows
      .map(
        ([label, value], index) =>
          `<tr style="background:${index % 2 === 0 ? "#fbfdff" : "#f4f8fc"};">
            <td style="width:220px;padding:11px 12px;border-bottom:1px solid #e1e9f1;font-size:12px;line-height:1.3;font-weight:700;color:#4c6480;text-transform:uppercase;letter-spacing:.04em;">${escapeHtml(
              label
            )}</td>
            <td style="padding:11px 12px;border-bottom:1px solid #e1e9f1;font-size:14px;line-height:1.5;color:#1f2c39;">${escapeHtml(
              value
            )}</td>
          </tr>`
      )
      .join("")}
  </table>`;
}

async function sendResendEmail(
  apiKey: string,
  payload: Record<string, unknown>
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Resend request failed with status ${response.status}.`);
  }
}

export async function POST(request: Request) {
  try {
    const from = process.env.RESEND_FROM_EMAIL?.trim();
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const inboxRaw = process.env.CONTACT_INBOX_EMAIL?.trim();
    const defaultReplyTo = process.env.RESEND_REPLY_TO?.trim();
    const siteUrl =
      process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (!from || !apiKey || !inboxRaw) {
      return Response.json(
        { error: "Server email configuration is missing." },
        { status: 500 }
      );
    }

    const inboxRecipients = inboxRaw
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    if (inboxRecipients.length === 0) {
      return Response.json(
        { error: "No inbox recipients configured." },
        { status: 500 }
      );
    }

    let payload: ContactPayload;
    try {
      payload = (await request.json()) as ContactPayload;
    } catch {
      return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const normalized = normalizePayload(payload);

    if (!normalized) {
      return Response.json(
        { error: "Invalid contact form payload." },
        { status: 400 }
      );
    }

    const copy = COPY[normalized.locale];
    const detailsTable = renderInfoTable(copy, normalized);

    const adminSubject = `${copy.adminSubjectPrefix} ${copy.purposeOptions[
      normalized.purpose as keyof typeof copy.purposeOptions
    ]} - ${normalized.companyName}`;

    const customerBody = `<p style="margin:0 0 14px 0;font-size:14px;line-height:1.6;color:#33495f;">${escapeHtml(
      copy.customerOutro
    )}</p>${detailsTable}`;
    const internalBody = `<p style="margin:0 0 14px 0;font-size:14px;line-height:1.6;color:#33495f;">${escapeHtml(
      copy.internalIntro
    )}</p>${detailsTable}`;

    const customerHtml = renderEmailLayout({
      title: copy.customerTitle,
      preheader: copy.customerSubject,
      intro: copy.customerIntro,
      body: customerBody,
      locale: normalized.locale,
      siteUrl,
    });

    const internalHtml = renderEmailLayout({
      title: copy.internalTitle,
      preheader: adminSubject,
      intro: copy.internalIntro,
      body: internalBody,
      locale: normalized.locale,
      siteUrl,
    });

    await Promise.all([
      sendResendEmail(apiKey, {
        from,
        to: [normalized.email],
        subject: copy.customerSubject,
        html: customerHtml,
        reply_to: defaultReplyTo || inboxRecipients[0],
      }),
      sendResendEmail(apiKey, {
        from,
        to: inboxRecipients,
        subject: adminSubject,
        html: internalHtml,
        reply_to: normalized.email,
      }),
    ]);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to send contact emails." }, { status: 500 });
  }
}
