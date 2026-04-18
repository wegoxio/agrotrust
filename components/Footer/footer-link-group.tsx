type FooterLinkItem = {
  href: string;
  label: string;
  ariaLabel?: string;
};

type FooterLinkGroupProps = {
  title: string;
  links: FooterLinkItem[];
};

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h3 className="text-[13px] leading-none font-bold tracking-[0.08em] text-white/80 uppercase">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <a
              href={link.href}
              aria-label={link.ariaLabel}
              className="group inline-flex text-[16px] leading-[1.25] font-normal text-white/88 transition-colors duration-300 hover:text-white focus-visible:text-white"
            >
              <span className="relative">
                {link.label}
                <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

