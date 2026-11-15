// Helpers for UMAP and NNDescent examples: pacing, panels, overlays
import type { UMAP } from 'embedding-atlas';
import { createScatter, type Scatter } from './canvas2d.ts';
import { gauss, rng } from './data.ts';
import type { Stage } from './stage.ts';
import type { Vectors } from './vectors.ts';

/**
 * Runs `body` (which awaits umap.step() or similar) once per animation frame until the
 * stage is disposed. Errors after dispose are swallowed: destroy() can reject a step in flight.
 */
export function pace(stage: Stage, body: () => Promise<void>): void {
  void (async () => {
    while (!stage.disposed) {
      try {
        await body();
      } catch (err) {
        if (stage.disposed) return;
        throw err;
      }
      if (stage.disposed) return;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
    }
  })();
}

/** A small caption pinned to a corner of `host`. */
export function caption(host: HTMLElement, text: string, corner: 'tl' | 'tr' | 'bl' | 'br' = 'tl'): HTMLDivElement {
  const div = document.createElement('div');
  const v = corner[0] === 't' ? 'top' : 'bottom';
  const h = corner[1] === 'l' ? 'left' : 'right';
  div.style.cssText = `position:absolute;${v}:6px;${h}:8px;font:12px/1.3 ui-monospace,monospace;
    color:#c8d0e0;pointer-events:none;text-shadow:0 0 4px #0b0d12`;
  div.textContent = text;
  host.append(div);
  return div;
}

export interface Panel {
  plot: Scatter;
  /** The caption element; set `.textContent` to update it. */
  label: HTMLDivElement;
}

/** Splits the stage's view into `captions.length` equal canvases side by side. */
export function panels(stage: Stage, captions: readonly string[], host: HTMLElement = stage.view): Panel[] {
  const n = captions.length;
  const w = Math.floor(stage.width / n);
  host.style.display = 'flex';
  return captions.map((text) => {
    const cell = document.createElement('div');
    cell.style.cssText = `position:relative;width:${w}px;height:${stage.height}px;flex:none`;
    host.append(cell);
    const plot = createScatter(cell, w, stage.height);
    return { plot, label: caption(cell, text) };
  });
}

/** A progress bar inside `parent`: `set(0..1)` moves it. */
export function bar(parent: HTMLElement): (fraction: number) => void {
  const track = document.createElement('div');
  track.style.cssText = 'width:100%;max-width:520px;height:6px;border-radius:3px;background:#262b38;overflow:hidden';
  const fill = document.createElement('div');
  fill.style.cssText = 'height:100%;width:0;background:#7aa2f7';
  track.append(fill);
  parent.append(track);
  return (f) => {
    fill.style.width = `${Math.round(Math.min(1, Math.max(0, f)) * 100)}%`;
  };
}

/** Draws thin lines from each point to its first `k` neighbours, for every `every`-th point. */
export function drawLinks(
  plot: Scatter,
  xy: ArrayLike<number>,
  indices: ArrayLike<number>,
  rowLength: number,
  k: number,
  every = 1,
  color = 'rgba(255,255,255,0.18)',
): void {
  const g = plot.g;
  g.strokeStyle = color;
  g.lineWidth = 0.6;
  g.beginPath();
  const count = Math.floor(indices.length / rowLength);
  for (let i = 0; i < count; i += every) {
    const [ax, ay] = plot.toPixel(xy[i * 2]!, xy[i * 2 + 1]!);
    for (let j = 0; j < k; j++) {
      const n = indices[i * rowLength + j]!;
      if (n === i) continue;
      const [bx, by] = plot.toPixel(xy[n * 2]!, xy[n * 2 + 1]!);
      g.moveTo(ax, ay);
      g.lineTo(bx, by);
    }
  }
  g.stroke();
}

/** Rings a data point on the plot. */
export function ring(plot: Scatter, x: number, y: number, r = 7, color = '#fff'): void {
  const [px, py] = plot.toPixel(x, y);
  plot.g.strokeStyle = color;
  plot.g.lineWidth = 1.5;
  plot.g.beginPath();
  plot.g.arc(px, py, r, 0, Math.PI * 2);
  plot.g.stroke();
}

/** Scales every row by a random magnitude (log-normal), so direction and length disagree. */
export function withMagnitudes(v: Vectors, seed = 9, sigma = 0.9): Vectors {
  const r = rng(seed);
  const data = new Float32Array(v.data);
  for (let i = 0; i < v.count; i++) {
    const s = Math.exp(gauss(r) * sigma);
    for (let d = 0; d < v.dim; d++) data[i * v.dim + d]! *= s;
  }
  return { ...v, data };
}

/**
 * Draws `umap` into a fresh scatter inside `host`, stepping `per` epochs a frame until
 * `epochs` have run. Returns what `stage.variants` needs: destroying it stops and frees.
 */
export function follow(
  stage: Stage,
  host: HTMLElement,
  umap: UMAP,
  label: Uint8Array,
  note: string,
  opts: { epochs?: number; per?: number } = {},
): { destroy(): void } {
  const plot = createScatter(host, stage.width, stage.height);
  const cap = caption(host, note);
  let alive = true;
  plot.draw(umap.embedding, label);
  void (async () => {
    while (alive && !stage.disposed && umap.epoch < (opts.epochs ?? 200)) {
      try {
        await umap.step(opts.per ?? 4);
      } catch {
        return;
      }
      if (!alive) return;
      plot.draw(umap.embedding, label, { ease: 0.2 });
      cap.textContent = `${note}   epoch ${umap.epoch}`;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
    }
  })();
  return {
    destroy() {
      alive = false;
      umap.destroy();
    },
  };
}
