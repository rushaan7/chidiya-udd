"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GameContainer from "./components/GameContainer";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f1de] dark:bg-[#121212] transition-colors duration-200 relative">
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <Header />
          <motion.main
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex-grow flex flex-col items-center justify-start pt-8 px-4 pb-6"
          >
            <section className="w-full max-w-md">
              <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-4 text-[#3d405b] dark:text-[#E0E0E0] text-center">
                Bird Tap Game
              </h1>
              <p className="text-lg sm:text-xl mb-6 text-[#3d405b] dark:text-[#B0B0B0] text-center">
                Click on the "Bird" button when a bird name comes up.
                <br />
                Press the Spacebar to start the game.
              </p>
              <GameContainer />
            </section>
          </motion.main>
          <Footer />
        </>
      )}
    </div>
  );
}
