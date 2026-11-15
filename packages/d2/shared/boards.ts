// Board paths: what a D2 board link holds and what render's target takes

/**
 * Turns a link href such as "root.layers.x" or "root.scenarios.a.steps.1" into the board
 * path render's `target` option takes ("layers.x"), or "" for the root board.
 */
export function boardOf(href: string): string {
  return href.replace(/^root\.?/, '');
}

/** A board path as a reader would say it: "layers.x" → "layer x", "" → "the root board". */
export function boardName(path: string): string {
  if (!path) return 'the root board';
  const parts = path.split('.');
  const words: string[] = [];
  for (let i = 0; i + 1 < parts.length; i += 2) {
    const kind = parts[i]!.replace(/s$/, '');
    words.push(`${kind} ${parts[i + 1]}`);
  }
  return words.join(' › ');
}
