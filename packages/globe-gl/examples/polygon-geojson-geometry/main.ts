// Polygons: polygonGeoJsonGeometry reads shapes from a custom field, skips others
import Globe from 'globe.gl';
import type { Geometry } from 'geojson';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { country } from '../../shared/world.ts';

// Not GeoJSON Features: plain records whose shape lives in `outline`.
interface Zone {
  label: string;
  outline: Geometry;
  color: string;
}

const box = (w: number, s: number, e: number, n: number): number[][] => [[w, s], [e, s], [e, n], [w, n], [w, s]];

const zones: Zone[] = [
  { label: 'Hand-drawn square', color: '#ff6b6b', outline: { type: 'Polygon', coordinates: [box(-40, 0, -20, 20)] } },
  {
    label: 'MultiPolygon: two islands',
    color: '#ffd166',
    outline: { type: 'MultiPolygon', coordinates: [[box(60, -30, 75, -15)], [box(85, -30, 100, -15)]] },
  },
  {
    label: 'Polygon with a hole',
    color: '#06d6a0',
    outline: { type: 'Polygon', coordinates: [box(100, 20, 140, 50), box(110, 28, 130, 42).reverse()] },
  },
  // Only Polygon and MultiPolygon are drawn: this line is skipped (with a console warning).
  { label: 'LineString (skipped)', color: '#ffffff', outline: { type: 'LineString', coordinates: [[-100, -10], [-60, -40]] } },
  ...['Brazil', 'Egypt', 'Australia'].map((n) => ({ label: n, color: '#5ec8ff', outline: country(n).geometry })),
];

// three-globe types `coordinates` as number[], so the nested arrays need a cast.
const outline = (d: object): never => (d as Zone).outline as never;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each record keeps its shape in `outline`, not the default `geometry`.' });
  const dark = await texture('dark');
  // The LineString triggers three-globe's "Unsupported GeoJson geometry" warning once; hide it from the card.
  const data = stage.preview ? zones.filter((z) => z.outline.type !== 'LineString') : zones;

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .polygonsData(data)
    .polygonGeoJsonGeometry(outline)
    .polygonCapColor((d) => (d as Zone).color)
    .polygonSideColor(() => 'rgba(255,255,255,0.25)')
    .polygonAltitude(0.04)
    .polygonLabel((d) => (d as Zone).label);

  globe.pointOfView({ lat: 5, lng: 30, altitude: 2.6 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.9;

  if (stage.bar) {
    checkbox(stage.bar, 'Attribute name instead of a function', false, (on) => {
      globe.polygonGeoJsonGeometry(on ? 'outline' : outline);
    });
  }
  return stage.dispose;
};

export default mount;
