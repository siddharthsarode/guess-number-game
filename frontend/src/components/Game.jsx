import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from "canvas-confetti";
import { Trophy, Play, RefreshCcw } from "lucide-react";
import loserGif from "@/assets/video/giphy.gif";
import winGif from "@/assets/video/win.gif";

const Game = () => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [winCount, setWinCount] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStatus, setGameStatus] = useState("idle");

  // console.log(targetNumber);

  // Set the total winners count to localstorage
  useEffect(() => {
    const savedWins = localStorage.getItem("winCount");
    if (savedWins) {
      setWinCount(Number.parseInt(savedWins));
    }
  }, []);

  const generateNumber = () => {
    return Math.floor(Math.random() * 20) + 1;
  };

  const startGame = () => {
    setTargetNumber(generateNumber());
    setGameStarted(true);
    setMessage("");
    setShowResult(false);
    setSelectedNumber(null);
    setGameStatus("idle");
  };

  const resetGame = () => {
    setTargetNumber(null);
    setGameStarted(false);
    setMessage("");
    setShowResult(false);
    setSelectedNumber(null);
    setGameStatus("idle");
  };

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleNumberClick = (number) => {
    if (!gameStarted || !targetNumber) return;

    setSelectedNumber(number);
    setShowResult(true);

    if (number === targetNumber) {
      setMessage("Congratulations! You won! 🎉");
      setGameStatus("won");
      setWinCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("winCount", newCount.toString());
        return newCount;
      });
      triggerConfetti();
    } else {
      setMessage("Sorry, you lost. Try again!");
      setGameStatus("lost");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-3xl p-6 bg-gray-900 border-gray-800">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-white uppercase">
          Guess the number between 1 to 20 and Get{" "}
          <span className="text-yellow-600">Free</span> Panipuri
        </h1>

        <div className="w-full h-[12rem] md:h-[16rem] pb-5">
          {showResult && (
            <div className="mb-6 w-full h-full">
              {gameStatus === "won" ? (
                <img
                  className="w-[70%] mx-auto h-full object-fit aspect-square rounded-lg"
                  src={winGif}
                />
              ) : (
                <img
                  className="w-[70%] mx-auto h-full object-cover aspect-square rounded-lg"
                  src={loserGif}
                />
              )}
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <Button
            onClick={startGame}
            className="gap-2"
            variant={gameStarted ? "secondary" : "default"}
          >
            <Play className="w-4 h-4" />
            Play
          </Button>
          <Button onClick={resetGame} variant="outline" className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {message && (
          <div
            className={`text-center mb-6 text-lg font-medium ${
              gameStatus === "won" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
          {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              onClick={() => handleNumberClick(number)}
              disabled={!gameStarted || showResult}
              variant="outline"
              className={`h-12 w-full ${
                showResult && number === targetNumber
                  ? "bg-green-500 hover:bg-green-500 text-white border-green-500"
                  : showResult &&
                    number === selectedNumber &&
                    number !== targetNumber
                  ? "bg-red-500 hover:bg-red-500 text-white border-red-500"
                  : "hover:bg-gray-800"
              }`}
            >
              {number}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-white">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-lg font-medium">Total Wins: {winCount}</span>
        </div>
      </Card>
    </div>
  );
};

export default Game;
