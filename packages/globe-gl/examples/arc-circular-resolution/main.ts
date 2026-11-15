// Arcs: arcCircularResolution is how many slices round a tube's circumference
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['arcCircularResolution: 3', 'arcCircularResolution: 24'],
    hint: 'Fat tubes seen close up: three slices make a triangular rod, 24 a round one.',
  });
  const dark = await texture('dark');

  const a = city('Paris');
  const b = city('Cairo');
  const link = { name: 'Paris to Cairo', startLat: a.lat, startLng: a.lng, endLat: b.lat, endLng: b.lng };

  const [left, right] = stage.panes;
  const rough = stage.own(new Globe(left!.container), left)
    .globeImageUrl(dark)
    .arcsData([link])
    // Only tubes (a defined arcStroke) have a circumference to divide.
    .arcStroke(3)
    .arcCircularResolution(3)
    .arcColor(() => ['#ffd166', '#ef476f']);

  const round = stage.own(new Globe(right!.container), right)
    .globeImageUrl(dark)
    .arcsData([link])
    .arcStroke(3)
    .arcCircularResolution(24)
    .arcColor(() => ['#5ec8ff', '#7b2ff7']);

  if (stage.bar) {
    slider(stage.bar, 'Left pane slices', 3, 24, 1, 3, (v) => rough.arcCircularResolution(v));
  }

  for (const g of [rough, round]) {
    g.pointOfView({ lat: 40, lng: 17, altitude: 0.9 });
    g.controls().autoRotate = true;
    g.controls().autoRotateSpeed = 1;
  }

  return stage.dispose;
};

export default mount;
