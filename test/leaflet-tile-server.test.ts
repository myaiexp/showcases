// @vitest-environment happy-dom
// The pretend tile server reads tile and WMS URLs the way a real server would
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { PaintSpec } from '../packages/leaflet/shared/paint.ts';

const painted: PaintSpec[] = [];

// Painting needs a real canvas; the spec it is handed is what these tests check.
vi.mock('../packages/leaflet/shared/paint.ts', () => ({
  STYLES: ['dark', 'light', 'terrain', 'vintage', 'night', 'grid'],
  PARTS: ['ocean', 'land', 'coast', 'borders', 'graticule', 'labels', 'tilegrid'],
  paint: (_ctx: unknown, spec: PaintSpec) => painted.push(spec),
}));

const { serveTile, NOT_FOUND } = await import('../packages/leaflet/shared/tile-server.ts');

beforeEach(() => {
  painted.length = 0;
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as CanvasRenderingContext2D);
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockImplementation(function (this: HTMLCanvasElement) {
    return `data:image/png;base64,${this.width}x${this.height}-${Math.random()}`;
  });
});

const last = (): PaintSpec => {
  const spec = painted.at(-1);
  if (!spec) throw new Error('nothing painted');
  return spec;
};
const near = (a: [number, number], b: [number, number]): void => {
  expect(a[0]).toBeCloseTo(b[0], 3);
  expect(a[1]).toBeCloseTo(b[1], 3);
};

describe('XYZ and TMS', () => {
  it('maps a tile to its slice of Web Mercator', () => {
    expect(serveTile('https://tiles.example/1/1/0.png')).not.toBe(NOT_FOUND);
    const spec = last();
    expect(spec.w).toBe(256);
    expect(spec.zoom).toBe(1);
    near(spec.project(0, 0), [0, 256]);
    near(spec.project(180, 0), [256, 256]);
    expect(spec.bounds[1]).toBeCloseTo(0);
    expect(spec.bounds[3]).toBeCloseTo(180);
  });

  it('counts TMS rows from the bottom', () => {
    serveTile('https://tms.example/2/1/3.png');
    const tms = last();
    serveTile('https://tiles.example/2/1/0.png');
    const xyz = last();
    expect(tms.bounds).toEqual(xyz.bounds);
    expect(tms.note).toContain('(tms)');
  });

  it('serves @2x tiles at double resolution, styles from the path, parts from ?layers', () => {
    serveTile('https://a.tiles.example/night/3/2/2@2x.png');
    expect(last().scale).toBe(2);
    expect(last().style).toBe('night');
    serveTile('https://tiles.example/3/2/2.png?layers=labels,coast');
    expect([...last().parts].sort()).toEqual(['coast', 'labels']);
  });

  it('fails what a real server would 404', () => {
    for (const url of [
      'https://down.tiles.example/3/2/2.png',
      'https://tiles.example/19/0/0.png',
      'https://tiles.example/2/4/0.png',
      'https://tiles.example/2/0/-1.png',
      'https://tiles.example/sepia/2/0/0.png',
      'https://tile.openstreetmap.org/2/0/0.png',
      'not a url',
    ]) {
      expect(serveTile(url), url).toBe(NOT_FOUND);
    }
  });
});

describe('WMS', () => {
  const base = 'https://wms.example/ows?SERVICE=WMS&REQUEST=GetMap&LAYERS=land,coast&STYLES=&FORMAT=image/png&WIDTH=256&HEIGHT=256';

  it('reads an EPSG:3857 BBOX in meters', () => {
    const r = 20037508.342789244;
    serveTile(`${base}&VERSION=1.1.1&SRS=EPSG:3857&BBOX=${-r},${-r},${r},${r}`);
    near(last().project(0, 0), [128, 128]);
    near(last().project(-180, 0), [0, 128]);
  });

  it('reads an EPSG:3395 BBOX on the ellipsoid, and inverts its northing for the bounds', () => {
    const r = 20037508.342789244;
    // World Mercator northing of 60°N on WGS84 (R·ln(tan(π/4+φ/2)·((1−e·sinφ)/(1+e·sinφ))^(e/2))).
    const n60 = 8362698.548500749;
    serveTile(`${base}&VERSION=1.1.1&SRS=EPSG:3395&BBOX=${-r},0,${r},${n60}`);
    near(last().project(0, 0), [128, 256]);
    near(last().project(0, 60), [128, 0]);
    expect(last().bounds[2]).toBeCloseTo(60, 6);
    expect(last().bounds[0]).toBeCloseTo(0, 6);
  });

  it('orders EPSG:4326 axes lat,lng in 1.3.0 and lng,lat in 1.1.1', () => {
    serveTile(`${base}&VERSION=1.3.0&CRS=EPSG:4326&BBOX=0,10,20,30`);
    expect(last().bounds).toEqual([0, 10, 20, 30]);
    serveTile(`${base}&VERSION=1.1.1&SRS=EPSG:4326&BBOX=10,0,30,20`);
    expect(last().bounds).toEqual([0, 10, 20, 30]);
  });

  it('adds the ocean unless TRANSPARENT=true', () => {
    // A BBOX no other test asks for: the server caches answers by URL.
    serveTile(`${base}&VERSION=1.1.1&SRS=EPSG:4326&BBOX=40,0,60,20`);
    expect(last().parts.has('ocean')).toBe(true);
    serveTile(`${base}&VERSION=1.1.1&SRS=EPSG:4326&BBOX=40,0,60,20&TRANSPARENT=true`);
    expect(last().parts.has('ocean')).toBe(false);
  });

  it('rejects unknown CRSs, layers and requests', () => {
    expect(serveTile(`${base}&SRS=EPSG:27700&BBOX=0,0,1,1`)).toBe(NOT_FOUND);
    expect(serveTile(base.replace('land,coast', 'roads') + '&SRS=EPSG:4326&BBOX=0,0,1,1')).toBe(NOT_FOUND);
    expect(serveTile(base.replace('GetMap', 'GetCapabilities') + '&SRS=EPSG:4326&BBOX=0,0,1,1')).toBe(NOT_FOUND);
  });
});
