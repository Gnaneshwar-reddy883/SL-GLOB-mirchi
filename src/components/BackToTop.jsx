import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Appears once the visitor has scrolled a little, and scrolls back to the top.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-30 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4.5 w-4.5" />
    </button>
  );
}