// Circles built from autodiff variables, with an svg view that redraws them
import { floatV, variable, vectorV, type Circle, type Num, type Var } from '@penrose/core';
import { INK, el, makeSvg } from './opt-svg.ts';
import type { Stage } from './stage.ts';

/** The part of a `Circle<Num>` the docs' constraint functions read: `.center.contents`, `.r.contents`. */
export type Disk = Pick<Circle<Num>, 'center' | 'r'>;

export interface DiskMaker {
  disk: Disk;
  /** The variables the optimizer may move; fixed parts are plain numbers. */
  vars: Var[];
  /** Starting values of `vars`, in order. */
  start: number[];
}

/** Which parts of a circle are unknowns: its centre, its radius, both or neither. */
export function makeDisk(x: number, y: number, r: number, free: { center?: boolean; radius?: boolean } = {}): DiskMaker {
  const vars: Var[] = [];
  const start: number[] = [];
  const part = (v: number, isFree: boolean | undefined): Num => {
    if (!isFree) return v;
    const created = variable(v);
    vars.push(created);
    start.push(v);
    return created;
  };
  const cx = part(x, free.center);
  const cy = part(y, free.center);
  const rr = part(r, free.radius);
  return { disk: { center: vectorV([cx, cy]), r: floatV(rr) }, vars, start };
}

const num = (n: Num, get: (v: Var) => number): number => (typeof n === 'number' ? n : get(n as Var));

export interface DiskStyle {
  fill?: string;
  stroke?: string;
  dash?: string;
  label?: string;
}

export interface DiskView {
  svg: SVGSVGElement;
  /** Layer for extra marks, drawn above the circles. Coordinates are the same as the disks'. */
  marks: SVGGElement;
  /** Svg x and y of a model point (y up, origin in the middle). */
  px: (x: number) => number;
  py: (y: number) => number;
  add(disk: Disk, style?: DiskStyle): void;
  /** Redraws every circle with the values `get` gives each variable. */
  update(get: (v: Var) => number): void;
}

/**
 * A scene of `w` × `h` pixels with y up and the origin in the middle. Model coordinates
 * are around 1 (the optimizer's first step explodes on pixel-sized numbers, see traps.md);
 * `scale` pixels make one model unit.
 */
export function diskView(stage: Stage, w: number, h: number, scale = 100): DiskView {
  const svg = makeSvg(stage, w, h);
  const px = (x: number): number => w / 2 + x * scale;
  const py = (y: number): number => h / 2 - y * scale;
  const base = el('g', {}, svg);
  const marks = el('g', {}, svg);
  const items: { disk: Disk; node: SVGCircleElement; text: SVGTextElement | null }[] = [];
  return {
    svg,
    marks,
    px,
    py,
    add(disk, style = {}) {
      const node = el(
        'circle',
        {
          fill: style.fill ?? 'rgb(28 126 214 / 0.16)',
          stroke: style.stroke ?? INK.target,
          'stroke-width': 2,
          ...(style.dash ? { 'stroke-dasharray': style.dash } : {}),
        },
        base,
      );
      let text: SVGTextElement | null = null;
      if (style.label) {
        text = el('text', { 'text-anchor': 'middle', 'dominant-baseline': 'middle', fill: INK.text, 'font-size': 12 }, base);
        text.textContent = style.label;
      }
      items.push({ disk, node, text });
    },
    update(get) {
      for (const { disk, node, text } of items) {
        const [x, y] = disk.center.contents.map((c) => num(c, get)) as [number, number];
        node.setAttribute('cx', px(x).toFixed(1));
        node.setAttribute('cy', py(y).toFixed(1));
        node.setAttribute('r', (Math.max(0, num(disk.r.contents, get)) * scale).toFixed(1));
        text?.setAttribute('x', px(x).toFixed(1));
        text?.setAttribute('y', py(y).toFixed(1));
      }
    },
  };
}

/** Reads a variable's value from a Run: the Run's own, else the start it was given (frozen ones). */
export function reader(run: { vals: Map<Var, number> }, init: Map<Var, number>): (v: Var) => number {
  return (v) => run.vals.get(v) ?? init.get(v) ?? v.val;
}
