import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  locale?: AppLocale;
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex text-sm text-neutral-500">
      <ol className="inline-flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && <span className="mx-2 text-neutral-400">/</span>}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-neutral-800"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-neutral-700 font-medium">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
