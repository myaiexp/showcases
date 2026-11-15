// pointResolution: how many sides each column has
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const sides = [3, 6, 32];
  const stage = createStage(el, ctx, { panes: sides.map((n) => `pointResolution(${n})`) });
  const dark = await texture('dark');

  stage.panes.forEach((pane, i) => {
    const globe = stage.own(new Globe(pane.container, { animateIn: false }), pane)
      .globeImageUrl(dark)
      .pointsData(cities)
      .pointRadius(1.6)
      .pointAltitude(0.12)
      .pointColor(() => '#f4a261')
      .pointResolution(sides[i]!);
    // Close in on Europe, where the columns are thick enough to count their sides.
    globe.pointOfView({ lat: 38, lng: 12, altitude: 0.7 });
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.3;
  });

  return stage.dispose;
};

export default mount;
