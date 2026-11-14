// Pitch wobble drawing: the vibrato's pitch curve with a moving dot
export interface Wobble {
  /** Sets the vibrato depth in cents and rate in Hz, and clears the dot. */
  set(cents: number, rate: number): void;
  /** Draws the curve with the dot at `time` seconds of `total`. */
  draw(time: number, total: number): void;
}

export function wobble(parent: HTMLElement): Wobble {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 80;
  canvas.style.cssText = 'width:100%;height:80px;display:block';
  parent.append(canvas);
  const g = canvas.getContext('2d')!;
  let cents = 0;
  let rate = 5;
  const y = (t: number): number => 40 - Math.sin(2 * Math.PI * rate * t) * (cents / 50) * 34;
  return {
    set(c, r) {
      cents = c;
      rate = r;
    },
    draw(time, total) {
      const { width: w, height: h } = canvas;
      g.clearRect(0, 0, w, h);
      g.strokeStyle = 'rgba(255,255,255,0.15)';
      g.beginPath();
      g.moveTo(0, h / 2);
      g.lineTo(w, h / 2);
      g.stroke();
      g.strokeStyle = '#7aa2ff';
      g.lineWidth = 2;
      g.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const t = (x / w) * total;
        if (x === 0) g.moveTo(x, y(t));
        else g.lineTo(x, y(t));
      }
      g.stroke();
      g.fillStyle = '#ff8fb1';
      g.beginPath();
      g.arc((time / total) * w, y(time), 5, 0, Math.PI * 2);
      g.fill();
    },
  };
}
