type PlatformAccordionItemProps = {
  index: number;
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
};

export function PlatformAccordionItem({
  index,
  title,
  description,
  isOpen,
  onToggle,
}: PlatformAccordionItemProps) {
  return (
    <article className="border-t border-[#C7CDD2]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden
            className={`h-3 w-px shrink-0 rotate-[33deg] bg-[#78838E] transition-transform duration-400 ease-out ${
              isOpen ? "rotate-[60deg]" : "rotate-[33deg]"
            }`}
          />
          <span className="text-pretty text-[22px] leading-[1.22] font-bold text-[#11171D] sm:text-[26px] md:text-[34px]">
            {index + 1}. {title}
          </span>
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`pb-4 pl-5 text-[14px] leading-[1.65] font-normal text-[#3F464C] transition-all duration-400 ease-out sm:pl-6 sm:text-[15px] md:pl-8 md:text-[16px] ${
              isOpen ? "translate-y-0 opacity-100 delay-75" : "-translate-y-1 opacity-0"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
