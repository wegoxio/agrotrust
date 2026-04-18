type AboutFeatureIconVariant = "origin" | "platform" | "sourcing";

type AboutFeatureIconProps = {
  variant: AboutFeatureIconVariant;
};

export function AboutFeatureIcon({ variant }: AboutFeatureIconProps) {
  if (variant === "origin") {
    return (
      <svg
        aria-hidden
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="text-primary"
      >
        <path
          d="M4 11.2L12 4L20 11.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.8 10.8V20H17.2V10.8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.2 20V14.4H13.8V20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "platform") {
    return (
      <svg
        aria-hidden
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="text-primary"
      >
        <rect
          x="4"
          y="6"
          width="16"
          height="12"
          rx="2.2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 10H16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="9.2" cy="14" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className="text-primary"
    >
      <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
