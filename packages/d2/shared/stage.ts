// Shared D2 stage: diagram box, caption, control bar, side panel, timers, cleanup
//
// Traps found while building the gallery (add to this list):
// - Never `new D2()` in an example: each instance starts a worker and unpacks a 22 MB WASM.
//   stage.d2() hands out the page's one engine (shared/engine.ts), which runs calls one at a
//   time, because D2.js keeps a single pending promise and two calls in flight cross answers.
// - Compile options win over the source's `vars.d2-config` (themeID 200 beats theme-id: 4),
//   so an example about d2-config passes no option that config sets.
// - The npm build is D2 v0.7.0-HEAD (d2.version()). TALA is not in it ("layout option 'tala'
//   not recognized"): layout is 'dagre' (default) or 'elk'. Features from the 0.7.1+ release
//   notes may be missing: check each one against the WASM.
// - `target: '*'` (or 'x.*') throws unless animateInterval > 0: multi-board output exists only
//   as an animated SVG. A single board ('layers.x', 'steps.2') renders on its own.
// - The CLI-only d2-config keys (animate-interval, target) are "not a valid config" here; the
//   valid ones are the options also in RenderOptions/CompileOptions (theme-id, sketch, pad,
//   center, layout-engine, theme-overrides, dark-theme-id, dark-theme-overrides).
// - Board links render as relative hrefs ("root.layers.x"). shared/svg.ts stops their clicks
//   and hands the board path to `onBoardLink`; plain https links open in a new tab.
// - Theme 0 (the default) is light and paints its own white background rect. Examples pass
//   `themeID: 200` (Dark Mauve, the dark theme themes.md names) unless the theme is the point.
// - index.d.ts types compile(text, options) as taking `{ options }`; the code and README take the
//   CompileOptions directly (compile('x -> y', { sketch: true })). D2Api types it the README's way.
//   CompileRequest's `options` is required in the types: pass `options: {}` with an fs.
// - Errors reject with the compiler's error list as JSON text; shared/errors.ts reads it.
// - Icons: no remote URLs (cards must not fetch). D2 takes a data: URL as icon (shared/icons.ts),
//   but only quoted: `icon: "${icons.x}"`. Unquoted, its `;` ends the statement, so "base64,…"
//   becomes a stray shape, or an error ("image shapes cannot have children").
// - Reserved keywords cannot be connection ends: the docs' `a--shape` fails ("reserved keywords
//   are prohibited in edges").
// - circle and square with unequal width and height are rejected ("width and height must be
//   equal"); the docs say the larger value wins, which is 0.9 behaviour.
// - Custom fonts do nothing here: fontRegular etc. (as a number array or base64; a Uint8Array
//   fails as "invalid JSON input") set diagram.fontFamily to "custom", but the SVG still embeds
//   Source Sans Pro. The Fonts page has no example for that reason.
import type { MountContext } from '@/types.ts';
import { loadD2, STOPPED, type D2Api } from './engine.ts';
import { d2ErrorText } from './errors.ts';
import { putSvg, svgSize, type LinkHandlers } from './svg.ts';
import './stage.css';

export { STOPPED } from './engine.ts';
export type Tone = 'ok' | 'warn' | 'bad' | 'info';

export interface StageOptions {
  /** One line under the diagram in the full view, such as "Click a shape". */
  hint?: string;
  /** Tallest the diagram may grow in the full view, px. Default 620. */
  maxHeight?: number;
}

export interface Stage {
  preview: boolean;
  signal: AbortSignal;
  readonly disposed: boolean;
  /** Row the diagram box sits in; side panels go here. */
  root: HTMLElement;
  /** The box diagrams are drawn into. */
  box: HTMLElement;
  /** Control bar above the scene, or null in a card. */
  bar: HTMLElement | null;
  /** The page's D2 engine. Calls made after this stage is disposed are dropped. */
  d2(): Promise<D2Api>;
  /** Draws a rendered SVG into the box, sized to fit unless `raw`. Returns the svg element. */
  show(svg: string, links?: LinkHandlers): SVGSVGElement;
  /** Shows text output (an ASCII render) in the box as preformatted text. */
  showText(text: string): HTMLPreElement;
  /** Sets the plain-English line under the diagram. */
  say(text: string, tone?: Tone): void;
  /** Says what went wrong, D2's error list made readable. Ignores errors from disposal. */
  fail(err: unknown): void;
  /** A labelled panel beside the diagram in the full view, or null in a card. */
  side(title: string): HTMLElement | null;
  button(label: string, onClick: () => void): HTMLButtonElement | null;
  select(label: string, options: readonly (string | [value: string, text: string])[], value: string, onChange: (v: string) => void): HTMLSelectElement | null;
  toggle(label: string, value: boolean, onChange: (v: boolean) => void): HTMLInputElement | null;
  every(ms: number, fn: () => void): void;
  after(ms: number, fn: () => void): void;
  /** Resolves after `ms`, or rejects with STOPPED when the stage is disposed first. */
  wait(ms: number): Promise<void>;
  onDispose(fn: () => void): void;
  dispose(): void;
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const wrap = document.createElement('div');
  wrap.className = preview ? 'dd-wrap dd-card' : 'dd-wrap dd-full';
  const bar = preview ? null : document.createElement('div');
  if (bar) {
    bar.className = 'dd-bar';
    wrap.append(bar);
  }
  const root = document.createElement('div');
  root.className = 'dd-scene';
  const box = document.createElement('div');
  box.className = 'dd-box';
  root.append(box);
  const caption = document.createElement('div');
  caption.className = 'dd-caption';
  wrap.append(root, caption);
  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.className = 'dd-hint';
    hint.textContent = opts.hint;
    wrap.append(hint);
  }
  el.append(wrap);

  const abort = new AbortController();
  const timers = new Set<number>();
  const waiters = new Set<(reason: unknown) => void>();
  const cleanups: (() => void)[] = [];
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });

  // In the full view the box takes the diagram's shape: as wide as the scene allows and
  // as tall as that width implies, but never past its own size × 1.5 or maxHeight.
  const fit = (svg: SVGSVGElement): void => {
    if (preview) return;
    const { width, height } = svgSize(svg);
    if (!width || !height) return;
    const room = box.clientWidth || 600;
    const tall = Math.min(opts.maxHeight ?? 620, height * 1.5, (room * height) / width);
    box.style.height = `${Math.max(160, Math.round(tall))}px`;
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
    box,
    bar,
    d2: () => loadD2(abort.signal),
    show(svg, links) {
      const node = putSvg(box, svg, links);
      if (!links?.raw) fit(node);
      return node;
    },
    showText(text) {
      const pre = document.createElement('pre');
      pre.className = 'dd-text';
      pre.textContent = text;
      box.replaceChildren(pre);
      if (!preview) box.style.height = '';
      return pre;
    },
    say(text, tone = 'info') {
      caption.textContent = text;
      caption.dataset['tone'] = tone;
    },
    fail(err) {
      if (err === STOPPED || stage.disposed) return;
      stage.say(d2ErrorText(err), 'bad');
    },
    side(title) {
      if (preview) return null;
      const panel = document.createElement('div');
      panel.className = 'dd-side';
      const head = document.createElement('div');
      head.className = 'dd-side-title';
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
          console.error('d2 stage cleanup failed', err);
        }
      }
      wrap.remove();
    },
  };
  return stage;
}

export type { D2Api } from './engine.ts';
