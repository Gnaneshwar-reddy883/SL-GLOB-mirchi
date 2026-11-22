import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { menuItems } from "@/data/menu-data";
import DishCard from "@/components/DishCard";
import MenuToolbar from "@/components/MenuToolbar";
import PageHero from "@/components/PageHero";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | Mirchi" },
      {
        name: "description",
        content:
          "Thirty dishes across starters, main course, breads, rice and biryani, desserts and beverages. Filter by category, veg only, or search.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [category, setCategory] = useState("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // Every filter runs over the same list, so they all work together.
  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();

    const filtered = menuItems.filter((dish) => {
      const matchCategory = category === "All" || dish.category === category;
      const matchVeg = !vegOnly || dish.type === "veg";
      const matchSearch = dish.name.toLowerCase().includes(term);
      return matchCategory && matchVeg && matchSearch;
    });

    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "name-asc") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [category, vegOnly, search, sort]);

  return (
    <>
      <PageHero
        eyebrow="Thirty dishes"
        title="Our Menu"
        text="Cooked to order. Filter by category, hide the non-veg dishes, or search for something specific."
      />

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <MenuToolbar
          category={category}
          onCategory={setCategory}
          vegOnly={vegOnly}
          onVegOnly={setVegOnly}
          search={search}
          onSearch={setSearch}
          sort={sort}
          onSort={setSort}
          count={visible.length}
        />

        {visible.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="text-4xl" aria-hidden="true">🍽️</span>
            <p className="mt-4 font-heading text-xl">No dishes found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different category, or clear the search box.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((dish) => (
              <DishCard key={dish.name} dish={dish} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}