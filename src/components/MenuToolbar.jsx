import { Search } from "lucide-react";
import { categories } from "@/data/menu-data";

// Category buttons, the veg-only toggle, the search box and the sort dropdown.
export default function MenuToolbar({
  category,
  onCategory,
  vegOnly,
  onVegOnly,
  search,
  onSearch,
  sort,
  onSort,
  count,
}) {
  return (
    <div className="space-y-5 rounded-3xl border border-border bg-card p-5 md:p-6">
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onCategory(name)}
            aria-pressed={category === name}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              category === name
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search dishes</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search dishes..."
            className="w-full rounded-full border border-border bg-background py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary"
          />
        </label>

        <button
          type="button"
          onClick={() => onVegOnly(!vegOnly)}
          aria-pressed={vegOnly}
          className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${
            vegOnly
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] border border-current">
            <span className="h-2 w-2 rounded-full bg-current" />
          </span>
          Veg only
        </button>

        <label>
          <span className="sr-only">Sort dishes</span>
          <select
            value={sort}
            onChange={(event) => onSort(event.target.value)}
            className="w-full rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary sm:w-auto"
          >
            <option value="">Recommended</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </label>
      </div>

      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
        {count} {count === 1 ? "dish" : "dishes"}
      </p>
    </div>
  );
}