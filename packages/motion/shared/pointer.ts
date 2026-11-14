// Synthetic pointer input for gesture cards, which have no real pointer
//
// Motion's drag, press, hover and pinch listen for moves and releases on `window` and do
// not filter by pointerId, and drag holds a page-wide lock. Two cards scripting gestures
// at once would steer each other's elements, so every script runs through one page-wide
// queue: `gesture()` waits its turn, runs, and hands over. Coordinates are px relative to
// the `frame` element's top-left corner, converted to client coordinates per event.

export interface Point {
  x: number;
  y: number;
}

export interface FakePointer {
  /** pointerdown on `target` (the element the gesture is attached to). */
  down(target: Element, at: Point): void;
  /** pointermove on window, where Motion listens once a gesture starts. */
  move(at: Point): void;
  /** pointerup on window. */
  up(at: Point): void;
  /** pointerenter / pointerleave on `target`, as a mouse, for hover(). */
  enter(target: Element, at: Point, pointerType?: 'mouse' | 'touch'): void;
  leave(target: Element, at: Point, pointerType?: 'mouse' | 'touch'): void;
  /** Moves from `from` to `to` over `seconds`, easing in and out, one event per frame. */
  glide(from: Point, to: Point, seconds: number): Promise<void>;
  /** Down on `target`, glide, up: a whole drag. */
  drag(target: Element, from: Point, to: Point, seconds: number): Promise<void>;
  /** Down, glide that speeds up all the way, up at full speed: a flick, so drag momentum has velocity to carry. */
  flick(target: Element, from: Point, to: Point, seconds: number): Promise<void>;
  /** Down, wait, up: a tap or a long press. */
  tap(target: Element, at: Point, holdSeconds?: number): Promise<void>;
  /**
   * Two touches around `centre`, spreading from `fromGap` to `toGap` px apart and turning
   * from `fromAngle` to `toAngle` degrees: a pinch, as pinch() reads it.
   */
  pinch(target: Element, centre: Point, g: { fromGap: number; toGap: number; fromAngle?: number; toAngle?: number }, seconds: number): Promise<void>;
  /** A pause that rejects when the card unmounts. */
  wait(seconds: number): Promise<void>;
}

let queue: Promise<void> = Promise.resolve();

/**
 * Runs `script` once every earlier script on the page has finished. Rejections from an
 * aborted signal are swallowed, so an unmounted card simply stops.
 */
export function gesture(frame: HTMLElement, signal: AbortSignal, script: (p: FakePointer) => Promise<void>): Promise<void> {
  const run = queue.then(async () => {
    if (signal.aborted) return;
    try {
      // Race the abort: a script awaiting an animation that a cancelled scope stopped would never settle,
      // and one stuck script would block every later card on the page.
      const aborted = new Promise<never>((_, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true }));
      await Promise.race([script(makePointer(frame, signal)), aborted]);
    } catch (err) {
      if (!signal.aborted) throw err;
    }
  });
  queue = run.catch(() => undefined);
  return run;
}

/** Repeats `script` through the queue, `gap` seconds apart, until `signal` aborts. */
export function loopGesture(frame: HTMLElement, signal: AbortSignal, script: (p: FakePointer) => Promise<void>, gap = 0.8): void {
  const next = async (): Promise<void> => {
    while (!signal.aborted) {
      await gesture(frame, signal, script);
      await sleep(gap, signal).catch(() => undefined);
    }
  };
  void next();
}

function sleep(seconds: number, signal: AbortSignal): Promise<void> {
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

function makePointer(frame: HTMLElement, signal: AbortSignal): FakePointer {
  const client = (at: Point): Point => {
    const r = frame.getBoundingClientRect();
    return { x: r.left + at.x, y: r.top + at.y };
  };
  const fire = (target: EventTarget, type: string, at: Point, init: PointerEventInit = {}): void => {
    const c = client(at);
    const pressed = type === 'pointerdown' || type === 'pointermove';
    target.dispatchEvent(
      new PointerEvent(type, {
        bubbles: type !== 'pointerenter' && type !== 'pointerleave',
        cancelable: true,
        composed: true,
        clientX: c.x,
        clientY: c.y,
        screenX: c.x,
        screenY: c.y,
        pointerId: 1,
        pointerType: 'mouse',
        isPrimary: true,
        button: type === 'pointermove' ? -1 : 0,
        buttons: pressed ? 1 : 0,
        ...init,
      }),
    );
  };
  // Frames until `seconds` pass, calling `step` with eased progress 0..1.
  const tween = (seconds: number, step: (t: number) => void, easing: (t: number) => number = ease): Promise<void> =>
    new Promise((resolve, reject) => {
      const start = performance.now();
      let id = 0;
      const tick = (now: number): void => {
        if (signal.aborted) return reject(signal.reason);
        const t = Math.min(1, (now - start) / (seconds * 1000));
        step(easing(t));
        if (t < 1) id = requestAnimationFrame(tick);
        else resolve();
      };
      id = requestAnimationFrame(tick);
      // Reject on abort: a tween that just stopped would leave the page-wide queue waiting forever.
      signal.addEventListener('abort', () => {
        cancelAnimationFrame(id);
        reject(signal.reason);
      }, { once: true });
    });

  const p: FakePointer = {
    down: (target, at) => fire(target, 'pointerdown', at),
    move: (at) => fire(window, 'pointermove', at),
    up: (at) => fire(window, 'pointerup', at),
    enter: (target, at, pointerType = 'mouse') => fire(target, 'pointerenter', at, { pointerType }),
    leave: (target, at, pointerType = 'mouse') => fire(target, 'pointerleave', at, { pointerType }),
    glide: (from, to, seconds) =>
      tween(seconds, (t) => p.move({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t })),
    async drag(target, from, to, seconds) {
      p.down(target, from);
      try {
        await p.glide(from, to, seconds);
      } finally {
        p.up(to);
      }
    },
    async flick(target, from, to, seconds) {
      p.down(target, from);
      try {
        await tween(seconds, (t) => p.move({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }), (t) => t * t);
      } finally {
        p.up(to);
      }
    },
    async tap(target, at, holdSeconds = 0.12) {
      p.down(target, at);
      try {
        await sleep(holdSeconds, signal);
      } finally {
        fire(target, 'pointerup', at);
      }
    },
    async pinch(target, centre, g, seconds) {
      const touch = (id: number, primary: boolean): PointerEventInit => ({ pointerId: id, pointerType: 'touch', isPrimary: primary });
      const ends = (gap: number, angle: number): [Point, Point] => {
        const r = (angle * Math.PI) / 180;
        const dx = (Math.cos(r) * gap) / 2;
        const dy = (Math.sin(r) * gap) / 2;
        return [{ x: centre.x - dx, y: centre.y - dy }, { x: centre.x + dx, y: centre.y + dy }];
      };
      const a0 = g.fromAngle ?? 0;
      const a1 = g.toAngle ?? a0;
      const [s1, s2] = ends(g.fromGap, a0);
      fire(target, 'pointerdown', s1, touch(11, true));
      fire(target, 'pointerdown', s2, touch(12, false));
      let last = ends(g.fromGap, a0);
      try {
        await tween(seconds, (t) => {
          last = ends(g.fromGap + (g.toGap - g.fromGap) * t, a0 + (a1 - a0) * t);
          fire(window, 'pointermove', last[0], touch(11, true));
          fire(window, 'pointermove', last[1], touch(12, false));
        });
      } finally {
        fire(window, 'pointerup', last[1], touch(12, false));
        fire(window, 'pointerup', last[0], touch(11, true));
      }
    },
    wait: (seconds) => sleep(seconds, signal),
  };
  return p;
}
