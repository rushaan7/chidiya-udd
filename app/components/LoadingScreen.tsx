"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        scale: 1.05,
        yoyo: true,
        repeat: -1,
        duration: 1,
      });
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[#16213e] flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
      >
        <motion.h1
          ref={titleRef}
          className="text-6xl font-bold text-[#fee440] drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 1, ease: "easeOut" },
          }}
          exit={{
            y: -50,
            opacity: 0,
            transition: { duration: 0.5 },
          }}
        >
          Bird Tap Game
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}
