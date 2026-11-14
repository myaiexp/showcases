// Disposes whatever an example's build() returned: nodes, arrays and objects of them

/**
 * Disposes `g`: a node, or every node reachable through arrays and plain objects inside it.
 * A value that has its own dispose() is disposed and not looked into, since it owns its parts.
 */
export function disposeAll(g: unknown, seen = new Set<unknown>()): void {
  if (!g || typeof g !== 'object' || seen.has(g)) return;
  seen.add(g);
  if ('dispose' in g && typeof g.dispose === 'function') {
    g.dispose();
    return;
  }
  const parts = Array.isArray(g) ? g : Object.getPrototypeOf(g) === Object.prototype ? Object.values(g) : [];
  for (const v of parts) disposeAll(v, seen);
}
