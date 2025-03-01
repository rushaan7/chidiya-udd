"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../components/ThemeContext";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Documentation() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "dark" : ""
      } bg-secondary dark:bg-gray-800 transition-colors duration-200 relative`}
    >
      <Header />
      {/* Cross (×) button placed in its own container below the header */}
      <div className="p-4 flex justify-end">
        <Link href="/">
          <div className="text-4xl text-white cursor-pointer hover:text-gray-300">
            &times;
          </div>
        </Link>
      </div>
      <motion.main
        className="flex-grow flex flex-col pt-4 px-4 sm:px-8 md:px-16 lg:px-24 pb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-primary dark:text-white text-center">
          Documentation
        </h1>
        <p className="text-lg text-primary dark:text-gray-200 mb-8">
          "Bird Tap Game" has been inspired by a very popular children's game in India,
          known as "Chidiya Udd". The original game involves players sitting in circles where
          one person acts as a leader and says "Chidiya Udd" while raising their finger. The
          others must raise their fingers quickly if the named thing can fly (like a bird). If
          the leader says something that cannot fly (like "Dog Udd") and a player raises their
          finger, they lose.
        </p>
        <h2 className="text-3xl font-bold mb-4 text-primary dark:text-white">
          How to play
        </h2>
        <p className="text-lg text-primary dark:text-gray-200 mb-8">
          To play this game, click on the "Start Game" button, wait for the countdown and then some random
          words will appear, some of which will be bird names. Click on the "Bird" button within 2 seconds when
          a bird name comes up to score points. If you click on the "Bird" button for non-bird names, the game will end.
          Also, if you fail to click on the "Bird" button within 2 seconds when a bird name shows up, the game ends.
        </p>
        <h2 className="text-3xl font-bold mb-4 text-primary dark:text-white">
          Credits
        </h2>
        <p className="text-lg text-primary dark:text-gray-200">
          This game was developed by Rushan Khan using v0. The source files can be found by clicking on the
          "GitHub" button in the header.
        </p>
      </motion.main>
      <Footer />
    </div>
  );
}
