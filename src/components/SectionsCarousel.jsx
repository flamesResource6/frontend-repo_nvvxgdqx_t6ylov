import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, RotateCcw, ChevronRight } from "lucide-react";

const makeSeeds = (prefix, count) => Array.from({ length: count }).map((_, i) => `${prefix}-${i+1}`);

const sections = [
  { title: "Engagement", accent: "gold", seeds: makeSeeds("engagement", 3), note: "Gold-spark transition" },
  { title: "Traditional", accent: "lotus", seeds: makeSeeds("traditional", 8), note: "Lotus bloom" },
  { title: "Beach / Outdoor", accent: "peacock", seeds: makeSeeds("beach", 8), note: "Ripples & feathers" },
  { title: "Candid Moments", accent: "heart", seeds: makeSeeds("candid", 6), note: "Floating hearts" },
  { title: "Portraits / Final", accent: "glow", seeds: makeSeeds("portrait", 5), note: "Slow glow fade" },
];

export default function SectionsCarousel({ auto, onImageChange }) {
  const all = useMemo(() => sections.flatMap((s) => s.seeds.map((seed) => ({ section: s.title, seed }))), []);
  const [index, setIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(auto ?? true);

  // Notify parent for hero image/quote changes
  const current = all[index];

  useMemo(() => {
    if (onImageChange) onImageChange(index);
  }, [index, onImageChange]);

  // Auto-play
  useMemo(() => {
    if (!isAuto) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % all.length), 5000);
    return () => clearInterval(id);
  }, [isAuto, all.length]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-16">
      <div className="flex items-center justify-between mb-4 text-amber-200">
        <h3 className="font-serif text-xl md:text-2xl">Next Memory</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAuto((v) => !v)}
            className="inline-flex items-center gap-2 border border-amber-200/50 text-amber-100/90 hover:text-white hover:border-amber-200 px-3 py-1.5 rounded-full"
          >
            {isAuto ? <Pause size={18} /> : <Play size={18} />}
            <span className="hidden sm:inline">{isAuto ? "Pause" : "Play"}</span>
          </button>
          <button
            onClick={() => setIndex(0)}
            className="inline-flex items-center gap-2 border border-amber-200/50 text-amber-100/90 hover:text-white hover:border-amber-200 px-3 py-1.5 rounded-full"
          >
            <RotateCcw size={18} />
            <span className="hidden sm:inline">Replay</span>
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % all.length)}
            className="inline-flex items-center gap-2 border border-amber-200/50 text-amber-100/90 hover:text-white hover:border-amber-200 px-3 py-1.5 rounded-full"
          >
            <span className="hidden sm:inline">Next Memory</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {all.map((item, i) => (
          <Thumb
            key={item.seed}
            seed={item.seed}
            active={i === index}
            onClick={() => setIndex(i)}
            label={item.section}
          />
        ))}
      </div>
    </div>
  );
}

function Thumb({ seed, active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`group relative aspect-[4/5] w-full overflow-hidden rounded-xl border ${
        active ? "border-amber-300 shadow-[0_0_0_2px_rgba(212,175,55,.6)]" : "border-amber-100/20"
      }`}
    >
      <AnimatePresence>
        <motion.img
          key={seed}
          src={`https://picsum.photos/seed/${encodeURIComponent(seed)}/400/500`}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0.7, scale: 1.05 }}
          animate={{ opacity: 1, scale: active ? 1.02 : 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-70" />
      <div className="absolute bottom-1.5 left-2 right-2 text-left">
        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] tracking-wide text-amber-100/90 bg-black/30 border border-amber-200/30">
          {label}
        </span>
      </div>
      <div className="absolute inset-0 ring-1 ring-amber-200/30 rounded-xl pointer-events-none" />
    </button>
  );
}
