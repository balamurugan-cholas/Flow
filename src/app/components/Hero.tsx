import { useEffect, useState, useRef } from "react";

const TYPED_TEXT = "How do I";
const GHOST_TEXT = " setup an API route in Next.js?";

export function Hero() {
  const [typed, setTyped] = useState("");
  const [showGhost, setShowGhost] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let i = 0;
    setTyped("");
    setShowGhost(false);

    const typeNext = () => {
      if (i < TYPED_TEXT.length) {
        i++;
        setTyped(TYPED_TEXT.slice(0, i));
        typingRef.current = setTimeout(typeNext, 80 + Math.random() * 40);
      } else {
        setTimeout(() => setShowGhost(true), 400);
      }
    };
    typingRef.current = setTimeout(typeNext, 900);
    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: "#070B14" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(0,255,255,0.05) 0%, transparent 70%)",
        }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full" style={{ border: "1px solid rgba(0,255,255,0.2)", background: "rgba(0,255,255,0.04)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00FFFF" }} />
          <span className="text-xs" style={{ color: "#00FFFF", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>
            v1.0 — with Local LLM
          </span>
        </div>

        <h1
          className="mb-4"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 300,
            color: "#E2E8F0",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Write. Think.{" "}
          <span style={{ color: "#00FFFF" }}>Flow.</span>
        </h1>
        <p
          className="mb-12 max-w-xl mx-auto"
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#4A5568",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          A zero-latency AI writing companion. No cloud. No compromise.
          Just pure, local intelligence at your fingertips.
        </p>

        {/* The "Flow" Input Interface */}
        <div className="relative mx-auto max-w-2xl mb-6">
          <div
            className="relative rounded-2xl p-px"
            style={{
              background: "linear-gradient(135deg, rgba(0,255,255,0.25), rgba(0,255,255,0.05) 50%, rgba(0,255,255,0.15))",
            }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ background: "#0D1117" }}
            >
              {/* Textarea header */}
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
                </div>
                <span className="text-xs ml-2" style={{ color: "#2D3748", fontFamily: "JetBrains Mono, monospace" }}>
                  flow — note.md
                </span>
              </div>

              {/* Text area with ghost text */}
              <div className="px-6 py-6 text-left min-h-[120px] relative">
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    color: "#CBD5E0",
                    whiteSpace: "pre-wrap",
                    letterSpacing: "0.01em",
                  }}
                >
                  {typed}
                </span>
                <span
                  className="inline-block w-0.5 h-5 align-middle ml-0.5 transition-opacity duration-100"
                  style={{
                    background: "#00FFFF",
                    opacity: cursorVisible ? 1 : 0,
                    verticalAlign: "middle",
                  }}
                />
                <span
                  className="transition-all duration-700"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    color: showGhost ? "rgba(100,116,139,0.5)" : "transparent",
                    letterSpacing: "0.01em",
                    userSelect: "none",
                  }}
                >
                  {GHOST_TEXT}
                </span>
              </div>

              {/* Tooltip */}
              {showGhost && (
                <div
                  className="absolute bottom-3 right-4 flex gap-2 items-center animate-fade-in"
                  style={{ opacity: showGhost ? 1 : 0, transition: "opacity 0.5s" }}
                >
                  <kbd
                    className="px-1.5 py-0.5 rounded text-xs"
                    style={{
                      background: "rgba(0,255,255,0.08)",
                      border: "1px solid rgba(0,255,255,0.2)",
                      color: "#00FFFF",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    Tab
                  </kbd>
                  <span className="text-xs" style={{ color: "#4A5568", fontFamily: "JetBrains Mono, monospace" }}>Accept All</span>
                  <span style={{ color: "#2D3748" }}>·</span>
                  <kbd
                    className="px-1.5 py-0.5 rounded text-xs"
                    style={{
                      background: "rgba(0,255,255,0.08)",
                      border: "1px solid rgba(0,255,255,0.2)",
                      color: "#00FFFF",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    Alt+→
                  </kbd>
                  <span className="text-xs" style={{ color: "#4A5568", fontFamily: "JetBrains Mono, monospace" }}>Word</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative inline-block group">
          {/* Corner brackets */}
          <span className="absolute top-0 left-0 w-3 h-3 pointer-events-none" style={{ borderTop: "1.5px solid #00FFFF", borderLeft: "1.5px solid #00FFFF", transition: "all 0.3s" }} />
          <span className="absolute top-0 right-0 w-3 h-3 pointer-events-none" style={{ borderTop: "1.5px solid #00FFFF", borderRight: "1.5px solid #00FFFF", transition: "all 0.3s" }} />
          <span className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none" style={{ borderBottom: "1.5px solid #00FFFF", borderLeft: "1.5px solid #00FFFF", transition: "all 0.3s" }} />
          <span className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none" style={{ borderBottom: "1.5px solid #00FFFF", borderRight: "1.5px solid #00FFFF", transition: "all 0.3s" }} />
          <a
            href="https://github.com/balamurugan-cholas/Flow/releases/download/flow/Flow.AI.zip"
            download
            className="relative inline-flex items-center gap-3 px-8 py-3.5 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #00FFFF, #00BFFF)",
              color: "#070B14",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              letterSpacing: "0.01em",
              /* Reduced shadow spread and blur to keep it contained within the pill shape */
              boxShadow: "0 4px 12px rgba(0,255,255,0.2)",
            }}
            onMouseEnter={e => {
              /* Subtle lift instead of a large, messy glow */
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,255,255,0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,255,255,0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v10M5 8l3 3 3-3M2 13h12" stroke="#070B14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download Flow
          </a>
        </div>

        <p className="mt-4 text-xs" style={{ color: "#2D3748", fontFamily: "JetBrains Mono, monospace" }}>
          Free & Open Source · No account required
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs" style={{ color: "#2D3748", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em" }}>SCROLL</span>
        <div className="w-px h-8 overflow-hidden" style={{ background: "rgba(0,255,255,0.1)" }}>
          <div
            className="w-full h-4"
            style={{
              background: "linear-gradient(to bottom, #00FFFF, transparent)",
              animation: "scrollDown 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
