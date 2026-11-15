// LonLatProjection, SphericalMercatorProjection and MercatorProjection: one graticule through each project()
import { LatLng, LonLatProjection, MercatorProjection, SphericalMercatorProjection } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, BLUE, createPlane, GREEN, ORANGE, type XY } from '../../shared/plane.ts';

const PROJECTIONS = {
  LonLatProjection: { p: LonLatProjection, color: BLUE },
  SphericalMercatorProjection: { p: SphericalMercatorProjection, color: ORANGE },
  MercatorProjection: { p: MercatorProjection, color: GREEN },
} as const;
type Name = keyof typeof PROJECTIONS;
const VIEW = [-200, -170, 400, 340] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each projection\'s project() turns [lat, lng] into x and y; here each result is scaled to a world 360 units wide. The faint lines are the other two. Spherical and elliptical Mercator agree on x and differ a little in y.' });
  const plane = createPlane(stage, VIEW);

  const lines = (name: Name): XY[][] => {
    const { p } = PROJECTIONS[name];
    const k = 360 / (p.bounds.max.x - p.bounds.min.x);
    const at = (lat: number, lng: number): XY => {
      const q = p.project(new LatLng(lat, lng));
      return { x: q.x * k, y: -q.y * k };
    };
    const out: XY[][] = [];
    for (let lng = -180; lng <= 180; lng += 30) out.push(Array.from({ length: 33 }, (_, i) => at(-80 + (i * 160) / 32, lng)));
    for (let lat = -80; lat <= 80; lat += 20) out.push(Array.from({ length: 25 }, (_, i) => at(lat, -180 + (i * 360) / 24)));
    return out;
  };

  const draw = (name: Name): void => {
    plane.clear();
    for (const other of Object.keys(PROJECTIONS) as Name[]) {
      if (other === name) continue;
      for (const l of lines(other)) plane.live.poly(l, { stroke: PROJECTIONS[other].color, width: 0.8, opacity: 0.35 });
    }
    for (const l of lines(name)) plane.live.poly(l, { stroke: PROJECTIONS[name].color, width: 1.4 });
    const { p } = PROJECTIONS[name];
    const q = p.project(new LatLng(60, 30));
    stage.say(`${name}.project([60, 30]) = (${q.x.toFixed(1)}, ${q.y.toFixed(1)}); bounds ${p.bounds.min.toString()} to ${p.bounds.max.toString()}`);
  };
  const names = Object.keys(PROJECTIONS) as Name[];
  draw('SphericalMercatorProjection');
  stage.select('Projection', names.map((v) => ({ value: v, label: v })), 'SphericalMercatorProjection', draw);

  if (stage.preview) animate(stage, (t) => draw(names[Math.floor(t / 2.5) % names.length] as Name));
  return () => stage.dispose();
};

export default mount;
