// A shelf of tiles that follows a collection: new items pop in, removed ones shrink away
import { scoreColor } from './results.ts';

export interface DocShelf<T> {
  el: HTMLElement;
  /**
   * Shows `docs`. A doc seen before keeps its tile (its label is refreshed); a new one pops in
   * at the end; a doc that has gone shrinks away. Docs are matched by identity.
   */
  sync(docs: readonly T[]): void;
  /** Lights the tiles in `hits` (value = score, if any) and dims the rest; null = plain. */
  mark(hits: ReadonlyMap<T, number | undefined> | null): void;
}

export interface DocShelfOptions<T> {
  /** Tile text; `i` is the doc's current position, so it changes after a removal. */
  label: (doc: T, i: number) => string;
  layout?: 'grid' | 'list';
}

export function docShelf<T>(parent: HTMLElement, opts: DocShelfOptions<T>): DocShelf<T> {
  const el = document.createElement('div');
  el.className = `fz-shelf fz-shelf-${opts.layout ?? 'grid'}`;
  parent.append(el);
  let tiles = new Map<T, HTMLElement>();
  let docs: readonly T[] = [];
  let hits: ReadonlyMap<T, number | undefined> | null = null;

  const paint = (): void => {
    docs.forEach((doc, i) => {
      const tile = tiles.get(doc)!;
      const hit = hits?.has(doc) ?? false;
      const score = hits?.get(doc);
      const label = document.createElement('span');
      label.className = 'fz-tile-label';
      label.textContent = opts.label(doc, i);
      const parts: Node[] = [label];
      if (hit && score !== undefined) {
        const s = document.createElement('span');
        s.className = 'fz-tile-score';
        s.textContent = score.toFixed(2);
        s.style.color = scoreColor(score);
        parts.push(s);
      }
      tile.replaceChildren(...parts);
      const state = hits === null ? 'idle' : hit ? 'hit' : 'miss';
      if (tile.dataset['state'] !== state && state === 'hit') tile.animate([{ transform: 'scale(1.08)' }, { transform: 'none' }], { duration: 240, easing: 'ease-out' });
      tile.dataset['state'] = state;
      tile.style.borderColor = hit && score !== undefined ? scoreColor(score) : '';
    });
  };

  return {
    el,
    sync(next) {
      const old = tiles;
      tiles = new Map();
      for (const doc of next) {
        const known = old.get(doc);
        const tile = known ?? document.createElement('div');
        tile.className = 'fz-tile';
        tiles.set(doc, tile);
        if (!known) {
          el.append(tile);
          tile.animate([{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'ease-out' });
        }
      }
      // A shelf that is replaced wholesale has nothing to shrink away from: clear it at once.
      const replaced = [...old.keys()].every((doc) => !tiles.has(doc));
      for (const [doc, tile] of old) {
        if (tiles.has(doc)) continue;
        if (replaced) {
          tile.remove();
          continue;
        }
        tile.dataset['state'] = 'gone';
        const out = tile.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(0.6)' }], { duration: 420, easing: 'ease-in', fill: 'forwards' });
        out.finished.then(() => tile.remove(), () => tile.remove());
      }
      docs = next;
      paint();
    },
    mark(next) {
      hits = next;
      paint();
    },
  };
}
