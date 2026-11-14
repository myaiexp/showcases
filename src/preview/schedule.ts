// Decides which gallery previews to mount or evict next

export interface Card<K> {
  key: K;
  /** Distance in px from the card's centre to the viewport centre. */
  distance: number;
  /** Inside the observer's range (the viewport plus its margin). */
  visible: boolean;
  /** How long it has been continuously visible, in ms. */
  visibleFor: number;
  /** idle: nothing mounted. mounting: mount started, not yet settled. live: mounted. */
  state: 'idle' | 'mounting' | 'live';
}

export interface Limits {
  /** Previews mounted or mounting at once. */
  cap: number;
  /** Mounts in flight at once. Mounting is the expensive moment (shader compiles, wasm, data). */
  concurrency: number;
  /** A card must stay visible this long before it mounts, so cards scrolled past never do. */
  settleMs: number;
}

export interface Plan<K> {
  /** Cards to mount now, nearest the viewport centre first. */
  mount: K[];
  /** Off-screen previews to unmount now, ahead of their grace timer, to make room. */
  evict: K[];
  /** Plan again after this long: a visible card is still settling. */
  wakeInMs?: number;
}

/**
 * One scheduling step. Mounts are paced (at most `concurrency` in flight) so their spikes
 * never stack, and capped (at most `cap` mounted) so steady rendering stays bounded. When
 * the cap is full but a visible card waits, previews already scrolled off (still inside
 * their unmount grace period) give up their place, furthest first.
 */
export function plan<K>(cards: readonly Card<K>[], limits: Limits): Plan<K> {
  const active = cards.filter((c) => c.state !== 'idle');
  const inFlight = active.filter((c) => c.state === 'mounting').length;
  const waiting = cards.filter((c) => c.state === 'idle' && c.visible);
  const settled = waiting.filter((c) => c.visibleFor >= limits.settleMs).sort((a, b) => a.distance - b.distance);
  const unsettled = waiting.filter((c) => c.visibleFor < limits.settleMs);

  const result: Plan<K> = { mount: [], evict: [] };
  if (unsettled.length > 0) {
    result.wakeInMs = Math.min(...unsettled.map((c) => limits.settleMs - c.visibleFor));
  }

  // The cap was lowered under running previews: trim to it before mounting anything.
  if (active.length > limits.cap) {
    result.evict = [...active]
      .sort((a, b) => Number(a.visible) - Number(b.visible) || b.distance - a.distance)
      .slice(0, active.length - limits.cap)
      .map((c) => c.key);
    return result;
  }

  const want = settled.slice(0, Math.max(0, limits.concurrency - inFlight));
  if (want.length === 0) return result;

  const shortBy = want.length - (limits.cap - active.length);
  if (shortBy > 0) {
    const offScreen = active.filter((c) => !c.visible).sort((a, b) => b.distance - a.distance);
    result.evict = offScreen.slice(0, shortBy).map((c) => c.key);
  }
  const room = limits.cap - active.length + result.evict.length;
  result.mount = want.slice(0, Math.max(0, room)).map((c) => c.key);
  return result;
}
