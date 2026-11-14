// Oscilloscope canvas: the current waveform over a rolling history of loudness
const COLORS = ['#7aa2ff', '#ff8fb1'];
const HISTORY = 120;

export interface Scope {
  readonly canvas: HTMLCanvasElement;
  /**
   * Draws one frame from per-channel sample windows. `gain` scales the samples; without it
   * the scope adapts to the loudest recent sound, slowly, so fades still read as fades.
   */
  draw(windows: readonly Float32Array[], gain?: number): void;
  /** Forgets the loudness history (when a card's loop wraps to a new variant). */
  clear(): void;
  dispose(): void;
}

export function scope(parent: HTMLElement): Scope {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'display:block;width:100%;height:100%;min-height:0';
  parent.append(canvas);
  const g = canvas.getContext('2d')!;
  const history: number[] = [];
  let hold = 0.02;

  const fit = (): void => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) Object.assign(canvas, { width: w, height: h });
  };
  const ro = new ResizeObserver(fit);
  ro.observe(canvas);

  return {
    canvas,
    clear: () => {
      history.length = 0;
      hold = 0.02;
    },
    dispose: () => ro.disconnect(),
    draw(windows, fixed) {
      fit();
      const { width: w, height: h } = canvas;
      const mid = h / 2;
      g.clearRect(0, 0, w, h);

      // Loudness history, newest on the right: how the sound has moved over the last seconds.
      let peak = 0;
      for (const win of windows) for (let i = 0; i < win.length; i++) peak = Math.max(peak, Math.abs(win[i]!));
      // Auto-gain: quiet sounds are drawn large enough to read, with a ~10 s memory.
      hold = Math.max(peak, hold * 0.999, 0.02);
      const gain = fixed ?? 0.92 / hold;
      history.push(Math.min(1, peak * gain));
      if (history.length > HISTORY) history.shift();
      const bw = w / HISTORY;
      g.fillStyle = 'rgba(122,162,255,0.32)';
      history.forEach((v, i) => {
        const bh = Math.max(1, v * (h - 4));
        g.fillRect(w - (history.length - i) * bw, mid - bh / 2, Math.max(1, bw - 1), bh);
      });

      g.strokeStyle = 'rgba(255,255,255,0.08)';
      g.beginPath();
      g.moveTo(0, mid);
      g.lineTo(w, mid);
      g.stroke();

      // The waveform itself, started at a rising zero crossing so a steady tone stands still.
      windows.forEach((win, c) => {
        if (win.length < 2) return;
        let start = 0;
        for (let i = 1; i < win.length / 2; i++) {
          if (win[i - 1]! <= 0 && win[i]! > 0) {
            start = i;
            break;
          }
        }
        const n = Math.floor(win.length / 2);
        g.strokeStyle = COLORS[c % COLORS.length]!;
        g.lineWidth = Math.max(1.5, h / 90);
        g.beginPath();
        for (let i = 0; i < n; i++) {
          const x = (i / (n - 1)) * w;
          const y = mid - Math.max(-1, Math.min(1, (win[start + i] ?? 0) * gain)) * (mid - 3);
          if (i === 0) g.moveTo(x, y);
          else g.lineTo(x, y);
        }
        g.stroke();
      });
    },
  };
}
