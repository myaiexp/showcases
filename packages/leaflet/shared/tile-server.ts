// Pretend tile and WMS server: answers *.example tile URLs with tiles painted locally
import { paint, PARTS, STYLES, type Part, type PaintSpec, type Style } from './paint.ts';
import type { Box } from './world.ts';

/**
 * The server's answer to a request it can't serve: a data URL that fails to decode, so the
 * <img> fires `error` exactly as a 404 would (TileLayer then fires `tileerror` and shows
 * `errorTileUrl`). Nothing touches the network.
 */
export const NOT_FOUND = 'data:image/png;base64,AA==';
/** Zoom levels the XYZ/TMS endpoints serve; deeper requests get NOT_FOUND. */
export const MAX_SERVER_ZOOM = 18;

const R = 6378137;
const MAX_LAT = 85.0511287798;
const E = 0.0818191908426;
const D2R = Math.PI / 180;

const XYZ_PARTS: ReadonlySet<Part> = new Set(['ocean', 'land', 'coast', 'borders', 'labels', 'graticule']);

/** Normalized Web Mercator y (0 at the top, 1 at the bottom) for a latitude. */
const mercY = (lat: number): number => {
  const s = Math.sin(Math.max(-MAX_LAT, Math.min(MAX_LAT, lat)) * D2R);
  return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
};
const latOfMercY = (y: number): number => (Math.atan(Math.sinh(Math.PI * (1 - 2 * y))) * 180) / Math.PI;

const cache = new Map<string, string>();
const CACHE_MAX = 240;

function render(spec: PaintSpec): string {
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(spec.w * spec.scale);
  canvas.height = Math.round(spec.h * spec.scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return NOT_FOUND;
  paint(ctx, spec);
  return canvas.toDataURL('image/png');
}

/**
 * `/{style?}/{z}/{x}/{y}{@2x?}.png` on tiles.example (XYZ) or tms.example (y counted from the
 * bottom). `?layers=labels,coast` paints only those parts, on a transparent background unless
 * `ocean` is one of them.
 */
function xyz(url: URL, tms: boolean): string {
  const seg = url.pathname.split('/').filter(Boolean);
  const file = seg.pop() ?? '';
  const m = /^(\d+)(@2x)?\.(png|jpg|jpeg)$/.exec(file);
  const x = Number(seg.pop());
  const z = Number(seg.pop());
  const style = (seg.pop() ?? 'dark') as Style;
  if (!m || !Number.isInteger(x) || !Number.isInteger(z) || !STYLES.includes(style) || seg.length > 0) return NOT_FOUND;
  const n = 2 ** z;
  const yIn = Number(m[1]);
  const y = tms ? n - 1 - yIn : yIn;
  if (z < 0 || z > MAX_SERVER_ZOOM || x < 0 || x >= n || y < 0 || y >= n) return NOT_FOUND;
  const size = 256;
  const picked = url.searchParams.get('layers');
  const parts: ReadonlySet<Part> = picked
    ? new Set(picked.split(',').filter((p): p is Part => (PARTS as readonly string[]).includes(p)))
    : style === 'grid'
      ? new Set([...XYZ_PARTS, 'tilegrid'])
      : XYZ_PARTS;
  const bounds: Box = [latOfMercY((y + 1) / n), (x / n) * 360 - 180, latOfMercY(y / n), ((x + 1) / n) * 360 - 180];
  return render({
    w: size,
    h: size,
    scale: m[2] ? 2 : 1,
    zoom: z,
    project: (lng, lat) => [((lng + 180) / 360) * n * size - x * size, mercY(lat) * n * size - y * size],
    bounds,
    style,
    parts,
    note: `z${z} x${x} y${yIn}${tms ? ' (tms)' : ''}`,
  });
}

/** Inverse of EPSG:3395's northing, by fixed-point iteration (converges in a few steps). */
function latOf3395(my: number): number {
  const ts = Math.exp(-my / R);
  let phi = Math.PI / 2 - 2 * Math.atan(ts);
  for (let i = 0; i < 8; i++) {
    const con = E * Math.sin(phi);
    phi = Math.PI / 2 - 2 * Math.atan(ts * ((1 - con) / (1 + con)) ** (E / 2));
  }
  return phi / D2R;
}

/** WMS GetMap: LAYERS picks parts, STYLES picks the look, BBOX/CRS/WIDTH/HEIGHT the window. */
function wms(url: URL): string {
  const q = new Map([...url.searchParams].map(([k, v]) => [k.toUpperCase(), v]));
  if ((q.get('REQUEST') ?? '').toLowerCase() !== 'getmap') return NOT_FOUND;
  const w = Number(q.get('WIDTH'));
  const h = Number(q.get('HEIGHT'));
  const box = (q.get('BBOX') ?? '').split(',').map(Number);
  const crs = (q.get('CRS') ?? q.get('SRS') ?? '').toUpperCase();
  const layers = (q.get('LAYERS') ?? '').split(',').filter((p): p is Part => (PARTS as readonly string[]).includes(p));
  const style = (q.get('STYLES')?.split(',')[0] || 'dark') as Style;
  if (!(w > 0 && h > 0) || box.length !== 4 || box.some((v) => !Number.isFinite(v)) || layers.length === 0) return NOT_FOUND;
  if (!STYLES.includes(style)) return NOT_FOUND;
  const parts = new Set<Part>(layers);
  if ((q.get('TRANSPARENT') ?? '').toLowerCase() !== 'true' && !parts.has('ocean')) parts.add('ocean');
  const [a = 0, b = 0, c = 0, d = 0] = box;
  let project: PaintSpec['project'];
  let bounds: Box;
  if (crs === 'EPSG:4326') {
    // WMS 1.3.0 orders EPSG:4326 axes lat, lng; 1.1.1 orders them lng, lat.
    const latFirst = (q.get('VERSION') ?? '1.1.1') >= '1.3';
    const [s, west, n, east] = latFirst ? [a, b, c, d] : [b, a, d, c];
    project = (lng, lat) => [((lng - west) / (east - west)) * w, ((n - lat) / (n - s)) * h];
    bounds = [s, west, n, east];
  } else if (crs === 'EPSG:3857' || crs === 'EPSG:900913' || crs === 'EPSG:3395') {
    const ellipsoid = crs === 'EPSG:3395';
    const north = (lat: number): number => {
      const phi = Math.max(-MAX_LAT, Math.min(MAX_LAT, lat)) * D2R;
      const t = Math.tan(Math.PI / 4 + phi / 2);
      if (!ellipsoid) return R * Math.log(t);
      const con = E * Math.sin(phi);
      return R * Math.log(t * ((1 - con) / (1 + con)) ** (E / 2));
    };
    project = (lng, lat) => [((R * lng * D2R - a) / (c - a)) * w, ((d - north(lat)) / (d - b)) * h];
    const inv = ellipsoid ? latOf3395 : (my: number): number => (2 * Math.atan(Math.exp(my / R)) - Math.PI / 2) / D2R;
    bounds = [inv(b), a / R / D2R, inv(d), c / R / D2R];
  } else {
    return NOT_FOUND;
  }
  const degPerPx = (bounds[3] - bounds[1]) / w;
  const zoom = Math.max(0, Math.round(Math.log2(360 / 256 / degPerPx)));
  return render({ w, h, scale: 1, zoom, project, bounds, style, parts, note: `WMS ${crs}` });
}

/**
 * Answers one tile request. Hosts: `tiles.example` and any subdomain of it (XYZ),
 * `tms.example` (TMS), `wms.example` (WMS GetMap). `down.tiles.example` is a subdomain that is
 * always down (every request fails), for `errorTileUrl` and `tileerror` examples. Anything
 * else is NOT_FOUND.
 */
export function serveTile(requestUrl: string): string {
  const hit = cache.get(requestUrl);
  if (hit) {
    cache.delete(requestUrl);
    cache.set(requestUrl, hit);
    return hit;
  }
  let url: URL;
  try {
    url = new URL(requestUrl);
  } catch {
    return NOT_FOUND;
  }
  const host = url.hostname;
  const out =
    host === 'down.tiles.example'
      ? NOT_FOUND
      : host === 'tiles.example' || host.endsWith('.tiles.example')
        ? xyz(url, false)
        : host === 'tms.example'
          ? xyz(url, true)
          : host === 'wms.example'
            ? wms(url)
            : NOT_FOUND;
  if (out !== NOT_FOUND) {
    cache.set(requestUrl, out);
    if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value as string);
  }
  return out;
}
