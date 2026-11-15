// Rings: ringPropagationSpeed in degrees a second, negative runs inwards
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['ringPropagationSpeed: 6', 'ringPropagationSpeed: -6'],
    hint: 'Positive speeds spread outwards. Negative ones start at the maximum radius and shrink to the centre.',
  });
  const dark = await texture('dark');
  const spots = cities.filter((c) => ['Tokyo', 'Delhi', 'Cairo', 'Lagos', 'Moscow', 'London', 'Mumbai', 'Istanbul'].includes(c.name));

  const [left, right] = stage.panes;
  const out = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .ringsData(spots)
    .ringMaxRadius(9)
    .ringPropagationSpeed(6)
    .ringColor(() => '#ffd166');

  const inward = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .ringsData(spots)
    .ringMaxRadius(9)
    .ringPropagationSpeed(-6)
    .ringColor(() => '#5ec8ff');

  if (stage.bar) {
    slider(stage.bar, 'Left speed (deg/s)', 1, 20, 1, 6, (v) => out.ringPropagationSpeed(v));
    slider(stage.bar, 'Right speed (deg/s)', -20, -1, 1, -6, (v) => inward.ringPropagationSpeed(v));
  }

  for (const g of [out, inward]) {
    g.pointOfView({ lat: 30, lng: 45, altitude: stage.preview ? 2.8 : 2.5 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.5;
  }

  return stage.dispose;
};

export default mount;
