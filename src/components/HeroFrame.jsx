import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const quotes = [
  "Together is a beautiful place to be.",
  "Every love story is beautiful, but ours is royal.",
  "Two souls, one heartbeat.",
  "You & me, written in the stars.",
];

export default function HeroFrame({ activeImage, onChime }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setQuoteIndex((q) => (q + 1) % quotes.length), 10000);
    return () => clearInterval(id);
  }, []);

  // Dynamic hue for glow based on image index
  const hue = useMemo(() => (activeImage % 3) * 60 + 20, [activeImage]);

  useEffect(() => {
    if (onChime) onChime();
  }, [activeImage, onChime]);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Ornate golden frame */}
      <motion.div
        className="relative rounded-[28px] p-[6px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,175,55,0.9), rgba(212,175,55,0.6), rgba(226,167,180,0.5))",
          boxShadow:
            "0 0 0 2px rgba(212,175,55,.6) inset, 0 20px 60px rgba(0,0,0,.4), 0 0 30px rgba(212,175,55,.25)",
        }}
        animate={{ filter: `hue-rotate(${hue}deg)` }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <div className="relative rounded-[22px] overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop')] blur-2xl scale-110" />
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={`https://picsum.photos/seed/royal-${activeImage}/1400/800`}
              alt="Royal memory"
              className="relative w-full h-[54vh] md:h-[62vh] object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </AnimatePresence>
          {/* Ornamental corners */}
          <OrnateCorners />
        </div>
      </motion.div>

      {/* Floating quote */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quoteIndex}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-serif text-lg md:text-2xl text-amber-200 drop-shadow">
            {quotes[quoteIndex]}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function OrnateCorners() {
  const corner = (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 64c14-6 32-24 38-40 0 0-18 14-38 18" stroke="#D4AF37" strokeWidth="2" fill="none" />
      <path d="M18 62c8-4 16-12 22-22 0 0-10 8-22 10" stroke="#FFD98A" strokeWidth="1" opacity=".7" />
    </svg>
  );
  return (
    <>
      <div className="absolute top-0 left-0 m-2 opacity-90">{corner}</div>
      <div className="absolute top-0 right-0 m-2 rotate-90 opacity-90">{corner}</div>
      <div className="absolute bottom-0 left-0 m-2 -rotate-90 opacity-90">{corner}</div>
      <div className="absolute bottom-0 right-0 m-2 rotate-180 opacity-90">{corner}</div>
    </>
  );
}
