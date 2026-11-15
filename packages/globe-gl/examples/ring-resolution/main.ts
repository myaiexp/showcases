// Rings: ringResolution is how many segments make up each circle
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['ringResolution: 6', 'ringResolution: 64 (default)'],
    hint: 'Wide rings show the difference: six segments draw a hexagon, 64 a circle.',
  });
  const dark = await texture('dark');
  const spots = [
    { lat: 20, lng: -10 },
    { lat: -15, lng: 30 },
  ];

  const [left, right] = stage.panes;
  const rough = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .ringsData(spots)
    .ringMaxRadius(30)
    .ringPropagationSpeed(15)
    .ringResolution(6)
    .ringColor(() => '#ffd166');

  const smooth = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .ringsData(spots)
    .ringMaxRadius(30)
    .ringPropagationSpeed(15)
    .ringResolution(64)
    .ringColor(() => '#5ec8ff');

  if (stage.bar) {
    slider(stage.bar, 'Left pane segments', 3, 64, 1, 6, (v) => rough.ringResolution(v));
  }

  for (const g of [rough, smooth]) {
    g.pointOfView({ lat: 5, lng: 10, altitude: stage.preview ? 2.6 : 2.3 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 0.3;
  }

  return stage.dispose;
};

export default mount;
