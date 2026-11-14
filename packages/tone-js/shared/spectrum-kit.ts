// Spectrum helpers: a small DFT for cards, bars from bins, a bar/line canvas
import { BLUE, dbFrac, dbOf } from './routing-kit.ts';

export interface Bins {
  /** Decibels per bin, 0 dB is a full-scale sine. */
  db: Float32Array;
  /** Width of one bin in hertz. */
  binHz: number;
}

const tables = new Map<number, { cos: Float32Array; sin: Float32Array; win: Float32Array }>();

/** A small DFT of the newest samples with a Hann window, for cards that cannot run an FFT node. */
export function dft(samples: Float32Array, rate: number): Bins {
  const n = Math.min(1024, 2 ** Math.floor(Math.log2(Math.max(4, samples.length))));
  let t = tables.get(n);
  if (!t) {
    t = { cos: new Float32Array(n), sin: new Float32Array(n), win: new Float32Array(n) };
    for (let i = 0; i < n; i++) {
      t.cos[i] = Math.cos((2 * Math.PI * i) / n);
      t.sin[i] = Math.sin((2 * Math.PI * i) / n);
      t.win[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / n);
    }
    tables.set(n, t);
  }
  const x = samples.subarray(samples.length - n);
  const w = new Float32Array(n);
  for (let i = 0; i < n; i++) w[i] = x[i]! * t.win[i]!;
  // Only the lower quarter of the bins: up to about 5.5 kHz at the card rate.
  const bins = n / 4;
  const db = new Float32Array(bins);
  for (let k = 0; k < bins; k++) {
    let re = 0;
    let im = 0;
    for (let i = 0; i < n; i++) {
      const j = (i * k) % n;
      re += w[i]! * t.cos[j]!;
      im -= w[i]! * t.sin[j]!;
    }
    db[k] = dbOf((4 * Math.hypot(re, im)) / n);
  }
  return { db, binHz: rate / n };
}

/**
 * Folds bins into `count` bars as 0 to 1, each the loudest bin inside it. Bars span 0 to
 * `maxHz` evenly, or `minHz` to `maxHz` on a log scale when `minHz` is given.
 */
export function toBars(bins: Bins, count: number, maxHz: number, floor = -90, minHz = 0): Float32Array {
  const out = new Float32Array(count);
  const edge = (i: number): number => (minHz > 0 ? minHz * (maxHz / minHz) ** (i / count) : (i * maxHz) / count);
  for (let i = 0; i < count; i++) {
    const lo = Math.floor(edge(i) / bins.binHz);
    const hi = Math.max(lo, Math.ceil(edge(i + 1) / bins.binHz) - 1);
    let best = -200;
    for (let k = lo; k <= hi && k < bins.db.length; k++) best = Math.max(best, bins.db[k]!);
    out[i] = best < -190 ? 0 : dbFrac(best, floor);
  }
  return out;
}

export interface BarsCanvas {
  readonly canvas: HTMLCanvasElement;
  /** `values` 0 to 1; `colors` per bar (or one colour); `marks` are 0 to 1 positions of dashed lines. */
  draw(values: ArrayLike<number>, colors?: string | readonly string[], marks?: readonly number[]): void;
  /** Draws a line graph of -1 to 1 samples instead of bars. */
  line(samples: ArrayLike<number>, color?: string): void;
  dispose(): void;
}

/** A canvas that fills its box, for spectrum bars and wave lines. */
export function barsCanvas(parent: HTMLElement, minHeight = 0): BarsCanvas {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `display:block;width:100%;flex:1 1 auto;min-height:${minHeight}px;height:${minHeight ? `${minHeight}px` : '100%'}`;
  parent.append(canvas);
  const g = canvas.getContext('2d')!;
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
    dispose: () => ro.disconnect(),
    draw(values, colors = BLUE, marks = []) {
      fit();
      const { width: w, height: h } = canvas;
      g.clearRect(0, 0, w, h);
      const n = values.length;
      const bw = w / n;
      for (let i = 0; i < n; i++) {
        g.fillStyle = typeof colors === 'string' ? colors : (colors[i] ?? BLUE);
        const bh = Math.max(1, values[i]! * (h - 4));
        g.fillRect(i * bw + 1, h - bh, Math.max(1, bw - 2), bh);
      }
      g.strokeStyle = 'rgba(255,255,255,0.35)';
      g.setLineDash([4, 4]);
      for (const m of marks) {
        g.beginPath();
        g.moveTo(m * w, 0);
        g.lineTo(m * w, h);
        g.stroke();
      }
      g.setLineDash([]);
    },
    line(samples, color = BLUE) {
      fit();
      const { width: w, height: h } = canvas;
      g.clearRect(0, 0, w, h);
      g.strokeStyle = 'rgba(255,255,255,0.12)';
      g.beginPath();
      g.moveTo(0, h / 2);
      g.lineTo(w, h / 2);
      g.stroke();
      g.strokeStyle = color;
      g.lineWidth = Math.max(1.5, h / 90);
      g.beginPath();
      const n = samples.length;
      for (let i = 0; i < n; i++) {
        const y = h / 2 - Math.max(-1, Math.min(1, samples[i]!)) * (h / 2 - 3);
        if (i === 0) g.moveTo(0, y);
        else g.lineTo((i / (n - 1)) * w, y);
      }
      g.stroke();
    },
  };
}

/** `length` samples starting at a rising zero crossing, so a steady tone holds still on screen. */
export function stable(samples: ArrayLike<number>, length: number): Float32Array {
  const room = Math.max(0, samples.length - length);
  let start = 0;
  for (let i = 1; i < room; i++) {
    if (samples[i - 1]! <= 0 && samples[i]! > 0) {
      start = i;
      break;
    }
  }
  return Float32Array.from({ length: Math.min(length, samples.length) }, (_, i) => samples[start + i] ?? 0);
}
