// Scripted touch drags for preview cards, queued one at a time page-wide
//
// Sortable keeps one drag per page in module-level state, so every scripted drag on the page
// runs through one queue. Each gesture:
// - sends pointer events with pointerType 'touch'. A touch pointer takes Sortable's fallback
//   path (pointermove on document, a floating ghost) even on a list using native drag and drop,
//   which a script cannot start. Real Firefox on Android takes the same path.
// - turns pointer events back on for the card while it runs: cards are `pointer-events: none`,
//   and the fallback finds the list under the pointer with document.elementFromPoint.
// - drops the visitor's real pointermove events while it runs. Sortable does not filter by
//   pointerId, so a real mouse crossing the page would steer the scripted drag.
// - turns AutoScroll off (or only its bubbling, with `autoScroll: true`) so a drag near an
//   edge never scrolls the gallery page.
// - sends a non-bubbling click on the card every frame and on release, which clears Sortable's
//   swallow-the-next-click flag before it can eat the visitor's real click on a card.
import Sortable from 'sortablejs';

/** A point: an element's centre, a spot in it (fractions 0..1 of its box), or px in the root. */
export type Spot = Element | { el: Element; fx?: number; fy?: number } | { x: number; y: number };

export interface Hand {
  /** Presses on `item`, glides to `to` over `seconds`, releases. */
  drag(item: Element, to: Spot, seconds?: number, opts?: { hold?: number }): Promise<void>;
  /** Presses on `item` and releases without moving after `hold` seconds: a tap or a long press. */
  tap(item: Element, hold?: number): Promise<void>;
  /** Low-level steps for gestures drag() does not cover. */
  down(item: Element, at?: Spot): void;
  glide(to: Spot, seconds: number): Promise<void>;
  up(): void;
  /** A pause that rejects when the card unmounts. */
  wait(seconds: number): Promise<void>;
}

export interface DriveOptions {
  /** Leave AutoScroll on inside the card (bubbling to the page stays off). */
  autoScroll?: boolean;
}

let queue: Promise<void> = Promise.resolve();

/** Runs `script` once every earlier scripted gesture on the page has finished. */
export function drive(root: HTMLElement, signal: AbortSignal, script: (hand: Hand) => Promise<void>, opts: DriveOptions = {}): Promise<void> {
  const run = queue.then(async () => {
    if (signal.aborted || !root.isConnected) return;
    const session = open(root, signal, opts);
    try {
      const aborted = new Promise<never>((_, reject) =>
        signal.addEventListener('abort', () => reject(signal.reason), { once: true }),
      );
      await Promise.race([script(session.hand), aborted]);
    } catch (err) {
      if (!signal.aborted) throw err;
    } finally {
      session.close();
    }
  });
  queue = run.catch((err: unknown) => console.error('Sortable card script failed', err));
  return run;
}

/** Repeats `script` through the queue, `gap` seconds apart, until `signal` aborts. */
export function loopDrive(root: HTMLElement, signal: AbortSignal, script: (hand: Hand) => Promise<void>, gap = 0.7, opts: DriveOptions = {}): void {
  const next = async (): Promise<void> => {
    while (!signal.aborted) {
      await drive(root, signal, script, opts).catch(() => undefined);
      await sleep(gap, signal).catch(() => undefined);
    }
  };
  void next();
}

export function sleep(seconds: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(signal.reason);
    const id = window.setTimeout(resolve, seconds * 1000);
    signal.addEventListener('abort', () => {
      window.clearTimeout(id);
      reject(signal.reason);
    }, { once: true });
  });
}

const ease = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

function point(root: HTMLElement, spot: Spot): { x: number; y: number } {
  if ('x' in spot && 'y' in spot && !(spot instanceof Element)) {
    const r = root.getBoundingClientRect();
    return { x: r.left + spot.x, y: r.top + spot.y };
  }
  const el = spot instanceof Element ? spot : spot.el;
  const fx = spot instanceof Element ? 0.5 : (spot.fx ?? 0.5);
  const fy = spot instanceof Element ? 0.5 : (spot.fy ?? 0.5);
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width * fx, y: r.top + r.height * fy };
}

/** Every Sortable whose element is `root` or inside it. */
function sortablesIn(root: HTMLElement): Sortable[] {
  const found: Sortable[] = [];
  for (const el of [root, ...root.querySelectorAll<HTMLElement>('*')]) {
    const s = Sortable.get(el);
    if (s) found.push(s);
  }
  return found;
}

function open(root: HTMLElement, signal: AbortSignal, opts: DriveOptions): { hand: Hand; close(): void } {
  const prevPointer = root.style.pointerEvents;
  root.style.pointerEvents = 'auto';

  const restore: (() => void)[] = [];
  for (const s of sortablesIn(root)) {
    const scroll = s.option('scroll');
    const bubble = s.option('bubbleScroll');
    if (!opts.autoScroll) s.option('scroll', false);
    s.option('bubbleScroll', false);
    restore.push(() => {
      if (!s.el) return; // destroyed meanwhile
      s.option('scroll', scroll);
      s.option('bubbleScroll', bubble);
    });
  }

  const blockReal = (e: Event): void => {
    if (e.isTrusted) e.stopImmediatePropagation();
  };
  window.addEventListener('pointermove', blockReal, true);

  let pressed = false;
  let last = { x: 0, y: 0 };

  const fire = (target: EventTarget, type: string, at: { x: number; y: number }): void => {
    last = at;
    target.dispatchEvent(
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true,
        clientX: at.x,
        clientY: at.y,
        screenX: at.x,
        screenY: at.y,
        pointerId: 7,
        pointerType: 'touch',
        isPrimary: true,
        button: type === 'pointermove' ? -1 : 0,
        buttons: type === 'pointerup' ? 0 : 1,
      }),
    );
  };

  // A fallback drag sets a page-wide flag that cancels the next click, and the flag stays set while
  // the pointer is over the dragged item, which is most of a scripted drag. Sortable's capture
  // listener clears it on any click, so a non-bubbling one on the card, which nothing else hears,
  // keeps a visitor's real click on a card working mid-drag.
  const clearClickFlag = (): void => {
    root.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: true }));
  };

  const hand: Hand = {
    down(item, at = item) {
      pressed = true;
      fire(item, 'pointerdown', point(root, at));
    },
    glide(to, seconds) {
      const from = last;
      return new Promise((resolve, reject) => {
        const start = performance.now();
        let id = 0;
        const tick = (now: number): void => {
          if (signal.aborted) return reject(signal.reason);
          const t = Math.min(1, (now - start) / (seconds * 1000));
          const k = ease(t);
          // Re-read the target every frame: items slide while Sortable animates the reorder.
          const end = point(root, to);
          fire(document, 'pointermove', { x: from.x + (end.x - from.x) * k, y: from.y + (end.y - from.y) * k });
          clearClickFlag();
          if (t < 1) id = requestAnimationFrame(tick);
          else resolve();
        };
        id = requestAnimationFrame(tick);
        signal.addEventListener('abort', () => {
          cancelAnimationFrame(id);
          reject(signal.reason);
        }, { once: true });
      });
    },
    up() {
      if (!pressed) return;
      pressed = false;
      fire(document.elementFromPoint(last.x, last.y) ?? document, 'pointerup', last);
      clearClickFlag();
    },
    async drag(item, to, seconds = 0.9, o = {}) {
      hand.down(item);
      try {
        if (o.hold) await sleep(o.hold, signal);
        // A short nudge first: the fallback starts the drag on the first move.
        const start = point(root, item);
        await hand.glide({ x: start.x - root.getBoundingClientRect().left + 4, y: start.y - root.getBoundingClientRect().top + 4 }, 0.08);
        await hand.glide(to, seconds);
        await sleep(0.12, signal);
      } finally {
        hand.up();
      }
    },
    async tap(item, hold = 0.1) {
      hand.down(item);
      try {
        await sleep(hold, signal);
      } finally {
        hand.up();
      }
    },
    wait: (seconds) => sleep(seconds, signal),
  };

  return {
    hand,
    close() {
      hand.up(); // an aborted script may leave the pointer down
      window.removeEventListener('pointermove', blockReal, true);
      for (const r of restore) r();
      root.style.pointerEvents = prevPointer;
    },
  };
}
