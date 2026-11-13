// Tiny repeating patterns drawn on a canvas and read back as ImageData
export interface PatternSpec {
  id: string;
  draw: (g: CanvasRenderingContext2D, size: number) => void;
}

export const SIZE = 16; // a power of two, so the tile repeats seamlessly

export const patterns: PatternSpec[] = [
  {
    id: 'stripes',
    draw: (g, s) => {
      g.strokeStyle = '#e8a308';
      g.lineWidth = 3;
      g.beginPath();
      // Diagonal lines corner to corner, plus the copies that wrap across the tile edge.
      for (const k of [-s, 0, s]) {
        g.moveTo(k, s);
        g.lineTo(k + s, 0);
      }
      g.stroke();
    },
  },
  {
    id: 'dots',
    draw: (g, s) => {
      g.fillStyle = '#58a6ff';
      g.beginPath();
      g.arc(s / 2, s / 2, 3, 0, Math.PI * 2);
      g.fill();
    },
  },
  {
    id: 'checks',
    draw: (g, s) => {
      g.fillStyle = '#22c55e';
      g.fillRect(0, 0, s / 2, s / 2);
      g.fillRect(s / 2, s / 2, s / 2, s / 2);
    },
  },
];

/** Renders one pattern to ImageData with a transparent background. */
export function renderPattern(p: PatternSpec): ImageData {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('2d canvas unavailable');
  p.draw(g, SIZE);
  return g.getImageData(0, 0, SIZE, SIZE);
}
