// showAtmosphere: the bright halo around the globe, on and off
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { panes: ['showAtmosphere(true)', 'showAtmosphere(false)'] });
  const day = await texture('day');

  stage.panes.forEach((pane, i) => {
    const globe = stage.own(new Globe(pane.container), pane).globeImageUrl(day).showAtmosphere(i === 0);
    globe.controls().autoRotate = true;
  });

  return stage.dispose;
};

export default mount;
