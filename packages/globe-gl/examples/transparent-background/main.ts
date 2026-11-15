// A transparent canvas: an alpha backgroundColor lets the page show through
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import './style.css';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The gradient and the grid are plain CSS on the element under the canvas.' });
  stage.container.classList.add('backdrop');
  const day = await texture('day');

  // The renderer is created with alpha: true by default, so a transparent colour shows through.
  const globe = stage.own(new Globe(stage.container))
    .backgroundColor('rgba(0,0,0,0)')
    .globeImageUrl(day)
    .pointsData(cities)
    .pointColor(() => '#ffe066');
  globe.controls().autoRotate = true;

  return stage.dispose;
};

export default mount;
