// SVG helpers for examples that draw their own picture of an optimization
import type { Stage } from './stage.ts';

const NS = 'http://www.w3.org/2000/svg';

/** The inks used on the paper by the Optimization API and constraint examples. */
export const INK = {
  text: '#333',
  faint: '#c9c6bb',
  axis: '#8a877c',
  iterate: '#d6336c',
  target: '#1c7ed6',
  good: '#2f9e44',
  fixed: '#495057',
};

export type Attrs = Record<string, string | number>;

/** Creates an SVG element with attributes, appended to `parent` when given. */
export function el<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  parent?: Element,
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  parent?.append(node);
  return node;
}

/** An svg of the given viewBox, shown on the stage's paper. */
export function makeSvg(stage: Stage, w: number, h: number): SVGSVGElement {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('font-family', 'ui-monospace, monospace');
  svg.setAttribute('font-size', '11');
  return stage.show(svg);
}

export function label(parent: Element, x: number, y: number, text: string, attrs: Attrs = {}): SVGTextElement {
  const t = el('text', { x, y, fill: INK.text, ...attrs }, parent);
  t.textContent = text;
  return t;
}

/** Linear map from a domain onto a range. */
export function linear(d0: number, d1: number, r0: number, r1: number): (v: number) => number {
  return (v) => r0 + ((v - d0) / (d1 - d0 || 1)) * (r1 - r0);
}

/** A readable number for readouts: 3 decimals, tiny values in exponent form. */
export function num(v: number, digits = 2): string {
  if (!Number.isFinite(v)) return String(v);
  return Math.abs(v) < 1e-3 && v !== 0 ? v.toExponential(1) : v.toFixed(digits);
}
