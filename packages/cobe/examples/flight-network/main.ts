// Flight network: one hub, arcs to ten cities coloured by distance or by region
import createGlobe from 'cobe';
import type { Arc } from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { badge } from '../../shared/overlay.ts';
import { PLACES, type LatLon } from '../../shared/places.ts';

const hub = PLACES.dubai;
const DEST = [PLACES.london, PLACES.paris, PLACES.lagos, PLACES.capetown, PLACES.mumbai, PLACES.singapore, PLACES.tokyo, PLACES.sydney, PLACES.nyc, PLACES.saopaulo];

type Rgb = [number, number, number];
const REGION: Rgb[] = [[0.4, 0.7, 1], [1, 0.75, 0.3], [0.5, 1, 0.5]];

function km([la1, lo1]: LatLon, [la2, lo2]: LatLon): number {
  const r = Math.PI / 180;
  const a = Math.sin(((la2 - la1) * r) / 2) ** 2 + Math.cos(la1 * r) * Math.cos(la2 * r) * Math.sin(((lo2 - lo1) * r) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(a));
}
const byDistance = (d: number): Rgb => {
  const f = Math.min(1, d / 14000);
  return [0.3 + 0.7 * f, 1 - 0.6 * f, 0.5 - 0.3 * f];
};
const byRegion = (lon: number): Rgb => (lon < -30 ? REGION[0]! : lon < 60 ? REGION[1]! : REGION[2]!);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Colour is a per-arc color; arcColor only fills in arcs that have none.' });
  let mode: 'distance' | 'region' = 'distance';
  const build = (): Arc[] =>
    DEST.map((p) => ({
      from: hub.location,
      to: p.location,
      color: mode === 'distance' ? byDistance(km(hub.location, p.location)) : byRegion(p.location[1]),
    }));

  const globe = createGlobe(stage.canvas, {
    devicePixelRatio: stage.dpr,
    width: stage.width,
    height: stage.height,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [1, 0.5, 0.2],
    glowColor: [0.2, 0.2, 0.25],
    markers: [{ location: hub.location, size: 0.06 }, ...DEST.map((p) => ({ location: p.location, size: 0.03 }))],
    markerElevation: 0.01,
    arcs: build(),
    arcColor: [0.3, 0.5, 1],
    arcWidth: 0.4,
    arcHeight: 0.25,
  });
  stage.own(globe);

  const tag = badge(stage.layer, '', 'top-left');
  if (stage.bar) select(stage.bar, 'Colour by', ['distance', 'region'] as const, (v) => (mode = v));

  let phi = 0;
  let t = 0;
  stage.loop((dt) => {
    phi += 0.004;
    t += dt;
    if (stage.preview && t > 4) {
      t = 0;
      mode = mode === 'distance' ? 'region' : 'distance';
    }
    tag.textContent = `hub ${hub.name}\nby ${mode}`;
    globe.update({ phi, arcs: build() });
  });

  return stage.dispose;
};

export default mount;
