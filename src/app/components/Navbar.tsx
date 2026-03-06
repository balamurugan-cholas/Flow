import { useState, useEffect } from "react";

const navLinks = ["Features", "Support Developer"];

const sectionIds: Record<string, string> = {
  "Features": "features",
  "Support Developer": "support Developer",
};

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    smoothScrollTo(sectionIds[link]);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[60] transition-all duration-500"
        style={{
          background: scrolled ? "rgba(7, 11, 20, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,255,255,0.08)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div 
              className="cursor-pointer transition-all duration-700 hover:opacity-80"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="assets/logo.png"
                alt="Flow"
                className={`transition-all duration-700 ease-in-out object-contain ${scrolled ? "h-6" : "h-8"}`}
              />
            </div>
            <span 
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#E2E8F0", letterSpacing: "0.05em" }} 
              className="text-sm cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Flow
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${sectionIds[link]}`}
                onClick={(e) => handleNavClick(e, link)}
                className="text-sm transition-colors duration-200"
                style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif", letterSpacing: "0.02em" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#00FFFF")}
                onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Hamburger (Mobile) - No Outline, Animates to X */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-[5px] focus:outline-none z-[60]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-[1px] w-6 bg-[#94A3B8] transition-all duration-300 ease-in-out"
              style={{
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "translateY(0) rotate(0)",
              }}
            />
            <span
              className="block h-[1px] w-6 bg-[#94A3B8] transition-all duration-200 ease-in-out"
              style={{
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[1px] w-6 bg-[#94A3B8] transition-all duration-300 ease-in-out"
              style={{
                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "translateY(0) rotate(0)",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity 0.3s",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Off-canvas panel - Removed inner close button */}
      <div
        className="fixed top-0 right-0 h-full z-50 md:hidden w-72 pt-16"
        style={{
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
          background: "rgba(10, 15, 28, 0.97)",
          borderLeft: "1px solid rgba(0,255,255,0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="p-8 flex flex-col gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${sectionIds[link]}`}
              onClick={(e) => handleNavClick(e, link)}
              className="text-base"
              style={{
                color: "#94A3B8",
                fontFamily: "Inter, sans-serif",
                transition: menuOpen
                  ? `color 0.2s, opacity 0.4s ${i * 60}ms, transform 0.4s ${i * 60}ms`
                  : "color 0.2s, opacity 0.3s, transform 0.3s",
                transform: menuOpen ? "translateX(0)" : "translateX(20px)",
                opacity: menuOpen ? 1 : 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#00FFFF")}
              onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}
            >
              {link}
            </a>
          ))}
          <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              className="w-full py-3 rounded-full text-sm transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #00FFFF, #00BFFF)",
                color: "#070B14",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              Download Flow
            </button>
          </div>
        </div>
      </div>
    </>
  );
}