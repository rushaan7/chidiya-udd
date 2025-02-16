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
    // Force the loading screen to remain for 3 seconds before finishing.
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  // Apply a subtle pulsing animation using GSAP
  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        scale: 1.03,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  // Remove any noticeable initial entrance offset by setting initial equals animate.
  const containerVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } },
  };

  const titleVariants = {
    initial: { y: 0, opacity: 1, scale: 1 },
    animate: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.1, ease: "linear" } },
    exit: { y: 0, opacity: 0, scale: 1, transition: { duration: 1, ease: "easeIn" } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[#16213e] flex items-center justify-center z-50"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.h1
          ref={titleRef}
          className="text-6xl font-bold text-[#fee440] drop-shadow-lg"
          variants={titleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          Bird Tap Game
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}
