import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BentoGrid } from "./components/BentoGrid";
import { Footer } from "./components/Footer";
import "../styles/fonts.css";
import { FAQSection } from "./components/FAQSection";
import { LaunchCTA } from "./components/LaunchCTA";

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#070B14",
        fontFamily: "Inter, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <Navbar />
      <Hero />
      <BentoGrid />
      <FAQSection />
      <LaunchCTA />
      <Footer />
    </div>
  );
}
