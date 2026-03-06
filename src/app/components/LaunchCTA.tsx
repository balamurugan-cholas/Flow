import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function LaunchCTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-slate-950">
      {/* Abstract Animated Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
            Ready to find <span className="text-cyan-400">your flow?</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            Experience the desktop utility that thinks with you. 
            Open source, private, and built for speed.
          </p>

          <div className="pt-8 text-center">
            <motion.a
              href="https://github.com/your-username/flow-utility/releases/latest/download/flow-installer.exe"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-5 bg-white text-slate-950 font-bold rounded-full 
               text-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] 
               transition-shadow duration-300 flex items-center gap-3 mx-auto w-fit"
            >
              Download Flow
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Minimalist Status Badge */}
          <div className="flex justify-center gap-8 pt-12 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Version 1.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>Open Source</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}