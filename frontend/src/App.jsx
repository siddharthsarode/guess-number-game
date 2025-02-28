import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import confetti from "canvas-confetti";
import { Trophy, Play, RefreshCcw } from "lucide-react";
import loserGif from "@/assets/video/giphy.gif";
import winGif from "@/assets/video/win.gif";
import Game from "./components/Game";

const App = () => {
  return (
    <main className="text-white overflow-x-hidden">
      <Game />
    </main>
  );
};

export default App;
