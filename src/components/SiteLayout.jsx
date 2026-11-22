import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CartDrawer from "@/components/CartDrawer";
import BackToTop from "@/components/BackToTop";

// The shared shell: sticky navbar on top, footer at the bottom, and the order
// panel that can slide in from any page.
export default function SiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartDrawer />
      <BackToTop />
    </div>
  );
}