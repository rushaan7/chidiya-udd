"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface BonusAnimationProps {
  isVisible: boolean;
  bonusLevel: number;
}

export default function BonusAnimation({ isVisible, bonusLevel }: BonusAnimationProps) {
  const bonusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && bonusRef.current) {
      gsap.fromTo(
        bonusRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -100, duration: 1, ease: "power1.out" }
      );
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={bonusRef}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-yellow-400 pointer-events-none"
    >
      x{bonusLevel} Bonus!
    </div>
  );
}
