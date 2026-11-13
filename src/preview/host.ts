// Mounts gallery card previews while on screen, capped, with delayed unmount

import type { Mount } from '../types.ts';
import { type Running, runExample } from './run.ts';
import { type Candidate, pickToMount } from './schedule.ts';

/** Live previews at once. Browsers allow ~16 WebGL contexts; stay well under. */
const CAP = 6;
/** Grace period before an off-screen preview unmounts, so fast scrolling doesn't thrash. */
const UNMOUNT_DELAY_MS = 800;

interface Slot {
  id: string;
  load: () => Promise<Mount>;
  visible: boolean;
  running: Running | undefined;
  timer: number | undefined;
}

export class PreviewHost {
  readonly #slots = new Map<HTMLElement, Slot>();
  readonly #observer = new IntersectionObserver((entries) => this.#onIntersect(entries), {
    rootMargin: '200px 0px',
  });

  /** Registers a card's stage element; it mounts when it scrolls into view. */
  observe(stage: HTMLElement, id: string, load: () => Promise<Mount>): void {
    this.#slots.set(stage, {
      id,
      load,
      visible: false,
      running: undefined,
      timer: undefined,
    });
    this.#observer.observe(stage);
  }

  dispose(): void {
    this.#observer.disconnect();
    for (const slot of this.#slots.values()) {
      clearTimeout(slot.timer);
      slot.running?.stop();
    }
    this.#slots.clear();
  }

  #onIntersect(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      const stage = entry.target as HTMLElement;
      const slot = this.#slots.get(stage);
      if (!slot) continue;
      slot.visible = entry.isIntersecting;
      if (slot.visible) {
        clearTimeout(slot.timer);
        slot.timer = undefined;
      } else if (slot.running && slot.timer === undefined) {
        slot.timer = window.setTimeout(() => this.#unmount(stage, slot), UNMOUNT_DELAY_MS);
      }
    }
    this.#pump();
  }

  #unmount(stage: HTMLElement, slot: Slot): void {
    slot.timer = undefined;
    slot.running?.stop();
    slot.running = undefined;
    stage.classList.remove('sc-is-live');
    this.#pump();
  }

  #pump(): void {
    const active = new Set<HTMLElement>();
    const visible: Candidate<HTMLElement>[] = [];
    for (const [stage, slot] of this.#slots) {
      if (slot.running) active.add(stage);
      else if (slot.visible) visible.push({ key: stage, distance: distanceToCentre(stage) });
    }
    for (const stage of pickToMount(visible, active, CAP)) {
      const slot = this.#slots.get(stage);
      if (!slot) continue;
      stage.classList.add('sc-is-live');
      slot.running = runExample(stage, slot.id, slot.load, true);
    }
  }
}

/** Measured at pump time, so cards queued behind the cap are ordered by where they are now. */
function distanceToCentre(el: HTMLElement): number {
  const box = el.getBoundingClientRect();
  return Math.abs(box.top + box.height / 2 - window.innerHeight / 2);
}
