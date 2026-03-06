import { useState, useRef, useEffect } from "react";

// === AI Core Card ===
function AICoreChard() {
  const [mode, setMode] = useState<"note" | "bot">("note");
  return (
    <BentoCard className="col-span-1 md:col-span-1 lg:col-span-1" label="AI Core">
      <div className="flex flex-col gap-4 h-full">
        <p className="text-sm" style={{ color: "#64748B", fontFamily: "Inter, sans-serif" }}>
          Switch between creative and conversational modes instantly.
        </p>
        <div
          className="relative flex rounded-xl overflow-hidden cursor-pointer mt-auto self-start w-full max-w-[200px]"
          style={{ border: "1px solid rgba(0,255,255,0.15)", background: "rgba(0,255,255,0.03)" }}
          onClick={() => setMode(m => m === "note" ? "bot" : "note")}
        >
          <div
            className="absolute top-0 bottom-0 w-1/2 rounded-lg transition-all duration-400"
            style={{
              background: "rgba(0,255,255,0.12)",
              border: "1px solid rgba(0,255,255,0.3)",
              left: mode === "note" ? "0%" : "50%",
              transition: "left 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
          {["Note", "Bot"].map(m => (
            <div key={m} className="relative z-10 w-1/2 text-center py-2 text-xs select-none" style={{
              color: (mode === "note" && m === "Note") || (mode === "bot" && m === "Bot") ? "#00FFFF" : "#4A5568",
              fontFamily: "JetBrains Mono, monospace",
              transition: "color 0.3s",
            }}>
              {m === "Note" ? "✍️ Note" : "🤖 Bot"}
            </div>
          ))}
        </div>
        <div className="text-xs mt-1" style={{ color: "#2D3748", fontFamily: "JetBrains Mono, monospace" }}>
          Current: <span style={{ color: mode === "note" ? "#00FFFF" : "#A78BFA" }}>{mode === "note" ? "Note Mode" : "Bot Mode"}</span>
        </div>
      </div>
    </BentoCard>
  );
}

// === Local LLM Card ===
function LocalLLMCard() {
  return (
    <BentoCard className="col-span-1" label="Local LLM">
      <div className="flex flex-col gap-3 h-full">
        <p className="text-sm" style={{ color: "#64748B", fontFamily: "Inter, sans-serif" }}>
          Your data never leaves your machine. Ever.
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: "rgba(0,255,255,0.06)", border: "1px solid rgba(0,255,255,0.15)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="4" y="8" width="10" height="8" rx="1.5" stroke="#00FFFF" strokeWidth="1.4"/>
              <path d="M6 8V5.5a3 3 0 016 0V8" stroke="#00FFFF" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="9" cy="12" r="1.2" fill="#00FFFF"/>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs truncate" style={{ color: "#CBD5E0", fontFamily: "JetBrains Mono, monospace" }}>Offline</div>
            <div className="text-xs truncate" style={{ color: "#2D3748", fontFamily: "JetBrains Mono, monospace" }}>100% local inference</div>
          </div>
          <div className="px-2 py-0.5 rounded-full text-xs flex-shrink-0" style={{ background: "rgba(0,255,255,0.1)", color: "#00FFFF", border: "1px solid rgba(0,255,255,0.2)", fontFamily: "JetBrains Mono, monospace" }}>
            PRIVATE
          </div>
        </div>
        <div className="flex gap-1.5 mt-1 flex-wrap">
          {["Llama 3", "Mistral", "Phi-3"].map(m => (
            <span key={m} className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#4A5568", fontFamily: "JetBrains Mono, monospace" }}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

// === Workbench Card (Updated with 3 Draggable Cards) ===
interface DraggableCard {
  id: string;
  title: string;
  color: string;
  defaultPos: { x: number; y: number };
}

function WorkbenchCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const initialCards: DraggableCard[] = [
    { id: '1', title: 'note.md', color: '#00FFFF', defaultPos: { x: 30, y: 30 } },
    { id: '2', title: 'api.ts', color: '#FBBF24', defaultPos: { x: 120, y: 70 } },
    { id: '3', title: 'todo.txt', color: '#A78BFA', defaultPos: { x: 50, y: 110 } }
  ];

  const [cards, setCards] = useState(initialCards);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  // Bring the currently interacted card to the front
  const [activeCardId, setActiveCardId] = useState<string | null>('1');

  const startDrag = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    e.stopPropagation(); // Prevent container selection
    setDraggingId(id);
    setActiveCardId(id);
  };

  useEffect(() => {
    if (!draggingId) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const clientX = "touches" in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

      // Card dimensions (approximate to keep them inside)
      const cardWidth = 80;
      const cardHeight = 46;

      const newX = Math.max(0, Math.min(clientX - containerRect.left - (cardWidth / 2), containerRect.width - cardWidth));
      const newY = Math.max(0, Math.min(clientY - containerRect.top - (cardHeight / 2), containerRect.height - cardHeight));

      setCards(prev => prev.map(card => 
        card.id === draggingId ? { ...card, defaultPos: { x: newX, y: newY } } : card
      ));
    };

    const onUp = () => setDraggingId(null);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [draggingId]);

  return (
    <BentoCard className="col-span-1 md:col-span-2 lg:col-span-1" label="Workbench">
      <div className="flex flex-col gap-2 h-full">
        <p className="text-sm" style={{ color: "#64748B", fontFamily: "Inter, sans-serif" }}>
          Drag, arrange, and connect your thoughts spatially.
        </p>
        <div 
          ref={containerRef}
          className="relative flex-1 mt-2 rounded-xl overflow-hidden select-none" 
          style={{ 
            minHeight: 180, 
            background: "rgba(0,0,0,0.2)", 
            border: "1px solid rgba(255,255,255,0.04)",
            cursor: draggingId ? "grabbing" : "default",
            touchAction: "none" // Prevents page scroll when dragging on mobile
          }}
        >
          {cards.map((card) => {
            const isDragging = draggingId === card.id;
            const isActive = activeCardId === card.id;
            
            return (
              <div
                key={card.id}
                className="absolute rounded-lg px-3 py-2 cursor-grab active:cursor-grabbing"
                style={{
                  left: card.defaultPos.x,
                  top: card.defaultPos.y,
                  width: 80, 
                  height: 46,
                  background: isActive ? `rgba(${card.color === '#00FFFF' ? '0,255,255' : card.color === '#FBBF24' ? '251,191,36' : '167,139,250'},0.08)` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isActive ? card.color : "rgba(255,255,255,0.1)"}`,
                  transition: isDragging ? "none" : "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isDragging ? `0 8px 30px rgba(${card.color === '#00FFFF' ? '0,255,255' : card.color === '#FBBF24' ? '251,191,36' : '167,139,250'},0.15)` : "none",
                  zIndex: isDragging ? 50 : isActive ? 40 : 10,
                  transform: isDragging ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseDown={(e) => startDrag(e, card.id)}
                onTouchStart={(e) => startDrag(e, card.id)}
              >
                <div className="text-xs truncate" style={{ color: card.color, fontFamily: "JetBrains Mono, monospace" }}>{card.title}</div>
                <div className="text-[10px] mt-0.5 opacity-60" style={{ color: "#94A3B8", fontFamily: "JetBrains Mono, monospace" }}>
                  {isDragging ? 'moving' : 'drag me'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BentoCard>
  );
}

// === Always-on-Top Card ===
function AlwaysOnTopCard() {
  const [pinned, setPinned] = useState(true);
  return (
    <BentoCard className="col-span-1" label="Always-on-Top">
      <div className="flex flex-col gap-3 h-full">
        <p className="text-sm" style={{ color: "#64748B", fontFamily: "Inter, sans-serif" }}>
          Pin Flow above any window — browser, IDE, anywhere.
        </p>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="relative w-28 h-16 rounded-lg overflow-hidden flex-shrink-0" style={{ border: "1px solid rgba(255,255,255,0.06)", background: "#0A0F1C" }}>
            <div className="absolute inset-0 opacity-30">
              <div className="h-3 flex items-center px-1 gap-0.5" style={{ background: "rgba(255,255,255,0.04)" }}>
                <span className="w-1 h-1 rounded-full" style={{ background: "#4A5568" }} />
                <span className="w-1 h-1 rounded-full" style={{ background: "#4A5568" }} />
                <span className="w-1 h-1 rounded-full" style={{ background: "#4A5568" }} />
              </div>
              <div className="h-1 mx-1 mt-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>
            <div
              className="absolute rounded-lg px-2 py-1"
              style={{
                right: 4, top: 4, width: 48, height: 28,
                background: "rgba(0,255,255,0.08)",
                border: `1px solid ${pinned ? "rgba(0,255,255,0.5)" : "rgba(0,255,255,0.15)"}`,
                boxShadow: pinned ? "0 0 12px rgba(0,255,255,0.2)" : "none",
                transition: "all 0.3s",
                zIndex: 2,
              }}
            >
              <div className="text-xs" style={{ color: pinned ? "#00FFFF" : "#4A5568", fontFamily: "JetBrains Mono, monospace", fontSize: "0.45rem" }}>Flow ▲</div>
            </div>
          </div>
          <button
            onClick={() => setPinned(p => !p)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-300 whitespace-nowrap"
            style={{
              background: pinned ? "rgba(0,255,255,0.1)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${pinned ? "rgba(0,255,255,0.3)" : "rgba(255,255,255,0.08)"}`,
              color: pinned ? "#00FFFF" : "#4A5568",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.5 4.5H11L8.25 6.75L9.5 10.5L6 8.25L2.5 10.5L3.75 6.75L1 4.5H4.5L6 1Z" stroke="currentColor" strokeWidth="1.2" fill={pinned ? "#00FFFF" : "none"} strokeLinejoin="round"/>
            </svg>
            {pinned ? "On Top" : "Top"}
          </button>
        </div>
      </div>
    </BentoCard>
  );
}

// === Code Intelligence Card ===
function CodeCard() {
  const [copied, setCopied] = useState(false);
  const code = `async function fetchUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json(); // ✨ type-inferred
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BentoCard className="col-span-1 md:col-span-2 lg:col-span-2" label="Code Intelligence">
      <div className="flex flex-col gap-3 h-full">
        <p className="text-sm" style={{ color: "#64748B", fontFamily: "Inter, sans-serif" }}>
          Syntax highlighting, completions, and one-click copy for any snippet.
        </p>
        <div className="relative rounded-xl overflow-hidden mt-auto" style={{ background: "#0D1117", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(59,130,246,0.15)", color: "#60A5FA", fontFamily: "JetBrains Mono, monospace" }}>TypeScript</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all duration-300"
              style={{
                background: copied ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`,
                color: copied ? "#22C55E" : "#4A5568",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {copied ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5L4 8L9.5 2.5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="3" width="7" height="7" rx="1" stroke="#4A5568" strokeWidth="1.2"/><path d="M3 3V2a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1H8" stroke="#4A5568" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <pre className="px-4 py-4 overflow-x-auto text-sm" style={{ fontFamily: "JetBrains Mono, monospace", lineHeight: 1.7 }}>
            <span style={{ color: "#569CD6" }}>async </span>
            <span style={{ color: "#DCDCAA" }}>function </span>
            <span style={{ color: "#4EC9B0" }}>fetchUser</span>
            <span style={{ color: "#D4D4D4" }}>(</span>
            <span style={{ color: "#9CDCFE" }}>id</span>
            <span style={{ color: "#D4D4D4" }}>: </span>
            <span style={{ color: "#4EC9B0" }}>string</span>
            <span style={{ color: "#D4D4D4" }}>{") {"}</span>
            {"\n"}
            <span style={{ color: "#D4D4D4" }}>{"  "}</span>
            <span style={{ color: "#569CD6" }}>const </span>
            <span style={{ color: "#9CDCFE" }}>res </span>
            <span style={{ color: "#D4D4D4" }}>= </span>
            <span style={{ color: "#569CD6" }}>await </span>
            <span style={{ color: "#DCDCAA" }}>fetch</span>
            <span style={{ color: "#D4D4D4" }}>(</span>
            <span style={{ color: "#CE9178" }}>{"`/api/users/${"}</span>
            <span style={{ color: "#9CDCFE" }}>{"id}"}</span>
            <span style={{ color: "#CE9178" }}>{"`"}</span>
            <span style={{ color: "#D4D4D4" }}>){"\n"}</span>
            <span style={{ color: "#D4D4D4" }}>{"  "}</span>
            <span style={{ color: "#C586C0" }}>return </span>
            <span style={{ color: "#9CDCFE" }}>res</span>
            <span style={{ color: "#D4D4D4" }}>.</span>
            <span style={{ color: "#DCDCAA" }}>json</span>
            <span style={{ color: "#D4D4D4" }}>(); </span>
            <span style={{ color: "#6A9955" }}>{"// ✨ type-inferred\n"}</span>
            <span style={{ color: "#D4D4D4" }}>{"}"}</span>
          </pre>
        </div>
      </div>
    </BentoCard>
  );
}

// === Management Card ===
function ManagementCard() {
  const [items, setItems] = useState([
    { id: 1, title: "API Design Notes", starred: true, deleted: false },
    { id: 2, title: "Sprint Retrospective", starred: false, deleted: false },
    { id: 3, title: "Weekend Ideas", starred: false, deleted: false },
  ]);

  const toggle = (id: number, key: "starred" | "deleted") => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, [key]: !it[key] } : it));
  };

  return (
    <BentoCard className="col-span-1" label="Management">
      <div className="flex flex-col gap-2 h-full">
        <p className="text-sm" style={{ color: "#64748B", fontFamily: "Inter, sans-serif" }}>
          Favorite, archive, and restore with a single click.
        </p>
        <div className="flex flex-col gap-1.5 mt-2">
          {items.filter(i => !i.deleted).map(item => (
            <div
              key={item.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg group"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", transition: "all 0.2s" }}
            >
              <span className="flex-1 text-xs truncate" style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}>{item.title}</span>
              <button onClick={() => toggle(item.id, "starred")} className="transition-all duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0" style={{ color: item.starred ? "#FBBF24" : "#2D3748" }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill={item.starred ? "#FBBF24" : "none"} stroke="currentColor" strokeWidth="1.3"><path d="M6.5 1.5L7.8 4.8H11.5L8.5 6.8L9.5 10.5L6.5 8.5L3.5 10.5L4.5 6.8L1.5 4.8H5.2L6.5 1.5Z" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={() => toggle(item.id, "deleted")} className="transition-all duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0" style={{ color: "#2D3748" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#EF4444")}
                onMouseLeave={e => (e.currentTarget.style.color = "#2D3748")}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 3.5h9M5 3.5V2.5a1 1 0 012 0v1M4 3.5l.5 6.5h4l.5-6.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          ))}
        </div>
        {items.some(i => i.deleted) && (
          <button
            className="text-xs mt-1 transition-colors duration-200 text-left w-fit"
            style={{ color: "#4A5568", fontFamily: "JetBrains Mono, monospace" }}
            onClick={() => setItems(prev => prev.map(i => ({ ...i, deleted: false })))}
            onMouseEnter={e => (e.currentTarget.style.color = "#00FFFF")}
            onMouseLeave={e => (e.currentTarget.style.color = "#4A5568")}
          >
            ↩ Restore deleted
          </button>
        )}
      </div>
    </BentoCard>
  );
}

// === Privacy Card ===
function PrivacyCard() {
  return (
    <BentoCard className="col-span-1" label="Privacy First" id="privacy">
      <div className="flex flex-col gap-3 h-full">
        <p className="text-sm" style={{ color: "#64748B", fontFamily: "Inter, sans-serif" }}>
          Zero telemetry. No API calls. Your words stay yours.
        </p>
        <div className="flex flex-col gap-2 mt-auto">
          {["No cloud sync", "No analytics", "No rate limits", "Air-gap compatible"].map(f => (
            <div key={f} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#00FFFF", boxShadow: "0 0 6px rgba(0,255,255,0.6)" }} />
              <span className="text-xs" style={{ color: "#94A3B8", fontFamily: "Inter, sans-serif" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

// === Support Card ===
function SupportCard() {
  return (
    <BentoCard className="col-span-1 md:col-span-2 lg:col-span-1" label="Community">
      <div className="flex flex-col gap-3 h-full">
        <p className="text-sm" style={{ color: "#64748B", fontFamily: "Inter, sans-serif" }}>
          Built solo. Maintained by the community. 100% open-source MIT.
        </p>
        <div className="flex gap-2 mt-auto flex-wrap">
          <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#64748B", fontFamily: "JetBrains Mono, monospace" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#00FFFF"; e.currentTarget.style.borderColor = "rgba(0,255,255,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#64748B", fontFamily: "JetBrains Mono, monospace" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#E1306C"; e.currentTarget.style.borderColor = "rgba(225,48,108,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Instagram
          </a>
        </div>
      </div>
    </BentoCard>
  );
}

// === Autocomplete Feature Card ===
function AutocompleteCard() {
  return (
    <BentoCard className="col-span-1" label="Autocomplete Engine">
      <div className="flex flex-col gap-3 h-full">
        <p className="text-sm" style={{ color: "#64748B", fontFamily: "Inter, sans-serif" }}>
          Context-aware completions that feel like mind-reading.
        </p>
        <div className="mt-auto rounded-lg px-3 py-2.5" style={{ background: "#0D1117", border: "1px solid rgba(255,255,255,0.05)" }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem", color: "#CBD5E0" }}>The solution is</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.78rem", color: "rgba(100,116,139,0.5)" }}> to use memoization...</span>
          <span className="inline-block w-0.5 h-3.5 align-middle ml-0.5" style={{ background: "#00FFFF", animation: "blink 1s infinite" }} />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#00FFFF" }} />
          <span className="text-xs" style={{ color: "#2D3748", fontFamily: "JetBrains Mono, monospace" }}>~12ms avg latency</span>
        </div>
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </BentoCard>
  );
}

// === Base BentoCard ===
const BentoCard = ({ children, className = "", label, id }: {
  children: React.ReactNode;
  className?: string;
  label: string;
  id?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      id={id}
      className={`relative rounded-2xl p-5 flex flex-col gap-2 transition-all duration-300 ${className}`}
      style={{
        background: hovered ? "rgba(13,17,23,0.95)" : "rgba(10,14,22,0.8)",
        border: `1px solid ${hovered ? "rgba(0,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? "0 0 30px rgba(0,255,255,0.04), inset 0 0 0 1px rgba(0,255,255,0.06)" : "none",
        backdropFilter: "blur(10px)",
        minHeight: 160,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1 h-1 rounded-full transition-all duration-300 flex-shrink-0" style={{ background: hovered ? "#00FFFF" : "#2D3748", boxShadow: hovered ? "0 0 8px rgba(0,255,255,0.8)" : "none" }} />
        <span className="text-xs uppercase tracking-widest truncate" style={{ color: hovered ? "#00FFFF" : "#2D3748", fontFamily: "JetBrains Mono, monospace", transition: "color 0.3s", letterSpacing: "0.15em" }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
};

export function BentoGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 w-full" style={{ background: "#070B14" }} id="features">
      {/* Changed max-w-6xl to w-full to utilize entire width */}
      <div className="w-full mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: "#00FFFF", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.2em" }}>
            The 11 Pillars
          </p>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 300, color: "#E2E8F0", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Everything you need.<br />
            <span style={{ color: "#2D3748" }}>Nothing you don't.</span>
          </h2>
        </div>

        {/* Updated grid definition to better handle the full width across breakpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AICoreChard />
          <LocalLLMCard />
          <AutocompleteCard />
          <WorkbenchCard />
          <AlwaysOnTopCard />
          <ManagementCard />
          <CodeCard />
          <PrivacyCard />
          <SupportCard />
        </div>
      </div>
    </section>
  );
}