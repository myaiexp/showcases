// Shared Tippy.js stage: scene box, scripted pointer for cards, one cleanup
//
// Traps found while building the gallery (add to this list):
// - Every example mounts into one page, so a tippy() CSS selector string ('button',
//   '[data-tippy-content]') matches other examples' elements too. Pass elements or a
//   NodeList from `stage.root.querySelectorAll(...)` instead.
// - Pass `appendTo: stage.root` (or 'parent'). The default, document.body, puts the tip outside
//   the example's `[data-example]` scope, so the example's style.css themes never reach it,
//   and in a card the tip floats over the gallery instead of being clipped by the card.
// - Cards have no pointer. `stage.ghost` draws a pointer and sends the events Tippy listens
//   for (mouseenter, mouseleave, click, focus, blur, contextmenu) to the element itself.
//   It never sends mousedown or mousemove: Tippy listens for those on the whole document,
//   so they would close or move tips in every other card on the page.
// - The real mouse still moves over the gallery, and Tippy follows document mousemove for
//   `followCursor` and for interactive tips opened by hover. In a card, open interactive tips
//   with show() or a click, and stand in for followCursor with
//   `getReferenceClientRect: stage.ghost.clientRect` plus `popperInstance.update()` on
//   `ghost.track(...)`. Full views use the real props.
// - Touch input is page-wide (`tippy.currentInput.isTouch` flips on any touchstart), so
//   cards never fake touch: `touch: 'hold'` examples show the press as a picture.
// - `hideAll()` and `tippy.setDefaultProps()` act on every tippy on the page. Call hideAll
//   only from a full-view button; set defaults, create the instances, then restore the old
//   defaults in the same synchronous block.
// - `delay` applies to trigger events only: `show()` and `hide()` ignore it, so a card that
//   demonstrates delay hovers with the ghost instead of calling show().
// - Destroy instances before their reference elements leave the page: `stage.own(...)`
//   destroys everything it holds, in reverse order, before the scene is removed.
import type { MountContext } from '@/types.ts';
import { createGhost, type Ghost } from './ghost.ts';

export interface StageOptions {
  /** Height of the full view's scene in px. Cards are always 200px tall. */
  height?: number;
  /** One line under the scene in the full view, such as "Hover the buttons". */
  hint?: string;
}

export interface Destroyable {
  destroy(): void;
}

export interface Stage {
  /** The positioned scene box: append the example's UI here and pass it as `appendTo`. */
  root: HTMLElement;
  preview: boolean;
  /** Control bar under the scene, or null in a card. */
  bar: HTMLElement | null;
  /** The scripted pointer (created on first use). */
  readonly ghost: Ghost;
  /** Destroys `item` (an instance, an array of them, a singleton, a delegate) on dispose. */
  own<T extends Destroyable | readonly Destroyable[]>(item: T): T;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Calls `fn` once after `ms`, unless disposed first. */
  after(ms: number, fn: () => void): void;
  /** Runs `script` over and over until dispose; `wait` throws once the stage is gone. */
  play(script: (wait: (ms: number) => Promise<void>) => Promise<void>): void;
  /** Resolves after `ms`; rejects (stopping a `play` script) when the stage is disposed. */
  wait(ms: number): Promise<void>;
  onDispose(fn: () => void): void;
  dispose(): void;
}

/** Thrown by `wait` after dispose; `play` swallows it. */
export const STOPPED = Symbol('stage stopped');

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const outer = document.createElement('div');
  outer.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;width:100%';
  el.append(outer);
  // The ghost's events bubble like real ones, but must stop here. A gallery card is an
  // <a>, and a click inside a link follows it even when propagation stops, so in a link
  // the ghost's click is also cancelled (a ghost click therefore never ticks a checkbox).
  const inLink = outer.closest('a') !== null;
  for (const type of ['click', 'contextmenu', 'mouseover', 'mouseout', 'focusin', 'focusout', 'input']) {
    outer.addEventListener(type, (e) => {
      if (e.isTrusted) return;
      e.stopPropagation();
      if (type === 'click' && inLink) e.preventDefault();
    });
  }

  const root = document.createElement('div');
  root.className = 'scene';
  root.style.cssText = `position:relative;width:100%;height:${preview ? 200 : (opts.height ?? 320)}px;overflow:hidden`;
  outer.append(root);

  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.style.cssText = 'font-size:13px;color:var(--fg-3)';
    hint.textContent = opts.hint;
    outer.append(hint);
  }
  let bar: HTMLElement | null = null;
  if (!preview) {
    bar = document.createElement('div');
    bar.style.cssText =
      'display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 16px;max-width:640px';
    outer.append(bar);
  }

  const owned: Destroyable[] = [];
  const timers = new Set<number>();
  const disposers: (() => void)[] = [];
  const waiters = new Set<() => void>();
  let disposed = false;
  let ghost: Ghost | null = null;

  const wait = (ms: number): Promise<void> =>
    new Promise((resolve, reject) => {
      if (disposed) return reject(STOPPED);
      const stop = (): void => reject(STOPPED);
      waiters.add(stop);
      const t = window.setTimeout(() => {
        timers.delete(t);
        waiters.delete(stop);
        resolve();
      }, ms);
      timers.add(t);
    });

  const stage: Stage = {
    root,
    preview,
    bar,
    get ghost() {
      ghost ??= createGhost(root, wait, () => disposed);
      return ghost;
    },
    own(item) {
      if (Array.isArray(item)) owned.push(...(item as readonly Destroyable[]));
      else owned.push(item as Destroyable);
      return item;
    },
    every(ms, fn) {
      timers.add(window.setInterval(fn, ms));
    },
    after(ms, fn) {
      const t = window.setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    },
    play(script) {
      const run = async (): Promise<void> => {
        while (!disposed) await script(wait);
      };
      run().catch((err: unknown) => {
        if (err !== STOPPED) throw err;
      });
    },
    wait,
    onDispose(fn) {
      disposers.push(fn);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const t of timers) {
        clearTimeout(t);
        clearInterval(t);
      }
      for (const stop of waiters) stop();
      for (const fn of disposers.splice(0)) fn();
      for (const item of owned.splice(0).reverse()) item.destroy();
      ghost?.remove();
      outer.remove();
    },
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });
  return stage;
}
