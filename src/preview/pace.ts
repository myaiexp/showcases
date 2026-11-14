// Adapts the live-preview cap to how fast the page is drawing frames

export interface PaceLimits {
  /** Highest cap, used while the device keeps up. */
  max: number;
  /** Lowest cap the governor lowers to. */
  min: number;
  /** Median frame interval above this is slow (below ~20 fps). */
  slowMs: number;
  /** Median frame interval below this is fast enough to try one more preview. */
  fastMs: number;
  /** Frames considered in one judgement, in ms of frame time. */
  windowMs: number;
  /** A lone frame this long is a hang and counts as slow by itself. A shorter lone hitch
   *  (a one-off shader compile on a phone) is not enough evidence. */
  hangMs: number;
  /** Frames must stay fast this long before the cap rises. */
  raiseAfterMs: number;
  /** A slowdown that starts while a card mounts, or this soon after, is that card's doing. */
  blameMs: number;
  /** No raise for this long after a lowering. Doubles each time a raise fails. */
  cooldownMs: number;
  maxCooldownMs: number;
}

/** What the host should do after a frame. */
export type Verdict = 'none' | 'lower' | 'raise' | 'blame';

interface Frame {
  at: number;
  gap: number;
}

/**
 * Watches frame intervals and adapts how many previews may run at once. The median
 * interval over a window decides, so one mount spike never counts as slowness but a
 * single hang as long as the window does. A device that keeps up never leaves `max`.
 */
export class FramePace {
  cap: number;
  readonly #limits: PaceLimits;
  #last: number | undefined;
  #window: Frame[] = [];
  #healthySince: number | undefined;
  #raiseBlockedUntil = 0;
  #cooldown: number;
  #lastRaiseAt: number | undefined;
  /** The mount under suspicion: started at `since`, suspected until `until` once settled. */
  #suspect: { since: number; until: number; wasHealthy: boolean } | undefined;
  /** The last full judgement. Unknown counts as unhealthy, so no mount is blamed on it. */
  #lastHealthy = false;

  constructor(limits: PaceLimits) {
    this.#limits = limits;
    this.cap = limits.max;
    this.#cooldown = limits.cooldownMs;
  }

  /** A preview started mounting: a slowdown from here until it settles is blamed on it. */
  mountStarted(now: number): void {
    const L = this.#limits;
    // A window cleared by the last verdict has too little in it to judge: fall back on that verdict.
    const fresh = this.#window.length >= 3 && covered(this.#window) >= L.windowMs / 2;
    const wasHealthy = fresh ? median(this.#window) <= L.slowMs : this.#lastHealthy;
    this.#suspect = { since: now, until: Infinity, wasHealthy };
  }

  /** The suspect was unmounted; a later slowdown is not its doing. */
  suspectGone(): void {
    this.#suspect = undefined;
  }

  /** That preview has mounted and drawn frames; it stays suspect for `blameMs` more. */
  mountSettled(now: number): void {
    if (this.#suspect) this.#suspect.until = now + this.#limits.blameMs;
  }

  /** Drops all frame history, as after the tab was hidden and rAF stopped. */
  reset(): void {
    this.#last = undefined;
    this.#window = [];
    this.#healthySince = undefined;
    this.#suspect = undefined;
  }

  /** Feed every animation frame's timestamp. */
  frame(now: number): Verdict {
    const L = this.#limits;
    if (this.#last === undefined) {
      this.#last = now;
      return 'none';
    }
    this.#window.push({ at: now, gap: now - this.#last });
    this.#last = now;
    this.#window = this.#window.filter((f) => f.at > now - L.windowMs);
    if (covered(this.#window) < L.windowMs) return 'none';
    if (this.#window.length < 3 && Math.max(...this.#window.map((f) => f.gap)) < L.hangMs) return 'none';

    const med = median(this.#window);
    this.#lastHealthy = med <= L.slowMs;
    if (med > L.slowMs) {
      this.#healthySince = undefined;
      // When the slow stretch began: a hang is one long frame, so its start is long ago.
      const began = this.#window[0]!.at - this.#window[0]!.gap;
      const suspect = this.#suspect;
      this.#suspect = undefined;
      if (suspect?.wasHealthy && began <= suspect.until) {
        this.#window = [];
        return 'blame';
      }
      if (this.cap <= L.min) return 'none';
      this.cap -= 1;
      this.#window = [];
      const raiseFailed = this.#lastRaiseAt !== undefined && now - this.#lastRaiseAt < this.#cooldown;
      this.#cooldown = raiseFailed ? Math.min(this.#cooldown * 2, L.maxCooldownMs) : L.cooldownMs;
      this.#raiseBlockedUntil = now + this.#cooldown;
      return 'lower';
    }
    if (med >= L.fastMs) {
      this.#healthySince = undefined;
      return 'none';
    }
    this.#healthySince ??= now;
    if (this.cap < L.max && now >= this.#raiseBlockedUntil && now - this.#healthySince >= L.raiseAfterMs) {
      this.cap += 1;
      this.#healthySince = now;
      this.#lastRaiseAt = now;
      return 'raise';
    }
    return 'none';
  }
}

function covered(frames: readonly Frame[]): number {
  return frames.reduce((sum, f) => sum + f.gap, 0);
}

function median(frames: readonly Frame[]): number {
  const gaps = frames.map((f) => f.gap).sort((a, b) => a - b);
  const mid = gaps.length >> 1;
  return gaps.length % 2 ? gaps[mid]! : (gaps[mid - 1]! + gaps[mid]!) / 2;
}
