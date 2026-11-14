// A slowed-down spinning dial: a point on a circle, and its height beside it
export interface Dial {
  /** Moves the point to `phase` radians (0 is at the right, counter-clockwise). */
  draw(phase: number): void;
}

export function dial(parent: HTMLElement, height: number): Dial {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `width:100%;height:${height}px;flex:0 0 auto`;
  parent.append(canvas);
  const trail: number[] = [];
  return {
    draw(phase) {
      const w = Math.max(1, canvas.clientWidth);
      canvas.width = w;
      canvas.height = height;
      const g = canvas.getContext('2d')!;
      const r = height / 2 - 6;
      const cx = r + 8;
      const cy = height / 2;
      g.strokeStyle = '#3a4150';
      g.lineWidth = 1;
      g.beginPath();
      g.arc(cx, cy, r, 0, Math.PI * 2);
      g.stroke();
      const y = -Math.sin(phase) * r;
      trail.unshift(y);
      if (trail.length > w - 2 * r - 30) trail.pop();
      // The point's height over time is the sine wave itself.
      g.strokeStyle = '#7aa2ff';
      g.lineWidth = 2;
      g.beginPath();
      trail.forEach((v, i) => (i ? g.lineTo(cx + r + 14 + i, cy + v) : g.moveTo(cx + r + 14, cy + v)));
      g.stroke();
      g.strokeStyle = '#ff8fb1';
      g.beginPath();
      g.moveTo(cx + Math.cos(phase) * r, cy + y);
      g.lineTo(cx + r + 14, cy + y);
      g.stroke();
      g.fillStyle = '#ff8fb1';
      g.beginPath();
      g.arc(cx + Math.cos(phase) * r, cy + y, 4, 0, Math.PI * 2);
      g.fill();
    },
  };
}
