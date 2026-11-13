// Decides which visible gallery cards to mount next under the live-preview cap

export interface Candidate<K> {
  key: K;
  /** Distance in px from the card's centre to the viewport centre. */
  distance: number;
}

/**
 * The visible, not-yet-mounted cards to mount now: nearest to the viewport centre first,
 * as many as fit under `cap` alongside those already mounted or mounting.
 */
export function pickToMount<K>(
  visible: readonly Candidate<K>[],
  active: ReadonlySet<K>,
  cap: number,
): K[] {
  const room = cap - active.size;
  if (room <= 0) return [];
  return visible
    .filter((c) => !active.has(c.key))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, room)
    .map((c) => c.key);
}
