"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import useSound from "../hooks/useSound";

interface CountdownScreenProps {
  onCountdownEnd: () => void;
}

export default function CountdownScreen({ onCountdownEnd }: CountdownScreenProps) {
  const [count, setCount] = useState(3);
  const countRef = useRef<HTMLDivElement>(null);

  const tickSound = useSound("/sounds/tick.mp3");
  const startSound = useSound("/sounds/start.mp3");

  useEffect(() => {
    if (count > 0) {
      tickSound();
    }
    if (countRef.current) {
      gsap.fromTo(
        countRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "bounce.out" }
      );
    }
  }, [count, tickSound]);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      startSound();
      const timer = setTimeout(() => onCountdownEnd(), 500);
      return () => clearTimeout(timer);
    }
  }, [count, onCountdownEnd, startSound]);

  return (
    <div className="flex items-center justify-center bg-transparent h-full">
      <motion.div
        ref={countRef}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-8xl font-bold text-primary dark:text-yellow-400"
      >
        {count}
      </motion.div>
    </div>
  );
}
