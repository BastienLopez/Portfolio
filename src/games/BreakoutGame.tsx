import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const CANVAS_WIDTH = 440;
const CANVAS_HEIGHT = 320;
const BRICK_ROW_COUNT = 4;
const BRICK_COLUMN_COUNT = 7;

type Brick = {
  x: number;
  y: number;
  status: 0 | 1;
};

const BreakoutGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState<'ready' | 'running' | 'cleared' | 'over'>('ready');
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    let animationFrame = 0;
    let paddleX = (CANVAS_WIDTH - 75) / 2;
    const paddleWidth = 90;
    const paddleHeight = 14;
    const paddleSpeed = 6;
    let rightPressed = false;
    let leftPressed = false;
    let ballRadius = 7;
    let ballX = CANVAS_WIDTH / 2;
    let ballY = CANVAS_HEIGHT - 40;
    let ballDX = 0;
    let ballDY = 0;
    let bricks: Brick[][] = [];
    let isLaunched = false;
    let currentStatus: 'ready' | 'running' | 'cleared' | 'over' = 'ready';

    const syncStatus = (next: typeof currentStatus) => {
      currentStatus = next;
      setStatus(next);
    };

    const init = () => {
      bricks = Array.from({ length: BRICK_COLUMN_COUNT }, (_, column) =>
        Array.from({ length: BRICK_ROW_COUNT }, (_, row) => ({
          x: column * 58 + 30,
          y: row * 26 + 30,
          status: 1 as const,
        }))
      );
      paddleX = (CANVAS_WIDTH - paddleWidth) / 2;
      ballX = CANVAS_WIDTH / 2;
      ballY = CANVAS_HEIGHT - 40;
      ballDX = 0;
      ballDY = 0;
      isLaunched = false;
      setScore(0);
      setLives(3);
      syncStatus('ready');
    };

    init();

    const drawBricks = () => {
      bricks.forEach((column) =>
        column.forEach((brick) => {
          if (brick.status === 1) {
            const gradient = context.createLinearGradient(brick.x, brick.y, brick.x + 50, brick.y + 16);
            gradient.addColorStop(0, '#fb923c');
            gradient.addColorStop(1, '#f97316');
            context.fillStyle = gradient;
            context.fillRect(brick.x, brick.y, 50, 16);
            context.strokeStyle = 'rgba(255,255,255,0.15)';
            context.strokeRect(brick.x, brick.y, 50, 16);
          }
        })
      );
    };

    const drawPaddle = () => {
      const gradient = context.createLinearGradient(paddleX, CANVAS_HEIGHT - paddleHeight - 10, paddleX + paddleWidth, CANVAS_HEIGHT);
      gradient.addColorStop(0, '#22d3ee');
      gradient.addColorStop(1, '#3b82f6');
      context.fillStyle = gradient;
      context.fillRect(paddleX, CANVAS_HEIGHT - paddleHeight - 10, paddleWidth, paddleHeight);
      context.fillStyle = '#0f172a';
      context.fillRect(paddleX, CANVAS_HEIGHT - paddleHeight, paddleWidth, 6);
    };

    const drawBall = () => {
      context.beginPath();
      context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      context.fillStyle = '#fcd34d';
      context.fill();
      context.strokeStyle = '#fde68a';
      context.stroke();
    };

    const drawBackground = () => {
      const gradient = context.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      gradient.addColorStop(0, '#020617');
      gradient.addColorStop(1, '#0f172a');
      context.fillStyle = gradient;
      context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    const launchBall = () => {
      if (isLaunched) {
        return;
      }
      isLaunched = true;
      ballDX = (Math.random() > 0.5 ? 1 : -1) * 2.6;
      ballDY = -3;
      syncStatus('running');
    };

    const resetBall = () => {
      isLaunched = false;
      ballX = paddleX + paddleWidth / 2;
      ballY = CANVAS_HEIGHT - paddleHeight - 16;
      ballDX = 0;
      ballDY = 0;
    };

    const collisionDetection = () => {
      bricks.forEach((column) =>
        column.forEach((brick) => {
          if (brick.status === 1) {
            if (
              ballX > brick.x &&
              ballX < brick.x + 50 &&
              ballY > brick.y &&
              ballY < brick.y + 16
            ) {
              ballDY = -ballDY;
              brick.status = 0;
              setScore((prev) => prev + 10);
              const remaining = bricks.flat().some((b) => b.status === 1);
              if (!remaining) {
                syncStatus('cleared');
                isLaunched = false;
              }
            }
          }
        })
      );
    };

    const draw = () => {
      drawBackground();
      drawBricks();
      drawPaddle();
      drawBall();
    };

    const update = () => {
      if (rightPressed && paddleX < CANVAS_WIDTH - paddleWidth) {
        paddleX += paddleSpeed;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
      }

      if (!isLaunched) {
        ballX = paddleX + paddleWidth / 2;
        ballY = CANVAS_HEIGHT - paddleHeight - 16;
      } else {
        ballX += ballDX;
        ballY += ballDY;
      }

      if (ballX + ballDX > CANVAS_WIDTH - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
      }
      if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
      } else if (ballY + ballDY > CANVAS_HEIGHT - paddleHeight - 14) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          ballDY = -ballDY;
          const hitPoint = ballX - (paddleX + paddleWidth / 2);
          ballDX = hitPoint * 0.07;
        } else if (ballY > CANVAS_HEIGHT) {
          setLives((prev) => {
            const nextLives = prev - 1;
            if (nextLives <= 0) {
              syncStatus('over');
              isLaunched = false;
              return 0;
            }
            resetBall();
            return nextLives;
          });
        }
      }

      collisionDetection();
    };

    const loop = () => {
      animationFrame = requestAnimationFrame(loop);
      draw();
      if (currentStatus !== 'over' && currentStatus !== 'cleared') {
        update();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.code === 'Space') {
        event.preventDefault();
      }
      if (event.key === 'ArrowRight') {
        rightPressed = true;
      } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
      } else if (event.code === 'Space') {
        launchBall();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
      }
      if (event.key === 'ArrowRight') {
        rightPressed = false;
      } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp, { passive: false });
    animationFrame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [resetKey]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Score</p>
          <p className="text-2xl font-semibold text-foreground">{score}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Vies</p>
          <p className="text-2xl font-semibold text-foreground">{lives}</p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          {status === 'ready' && 'Espace pour lancer'}
          {status === 'running' && 'Game on'}
          {status === 'cleared' && 'Niveau termine'}
          {status === 'over' && 'Game over'}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="mx-auto w-full max-w-2xl rounded-2xl border border-primary/20 bg-black shadow-lg shadow-primary/20"
      />

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => setResetKey((prev) => prev + 1)}>
          Reset niveau
        </Button>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Barre espace = go
        </p>
      </div>
    </div>
  );
};

export default BreakoutGame;
