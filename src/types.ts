export type Circle = {
  cx: number;
  cy: number;
  radius: number;
};

export type Tangent = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type DrawingPhase = 'center' | 'radius';
