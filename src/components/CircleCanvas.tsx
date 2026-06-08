import { useEffect, useRef, useState } from 'react';
import type { Circle } from '../types';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const MIN_RADIUS = 5;

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function CircleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [pendingCenter, setPendingCenter] = useState<{
    cx: number;
    cy: number;
  } | null>(null);
  const [previewRadius, setPreviewRadius] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (const circle of circles) {
      ctx.beginPath();
      ctx.arc(circle.cx, circle.cy, circle.radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    if (pendingCenter && previewRadius >= MIN_RADIUS) {
      ctx.beginPath();
      ctx.arc(
        pendingCenter.cx,
        pendingCenter.cy,
        previewRadius,
        0,
        Math.PI * 2,
      );
      ctx.strokeStyle = '#93c5fd';
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(pendingCenter.cx, pendingCenter.cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#2563eb';
      ctx.fill();
    }
  }, [circles, pendingCenter, previewRadius]);

  const getCanvasPoint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasPoint(event);

    if (!pendingCenter) {
      setPendingCenter({ cx: x, cy: y });
      setPreviewRadius(0);
      return;
    }

    const radius = distance(pendingCenter.cx, pendingCenter.cy, x, y);
    if (radius < MIN_RADIUS) return;

    setCircles((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        cx: pendingCenter.cx,
        cy: pendingCenter.cy,
        radius,
      },
    ]);
    setPendingCenter(null);
    setPreviewRadius(0);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!pendingCenter) return;

    const { x, y } = getCanvasPoint(event);
    setPreviewRadius(distance(pendingCenter.cx, pendingCenter.cy, x, y));
  };

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    />
  );
}

export default CircleCanvas;
