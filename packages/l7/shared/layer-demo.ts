// Layer-chapter demos: ghost tours, a DOM legend panel, sample rows with category fields
import type { Scene } from '@antv/l7';
import { type City, cities, gauss, rng } from './data.ts';
import type { Ghost } from './ghost.ts';
import type { Stage } from './stage.ts';

export interface Row {
  lng: number;
  lat: number;
  id: number;
  name: string;
  /** 'a' | 'b' | 'c', round-robin. */
  type: 'a' | 'b' | 'c';
  /** 1..100 */
  v: number;
  /** -50..50, for diverging scales. */
  delta: number;
}

const TYPES = ['a', 'b', 'c'] as const;

/** n rows scattered around the given cities (spread in degrees), with the fields the docs' snippets use. */
export function rows(n: number, opts: { seed?: number; spread?: number; around?: readonly City[] } = {}): Row[] {
  const r = rng(opts.seed ?? 5);
  const around = opts.around ?? cities;
  const spread = opts.spread ?? 2;
  return Array.from({ length: n }, (_, i) => {
    const c = around[Math.floor(r() * around.length)] ?? cities[0]!;
    return {
      lng: c.lng + gauss(r) * spread,
      lat: c.lat + gauss(r) * spread * 0.7,
      id: i,
      name: `n${i + 1}`,
      type: TYPES[i % 3] ?? 'a',
      v: Math.round(1 + 99 * r()),
      delta: Math.round(-50 + 100 * r()),
    };
  });
}

/** A cols x rows lattice around `center`, `step` degrees apart, with the same fields as rows(). */
export function grid(cols: number, nrows: number, center: [number, number] = [10, 46], step = 4, seed = 2): Row[] {
  const r = rng(seed);
  const out: Row[] = [];
  for (let y = 0; y < nrows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = out.length;
      out.push({
        lng: center[0] + (x - (cols - 1) / 2) * step * 1.4,
        lat: center[1] + ((nrows - 1) / 2 - y) * step,
        id: i,
        name: `n${i + 1}`,
        type: TYPES[i % 3] ?? 'a',
        v: Math.round(1 + 99 * r()),
        delta: Math.round(-50 + 100 * r()),
      });
    }
  }
  return out;
}

export const PARSER = { parser: { type: 'json', x: 'lng', y: 'lat' } } as const;

/**
 * Cards: a ghost pointer visits the [lng, lat] stops, resting on each and clicking on every
 * `clickEvery`-th visit. Returns the ghost (for custom steps). Never moves and clicks in one tick.
 */
export function tour(stage: Stage, scene: Scene, stops: readonly [number, number][], opts: { ms?: number; clickEvery?: number } = {}): Ghost {
  const { ms = 500, clickEvery = 2 } = opts;
  const ghost = stage.ghost(scene);
  stage.every(ms, (i) => {
    const visit = Math.floor((i - 1) / 2);
    if (i % 2 === 1) {
      const p = stops[visit % stops.length];
      if (p) ghost.moveTo(p);
    } else if (visit % clickEvery === 0) ghost.click();
  });
  return ghost;
}

/** A small legend panel in a corner of the map; call it with a title and swatch rows. */
export function legendPanel(
  container: HTMLElement,
  corner: 'tl' | 'tr' | 'bl' | 'br' = 'br',
): (title: string, items: readonly { label: string; color?: string }[]) => void {
  const panel = document.createElement('div');
  const v = corner[0] === 't' ? 'top:6px' : 'bottom:6px';
  const h = corner[1] === 'l' ? 'left:6px' : 'right:6px';
  panel.style.cssText = `position:absolute;${v};${h};z-index:4;padding:5px 8px;border-radius:4px;background:rgba(10,16,24,.88);color:#cfe3f7;font:11px/1.5 ui-monospace,monospace;pointer-events:none`;
  container.append(panel);
  return (title, items) => {
    panel.replaceChildren();
    const head = document.createElement('div');
    head.textContent = title;
    head.style.opacity = '.7';
    panel.append(head);
    for (const it of items) {
      const line = document.createElement('div');
      if (it.color) {
        const sw = document.createElement('i');
        sw.style.cssText = `display:inline-block;width:10px;height:10px;margin-right:6px;border-radius:2px;background:${it.color}`;
        line.append(sw);
      }
      line.append(it.label);
      panel.append(line);
    }
  };
}

/** Big, well spaced targets for event demos: the rows, their [lng, lat] stops and a gap between them. */
export function targets(preview: boolean): { data: Row[]; stops: [number, number][]; gap: [number, number] } {
  const data = grid(preview ? 3 : 5, 2, [10, 46], 5);
  const stops = data.map((r): [number, number] => [r.lng, r.lat]);
  const [a, b] = [stops[0], stops[1]];
  const gap: [number, number] = a && b ? [(a[0] + b[0]) / 2, a[1] - 2.5] : [10, 43.5];
  return { data, stops, gap };
}

/** A one-line description of a layer mouse event's payload: type, pixel, lng/lat, feature id, name. */
export function describe(e: { type?: string; x?: number; y?: number; lngLat?: { lng: number; lat: number }; featureId?: number | null; feature?: { properties?: { name?: string } } }): string {
  const at = e.lngLat ? `${e.lngLat.lng.toFixed(2)}, ${e.lngLat.lat.toFixed(2)}` : 'none';
  return [`type: ${e.type}`, `x, y: ${e.x?.toFixed(0)}, ${e.y?.toFixed(0)}`, `lngLat: ${at}`, `featureId: ${e.featureId}`, `feature.name: ${e.feature?.properties?.name}`].join('\n');
}

/** A circle of `radius` degrees as a GeoJSON polygon collection: the template shape for mask demos. */
export function disc(center: [number, number], radius: number, n = 64): { type: 'FeatureCollection'; features: unknown[] } {
  const ring = Array.from({ length: n + 1 }, (_, i) => {
    const a = ((i % n) / n) * Math.PI * 2;
    return [center[0] + Math.cos(a) * radius * 1.4, center[1] + Math.sin(a) * radius];
  });
  return { type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [ring] } }] };
}

type Ring = number[][];

/** One label point per feature (the middle of its largest outer ring's bounding box), with the feature's properties. */
export function labelPoints<P extends { name: string }>(fc: { features: { properties: P; geometry: unknown }[] }): (P & { lng: number; lat: number })[] {
  return fc.features.map((f) => {
    const g = f.geometry as { type: string; coordinates: unknown };
    const rings: Ring[] = g.type === 'Polygon' ? [(g.coordinates as Ring[])[0] ?? []] : (g.coordinates as Ring[][]).map((p) => p[0] ?? []);
    let best = { area: -1, lng: 0, lat: 0 };
    for (const ring of rings) {
      const xs = ring.map((p) => p[0] ?? 0);
      const ys = ring.map((p) => p[1] ?? 0);
      const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
      const area = (x1 - x0) * (y1 - y0);
      if (area > best.area) best = { area, lng: (x0 + x1) / 2, lat: (y0 + y1) / 2 };
    }
    return { ...f.properties, lng: best.lng, lat: best.lat };
  });
}

/** Runs fn once after `ms` (default 150), cancelled on dispose: for reads that need a finished render pass. */
export function later(stage: Stage, fn: () => void, ms = 150): void {
  const t = setTimeout(() => {
    if (!stage.disposed) fn();
  }, ms);
  stage.own(() => clearTimeout(t));
}
