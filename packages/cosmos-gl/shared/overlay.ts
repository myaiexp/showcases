// HTML label layer, SVG marks and a frame loop over the graph
import type { Stage } from './stage.ts';

export interface Tag {
  /** Position in px from the graph box's top-left corner. */
  x: number;
  y: number;
  text: string;
  /** Rotation in radians (0 = right, clockwise), for link labels. */
  angle?: number;
  color?: string;
  /** px to lift the label off its anchor, perpendicular to its rotation (default 12). */
  offset?: number;
}

export interface Overlay {
  readonly el: HTMLDivElement;
  /** Shows exactly these tags, reusing elements by key and removing the rest. */
  show(tags: Iterable<[number | string, Tag]>): void;
  clear(): void;
}

/** A pointer-transparent layer inside `stage.div`; gone when the stage is disposed. */
export function overlay(stage: Stage): Overlay {
  const el = document.createElement('div');
  el.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1';
  stage.div.append(el);
  const live = new Map<number | string, HTMLDivElement>();
  const fontSize = stage.preview ? '9px' : '11px';
  const api: Overlay = {
    el,
    show(tags) {
      const seen = new Set<number | string>();
      for (const [key, t] of tags) {
        seen.add(key);
        let d = live.get(key);
        if (!d) {
          d = document.createElement('div');
          d.style.cssText = `position:absolute;left:0;top:0;padding:1px 4px;border-radius:3px;font:${fontSize}/1.2 monospace;white-space:nowrap;background:rgb(0 0 0 / 0.6);color:#fff`;
          el.append(d);
          live.set(key, d);
        }
        if (d.textContent !== t.text) d.textContent = t.text;
        d.style.color = t.color ?? '#fff';
        d.style.transform = `translate(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px) rotate(${(t.angle ?? 0).toFixed(3)}rad) translate(-50%, -50%) translateY(${-(t.offset ?? 12)}px)`;
      }
      for (const [key, d] of live) {
        if (!seen.has(key)) {
          d.remove();
          live.delete(key);
        }
      }
    },
    clear: () => api.show([]),
  };
  stage.onDispose(() => el.remove());
  return api;
}

/** Calls `fn(time)` every animation frame until the stage is disposed. */
export function frames(stage: Stage, fn: (time: number) => void): void {
  let id = 0;
  const loop = (t: number): void => {
    if (stage.disposed) return;
    fn(t);
    id = requestAnimationFrame(loop);
  };
  id = requestAnimationFrame(loop);
  stage.onDispose(() => cancelAnimationFrame(id));
}

export interface Marks {
  /** Draws a ring (or a short tick turned by `angle`) at each position, px in the graph box. */
  show(items: readonly { x: number; y: number; angle?: number }[], kind: 'ring' | 'tick', radius?: number): void;
}

/** An SVG layer of rings or ticks, for marking points or links; removed on dispose. */
export function marks(stage: Stage): Marks {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1';
  stage.div.append(svg);
  stage.onDispose(() => svg.remove());
  let kindNow = '';
  return {
    show(items, kind, radius = 9) {
      if (kind !== kindNow) {
        svg.replaceChildren();
        kindNow = kind;
      }
      while (svg.childElementCount > items.length) svg.lastElementChild?.remove();
      while (svg.childElementCount < items.length) {
        const m = document.createElementNS(ns, kind === 'ring' ? 'circle' : 'line');
        m.setAttribute('fill', 'none');
        m.setAttribute('stroke', '#ffd84d');
        m.setAttribute('stroke-width', '1.5');
        svg.append(m);
      }
      items.forEach((it, i) => {
        const m = svg.children[i];
        if (!m) return;
        if (kind === 'ring') {
          m.setAttribute('cx', it.x.toFixed(1));
          m.setAttribute('cy', it.y.toFixed(1));
          m.setAttribute('r', String(radius));
        } else {
          const a = it.angle ?? 0;
          const dx = Math.cos(a) * radius;
          const dy = Math.sin(a) * radius;
          m.setAttribute('x1', (it.x - dx).toFixed(1));
          m.setAttribute('y1', (it.y - dy).toFixed(1));
          m.setAttribute('x2', (it.x + dx).toFixed(1));
          m.setAttribute('y2', (it.y + dy).toFixed(1));
        }
      });
    },
  };
}
