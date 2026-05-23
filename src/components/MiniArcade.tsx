import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Trophy, Award, Sliders } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

export default function MiniArcade() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('navod_snake_highscore');
    return saved ? parseInt(saved, 10) : 34;
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameSpeed, setGameSpeed] = useState(130); // in ms
  const [difficulty, setDifficulty] = useState<'Standard' | 'Blitz' | 'VaporWave'>('Standard');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [goldFood, setGoldFood] = useState<Point | null>(null);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const dirRef = useRef<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');

  // Audio synthisizer for retro alerts
  const playBeep = (freq: number, type: 'sine' | 'square' | 'triangle' = 'sine', duration = 0.1) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback safe
    }
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      const key = e.key;
      e.preventDefault(); // Stop window scrolls
      if ((key === 'ArrowUp' || key === 'w' || key === 'W') && dirRef.current !== 'DOWN') {
        dirRef.current = 'UP';
        setDirection('UP');
        playBeep(240, 'triangle', 0.05);
      } else if ((key === 'ArrowDown' || key === 's' || key === 'S') && dirRef.current !== 'UP') {
        dirRef.current = 'DOWN';
        setDirection('DOWN');
        playBeep(220, 'triangle', 0.05);
      } else if ((key === 'ArrowLeft' || key === 'a' || key === 'A') && dirRef.current !== 'RIGHT') {
        dirRef.current = 'LEFT';
        setDirection('LEFT');
        playBeep(200, 'triangle', 0.05);
      } else if ((key === 'ArrowRight' || key === 'd' || key === 'D') && dirRef.current !== 'LEFT') {
        dirRef.current = 'RIGHT';
        setDirection('RIGHT');
        playBeep(260, 'triangle', 0.05);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  // Adjust game speed on difficulty change
  useEffect(() => {
    if (difficulty === 'Standard') setGameSpeed(130);
    else if (difficulty === 'Blitz') setGameSpeed(80);
    else if (difficulty === 'VaporWave') setGameSpeed(180);
  }, [difficulty]);

  const generateFood = (currentSnake: Point[]): Point => {
    let newFood: Point;
    let attempts = 0;
    do {
      newFood = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      };
      attempts++;
    } while (currentSnake.some(s => s.x === newFood.x && s.y === newFood.y) && attempts < 100);
    return newFood;
  };

  const handleManualDir = (newDir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (!isPlaying || gameOver) return;
    if (newDir === 'UP' && dirRef.current !== 'DOWN') {
      dirRef.current = 'UP';
      setDirection('UP');
      playBeep(240, 'triangle', 0.05);
    } else if (newDir === 'DOWN' && dirRef.current !== 'UP') {
      dirRef.current = 'DOWN';
      setDirection('DOWN');
      playBeep(220, 'triangle', 0.05);
    } else if (newDir === 'LEFT' && dirRef.current !== 'RIGHT') {
      dirRef.current = 'LEFT';
      setDirection('LEFT');
      playBeep(200, 'triangle', 0.05);
    } else if (newDir === 'RIGHT' && dirRef.current !== 'LEFT') {
      dirRef.current = 'RIGHT';
      setDirection('RIGHT');
      playBeep(260, 'triangle', 0.05);
    }
  };

  const resetGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ]);
    setDirection('RIGHT');
    dirRef.current = 'RIGHT';
    const newFood = { x: 5, y: 5 };
    setFood(newFood);
    setGoldFood(null);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    playBeep(440, 'sine', 0.25);
  };

  // Main game loop logic
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        const currentDir = dirRef.current;

        if (currentDir === 'UP') head.y -= 1;
        else if (currentDir === 'DOWN') head.y += 1;
        else if (currentDir === 'LEFT') head.x -= 1;
        else if (currentDir === 'RIGHT') head.x += 1;

        // Check self crash or boundary collisions
        if (
          head.x < 0 || head.x >= 20 ||
          head.y < 0 || head.y >= 20 ||
          prevSnake.some(seg => seg.x === head.x && seg.y === head.y)
        ) {
          setIsPlaying(false);
          setGameOver(true);
          playBeep(120, 'square', 0.4);
          return prevSnake;
        }

        const nextSnake = [head, ...prevSnake];

        // Eat standard food
        const ateFood = head.x === food.x && head.y === food.y;
        const ateGold = goldFood && head.x === goldFood.x && head.y === goldFood.y;

        if (ateFood) {
          setScore(s => {
            const nextScore = s + 1;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem('navod_snake_highscore', nextScore.toString());
            }
            return nextScore;
          });
          playBeep(520, 'sine', 0.12);
          setFood(generateFood(nextSnake));
          
          // Chance to spawn golden food (bonus score)
          if (Math.random() < 0.28 && !goldFood) {
            setGoldFood(generateFood(nextSnake));
          }
        } else if (ateGold) {
          setScore(s => {
            const nextScore = s + 5;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem('navod_snake_highscore', nextScore.toString());
            }
            return nextScore;
          });
          playBeep(880, 'sine', 0.2);
          setGoldFood(null);
        } else {
          // Standard step - remove tail
          nextSnake.pop();
        }

        // Random chance golden food decays
        if (goldFood && Math.random() < 0.08) {
          setGoldFood(null);
        }

        return nextSnake;
      });
    }, gameSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, food, goldFood, gameSpeed]);

  // Renders Canvas Grid Elements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and background grid styling (Neon Matrix)
    ctx.fillStyle = '#081b29';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Subtle Matrix Nodes Background
    ctx.strokeStyle = 'rgba(0, 171, 240, 0.05)';
    ctx.lineWidth = 0.5;
    const gridSpacing = canvas.width / 20;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridSpacing, 0);
      ctx.lineTo(i * gridSpacing, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * gridSpacing);
      ctx.lineTo(canvas.width, i * gridSpacing);
      ctx.stroke();
    }

    // Draw food (Magenta Pulsing Jewel)
    ctx.fillStyle = '#ff007f';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      food.x * gridSpacing + gridSpacing / 2,
      food.y * gridSpacing + gridSpacing / 2,
      gridSpacing / 2.8,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw Gold Food (Yellow Star-glow)
    if (goldFood) {
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(
        goldFood.x * gridSpacing + gridSpacing / 2,
        goldFood.y * gridSpacing + gridSpacing / 2,
        gridSpacing / 2.4,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Draw Snake (Cyan Neon Gradient)
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#ffffff' : '#00abf0';
      ctx.shadowColor = '#00abf0';
      ctx.shadowBlur = isHead ? 15 : 6;
      
      const padding = 1.5;
      ctx.beginPath();
      ctx.roundRect(
        segment.x * gridSpacing + padding,
        segment.y * gridSpacing + padding,
        gridSpacing - padding * 2,
        gridSpacing - padding * 2,
        isHead ? 4 : 2
      );
      ctx.fill();
    });

    // Reset shadow for next render cycles
    ctx.shadowBlur = 0;
  }, [snake, food, goldFood]);

  return (
    <div className="w-full bg-[#081b29]/60 border border-[#00abf0]/20 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-[#00abf0]/40 transition-all duration-300 shadow-2xl flex flex-col md:flex-row gap-6">
      {/* Playable Matrix section */}
      <div className="flex-1 flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={360}
          height={360}
          className="bg-[#081b29] rounded-xl border border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.4)] aspect-square max-w-full"
        />

        {/* Quick touch game controller for mobile / iframe clicking */}
        <div className="mt-4 flex flex-col items-center gap-1 md:hidden">
          <button
            onClick={() => handleManualDir('UP')}
            className="w-12 h-12 rounded-lg bg-[#00abf0]/10 border border-[#00abf0]/30 flex items-center justify-center font-bold text-white text-lg active:bg-[#00abf0] active:text-black cursor-pointer"
          >
            ▲
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => handleManualDir('LEFT')}
              className="w-12 h-12 rounded-lg bg-[#00abf0]/10 border border-[#00abf0]/30 flex items-center justify-center font-bold text-white text-lg active:bg-[#00abf0] active:text-black cursor-pointer"
            >
              ◀
            </button>
            <button
              onClick={() => handleManualDir('DOWN')}
              className="w-12 h-12 rounded-lg bg-[#00abf0]/10 border border-[#00abf0]/30 flex items-center justify-center font-bold text-white text-lg active:bg-[#00abf0] active:text-black cursor-pointer"
            >
              ▼
            </button>
            <button
              onClick={() => handleManualDir('RIGHT')}
              className="w-12 h-12 rounded-lg bg-[#00abf0]/10 border border-[#00abf0]/30 flex items-center justify-center font-bold text-white text-lg active:bg-[#00abf0] active:text-black cursor-pointer"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Control panel and logs */}
      <div className="w-full md:w-60 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-[#081b29] border border-gray-800 p-2.5 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-[10px] text-gray-400 font-mono">HIGH SCORE</span>
            </div>
            <span className="text-white font-mono font-bold text-sm tracking-widest">{highScore}</span>
          </div>

          <div className="flex justify-between items-center bg-[#081b29] border border-gray-800 p-2.5 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#ff007f] animate-pulse" />
              <span className="text-[10px] text-gray-400 font-mono">YOUR SCORE</span>
            </div>
            <span className="text-white font-mono font-bold text-sm tracking-widest">{score}</span>
          </div>

          {/* Difficulty setting slider-button */}
          <div className="bg-[#081b29] border border-gray-800 p-3 rounded-lg">
            <div className="flex items-center gap-1.5 mb-2">
              <Sliders className="w-3.5 h-3.5 text-[#00abf0]" />
              <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Difficulty Setting</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {(['Standard', 'Blitz', 'VaporWave'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => {
                    setDifficulty(mode);
                    playBeep(330, 'sine', 0.08);
                  }}
                  className={`py-1 rounded text-[10px] font-semibold uppercase tracking-wider cursor-pointer ${
                    difficulty === mode
                      ? 'bg-[#00abf0] text-black'
                      : 'bg-transparent text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {mode === 'VaporWave' ? 'Vapor' : mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action controllers */}
        <div className="mt-6 space-y-3">
          {/* Sound enable toggler */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-full py-1 text-[10px] font-mono text-gray-400 hover:text-white flex items-center justify-center gap-1 bg-transparent border border-gray-800 hover:border-gray-700 rounded-lg cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-green-400" />
                <span>Audio Enabled</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
                <span>Audio Muted</span>
              </>
            )}
          </button>

          {/* Core play or restart triggers */}
          {gameOver ? (
            <button
              onClick={resetGame}
              className="w-full py-2.5 bg-[#ff007f] hover:bg-[#d00067] rounded-all text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,0,127,0.4)] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 animate-spin-reverse" />
              <span>Retry Game</span>
            </button>
          ) : !isPlaying ? (
            <button
              onClick={() => {
                setIsPlaying(true);
                playBeep(600, 'sine', 0.2);
              }}
              className="w-full py-2.5 bg-[#00abf0] hover:bg-[#0081b5] rounded-all text-black text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,171,240,0.4)] cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>Launch Snake</span>
            </button>
          ) : (
            <button
              onClick={() => setIsPlaying(false)}
              className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 rounded-all text-black text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
            >
              <Pause className="w-4 h-4" />
              <span>Pause Game</span>
            </button>
          )}

          {/* Game Tips Info */}
          <div className="text-[9px] text-gray-500 font-sans text-center">
            Tip: Eat magenta nodes for 1 pt, golden nodes for 5 pt bonus! Use your keyboard arrows (W A S D) or mouse pads.
          </div>
        </div>
      </div>
    </div>
  );
}
