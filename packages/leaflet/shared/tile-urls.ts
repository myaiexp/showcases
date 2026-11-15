// Tile request helpers: what URL Leaflet built for a tile, tile counters, URL formatting
import type { Coords, TileLayer } from 'leaflet';

/** A layer that can say which URL Leaflet built for tile coords (LocalTileLayer, LocalWMSTileLayer). */
export type UrlLayer = TileLayer & { requestUrl(coords: Coords): string };

/** `z3 x5 y2`: a tile's coords as the grid style prints them. */
export const coordsLabel = (c: Coords): string => `z${c.z} x${c.x} y${c.y}`;

/** The URL without its scheme, so it fits a caption. */
export const shortUrl = (url: string): string => url.replace(/^https:\/\//, '');

/** A GetMap URL as one line per query parameter, decoded. */
export function wmsLines(url: string): string {
  const u = new URL(url);
  return [`${u.host}${u.pathname}`, ...[...u.searchParams].map(([k, v]) => `  ${k}=${v}`)].join('\n');
}

/** Calls `fn` with the URL Leaflet built each time the layer starts loading a tile. */
export function onRequest(layer: UrlLayer, fn: (url: string, coords: Coords) => void): void {
  layer.on('tileloadstart', (e) => fn(layer.requestUrl(e.coords), e.coords));
}

export interface TileCounts {
  requested: number;
  loaded: number;
  failed: number;
  unloaded: number;
}

/** Counts tile events on `layer`; `reset()` zeroes the counts. */
export function countTiles(layer: TileLayer, onChange?: (c: TileCounts) => void): { counts: TileCounts; reset(): void } {
  const counts: TileCounts = { requested: 0, loaded: 0, failed: 0, unloaded: 0 };
  const bump = (k: keyof TileCounts) => () => {
    counts[k]++;
    onChange?.(counts);
  };
  layer.on('tileloadstart', bump('requested'));
  layer.on('tileload', bump('loaded'));
  layer.on('tileerror', bump('failed'));
  layer.on('tileunload', bump('unloaded'));
  return {
    counts,
    reset() {
      counts.requested = counts.loaded = counts.failed = counts.unloaded = 0;
      onChange?.(counts);
    },
  };
}
