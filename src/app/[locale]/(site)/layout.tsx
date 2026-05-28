import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/**
 * Wraps all public-facing pages with the site chrome (header + footer).
 * The unlock route lives outside this group so it renders bare.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
