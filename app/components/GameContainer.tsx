"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HomeScreen from "./HomeScreen";
import CountdownScreen from "./CountdownScreen";
import GameScreen from "./GameScreen";

export default function GameContainer() {
  const [gameState, setGameState] = useState<
    "home" | "countdown" | "playing" | "paused" | "gameOver"
  >("home");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(Number(storedHighScore));
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setGameState("home");
      setScore(0);
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState === "home" && e.code === "Space") {
        e.preventDefault();
        startGame();
      }
      if (gameState === "playing" && e.code === "Space") {
        e.preventDefault();
        const birdButton = document.getElementById("birdButton");
        if (birdButton) birdButton.click();
      }
      if (gameState === "playing" && e.code === "Escape") {
        setGameState("paused");
      } else if (gameState === "paused" && e.code === "Escape") {
        setGameState("playing");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameState]);

  const startGame = () => {
    setGameState("countdown");
  };

  const startPlaying = () => {
    setGameState("playing");
    setScore(0);
  };

  const endGame = (finalScore: number) => {
    setScore(finalScore);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem("highScore", finalScore.toString());
    }
    setGameState("gameOver");
  };

  const playAgain = () => {
    setGameState("countdown");
  };

  const goToHome = () => {
    setGameState("home");
    setScore(0);
    router.push("/");
  };

  const resumeGame = () => {
    setGameState("playing");
  };

  return (
    <div className="relative">
      <div className="relative rounded-lg transition-shadow duration-300">
        {gameState === "home" && <HomeScreen onStartGame={startGame} />}
        {gameState === "countdown" && (
          <CountdownScreen onCountdownEnd={startPlaying} />
        )}
        {(gameState === "playing" || gameState === "gameOver") && (
          <GameScreen
            score={score}
            setScore={setScore}
            highScore={highScore}
            setHighScore={setHighScore}
            onGameOver={endGame}
            isGameOver={gameState === "gameOver"}
            onPlayAgain={playAgain}
            goToHome={goToHome}
          />
        )}
        {gameState === "paused" && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-10">
            <h2 className="text-4xl text-white mb-6">Game Paused</h2>
            <button
              onClick={resumeGame}
              className="px-6 py-3 bg-green-600 text-white rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
