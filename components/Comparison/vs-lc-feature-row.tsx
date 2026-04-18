type VsLcFeatureRowProps = {
  text: string;
  showCheck?: boolean;
  isFirst?: boolean;
};

function CheckIcon() {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#173B46] text-white">
      <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5">
        <path
          d="M6.6 12.4L10.2 16L17.4 8.8"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function VsLcFeatureRow({
  text,
  showCheck = false,
  isFirst = false,
}: VsLcFeatureRowProps) {
  return (
    <div
      className={`flex min-h-[44px] items-center gap-3 py-2.5 sm:min-h-[49px] sm:py-3 ${
        isFirst ? "" : "border-t border-[#C4CAD0]"
      }`}
    >
      {showCheck ? <CheckIcon /> : null}
      <p className="text-[15px] leading-[1.4] font-normal text-[#2E3338] sm:text-[16px]">
        {text}
      </p>
    </div>
  );
}
