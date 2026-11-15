// Rings: ringAltitude lifts the rings off the surface, in globe radii
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['ringAltitude: 0.0015 (default)', 'ringAltitude: 0.3'],
    hint: 'The camera skims the horizon: the right-hand rings hover above the surface instead of lying on it.',
  });
  const dark = await texture('dark');
  const spots = [
    { lat: 0, lng: -20 },
    { lat: 10, lng: 5 },
    { lat: -5, lng: 30 },
  ];

  const [left, right] = stage.panes;
  const ground = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .ringsData(spots)
    .ringMaxRadius(12)
    .ringPropagationSpeed(6)
    .ringColor(() => '#ffd166');

  const high = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .ringsData(spots)
    .ringMaxRadius(12)
    .ringPropagationSpeed(6)
    // A number or a function of the ring; the same height for all here.
    .ringAltitude(0.3)
    .ringColor(() => '#5ec8ff');

  if (stage.bar) {
    slider(stage.bar, 'Right altitude', 0, 0.6, 0.02, 0.3, (v) => high.ringAltitude(v), (v) => v.toFixed(2));
  }

  for (const g of [ground, high]) {
    // Look at the globe edge-on so the height shows.
    g.pointOfView({ lat: 0, lng: 5, altitude: stage.preview ? 2.3 : 2.1 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.3;
  }

  return stage.dispose;
};

export default mount;
