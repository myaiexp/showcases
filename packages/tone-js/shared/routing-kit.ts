// Routing example helpers: wiring picture, level bars, position strip, dB maths
import * as Tone from 'tone';
import { CARD_RATE } from './render.ts';
import type { Stage } from './stage.ts';

export const BLUE = '#7aa2ff';
export const PINK = '#ff8fb1';
const NS = 'http://www.w3.org/2000/svg';

/** Sound rate of whatever is drawing: cards are rendered at a fixed low rate. */
export function rateOf(stage: Stage): number {
  return stage.preview ? CARD_RATE : Tone.getContext().sampleRate;
}

export interface DiagramNode {
  id: string;
  label: string;
  /** Centre, in a 400 wide picture. */
  x: number;
  y: number;
  w?: number;
}

export interface DiagramEdge {
  id: string;
  from: string;
  to: string;
  /** Starts switched off. */
  off?: boolean;
}

export interface Diagram {
  /** Draws a cable as connected (solid) or cut (dashed and faint). */
  setEdge(id: string, on: boolean): void;
  /** Lights a box briefly. */
  flash(id: string, color?: string): void;
  /** Full view: clicking a cable calls `fn` with its id. */
  onEdge(fn: (id: string) => void): void;
  setLabel(id: string, label: string): void;
}

function svg<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>): SVGElementTagNameMap[K] {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}

/** Boxes and arrows: a picture of which node feeds which. Edges are straight lines. */
export function diagram(parent: HTMLElement, nodes: readonly DiagramNode[], edges: readonly DiagramEdge[], height = 120): Diagram {
  const root = svg('svg', { viewBox: `0 0 400 ${height}`, preserveAspectRatio: 'xMidYMid meet' });
  root.style.cssText = 'display:block;width:100%;flex:1 1 auto;min-height:0;max-height:100%';
  const defs = svg('defs', {});
  const marker = svg('marker', { id: 'arr', viewBox: '0 0 8 8', refX: 7, refY: 4, markerWidth: 6, markerHeight: 6, orient: 'auto' });
  marker.append(svg('path', { d: 'M0 0 L8 4 L0 8 z', fill: 'context-stroke' }));
  defs.append(marker);
  root.append(defs);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const lines = new Map<string, SVGLineElement>();
  const hits: SVGLineElement[] = [];
  const rects = new Map<string, SVGRectElement>();
  const texts = new Map<string, SVGTextElement>();
  const width = (n: DiagramNode): number => n.w ?? 64;

  for (const e of edges) {
    const a = byId.get(e.from)!;
    const b = byId.get(e.to)!;
    // From the right edge of the first box to the left edge of the second.
    const pos = { x1: a.x + width(a) / 2, y1: a.y, x2: b.x - width(b) / 2 - 3, y2: b.y };
    const line = svg('line', { ...pos, 'stroke-width': 2, 'marker-end': 'url(#arr)' });
    const hit = svg('line', { ...pos, stroke: 'transparent', 'stroke-width': 14 });
    hit.dataset.edge = e.id;
    hit.style.pointerEvents = 'stroke';
    lines.set(e.id, line);
    hits.push(hit);
    root.append(line);
  }
  for (const n of nodes) {
    const r = svg('rect', { x: n.x - width(n) / 2, y: n.y - 11, width: width(n), height: 22, rx: 5 });
    r.style.cssText = 'fill:var(--bg-surface);stroke:var(--border);stroke-width:1.2';
    const t = svg('text', { x: n.x, y: n.y + 3.5, 'text-anchor': 'middle' });
    t.style.cssText = 'font:600 9.5px ui-monospace,monospace;fill:var(--fg-1)';
    t.textContent = n.label;
    rects.set(n.id, r);
    texts.set(n.id, t);
    root.append(r, t);
  }
  root.append(...hits);
  parent.append(root);

  const d: Diagram = {
    setEdge(id, on) {
      const l = lines.get(id);
      if (!l) return;
      l.style.stroke = on ? BLUE : 'var(--fg-3)';
      l.style.opacity = on ? '1' : '0.45';
      l.setAttribute('stroke-dasharray', on ? '' : '4 4');
    },
    flash(id, color = BLUE) {
      rects.get(id)?.animate([{ fill: color, offset: 0 }, { fill: color, offset: 0.3 }, {}], { duration: 300, easing: 'ease-out' });
    },
    onEdge(fn) {
      for (const h of hits) {
        h.style.cursor = 'pointer';
        h.addEventListener('click', () => fn(h.dataset.edge!));
      }
    },
    setLabel(id, label) {
      const t = texts.get(id);
      if (t) t.textContent = label;
    },
  };
  for (const e of edges) d.setEdge(e.id, !e.off);
  return d;
}

export interface Bar {
  /** `frac` 0 to 1 fills the bar; `text` is shown at its right. */
  set(frac: number, text?: string): void;
}

/** A labelled horizontal bar. */
export function bar(parent: HTMLElement, label: string, color = BLUE): Bar {
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;align-items:center;gap:8px;width:100%;font:600 11px/1 ui-monospace,monospace;color:var(--fg-2)';
  const name = document.createElement('span');
  name.textContent = label;
  name.style.cssText = 'min-width:2.4em';
  const track = document.createElement('div');
  track.style.cssText = 'flex:1 1 auto;height:12px;border-radius:6px;background:var(--bg-surface);border:1px solid var(--border);overflow:hidden';
  const fill = document.createElement('div');
  fill.style.cssText = `height:100%;width:0;background:${color}`;
  track.append(fill);
  const text = document.createElement('span');
  text.style.cssText = 'min-width:6.5em;text-align:right';
  row.append(name, track, text);
  parent.append(row);
  return {
    set(frac, t = '') {
      fill.style.width = `${Math.max(0, Math.min(1, frac)) * 100}%`;
      text.textContent = t;
    },
  };
}

/** A column of bars or readouts, centred in the card's visual area. */
export function column(parent: HTMLElement, gap = 8): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = `display:flex;flex-direction:column;justify-content:center;gap:${gap}px;width:100%;flex:1 1 auto;min-height:0;padding:4px 10px;box-sizing:border-box`;
  parent.append(div);
  return div;
}

/** A dot on a horizontal strip with a word at each end (pan, crossfade). `set` takes 0 to 1. */
export function strip(parent: HTMLElement, left: string, right: string): { set(frac: number): void } {
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;align-items:center;gap:8px;width:100%;font:600 11px/1 ui-monospace,monospace;color:var(--fg-2)';
  const track = document.createElement('div');
  track.style.cssText = 'position:relative;flex:1 1 auto;height:6px;border-radius:3px;background:var(--bg-surface);border:1px solid var(--border)';
  const dot = document.createElement('div');
  dot.style.cssText = `position:absolute;top:-6px;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:${BLUE};left:50%`;
  track.append(dot);
  const l = Object.assign(document.createElement('span'), { textContent: left });
  const r = Object.assign(document.createElement('span'), { textContent: right });
  row.append(l, track, r);
  parent.append(row);
  return {
    set(frac) {
      dot.style.left = `${Math.max(0, Math.min(1, frac)) * 100}%`;
    },
  };
}

export const dbOf = (amp: number): number => (amp > 1e-5 ? 20 * Math.log10(amp) : -100);
/** Maps a decibel value onto 0 to 1 between `floor` and 0 dB. */
export const dbFrac = (db: number, floor = -60): number => Math.max(0, Math.min(1, 1 - db / floor));
export const dbText = (db: number): string => (db <= -99 ? '-inf dB' : `${db.toFixed(1)} dB`);
