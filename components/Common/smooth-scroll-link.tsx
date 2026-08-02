"use client";

import { MouseEvent, type AnchorHTMLAttributes } from "react";

type SmoothScrollLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: `#${string}`;
};

export function SmoothScrollLink({
  href,
  onClick,
  children,
  ...props
}: SmoothScrollLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }

    const target = document.querySelector<HTMLElement>(href);
    if (!target) {
      const localeMatch = window.location.pathname.match(/^\/(en|es)(?:\/|$)/);
      const localePrefix = localeMatch ? `/${localeMatch[1]}` : "";
      window.location.assign(`${localePrefix}/${href}`);
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
