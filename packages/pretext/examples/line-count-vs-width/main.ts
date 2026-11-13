// Charts measureLineStats() for every width from 40 to 600 as two step charts with a cursor
import '@fontsource-variable/inter';
import { measureLineStats, prepare } from '@chenglou/pretext';
import type { LineStats } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FONT = '16px "Inter Variable"';
const MIN_W = 40;
const MAX_W = 600;
const TEXT =
  'Pretext measures this paragraph once. After that, asking how many lines it takes at a width, and how wide its widest line gets, is a cheap call that allocates no strings. AGI 春天到了. 🚀';

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, TEXT);
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const canvas = document.createElement('canvas');
  const readout = document.createElement('p');
  readout.className = 'readout';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = String(MIN_W);
  slider.max = String(MAX_W);
  slider.value = '320';
  if (preview) root.append(canvas);
  else root.append(slider, readout, canvas);
  el.append(root);

  const style = getComputedStyle(el);
  const fg = style.getPropertyValue('--fg-1').trim() || '#ddd';
  const dim = style.getPropertyValue('--fg-3').trim() || '#888';
  const accent = style.getPropertyValue('--accent').trim() || '#6af';

  // Prepare once, then sweep every width: 561 measureLineStats() calls.
  const prepared = prepare(TEXT, FONT);
  const stats: LineStats[] = [];
  for (let w = MIN_W; w <= MAX_W; w++) stats.push(measureLineStats(prepared, w));
  const maxLines = Math.max(...stats.map((s) => s.lineCount));

  const CSS_W = preview ? 250 : 560;
  const CSS_H = preview ? 170 : 300;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = CSS_W * dpr;
  canvas.height = CSS_H * dpr;
  canvas.style.width = `${CSS_W}px`;
  canvas.style.height = `${CSS_H}px`;
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const padL = 8;
  const plotW = CSS_W - padL - 8;
  const panelH = (CSS_H - 24) / 2;
  const xOf = (w: number): number => padL + ((w - MIN_W) / (MAX_W - MIN_W)) * plotW;

  const panel = (top: number, value: (s: LineStats) => number, max: number, color: string): void => {
    const yOf = (v: number): number => top + panelH - (v / max) * (panelH - 4);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    stats.forEach((s, i) => {
      const x = xOf(MIN_W + i);
      if (i === 0) ctx.moveTo(x, yOf(value(s)));
      else ctx.lineTo(x, yOf(value(s)));
    });
    ctx.stroke();
    ctx.strokeStyle = dim;
    ctx.lineWidth = 1;
    ctx.strokeRect(padL + 0.5, top + 0.5, plotW, panelH);
  };

  const draw = (width: number): void => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, CSS_W, CSS_H);
    panel(4, (s) => s.lineCount, maxLines, accent);
    panel(4 + panelH + 16, (s) => s.maxLineWidth, MAX_W, fg);
    const x = xOf(width);
    ctx.strokeStyle = accent;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, CSS_H);
    ctx.stroke();
    const s = stats[width - MIN_W];
    if (!s) return;
    ctx.fillStyle = dim;
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textBaseline = 'top';
    ctx.fillText('lineCount', padL + 4, 8);
    ctx.fillText('maxLineWidth', padL + 4, 4 + panelH + 20);
    readout.textContent = `width ${width}px → lineCount ${s.lineCount}, maxLineWidth ${s.maxLineWidth.toFixed(2)}px`;
  };

  if (preview) {
    let raf = 0;
    const tick = (t: number): void => {
      draw(Math.round(MIN_W + (MAX_W - MIN_W) * (0.5 + 0.5 * Math.sin(t / 1800))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const onInput = (): void => draw(Number(slider.value));
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;
