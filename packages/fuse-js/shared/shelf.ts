// The whole collection as tiles: matches light up with their score, the rest dim
import { scoreColor } from './results.ts';

export interface ShelfItem {
  id: string | number;
  /** Text on the tile. */
  label: string;
}

export interface Hit {
  score?: number;
  /** Nodes to show instead of the plain label, e.g. from highlight(). */
  nodes?: Node[];
  /** Position in the ranking, shown as a small number. */
  rank?: number;
}

export interface Shelf {
  el: HTMLElement;
  /**
   * Lights the tiles in `hits` and dims the rest. `null` means no search is running:
   * every tile shows plain.
   */
  mark(hits: ReadonlyMap<string | number, Hit> | null): void;
  /** Replaces the collection (for examples that add or remove items). */
  setItems(items: readonly ShelfItem[]): void;
}

export interface ShelfOptions {
  /** Show each hit's score under its label. Default true. */
  scores?: boolean;
  /** 'grid' wraps tiles; 'list' stacks one per line. Default 'grid'. */
  layout?: 'grid' | 'list';
}

export function shelf(parent: HTMLElement, items: readonly ShelfItem[], opts: ShelfOptions = {}): Shelf {
  const el = document.createElement('div');
  el.className = `fz-shelf fz-shelf-${opts.layout ?? 'grid'}`;
  parent.append(el);
  let tiles = new Map<string | number, { tile: HTMLElement; item: ShelfItem }>();
  let last: ReadonlyMap<string | number, Hit> | null = null;

  const paint = (): void => {
    for (const [id, { tile, item }] of tiles) {
      const hit = last?.get(id);
      const label = document.createElement('span');
      label.className = 'fz-tile-label';
      if (hit?.nodes) label.append(...hit.nodes);
      else label.textContent = item.label;
      const parts: Node[] = [];
      if (hit?.rank !== undefined) {
        const r = document.createElement('span');
        r.className = 'fz-tile-rank';
        r.textContent = String(hit.rank);
        parts.push(r);
      }
      parts.push(label);
      if (hit && hit.score !== undefined && (opts.scores ?? true)) {
        const s = document.createElement('span');
        s.className = 'fz-tile-score';
        s.textContent = hit.score.toFixed(2);
        s.style.color = scoreColor(hit.score);
        parts.push(s);
      }
      tile.replaceChildren(...parts);
      const state = last === null ? 'idle' : hit ? 'hit' : 'miss';
      if (tile.dataset['state'] !== state && state === 'hit') {
        tile.animate([{ transform: 'scale(1.08)' }, { transform: 'none' }], { duration: 240, easing: 'ease-out' });
      }
      tile.dataset['state'] = state;
      tile.style.borderColor = hit?.score !== undefined ? scoreColor(hit.score) : '';
    }
  };

  const api: Shelf = {
    el,
    mark(hits) {
      last = hits;
      paint();
    },
    setItems(next) {
      const old = tiles;
      tiles = new Map();
      for (const item of next) {
        const tile = old.get(item.id)?.tile ?? document.createElement('div');
        tile.className = 'fz-tile';
        if (!old.has(item.id)) tile.animate([{ opacity: 0, transform: 'scale(0.7)' }, { opacity: 1, transform: 'none' }], { duration: 260 });
        tiles.set(item.id, { tile, item });
      }
      el.replaceChildren(...[...tiles.values()].map((t) => t.tile));
      paint();
    },
  };
  api.setItems(items);
  return api;
}
