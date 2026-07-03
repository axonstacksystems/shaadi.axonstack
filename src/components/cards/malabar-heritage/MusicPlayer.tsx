"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, VolumeX } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface MusicPlayerProps {
  audioUrl: string;
  startPlaying?: boolean;
}

export function MusicPlayer({ audioUrl, startPlaying = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;

    const onCanPlay = () => setIsReady(true);
    audio.addEventListener("canplaythrough", onCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener("canplaythrough", onCanPlay);
      audioRef.current = null;
    };
  }, [audioUrl]);

  useEffect(() => {
    if (startPlaying && isReady && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [startPlaying, isReady]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      onClick={togglePlay}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className="fixed top-4 right-4 z-[200] flex items-center justify-center rounded-full"
      style={{
        width: 44,
        height: 44,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1.5px solid ${theme.glassBorder}`,
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        cursor: "pointer",
      }}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Music size={18} color={theme.gold} className="animate-pulse" />
          </motion.div>
        ) : (
          <motion.div
            key="muted"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <VolumeX size={18} color={theme.textLight} />
          </motion.div>
        )}
      </AnimatePresence>

      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[2px]" style={{ height: 6, pointerEvents: "none" }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ height: [2, 5, 2, 4, 2] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
              style={{ width: 2, background: theme.gold, borderRadius: 1, opacity: 0.7 }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}
