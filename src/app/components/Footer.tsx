import { useState, useEffect } from "react";

function LicenseModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      {/* Dark blurry overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className={`relative max-w-md w-full rounded-3xl p-8 flex flex-col gap-6 overflow-hidden transition-transform duration-500 delay-100 ${mounted ? "translate-y-0 scale-100" : "translate-y-8 scale-95"}`}
        style={{
          background: "linear-gradient(145deg, rgba(15,17,26,0.95) 0%, rgba(8,9,13,0.95) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8), 0 0 80px -20px rgba(139,92,246,0.15)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Ambient top glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-violet-500/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-[60px] pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 z-10"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Header content */}
        <div className="flex flex-col items-center text-center mt-2 relative z-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.15))", border: "1px solid rgba(255,255,255,0.05)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#22D3EE" />
                </linearGradient>
              </defs>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
            MIT License
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
            Flow is launched as <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-medium">100% Open Source</span>. Built for the community, by a solo developer.
          </p>
          <p className="text-slate-500 text-xs leading-relaxed border-t border-white/5 pt-4">
            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
          </p>
        </div>

        {/* Action */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl text-sm font-medium text-center transition-all duration-300 relative overflow-hidden group z-10"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#E2E8F0" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative">View Source on GitHub</span>
        </a>
      </div>
    </div>
  );
}

export function Footer() {
  const [licenseOpen, setLicenseOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("dev@upi");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <footer className="relative bg-[#030407] border-t border-white/5 pt-20 pb-8 overflow-hidden" id="support Developer">
        {/* Background ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-gradient-to-b from-violet-500/5 to-transparent blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Bento Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
            
            {/* Developer Support Box (Spans 3 cols) */}
            <div className="md:col-span-3 rounded-3xl p-8 md:p-10 border border-white/5 relative overflow-hidden group"
                 style={{ background: "linear-gradient(145deg, rgba(15,17,26,0.6) 0%, rgba(8,9,13,0.8) 100%)" }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] group-hover:bg-cyan-500/10 transition-colors duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider text-slate-300 font-mono">Solo Developer</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-light mb-4 tracking-tight text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  Fuel the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-normal">next feature</span>
                </h3>
                
                <p className="text-slate-400 text-sm md:text-base max-w-md mb-8 leading-relaxed">
                  Flow is free and always will be. If this tool has saved you time or made your workflow better, consider supporting the project.
                </p>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-2 pr-6 transition-all duration-300 group/btn active:scale-[0.98]"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isCopied ? 'bg-cyan-500/20 text-cyan-300' : 'bg-black/40 text-slate-300'}`}>
                    {isCopied ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      <span className="text-xl group-hover/btn:scale-110 transition-transform duration-300">❤️</span>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-mono">
                      {isCopied ? 'Copied' : 'Support via UPI'}
                    </div>
                    <div className="text-sm text-slate-200 font-mono tracking-wide">
                      flow-dev@upi
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Stats Grid Box (Spans 2 cols) */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {[
                { val: "100%", label: "Open Source", color: "from-violet-400 to-fuchsia-400" },
                { val: "0ms", label: "Cloud Latency", color: "from-cyan-400 to-blue-400" },
                { val: "11+", label: "Core Features", color: "from-emerald-400 to-teal-400" },
                { val: "∞", label: "Local Models", color: "from-amber-400 to-orange-400" },
              ].map(({ val, label, color }, i) => (
                <div key={label} className="rounded-2xl p-6 border border-white/5 flex flex-col justify-center relative overflow-hidden"
                     style={{ background: "rgba(15,17,26,0.4)" }}>
                  {/* Subtle top border highlight */}
                  <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r ${color} opacity-30`} />
                  
                  <div className="text-2xl md:text-3xl font-light text-white mb-2 font-mono">
                    {val}
                  </div>
                  <div className="text-xs text-slate-500 font-medium tracking-wide">
                    {label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded overflow-hidden flex items-center justify-center from-violet-500 to-cyan-500">
                    {/* Updated to use an image instead of an SVG */}
                    <img
                      src="/Flow/logo.png"
                      alt="Flow Icon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-slate-500 font-mono">Flow © 2026</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <button
                onClick={() => setLicenseOpen(true)}
                className="text-xs text-slate-400 hover:text-white transition-colors duration-200 font-mono"
              >
                License
              </button>
              <div className="flex items-center gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#E1306C] transition-colors duration-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {licenseOpen && <LicenseModal onClose={() => setLicenseOpen(false)} />}
    </>
  );
}
