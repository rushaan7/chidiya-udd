"use client";
import { useEffect, useRef } from "react";

export default function useSound(url: string) {
  const soundRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    const audio = new Audio(url);
    audio.volume = 1; 
    soundRef.current = audio;

    audio.load();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [url]);

  const play = () => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current
        .play()
        .catch((err) =>
          console.error("Sound playback error:", err)
        );
    }
  };

  return play;
}
