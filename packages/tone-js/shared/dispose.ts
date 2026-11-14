// Disposes whatever an example's build() returned: one node, an array or an object of nodes

/** Disposes `g`, or every disposable value of an array or plain object `g`. */
export function disposeAll(g: unknown): void {
  const kill = (v: unknown): void => {
    if (v && typeof v === 'object' && 'dispose' in v && typeof v.dispose === 'function') v.dispose();
  };
  if (Array.isArray(g)) g.forEach(kill);
  else if (g && typeof g === 'object' && !('dispose' in g)) Object.values(g).forEach(kill);
  else kill(g);
}
