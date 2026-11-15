// Offline tile server: tiles made in code, handed to L7 through Scene.addProtocol
import { type ILayer, Scene } from '@antv/l7';
import type { Stage } from './stage.ts';

export interface Tile {
  z: number;
  x: number;
  y: number;
}

/** [west, south, east, north] of a Web Mercator tile, in degrees. */
export function tileBounds({ z, x, y }: Tile): [number, number, number, number] {
  const n = 2 ** z;
  const lat = (row: number): number => (Math.atan(Math.sinh(Math.PI * (1 - (2 * row) / n))) * 180) / Math.PI;
  return [(x / n) * 360 - 180, lat(y + 1), ((x + 1) / n) * 360 - 180, lat(y)];
}

/** The z/x/y of a request URL: the last three path segments (TMS), or L7's WMTS query keys. */
export function tileOf(url: string): Tile {
  const q = /TILEMATRIX=(\d+).*TILECOL=(\d+).*TILEROW=(\d+)|TILECOL=(\d+).*TILEROW=(\d+).*TILEMATRIX=(\d+)/.exec(url);
  if (q) {
    const [a, b, c, d, e, f] = q.slice(1).map(Number);
    return a !== undefined && !Number.isNaN(a) ? { z: a, x: b ?? 0, y: c ?? 0 } : { z: f ?? 0, x: d ?? 0, y: e ?? 0 };
  }
  const [z = 0, x = 0, y = 0] = url.split('/').slice(-3).map(Number);
  return { z, x, y };
}

export interface ServeOptions {
  /** Pretend latency in ms before each tile is answered. */
  delay?: number;
  /** Called for every request with its URL, before the answer. */
  onRequest?: (url: string) => void;
}

/**
 * Registers `${name}://...` as a data protocol (Scene.addProtocol) whose tiles come from
 * `make`, and removes it on dispose. A source URL of just `${name}://tiles` gets
 * `/{z}/{x}/{y}` appended by L7, so no request ever leaves the page. Protocols are
 * page-wide: `name` must be unique to the example.
 */
export function serve(stage: Stage, name: string, make: (url: string) => ArrayBuffer | Promise<ArrayBuffer>, opts: ServeOptions = {}): void {
  Scene.addProtocol(name, (params, callback) => {
    let cancelled = false;
    const url = String(params.url);
    opts.onRequest?.(url);
    const done = (data: ArrayBuffer): void => {
      if (!cancelled && !stage.disposed) callback(null, data);
    };
    const run = (): void => {
      Promise.resolve(make(url)).then(done, (err: unknown) => {
        if (!cancelled && !stage.disposed) callback(err instanceof Error ? err : new Error(String(err)));
      });
    };
    const timer = opts.delay ? setTimeout(run, opts.delay) : undefined;
    if (!timer) run();
    return {
      cancel: () => {
        cancelled = true;
        clearTimeout(timer);
      },
    };
  });
  stage.own(() => Scene.removeProtocol(name));
}

/** The part of a tile layer's source and TilesetManager the tile examples use (L7 types neither). */
export interface TileSourceLike {
  tileset: {
    isLoaded: boolean;
    currentTiles: Tile[];
    currentZoom: number;
    on(event: 'tiles-load-start' | 'tiles-load-finished', fn: () => void): void;
    off(event: 'tiles-load-start' | 'tiles-load-finished', fn: () => void): void;
  };
  reloadAllTile(): void;
  /** The docs call it reloadTileById; on the Source of 2.29.1 the method is spelled reloadTilebyId. */
  reloadTilebyId(z: number, x: number, y: number): void;
  reloadTileByExtent(extent: [number, number, number, number], zoom: number): void;
  reloadTileByLnglat(lng: number, lat: number, zoom: number): void;
}

/** Calls fn(source) once the layer's tile source has its tileset (after the layer initialises). */
export function whenTiles(stage: Stage, layer: ILayer, fn: (source: TileSourceLike) => void): void {
  let tries = 0;
  const timer = setInterval(() => {
    const source = layer.getSource() as unknown as TileSourceLike | undefined;
    if (source?.tileset) {
      clearInterval(timer);
      if (!stage.disposed) fn(source);
    } else if (++tries > 200) clearInterval(timer);
  }, 100);
  stage.own(() => clearInterval(timer));
}

/**
 * Returns show(next): adds the next tile layer, and removes the previous one once the new
 * tiles have loaded (or after 1.5 s), so swapping options never flashes an empty map.
 */
export function swapTiles(stage: Stage, scene: Scene): (next: ILayer) => ILayer {
  let current: ILayer | undefined;
  return (next) => {
    const old = current;
    current = next;
    scene.addLayer(next);
    if (old) {
      let gone = false;
      const drop = (): void => {
        if (gone) return;
        gone = true;
        if (!stage.disposed) scene.removeLayer(old);
      };
      const timer = setTimeout(drop, 1500);
      stage.own(() => clearTimeout(timer));
      whenTiles(stage, next, (source) => {
        const done = (): void => {
          source.tileset.off('tiles-load-finished', done);
          drop();
        };
        source.tileset.on('tiles-load-finished', done);
      });
    }
    return next;
  };
}
