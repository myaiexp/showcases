// A small 2D chart panel for the Utilities examples: bars, labels, a control bar, no WebGL
import type { MountContext } from '@/types.ts';
import { controlBar } from './controls.ts';

/** Anything with a 2D context and a size: a Panel, or a canvas overlaid on a stage. */
export interface Surface {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

export interface Panel extends Surface {
  /** Control bar under the chart, or null in a card. */
  bar: HTMLDivElement | null;
  preview: boolean;
  /** Runs `draw` now and after every resize. */
  draw(draw: () => void): void;
  /** Calls `fn(t)` every animation frame (seconds since start) until dispose. */
  run(fn: (t: number) => void): void;
  every(ms: number, fn: () => void): void;
  dispose(): void;
}

export function chartPanel(el: HTMLElement, mountCtx: MountContext): Panel {
  const preview = mountCtx.preview;
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;flex-direction:column;width:100%';
  el.append(box);
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `display:block;width:100%;height:${preview ? 200 : 360}px;background:#10131a`;
  box.append(canvas);
  const ctx = canvas.getContext('2d')!;
  const bar = preview ? null : controlBar(box);

  let redraw = (): void => {};
  const cleanups: (() => void)[] = [];
  const panel: Panel = { ctx, width: 0, height: 0, bar, preview, draw, run, every, dispose };

  const resize = (): void => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    panel.width = canvas.clientWidth;
    panel.height = canvas.clientHeight;
    if (panel.width === 0) return;
    canvas.width = Math.round(panel.width * dpr);
    canvas.height = Math.round(panel.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  function draw(fn: () => void): void {
    redraw = fn;
    resize();
  }
  function run(fn: (t: number) => void): void {
    let id = 0;
    let start = -1;
    const tick = (ms: number): void => {
      if (start < 0) start = ms;
      fn((ms - start) / 1000);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    cleanups.push(() => cancelAnimationFrame(id));
  }
  function every(ms: number, fn: () => void): void {
    const id = setInterval(fn, ms);
    cleanups.push(() => clearInterval(id));
  }
  function dispose(): void {
    observer.disconnect();
    for (const fn of cleanups.splice(0)) fn();
    box.remove();
  }
  return panel;
}

/** A fixed-size chart canvas pinned to the bottom-right of a stage, for charts beside a 3D view. */
export function cornerChart(parent: HTMLElement, width = 280, height = 120): Surface {
  const canvas = document.createElement('canvas');
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.cssText = `position:absolute;right:8px;bottom:8px;width:${width}px;height:${height}px;border-radius:6px;pointer-events:none`;
  parent.append(canvas);
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(2, 0, 0, 2, 0, 0);
  return { ctx, width, height };
}

export interface Bar {
  /** Position along the x axis, in the chart's x units. */
  x: number;
  /** Bar height in the chart's value units. */
  value: number;
}

export interface Axes {
  left: number;
  top: number;
  width: number;
  height: number;
  xMin: number;
  xMax: number;
  vMax: number;
}

/** Clears the surface, draws a baseline and returns the plot area. */
export function plotArea(s: Surface, xMin: number, xMax: number, vMax: number, left = 12, bottom = 26): Axes {
  const { ctx, width, height } = s;
  ctx.fillStyle = '#10131aee';
  ctx.fillRect(0, 0, width, height);
  const area = { left, top: 22, width: width - left - 12, height: height - 22 - bottom, xMin, xMax, vMax };
  ctx.strokeStyle = '#3a4152';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(area.left, area.top + area.height + 0.5);
  ctx.lineTo(area.left + area.width, area.top + area.height + 0.5);
  ctx.stroke();
  return area;
}

export function drawBars(s: Surface, a: Axes, bars: Bar[], color: string, thickness = 0): void {
  const unit = a.width / (a.xMax - a.xMin);
  const w = thickness > 0 ? thickness : Math.max(1, Math.min(unit * 0.8, 16));
  s.ctx.fillStyle = color;
  for (const b of bars) {
    const h = Math.min(b.value / a.vMax, 1) * a.height;
    s.ctx.fillRect(a.left + (b.x - a.xMin) * unit - w / 2, a.top + a.height - h, w, h);
  }
}

export function drawLabel(s: Surface, text: string, x: number, y: number, color = '#cdd6e4', align: CanvasTextAlign = 'left'): void {
  s.ctx.fillStyle = color;
  s.ctx.font = '11px ui-monospace, monospace';
  s.ctx.textAlign = align;
  s.ctx.fillText(text, x, y);
}

/** Tick labels along the x axis at every `step`. */
export function drawXTicks(s: Surface, a: Axes, step: number): void {
  const unit = a.width / (a.xMax - a.xMin);
  for (let v = Math.ceil(a.xMin / step) * step; v <= a.xMax; v += step) {
    drawLabel(s, String(v), a.left + (v - a.xMin) * unit, a.top + a.height + 14, '#8b94a8', 'center');
  }
}
