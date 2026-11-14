// Easing functions and a small canvas plot of one with a moving progress dot
export const EASINGS: Record<string, (t: number) => number> = {
  linear: (t) => t,
  'ease-in-cubic': (t) => t * t * t,
  'ease-out-cubic': (t) => 1 - (1 - t) ** 3,
  'ease-in-out-sine': (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  'ease-out-back': (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2,
  'ease-out-bounce': (t) => {
    const n = 7.5625;
    const d = 2.75;
    if (t < 1 / d) return n * t * t;
    if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75;
    if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375;
    return n * (t -= 2.625 / d) * t + 0.984375;
  },
};

export interface Plot {
  canvas: HTMLCanvasElement;
  draw(name: string, progress: number | null): void;
}

/** A 220x110 canvas; draw() paints the curve and, when progress is set, a dot at that time. */
export function makePlot(parent: HTMLElement): Plot {
  const canvas = document.createElement('canvas');
  canvas.width = 220;
  canvas.height = 110;
  canvas.style.display = 'block';
  canvas.style.margin = '10px auto 0';
  parent.append(canvas);
  const g = canvas.getContext('2d')!;
  const X = (t: number): number => 10 + t * 200;
  const Y = (v: number): number => 90 - v * 70;
  return {
    canvas,
    draw(name, progress) {
      const f = EASINGS[name]!;
      g.clearRect(0, 0, 220, 110);
      g.strokeStyle = '#3e4e63';
      g.strokeRect(X(0), Y(1), 200, 70);
      g.strokeStyle = '#ffaa44';
      g.beginPath();
      for (let i = 0; i <= 100; i++) g[i ? 'lineTo' : 'moveTo'](X(i / 100), Y(f(i / 100)));
      g.stroke();
      if (progress !== null) {
        g.fillStyle = '#fff';
        g.beginPath();
        g.arc(X(progress), Y(f(progress)), 5, 0, Math.PI * 2);
        g.fill();
      }
    },
  };
}
