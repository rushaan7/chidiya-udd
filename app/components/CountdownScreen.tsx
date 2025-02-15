"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface CountdownScreenProps {
  onCountdownEnd: () => void;
}

export default function CountdownScreen({ onCountdownEnd }: CountdownScreenProps) {
  const [count, setCount] = useState(3);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (countRef.current) {
      gsap.fromTo(
        countRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "bounce.out" }
      );
    }
  }, [count]);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onCountdownEnd();
    }
  }, [count, onCountdownEnd]);

  return (
    <div className="flex items-center justify-center bg-transparent h-full">
      <div ref={countRef} className="text-8xl font-bold text-primary dark:text-yellow-400">
        {count}
      </div>
    </div>
  );
}
