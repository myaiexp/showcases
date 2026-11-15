// An overlay of data-coordinate grid lines and tick labels that follow zoom
import { EmbeddingView, type OverlayProxy } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';

const SVG = 'http://www.w3.org/2000/svg';

/** A "nice" tick step (1, 2 or 5 × 10^n) for a span of data units. */
function niceStep(span: number): number {
  const raw = span / 6;
  const p = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 5, 10].map((m) => m * p).find((s) => s >= raw)!;
}

class Grid {
  private svg = document.createElementNS(SVG, 'svg');
  constructor(target: HTMLDivElement, props: { proxy: OverlayProxy }) {
    this.svg.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none';
    target.append(this.svg);
    this.update(props);
  }
  update({ proxy }: { proxy: OverlayProxy }): void {
    const { width, height } = proxy;
    this.svg.setAttribute('width', String(width));
    this.svg.setAttribute('height', String(height));
    // Invert the projection from two known points to find which data range is on screen.
    const a = proxy.location(0, 0), b = proxy.location(1, 1);
    const ux = b.x - a.x, uy = b.y - a.y;
    const x0 = -a.x / ux, x1 = (width - a.x) / ux;
    const y0 = (height - a.y) / uy, y1 = -a.y / uy;
    const step = niceStep(Math.abs(x1 - x0));
    const marks: SVGElement[] = [];
    const line = (x1p: number, y1p: number, x2p: number, y2p: number, label: string, lx: number, ly: number): void => {
      const l = document.createElementNS(SVG, 'line');
      Object.entries({ x1: x1p, y1: y1p, x2: x2p, y2: y2p, stroke: '#64748b', 'stroke-opacity': '0.35' }).forEach(([k, v]) => l.setAttribute(k, String(v)));
      const t = document.createElementNS(SVG, 'text');
      Object.entries({ x: lx, y: ly, fill: '#94a3b8', 'font-size': '10', 'font-family': 'ui-monospace,monospace' }).forEach(([k, v]) => t.setAttribute(k, String(v)));
      t.textContent = label;
      marks.push(l, t);
    };
    for (let v = Math.ceil(Math.min(x0, x1) / step) * step; v <= Math.max(x0, x1); v += step) {
      const px = proxy.location(v, 0).x;
      line(px, 0, px, height, +v.toFixed(6) + '', px + 3, 12);
    }
    for (let v = Math.ceil(Math.min(y0, y1) / step) * step; v <= Math.max(y0, y1); v += step) {
      const py = proxy.location(0, v).y;
      line(0, py, width, py, +v.toFixed(6) + '', 3, py - 3);
    }
    this.svg.replaceChildren(...marks);
  }
  destroy(): void {
    this.svg.remove();
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in: the grid refines to finer steps.' });
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    customOverlay: Grid,
  });
  stage.own(view);

  if (stage.preview) stage.loop((_, t) => view.update({ viewportState: { x: 1, y: 1, scale: 0.08 * 2 ** (2.5 * Math.sin(t / 2) ** 2) } }));
  return stage.dispose;
};

export default mount;
