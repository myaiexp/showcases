// Lights a shelf from extended-search results, optionally tinted by OR group
import type { FuseResult } from 'fuse.js';
import { tintTile } from './ext-reading.ts';
import type { Hit, Shelf } from './shelf.ts';

export interface LightOptions<T> {
  /** refIndex to OR-group number: tints the tile and numbers it. */
  groups?: ReadonlyMap<number, number>;
  /** Replacement label nodes for a hit, e.g. with matched letters marked. */
  nodes?: (r: FuseResult<T>) => Node[] | undefined;
}

/** Tiles are expected in the same order as the list the Fuse instance searched. */
export function lightUp<T>(tiles: Shelf, results: readonly FuseResult<T>[] | null, opts: LightOptions<T> = {}): void {
  if (results === null) {
    tiles.mark(null);
  } else {
    const hits = new Map<number, Hit>();
    for (const r of results) {
      const g = opts.groups?.get(r.refIndex);
      const nodes = opts.nodes?.(r);
      hits.set(r.refIndex, { ...(g !== undefined ? { rank: g + 1 } : {}), ...(nodes ? { nodes } : {}) });
    }
    tiles.mark(hits);
  }
  [...tiles.el.children].forEach((tile, i) => {
    const g = results === null ? undefined : opts.groups?.get(i);
    tintTile(tile, g ?? null);
  });
}
