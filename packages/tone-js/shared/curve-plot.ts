// Canvas line plot for envelope shapes and filter responses, with a moving dot
import * as Tone from 'tone';
import type { Stage } from './stage.ts';

export interface Line {
  /** Heights, in the plot's y units. */
  y: ArrayLike<number>;
  /** Positions in 0..1 (defaults to evenly spread). */
  x?: ArrayLike<number>;
  color?: string;
  /** Draw dashed, for a comparison line. */
  dashed?: boolean;
}

export interface PlotOptions {
  /** The y value at the bottom and the top of the plot. */
  yMin: number;
  yMax: number;
  /** y values that get a faint horizontal guide. */
  guides?: readonly number[];
  /** Short texts placed along the bottom edge: x in 0..1. */
  ticks?: readonly { x: number; text: string }[];
  /** Texts for the top-left and bottom-left corners. */
  corner?: { top?: string; bottom?: string };
}

export interface Plot {
  readonly el: HTMLElement;
  /** Replaces the lines (the first one carries the dot). */
  set(lines: readonly Line[]): void;
  /** Redraws; `dotX` (0..1) puts a dot on the first line at that position. */
  render(dotX?: number): void;
}

const LINE = '#7aa2ff';
const DOT = '#ffb454';
const GRID = 'rgba(140,150,170,0.28)';
const TEXT = 'rgba(160,170,190,0.9)';

/** A canvas that fills the space it is given; it resizes itself on each draw. */
export function plot(stage: Stage, opts: PlotOptions): Plot {
  const wrap = document.createElement('div');
  wrap.style.cssText =
    `position:relative;flex:1 1 auto;min-height:${stage.preview ? 36 : 130}px;width:100%;border:1px solid var(--border);border-radius:6px;background:var(--bg-surface);overflow:hidden`;
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  wrap.append(canvas);
  stage.visual.append(wrap);
  let lines: readonly Line[] = [];

  const render = (dotX?: number): void => {
    const w = Math.max(2, Math.round(wrap.clientWidth));
    const h = Math.max(2, Math.round(wrap.clientHeight));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const c = canvas.getContext('2d');
    if (!c) return;
    c.clearRect(0, 0, w, h);
    const px = (x: number): number => 4 + x * (w - 8);
    const py = (y: number): number => 4 + (1 - (y - opts.yMin) / (opts.yMax - opts.yMin)) * (h - 8);
    c.lineWidth = 1;
    c.strokeStyle = GRID;
    for (const g of opts.guides ?? []) {
      c.beginPath();
      c.moveTo(0, py(g));
      c.lineTo(w, py(g));
      c.stroke();
    }
    c.font = '10px ui-monospace,monospace';
    c.fillStyle = TEXT;
    for (const t of opts.ticks ?? []) {
      c.beginPath();
      c.moveTo(px(t.x), 0);
      c.lineTo(px(t.x), h);
      c.stroke();
      c.fillText(t.text, px(t.x) + 3, h - 4);
    }
    if (opts.corner?.top) c.fillText(opts.corner.top, 6, 12);
    if (opts.corner?.bottom) c.fillText(opts.corner.bottom, 6, h - 16);
    lines.forEach((line, k) => {
      const n = line.y.length;
      if (!n) return;
      c.beginPath();
      c.lineWidth = k === 0 ? 2 : 1.5;
      c.strokeStyle = line.color ?? (k === 0 ? LINE : TEXT);
      c.setLineDash(line.dashed ? [4, 3] : []);
      for (let i = 0; i < n; i++) {
        const x = px(line.x ? line.x[i]! : n > 1 ? i / (n - 1) : 0);
        const y = py(Math.min(opts.yMax, Math.max(opts.yMin, line.y[i]!)));
        if (i === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      c.stroke();
    });
    c.setLineDash([]);
    const first = lines[0];
    if (dotX !== undefined && first && first.y.length) {
      const i = Math.round(Math.min(1, Math.max(0, dotX)) * (first.y.length - 1));
      const x = px(first.x ? first.x[i]! : first.y.length > 1 ? i / (first.y.length - 1) : 0);
      const y = py(Math.min(opts.yMax, Math.max(opts.yMin, first.y[i]!)));
      c.fillStyle = DOT;
      c.beginPath();
      c.arc(x, y, 5, 0, Math.PI * 2);
      c.fill();
    }
  };

  return {
    el: wrap,
    set(next) {
      lines = next;
      render();
    },
    render,
  };
}

const LOW = 20;
const HIGH = 20000;
const SPAN = Math.log10(HIGH / LOW);

/** Where a frequency sits on a log axis from 20 Hz to 20 kHz, 0..1. */
export function freqX(hz: number): number {
  return Math.log10(Math.max(LOW, hz) / LOW) / SPAN;
}

/** Tick marks for a frequency plot. */
export const FREQ_TICKS = [100, 1000, 10000].map((f) => ({ x: freqX(f), text: f >= 1000 ? `${f / 1000}k` : `${f}` }));

/** Options for a frequency-response plot: dB from -60 to +24. */
export const RESPONSE_PLOT: PlotOptions = { yMin: -60, yMax: 24, guides: [0], ticks: FREQ_TICKS, corner: { top: '+24 dB', bottom: '-60 dB' } };

/**
 * Turns the magnitudes of a filter's getFrequencyResponse() (which samples 20 Hz to 20 kHz
 * on a squared scale) into a line in dB on a log frequency axis.
 */
export function responseLine(mags: ArrayLike<number>, opts: Partial<Line> = {}): Line {
  const n = mags.length;
  const x = new Float32Array(n);
  const y = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    x[i] = freqX(Math.pow(i / n, 2) * (HIGH - LOW) + LOW);
    y[i] = 20 * Math.log10(Math.max(mags[i]!, 1e-4));
  }
  return { x, y, ...opts };
}

/** Response of a plain biquad at any setting: call from frames, after the audio is built. */
export function biquadResponse(type: BiquadFilterType, frequency: number, Q: number, gain = 0, len = 96): Line {
  const node = Tone.getContext().createBiquadFilter();
  node.type = type;
  node.frequency.value = frequency;
  node.Q.value = Q;
  node.gain.value = gain;
  const hz = new Float32Array(len).map((_, i) => Math.pow(i / len, 2) * (HIGH - LOW) + LOW);
  const mag = new Float32Array(len);
  node.getFrequencyResponse(hz, mag, new Float32Array(len));
  return responseLine(mag);
}

/**
 * Cards only: after fxSpec() has added its signal-flow picture, hides the row of boxes and
 * shrinks the caption, so a plot above it gets the room. The full view keeps the picture.
 */
export function compactFlow(stage: Stage): void {
  if (!stage.preview) return;
  const wrap = stage.visual.lastElementChild as HTMLElement | null;
  const [row, caption] = [wrap?.children[0], wrap?.children[1]] as (HTMLElement | undefined)[];
  if (wrap) wrap.style.cssText += ';flex:0 0 auto;gap:4px;padding:0';
  if (row) row.style.display = 'none';
  if (caption) caption.style.fontSize = '12px';
  const track = wrap?.children[2] as HTMLElement | undefined;
  if (track) track.style.height = '12px';
}
