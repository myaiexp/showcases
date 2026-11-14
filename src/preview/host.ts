// Mounts gallery card previews while on screen: paced, capped, adapted to frame rate

import type { Mount } from '../types.ts';
import { FramePace } from './pace.ts';
import { type Running, runExample } from './run.ts';
import { type Card, plan } from './schedule.ts';

/** Live previews at once while the device keeps up. Browsers allow ~16 WebGL contexts. */
const MAX_LIVE = 6;
/** One mount at a time: mounting (shader compiles, wasm, data) is the expensive moment. */
const MOUNT_CONCURRENCY = 1;
/** A card must stay in range this long before it mounts, so cards scrolled past never do. */
const SETTLE_MS = 150;
/** A mount still unresolved after this long stops holding up the queue. */
const MOUNT_TIMEOUT_MS = 4000;
/** Frames a new preview must draw before the next mount starts. */
const SETTLE_FRAMES = 2;
/** Grace period before an off-screen preview unmounts, so fast scrolling doesn't thrash. */
const UNMOUNT_DELAY_MS = 800;

/**
 * The cap drops when the page draws under ~20 fps and climbs back after 3 s over ~40 fps.
 * A card whose mount turns a healthy page slow (while it mounts or up to 2.5 s after) is
 * benched for the rest of the visit.
 */
const PACE = {
  max: MAX_LIVE,
  min: 1,
  slowMs: 50,
  fastMs: 25,
  windowMs: 1000,
  hangMs: 3000,
  raiseAfterMs: 3000,
  blameMs: 2500,
  cooldownMs: 5000,
  maxCooldownMs: 60000,
};

interface Slot {
  id: string;
  load: () => Promise<Mount>;
  visible: boolean;
  visibleSince: number;
  state: Card<HTMLElement>['state'];
  running: Running | undefined;
  timer: number | undefined;
  /** Too slow for this device: never mounted again during this visit. */
  benched: boolean;
}

export class PreviewHost {
  readonly #slots = new Map<HTMLElement, Slot>();
  readonly #observer = new IntersectionObserver((entries) => this.#onIntersect(entries), {
    rootMargin: '200px 0px',
  });
  readonly #pace = new FramePace(PACE);
  /** The card mounted most recently: the one benched when the governor blames a mount. */
  #suspect: HTMLElement | undefined;
  #wake: number | undefined;
  #raf = 0;
  readonly #onVisibility = (): void => this.#pace.reset();

  constructor() {
    this.#raf = requestAnimationFrame(this.#tick);
    document.addEventListener('visibilitychange', this.#onVisibility);
  }

  /** Registers a card's stage element; it mounts when it scrolls into view. */
  observe(stage: HTMLElement, id: string, load: () => Promise<Mount>): void {
    this.#slots.set(stage, {
      id,
      load,
      visible: false,
      visibleSince: 0,
      state: 'idle',
      running: undefined,
      timer: undefined,
      benched: false,
    });
    this.#observer.observe(stage);
  }

  dispose(): void {
    cancelAnimationFrame(this.#raf);
    clearTimeout(this.#wake);
    document.removeEventListener('visibilitychange', this.#onVisibility);
    this.#observer.disconnect();
    for (const slot of this.#slots.values()) {
      clearTimeout(slot.timer);
      slot.running?.stop();
      slot.running = undefined;
    }
    this.#slots.clear();
  }

  /** Frame probe: feeds the governor and acts on what it decides. */
  readonly #tick = (t: number): void => {
    this.#raf = requestAnimationFrame(this.#tick);
    const verdict = this.#pace.frame(t);
    if (verdict === 'blame') this.#bench();
    if (verdict !== 'none') this.#pump();
  };

  #onIntersect(entries: IntersectionObserverEntry[]): void {
    const now = performance.now();
    for (const entry of entries) {
      const stage = entry.target as HTMLElement;
      const slot = this.#slots.get(stage);
      if (!slot) continue;
      if (entry.isIntersecting && !slot.visible) slot.visibleSince = now;
      slot.visible = entry.isIntersecting;
      if (slot.visible) {
        clearTimeout(slot.timer);
        slot.timer = undefined;
      } else if (slot.state !== 'idle' && slot.timer === undefined) {
        slot.timer = window.setTimeout(() => {
          this.#unmount(stage, slot);
          this.#pump();
        }, UNMOUNT_DELAY_MS);
      }
    }
    this.#pump();
  }

  #pump(): void {
    clearTimeout(this.#wake);
    this.#wake = undefined;
    const now = performance.now();
    const cards: Card<HTMLElement>[] = [];
    for (const [stage, slot] of this.#slots) {
      if (slot.benched || (!slot.visible && slot.state === 'idle')) continue;
      cards.push({
        key: stage,
        distance: distanceToCentre(stage),
        visible: slot.visible,
        visibleFor: slot.visible ? now - slot.visibleSince : 0,
        state: slot.state,
      });
    }
    const next = plan(cards, { cap: this.#pace.cap, concurrency: MOUNT_CONCURRENCY, settleMs: SETTLE_MS });
    for (const stage of next.evict) {
      const slot = this.#slots.get(stage);
      if (slot) this.#unmount(stage, slot);
    }
    for (const stage of next.mount) {
      const slot = this.#slots.get(stage);
      if (slot) this.#mount(stage, slot);
    }
    if (next.wakeInMs !== undefined) this.#wake = window.setTimeout(() => this.#pump(), next.wakeInMs);
  }

  #mount(stage: HTMLElement, slot: Slot): void {
    slot.state = 'mounting';
    stage.classList.add('sc-is-live');
    this.#suspect = stage;
    this.#pace.mountStarted(performance.now());
    const running = runExample(stage, slot.id, slot.load, true);
    slot.running = running;
    // Settled once the mount resolved and the page has drawn frames with it. Shader
    // compiles run in the GPU process and stall frames, not timers, so waiting on frames
    // keeps the next mount from stacking its compiles on this one's. The timeout covers
    // only an unresolved mount: past `ready`, a long stall ends in the governor blaming
    // this card, which unmounts it and frees the queue.
    let settled = false;
    const settle = (): void => {
      if (settled || slot.running !== running) return;
      settled = true;
      clearTimeout(fallback);
      slot.state = 'live';
      this.#pace.mountSettled(performance.now());
      this.#pump();
    };
    const fallback = window.setTimeout(settle, MOUNT_TIMEOUT_MS);
    void running.ready.then(() => {
      clearTimeout(fallback);
      afterFrames(SETTLE_FRAMES, settle);
    });
  }

  /** Frees the slot at once. An aborted mount's in-flight work (a compile) may still finish. */
  #unmount(stage: HTMLElement, slot: Slot): void {
    if (stage === this.#suspect) {
      this.#suspect = undefined;
      this.#pace.suspectGone();
    }
    clearTimeout(slot.timer);
    slot.timer = undefined;
    slot.running?.stop();
    slot.running = undefined;
    slot.state = 'idle';
    stage.classList.remove('sc-is-live');
  }

  /** The last card to mount turned a healthy page slow: stop it and skip it from now on. */
  #bench(): void {
    const stage = this.#suspect;
    this.#suspect = undefined;
    const slot = stage && this.#slots.get(stage);
    if (!stage || !slot || slot.state === 'idle') return;
    slot.benched = true;
    stage.dataset['preview'] = 'benched';
    console.info(`Preview ${slot.id} paused: too slow for this device`);
    this.#unmount(stage, slot);
  }
}

function afterFrames(n: number, fn: () => void): void {
  if (n <= 0) setTimeout(fn, 0);
  else requestAnimationFrame(() => afterFrames(n - 1, fn));
}

/** Measured at pump time, so queued cards are ordered by where they are now. */
function distanceToCentre(el: HTMLElement): number {
  const box = el.getBoundingClientRect();
  return Math.abs(box.top + box.height / 2 - window.innerHeight / 2);
}
