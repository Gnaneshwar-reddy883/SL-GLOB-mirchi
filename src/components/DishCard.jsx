import { Plus } from "lucide-react";
import { toast } from "sonner";
import { categoryEmoji } from "@/data/menu-data";
import { useCart } from "@/lib/CartContext";

// The little green / red square that marks veg and non-veg dishes.
function VegDot({ type }) {
  const veg = type === "veg";
  return (
    <span
      className="inline-flex h-4 w-4 items-center justify-center rounded-[3px] border"
      style={{ borderColor: veg ? "#2f7d32" : "#b3261e" }}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span
        className="block h-2 w-2 rounded-full"
        style={{ backgroundColor: veg ? "#2f7d32" : "#b3261e" }}
      />
    </span>
  );
}

// One chilli emoji per spice level.
function SpiceMeter({ level }) {
  return (
    <span className="text-xs" aria-label={`Spice level ${level} out of 3`}>
      {"🌶️".repeat(level)}
    </span>
  );
}

export default function DishCard({ dish }) {
  const { addItem, openCart } = useCart();

  const handleAdd = () => {
    addItem(dish);
    toast.success(`${dish.name} added to your order`);
    openCart();
  };

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-[0_2px_18px_-12px_rgba(59,36,24,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/60 hover:shadow-[0_22px_44px_-26px_rgba(59,36,24,0.55)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-2xl transition-transform duration-300 group-hover:scale-105">
          {categoryEmoji[dish.category]}
        </div>
        <div className="flex flex-col items-end gap-2">
          <VegDot type={dish.type} />
          {dish.special && (
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-secondary-foreground">
              Chef&apos;s Special
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-5 font-heading text-xl font-semibold leading-snug text-foreground">
        {dish.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {dish.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="font-heading text-lg font-semibold text-primary">₹{dish.price}</span>
        <SpiceMeter level={dish.spice} />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add to Order
      </button>
    </article>
  );
}