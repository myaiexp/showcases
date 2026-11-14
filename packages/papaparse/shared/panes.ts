// Before → after layout: input pane, an arrow naming the call, output pane
import type { Stage } from './stage.ts';

export interface Pane {
  el: HTMLElement;
  title: HTMLElement;
  body: HTMLElement;
  /** Replaces the pane's content. */
  show(...nodes: (Node | string)[]): void;
}

export function pane(title: string, cls = ''): Pane {
  const el = document.createElement('section');
  el.className = `pp-pane ${cls}`.trim();
  const t = document.createElement('div');
  t.className = 'pp-pane-title';
  t.textContent = title;
  const body = document.createElement('div');
  body.className = 'pp-pane-body';
  el.append(t, body);
  return { el, title: t, body, show: (...nodes) => body.replaceChildren(...nodes) };
}

export interface Flow {
  from: Pane;
  to: Pane;
  /** The arrow's label: set its text to the call that turns `from` into `to`. */
  via: HTMLElement;
}

export interface FlowOptions {
  from: string;
  via: string;
  to: string;
  /** 'column' stacks the panes (the card default), 'row' puts them side by side. */
  dir?: 'row' | 'column';
  /** Most of the height (column) or the share of the width (row) the input pane gets. Default 0.4. */
  split?: number;
}

/** Builds the two panes and the arrow between them in the stage's scene. */
export function flow(stage: Stage, opts: FlowOptions): Flow {
  const dir = opts.dir ?? (stage.preview ? 'column' : 'row');
  const box = document.createElement('div');
  box.className = `pp-flow pp-flow-${dir}`;
  const split = opts.split ?? 0.4;
  box.style.setProperty('--pp-split', `${split}fr`);
  box.style.setProperty('--pp-rest', `${1 - split}fr`);
  box.style.setProperty('--pp-split-pct', `${split * 100}%`);
  const from = pane(opts.from, 'pp-from');
  const to = pane(opts.to, 'pp-to');
  const via = document.createElement('div');
  via.className = 'pp-via';
  via.textContent = opts.via;
  box.append(from.el, via, to.el);
  stage.root.append(box);
  return { from, to, via };
}

/** Flashes an element (a changed cell, a new row) once. */
export function flash(el: Element, color = 'var(--accent)'): void {
  el.animate(
    [{ boxShadow: `inset 0 0 0 2px ${color}` }, { boxShadow: 'inset 0 0 0 2px transparent' }],
    { duration: 900, easing: 'ease-out' },
  );
}

/** Fades the rows of a freshly drawn table in one after another. */
export function revealRows(root: Element, stagger = 70): void {
  root.querySelectorAll('tbody tr').forEach((tr, i) => {
    tr.animate([{ opacity: 0, transform: 'translateX(-6px)' }, { opacity: 1, transform: 'none' }], {
      duration: 260,
      delay: i * stagger,
      fill: 'backwards',
      easing: 'ease-out',
    });
  });
}
