import type { Circle, Tangent } from '../types';

const EXTEND_LENGTH = 2000;

function extendLine(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): Tangent {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len === 0) return { x1, y1, x2, y2 };

  const ux = dx / len;
  const uy = dy / len;

  return {
    x1: x1 - ux * EXTEND_LENGTH,
    y1: y1 - uy * EXTEND_LENGTH,
    x2: x2 + ux * EXTEND_LENGTH,
    y2: y2 + uy * EXTEND_LENGTH,
  };
}

function addTangentsForRatio(
  a: Circle,
  b: Circle,
  vx: number,
  vy: number,
  c: number,
  tangents: Tangent[],
) {
  if (Math.abs(c) >= 1) return;

  const h = Math.sqrt(1 - c * c);

  for (const sign of [-1, 1]) {
    const nx = vx * c - sign * h * vy;
    const ny = vy * c + sign * h * vx;

    const x1 = a.cx + a.radius * nx;
    const y1 = a.cy + a.radius * ny;
    const x2 = b.cx + b.radius * nx;
    const y2 = b.cy + b.radius * ny;

    tangents.push(extendLine(x1, y1, x2, y2));
  }
}

export function getCommonTangents(a: Circle, b: Circle): Tangent[] {
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;
  const d = Math.hypot(dx, dy);

  if (d === 0) return [];

  const vx = dx / d;
  const vy = dy / d;
  const tangents: Tangent[] = [];

  addTangentsForRatio(a, b, vx, vy, (a.radius - b.radius) / d, tangents);

  addTangentsForRatio(a, b, vx, vy, (a.radius + b.radius) / d, tangents);

  return tangents;
}

export function getAllTangents(circles: Circle[]): Tangent[] {
  const tangents: Tangent[] = [];

  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      tangents.push(...getCommonTangents(circles[i], circles[j]));
    }
  }

  return tangents;
}