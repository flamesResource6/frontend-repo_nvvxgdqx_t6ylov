import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioController() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_5f8f96d9e3.mp3?filename=deep-meditation-10973.mp3"
        autoPlay
      />
      <button
        onClick={() => setMuted((m) => !m)}
        className="inline-flex items-center gap-2 bg-black/40 backdrop-blur text-amber-100 border border-amber-200/40 px-3 py-1.5 rounded-full hover:bg-black/50"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span className="hidden sm:inline">{muted ? "Unmute Music" : "Mute Music"}</span>
      </button>
    </div>
  );
}
