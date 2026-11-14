// Shared Plot mount: sizing, dark colours, card loop, controls, resize
import type { Cleanup, MountContext } from '@/types.ts';
import { controlBar } from './controls.ts';
import './plot.css';

/**
 * Plot 0.6.19 traps found while building this gallery, for whoever adds the next example:
 * - Plot sets --plot-background: white on its own svg through :where(); plot.css overrides it
 *   to the page colour, so tips and halo strokes match the dark stage.
 * - Text, axes and default mark colours are currentColor: the box sets color to --fg-1.
 * - pointer, tip and crosshair listen for pointermove on the svg and read clientX/Y; a
 *   synthetic PointerEvent with pointerType 'mouse' drives them (sweepPointer, for cards).
 * - Plot.plot() returns an svg, or a figure when it has a title, caption or legend.
 * - TypeScript: bin, binX and binY nested in a mark call infer T as `<Mark>Options | undefined`,
 *   and their Omit over that union rejects every channel but x/y. Pass the mark's options
 *   type: Plot.binX<Plot.RectYOptions>({y: 'count'}, {x: 'weight', fill: 'sex'}).
 * - An explicit `figure: false` beats title, subtitle, caption and legends (they vanish);
 *   pass `figure: undefined` for "not forced".
 * - A text mark given a data array but no x, y or frameAnchor turns its strings into an ordinal
 *   position scale and wrecks the axes: give decoration text a frameAnchor.
 * - Plot.legend types `columns` as a CSS string: pass String(n).
 * - tickFormat is typed (d, i) but Plot also passes the ticks array third; cast to use it.
 * - The scheme is PiYG (the docs write PiYg). The docs' var(--vp-c-bg) is the docs site's
 *   background: use var(--plot-background) here.
 * - Plot.autoSpec returns whole data columns inside markOptions: summarize before printing.
 *
 * Every example writes its whole Plot.plot({...}) spec in its own main.ts; this file only
 * sizes, places, re-renders and tears down what that spec returns.
 */

export interface Size {
  /** Plot's `width` option: the card's width, or the full view's (capped at 900). */
  width: number;
  /** 200 in a card; undefined in the full view, so Plot picks its own height. */
  height: number | undefined;
  preview: boolean;
}

export interface Live<S> {
  readonly state: S;
  /** Merge a patch into the state and render again. */
  set(patch: Partial<S>): void;
  /** What render() returned last. */
  root(): Element | null;
}

export interface PlotSpec<S> {
  initial: S;
  /** Builds the plot (Plot.plot(...), a legend, or any element holding them). */
  render(state: S, size: Size): Element;
  /** Card only: the next state, every `previewMs`. Without it a card replays a reveal. */
  step?(state: S, i: number): Partial<S>;
  previewMs?: number;
  /** Full view only: controls in a bar above the plot. */
  controls?(bar: HTMLElement, live: Live<S>): void;
  /** After each render, e.g. to read plot.value or start sweepPointer; returns its teardown. */
  after?(root: Element, live: Live<S>, size: Size): void | (() => void);
}

/** Renders `spec` into `el` and keeps it current; returns the mount's cleanup. */
export function mountPlot<S extends object>(el: HTMLElement, ctx: MountContext, spec: PlotSpec<S>): Cleanup {
  const { preview } = ctx;
  const bar = preview ? null : controlBar(el);
  const box = document.createElement('div');
  box.className = preview ? 'op-plot op-plot-card' : 'op-plot';
  el.append(box);

  let state = spec.initial;
  let root: Element | null = null;
  let undoAfter: (() => void) | void;
  let alive = true;
  const measure = (): Size => ({
    width: Math.max(200, Math.min(900, Math.floor(box.clientWidth || el.clientWidth || 280))),
    height: preview ? 200 : undefined,
    preview,
  });
  let size = measure();

  const draw = (): void => {
    undoAfter?.();
    const next = spec.render(state, size);
    if (root) root.replaceWith(next);
    else box.append(next);
    root = next;
    if (preview) fitCard(next);
    undoAfter = spec.after?.(next, live, size);
  };
  const live: Live<S> = {
    get state() {
      return state;
    },
    set(patch) {
      if (!alive) return;
      state = { ...state, ...patch };
      draw();
    },
    root: () => root,
  };

  draw();
  if (bar) spec.controls?.(bar, live);

  const stops: (() => void)[] = [];
  if (preview) {
    let i = 0;
    const step = spec.step;
    const timer = step
      ? setInterval(() => live.set(step(state, ++i)), spec.previewMs ?? 2400)
      : setInterval(() => reveal(root), spec.previewMs ?? 4200);
    if (!step) reveal(root);
    stops.push(() => clearInterval(timer));
  } else {
    let frame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = measure();
        if (Math.abs(next.width - size.width) < 8) return;
        size = next;
        draw();
      });
    });
    ro.observe(box);
    stops.push(() => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    });
  }

  return () => {
    alive = false;
    for (const stop of stops) stop();
    undoAfter?.();
    box.remove();
    bar?.remove();
  };
}

/** A plot with no state: one render function. Cards replay a reveal so they look alive. */
export function mountStatic(el: HTMLElement, ctx: MountContext, render: (size: Size) => Element): Cleanup {
  return mountPlot(el, ctx, { initial: {}, render: (_s, size) => render(size) });
}

/**
 * A bare svg already scales to the card through max-height (plot.css). A figure (title,
 * legend) or a div of several plots does not, and a 200px box would clip its top: scale it
 * down from the top edge so the whole thing shows.
 */
function fitCard(root: Element): void {
  if (root instanceof SVGSVGElement || !(root instanceof HTMLElement)) return;
  root.style.transform = '';
  root.style.marginBottom = '';
  const h = root.getBoundingClientRect().height;
  if (h <= 200) return;
  // A transform leaves the layout box full height; the negative margin trims it to 200px
  // so the card's centring puts the top edge at the top.
  root.style.flexShrink = '0';
  root.style.transformOrigin = 'top center';
  root.style.transform = `scale(${200 / h})`;
  root.style.marginBottom = `${200 - h}px`;
}

/** Wipes the plot in from left to right with element.animate (no CSS keyframes). */
function reveal(root: Element | null): void {
  root?.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], {
    duration: 1400,
    easing: 'cubic-bezier(.3,.7,.3,1)',
  });
}

/** The svg Plot draws marks into: the root itself, or the last svg child of a figure. */
export function plotSvg(root: Element): SVGSVGElement | null {
  if (root instanceof SVGSVGElement) return root;
  const svgs = root.querySelectorAll(':scope > svg');
  return (svgs[svgs.length - 1] as SVGSVGElement | undefined) ?? root.querySelector('svg');
}

/**
 * Moves a synthetic mouse across the plot, so pointer, tip and crosshair marks animate in
 * a card that gets no real input. `path` maps time t in [0, 1) to a point in the svg's box,
 * as fractions of its width and height. Returns the stop function.
 */
export function sweepPointer(
  root: Element,
  path: (t: number) => [number, number] = (t) => [0.08 + 0.84 * (t < 0.5 ? t * 2 : 2 - t * 2), 0.5],
  periodMs = 6000,
): () => void {
  const svg = plotSvg(root);
  if (!svg) return () => {};
  const start = performance.now();
  const fire = (type: string): void => {
    const r = svg.getBoundingClientRect();
    const [fx, fy] = path(((performance.now() - start) % periodMs) / periodMs);
    svg.dispatchEvent(
      new PointerEvent(type, { clientX: r.left + fx * r.width, clientY: r.top + fy * r.height, pointerType: 'mouse', bubbles: true }),
    );
  };
  fire('pointerenter');
  const timer = setInterval(() => fire('pointermove'), 80);
  return () => clearInterval(timer);
}
