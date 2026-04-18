type HowItWorksChipProps = {
  label: string;
};

export function HowItWorksChip({ label }: HowItWorksChipProps) {
  return (
    <div className="flex min-h-11 items-center justify-center rounded-[8px] border border-[#AFC7E6] bg-[rgba(13,66,135,0.72)] px-4 text-center text-[15px] leading-[1.25] font-medium text-[#E9F1FF] sm:min-h-[52px] sm:text-[16px] sm:leading-[1.2]">
      {label}
    </div>
  );
}
