// Paths: pathDash props run animated dashes along each path
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const trips = [
  ['Beijing', 'Delhi', 'Tehran', 'Istanbul', 'Paris'],
  ['Cape Town', 'Johannesburg', 'Nairobi', 'Cairo', 'Madrid'],
  ['Los Angeles', 'Mexico City', 'Bogotá', 'Lima', 'Santiago'],
  ['Tokyo', 'Manila', 'Jakarta', 'Perth', 'Sydney'],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Lengths are shares of each whole path; the initial gap delays the first dash.' });
  const dark = await texture('dark');

  const paths = trips.map((names) => names.map((n) => [city(n).lat, city(n).lng]));

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .pathsData(paths)
    .pathColor(() => ['#08f7fe', '#fe53bb'])
    .pathStroke(0.4)
    .pathDashLength(0.2)
    .pathDashGap(0.15)
    .pathDashInitialGap(0)
    // Time for a dash to cross a whole path; 0 stops the motion.
    .pathDashAnimateTime(3000);

  if (stage.bar) {
    slider(stage.bar, 'Dash length', 0.05, 1, 0.05, 0.2, (v) => globe.pathDashLength(v), (v) => v.toFixed(2));
    slider(stage.bar, 'Gap', 0, 1, 0.05, 0.15, (v) => globe.pathDashGap(v), (v) => v.toFixed(2));
    slider(stage.bar, 'Initial gap', 0, 1, 0.05, 0, (v) => globe.pathDashInitialGap(v), (v) => v.toFixed(2));
    slider(stage.bar, 'Animate time (ms)', 0, 8000, 250, 3000, (v) => globe.pathDashAnimateTime(v));
  }

  globe.pointOfView({ lat: 10, lng: 40, altitude: 2.6 });
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 0.5;

  return stage.dispose;
};

export default mount;
