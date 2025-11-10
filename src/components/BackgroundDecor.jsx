import { motion } from "framer-motion";

const petals = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  delay: (i % 6) * 1.4,
  left: `${(i * 8.5) % 100}%`,
}));

const feathers = Array.from({ length: 7 }).map((_, i) => ({
  id: i,
  delay: (i % 5) * 2,
  left: `${(i * 13 + 10) % 100}%`,
}));

export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Velvet maroon to royal blue gradient with golden glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4B0000] via-[#2b0030] to-[#003B5C]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.18),transparent_60%)]" />

      {/* Palace arches & water reflection hint using layered gradients */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage:
            "repeating-linear-gradient( to right, rgba(255,255,255,0.06) 0 2px, transparent 2px 90px), radial-gradient(circle at 50% 105%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />

      {/* Subtle water ripple animation near edges */}
      <div
        className="absolute inset-0"
        style={{ maskImage: "radial-gradient(60% 60% at 50% 50%, black 40%, transparent 100%)" }}
      >
        <div className="absolute inset-0 animate-[ripple_8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_40%)]" />
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0" aria-hidden>
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-yellow-200/80 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -40, 0] }}
            transition={{ duration: 6 + (i % 5), delay: (i % 10) * 0.6, repeat: Infinity }}
            style={{ left: `${(i * 7) % 100}%`, top: `${(i * 11) % 100}%` }}
          />
        ))}
      </div>

      {/* Floating lotus petals */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-full"
          initial={{ y: 0 }}
          animate={{ y: [0, -900] }}
          transition={{ duration: 24, delay: p.delay, repeat: Infinity, ease: "linear" }}
          style={{ left: p.left }}
          aria-hidden
        >
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-70"
          >
            <path d="M21 38c8-8 9-14 0-28-9 14-8 20 0 28Z" fill="#E2A7B4" />
            <path d="M21 36c5-6 6-10 0-20-6 10-5 14 0 20Z" fill="#f2c1cf" opacity=".7" />
          </svg>
        </motion.div>
      ))}

      {/* Floating peacock feathers */}
      {feathers.map((f) => (
        <motion.div
          key={f.id}
          className="absolute top-full"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -1100], rotate: [0, 8, -6, 0] }}
          transition={{ duration: 28, delay: f.delay, repeat: Infinity, ease: "linear" }}
          style={{ left: f.left }}
          aria-hidden
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-70"
          >
            <path d="M10 54c22-8 36-30 40-48 0 0-6 30-40 48Z" fill="#0d5c7a" />
            <circle cx="42" cy="18" r="8" fill="#0fb0a9" />
            <circle cx="42" cy="18" r="4" fill="#2b0060" />
            <circle cx="42" cy="18" r="2" fill="#00e0d1" />
          </svg>
        </motion.div>
      ))}

      <style>{`
        @keyframes ripple {
          0%, 100% { transform: scale(1); opacity: .35; }
          50% { transform: scale(1.03); opacity: .55; }
        }
      `}</style>
    </div>
  );
}
