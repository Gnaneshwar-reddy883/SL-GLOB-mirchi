import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export default function CartDrawer() {
  const { items, total, isOpen, closeCart, increase, decrease, removeItem, clearCart } = useCart();

  return (
    <>
      {/* Dimmed background behind the panel */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Your order"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
            <h2 className="font-heading text-lg font-semibold">Your Order</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close order panel"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="text-4xl" aria-hidden="true">🍽️</span>
              <p className="mt-4 font-heading text-lg">Your order is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a dish from the menu to get started.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.name} className="flex items-start justify-between gap-3 border-b border-border pb-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{item.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">₹{item.price} each</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decrease(item.name)}
                        aria-label={`Remove one ${item.name}`}
                        className="rounded-full border border-border p-1 text-foreground transition-colors hover:bg-muted"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => increase(item.name)}
                        aria-label={`Add one more ${item.name}`}
                        className="rounded-full border border-border p-1 text-foreground transition-colors hover:bg-muted"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-heading text-sm font-semibold text-primary">
                      ₹{item.price * item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.name)}
                      aria-label={`Remove ${item.name} from order`}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-5 py-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-heading text-2xl font-semibold text-primary">₹{total}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            This is a demo order saved in your browser. Payment is outside the scope of the project.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={clearCart}
              disabled={items.length === 0}
              className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={closeCart}
              className="flex-1 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Keep Browsing
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}