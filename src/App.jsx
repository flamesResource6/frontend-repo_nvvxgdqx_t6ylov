import { useCallback, useRef, useState } from "react";
import BackgroundDecor from "./components/BackgroundDecor";
import HeroFrame from "./components/HeroFrame";
import SectionsCarousel from "./components/SectionsCarousel";
import AudioController from "./components/AudioController";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const bellRef = useRef(null);

  const handleImageChange = useCallback((i) => setActiveIndex(i), []);

  const playChime = useCallback(() => {
    try {
      if (!bellRef.current) {
        const audio = new Audio(
          "https://cdn.pixabay.com/download/audio/2022/03/10/audio_24d0533d6b.mp3?filename=bells-ambient-101267.mp3"
        );
        bellRef.current = audio;
      }
      bellRef.current.currentTime = 0;
      bellRef.current.volume = 0.25;
      bellRef.current.play();
    } catch (e) {}
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      <BackgroundDecor />

      {/* Header */}
      <header className="relative z-10 pt-10 text-center">
        <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-amber-100 drop-shadow">
          Royal Love Album
        </h1>
        <p className="mt-2 text-amber-200/90 font-serif text-lg">
          Nikhilsingh Rajput & Sailee Rao
        </p>
      </header>

      {/* Hero photo frame */}
      <main className="relative z-10 px-4 md:px-8 mt-10">
        <HeroFrame activeImage={activeIndex} onChime={playChime} />

        {/* Carousel controls and thumbnails */}
        <SectionsCarousel auto onImageChange={handleImageChange} />

        {/* Ending frame message */}
        <div className="max-w-5xl mx-auto text-center mt-16 mb-24">
          <p className="font-serif text-2xl text-amber-100">Forever in Love – Nikhilsingh & Sailee</p>
          <div className="mx-auto mt-4 h-px w-40 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </div>
      </main>

      {/* Music */}
      <AudioController />

      {/* Subtle overlay shimmer at top for luxury feel */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-40 bg-gradient-to-b from-yellow-200/10 to-transparent" />
    </div>
  );
}
