// Paths: pathStroke null is a 1px line, a number draws a wide fat line
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const trips = [
  ['Beijing', 'Delhi', 'Tehran', 'Istanbul', 'Paris'],
  ['Cape Town', 'Johannesburg', 'Nairobi', 'Cairo', 'Madrid'],
  ['Tokyo', 'Manila', 'Jakarta', 'Perth', 'Sydney'],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['pathStroke: null', 'pathStroke: 0.6'],
    hint: 'Zoom: the 1px line never changes width; the fat line scales with the globe.',
  });
  const dark = await texture('dark');

  const paths = trips.map((names) => names.map((n) => [city(n).lat, city(n).lng]));

  const [left, right] = stage.panes;
  const thin = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .pathsData(paths)
    // null: a Three.js Line, 1px wide at any distance.
    .pathStroke(null)
    .pathColor(() => '#ffd166');

  const fat = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .pathsData(paths)
    // A number: a fat line that many angular degrees wide.
    .pathStroke(0.6)
    .pathColor(() => '#5ec8ff');

  if (stage.bar) {
    slider(stage.bar, 'Fat line width (deg)', 0.1, 2, 0.1, 0.6, (v) => fat.pathStroke(v), (v) => v.toFixed(1));
  }

  for (const g of [thin, fat]) {
    g.pointOfView({ lat: 10, lng: 40, altitude: stage.preview ? 3 : 2.8 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.8;
  }

  return stage.dispose;
};

export default mount;
