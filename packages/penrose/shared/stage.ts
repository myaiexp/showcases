// Shared Penrose stage: paper, caption, controls, side panel, timers, cleanup
//
// Traps are listed in shared/traps.md: read it before building an example, and add to it.
import { isPenroseError, showError, toSVG, type PenroseState } from '@penrose/core';
import type { MountContext } from '@/types.ts';
import { resolveImage } from './images.ts';
import './stage.css';

export type Tone = 'ok' | 'warn' | 'bad' | 'info';

/** Rejection reason for waits cut short by disposal; callers ignore it. */
export const STOPPED: unique symbol = Symbol('penrose stage stopped');

export interface StageOptions {
  /** One line under the diagram in the full view, such as "Drag a point". */
  hint?: string;
  /** Tallest the paper may grow in the full view, px. Default 560. */
  maxHeight?: number;
}

export interface Stage {
  preview: boolean;
  signal: AbortSignal;
  readonly disposed: boolean;
  /** Row the paper sits in; side panels go here. */
  root: HTMLElement;
  /** The light "paper" diagrams are drawn on. */
  paper: HTMLElement;
  /** Control bar above the scene, or null in a card. */
  bar: HTMLElement | null;
  /** Renders a state with toSVG (this stage's namespace and image resolver) onto the paper. */
  render(state: PenroseState): Promise<SVGSVGElement | null>;
  /** Puts an svg on the paper, scaled to fit. */
  show(svg: SVGSVGElement): SVGSVGElement;
  /** Sets the plain-English line under the diagram. */
  say(text: string, tone?: Tone): void;
  /** Says what went wrong: a PenroseError through showError, anything else as text. */
  fail(err: unknown): void;
  /** A labelled panel beside the paper in the full view, or null in a card. */
  side(title: string): HTMLElement | null;
  button(label: string, onClick: () => void): HTMLButtonElement | null;
  select(label: string, options: readonly (string | [value: string, text: string])[], value: string, onChange: (v: string) => void): HTMLSelectElement | null;
  toggle(label: string, value: boolean, onChange: (v: boolean) => void): HTMLInputElement | null;
  slider(label: string, min: number, max: number, step: number, value: number, onInput: (v: number) => void): HTMLInputElement | null;
  every(ms: number, fn: () => void): void;
  after(ms: number, fn: () => void): void;
  /** Resolves after `ms`, or rejects with STOPPED when the stage is disposed first. */
  wait(ms: number): Promise<void>;
  onDispose(fn: () => void): void;
  dispose(): void;
}

/** Readable text for anything a Penrose call can fail with. */
export function errorText(err: unknown): string {
  if (isPenroseError(err)) return showError(err);
  return err instanceof Error ? err.message : String(err);
}

let nextNamespace = 0;

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  // toSVG prefixes ids (markers, clip paths) with this, so diagrams on one page never share them.
  const namespace = `pr${++nextNamespace}`;
  const wrap = document.createElement('div');
  wrap.className = preview ? 'pr-wrap pr-card' : 'pr-wrap pr-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'pr-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'pr-scene';
  const paper = document.createElement('div');
  paper.className = 'pr-paper';
  root.append(paper);
  const caption = document.createElement('div');
  caption.className = 'pr-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'pr-hint';
    hint.textContent = opts.hint;
    wrap.append(hint);
  }
  el.append(wrap);

  const abort = new AbortController();
  const timers = new Set<number>();
  const waiters = new Set<(reason: unknown) => void>();
  const cleanups: (() => void)[] = [];
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });

  // In the full view the paper takes the canvas's shape: as wide as the scene allows,
  // as tall as that width implies, never past maxHeight.
  const fit = (svg: SVGSVGElement): void => {
    if (preview) return;
    const box = svg.viewBox.baseVal;
    if (!box || !box.width || !box.height) return;
    const room = paper.clientWidth || 560;
    const tall = Math.min(opts.maxHeight ?? 560, (room * box.height) / box.width);
    paper.style.height = `${Math.max(200, Math.round(tall))}px`;
  };

  const control = <T extends HTMLElement>(label: string, input: T): T => {
    const l = document.createElement('label');
    l.append(`${label} `, input);
    bar!.append(l);
    return input;
  };

  const stage: Stage = {
    preview,
    signal: abort.signal,
    get disposed() {
      return abort.signal.aborted;
    },
    root,
    paper,
    bar,
    async render(state) {
      const svg = await toSVG(state, resolveImage, namespace);
      return stage.disposed ? null : stage.show(svg);
    },
    show(svg) {
      svg.classList.add('pr-svg');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      const old = paper.querySelector(':scope > svg');
      if (old) old.replaceWith(svg);
      else paper.prepend(svg);
      fit(svg);
      return svg;
    },
    say(text, tone = 'info') {
      caption.textContent = text;
      caption.dataset['tone'] = tone;
    },
    fail(err) {
      if (err === STOPPED || stage.disposed) return;
      stage.say(errorText(err), 'bad');
    },
    side(title) {
      if (preview) return null;
      const panel = document.createElement('div');
      panel.className = 'pr-side';
      const head = document.createElement('div');
      head.className = 'pr-side-title';
      head.textContent = title;
      const body = document.createElement('div');
      panel.append(head, body);
      root.append(panel);
      return body;
    },
    button(label, onClick) {
      if (!bar) return null;
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.addEventListener('click', onClick, { signal: abort.signal });
      bar.append(b);
      return b;
    },
    select(label, options, value, onChange) {
      if (!bar) return null;
      const sel = document.createElement('select');
      for (const o of options) {
        const [v, t] = typeof o === 'string' ? [o, o] : o;
        sel.append(new Option(t, v));
      }
      sel.value = value;
      sel.addEventListener('change', () => onChange(sel.value), { signal: abort.signal });
      return control(label, sel);
    },
    toggle(label, value, onChange) {
      if (!bar) return null;
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = value;
      box.addEventListener('change', () => onChange(box.checked), { signal: abort.signal });
      return control(label, box);
    },
    slider(label, min, max, step, value, onInput) {
      if (!bar) return null;
      const input = document.createElement('input');
      input.type = 'range';
      Object.assign(input, { min: String(min), max: String(max), step: String(step), value: String(value) });
      const out = document.createElement('output');
      out.textContent = String(value);
      input.addEventListener(
        'input',
        () => {
          out.textContent = input.value;
          onInput(Number(input.value));
        },
        { signal: abort.signal },
      );
      control(label, input).after(out);
      return input;
    },
    every(ms, fn) {
      if (stage.disposed) return;
      const id = window.setInterval(() => {
        if (!stage.disposed) fn();
      }, ms);
      cleanups.push(() => clearInterval(id));
    },
    after(ms, fn) {
      if (stage.disposed) return;
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (!stage.disposed) fn();
      }, ms);
      timers.add(id);
    },
    wait(ms) {
      return new Promise<void>((resolve, reject) => {
        if (stage.disposed) {
          reject(STOPPED);
          return;
        }
        const id = window.setTimeout(() => {
          timers.delete(id);
          waiters.delete(reject);
          resolve();
        }, ms);
        timers.add(id);
        waiters.add(reject);
      });
    },
    onDispose(fn) {
      cleanups.push(fn);
    },
    dispose() {
      if (stage.disposed) return;
      abort.abort();
      for (const id of timers) clearTimeout(id);
      for (const reject of waiters) reject(STOPPED);
      timers.clear();
      waiters.clear();
      for (const fn of cleanups.reverse()) {
        try {
          fn();
        } catch (err) {
          console.error('penrose stage cleanup failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}
