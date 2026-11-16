import Link from "next/link";

export type FilterOption = {
  label: string;
  href: string;
  count: number;
  active: boolean;
  tone?: "sale";
};

export type FilterGroup = {
  title: string;
  options: FilterOption[];
};

/** Lista de filtros (columna en desktop, contenido del panel en mobile). */
export function CatalogFilters({ groups }: { groups: FilterGroup[] }) {
  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col">
          <p className="text-primary text-[13px] uppercase tracking-wider font-medium pb-3 mb-2 border-b border-lightGray">
            {group.title}
          </p>
          <ul className="flex flex-col">
            {group.options.map((opt) => {
              const disabled = opt.count === 0 && !opt.active;
              const sale = opt.tone === "sale";
              const base =
                "flex items-center justify-between gap-3 py-2.5 pl-3 pr-2 border-l-2 transition-colors";
              const activeClass = sale
                ? "border-sale bg-sale/10 text-sale font-medium"
                : "border-primary bg-lightGray/60 text-primary font-medium";
              const idleClass = sale
                ? "border-transparent text-sale hover:border-sale/40"
                : "border-transparent text-tertiary font-light hover:text-primary hover:border-lightGray";
              const content = (
                <>
                  <span>{opt.label}</span>
                  <span
                    className={`text-xs min-w-6 text-center px-1.5 py-0.5 ${
                      opt.active
                        ? sale
                          ? "bg-sale text-white"
                          : "bg-primary text-white"
                        : sale
                          ? "bg-sale/10 text-sale"
                          : "bg-lightGray text-secondary"
                    }`}
                  >
                    {opt.count}
                  </span>
                </>
              );

              return (
                <li key={opt.label}>
                  {disabled ? (
                    <span
                      className={`${base} border-transparent text-secondary/50 font-light cursor-default`}
                      aria-disabled="true"
                    >
                      {content}
                    </span>
                  ) : (
                    <Link
                      href={opt.href}
                      scroll={false}
                      aria-current={opt.active ? "true" : undefined}
                      className={`${base} ${opt.active ? activeClass : idleClass}`}
                    >
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
