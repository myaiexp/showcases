// onZoom and the pointOfView() getter: read where the camera is as it moves
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag and scroll: onZoom reports the new point of view after every camera move.' });
  const atlas = await texture('atlas');

  // In cards the readout sits over the globe; in the full view, under it.
  const log = readout(stage.preview ? stage.container : stage.box);
  if (stage.preview) log.style.cssText += ';position:absolute;left:6px;top:4px;z-index:2;font-size:10px;color:#223';

  let calls = 0;
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(atlas)
    .backgroundColor('#dbe7f0')
    .onZoom(({ lat, lng, altitude }) => {
      calls++;
      log.textContent = `onZoom #${calls}\nlat ${lat.toFixed(1)}  lng ${lng.toFixed(1)}\naltitude ${altitude.toFixed(2)}`;
    });

  // Auto-rotation moves the camera through the controls too, so onZoom fires each frame.
  globe.controls().autoRotate = true;
  globe.controls().autoRotateSpeed = 1.5;
  if (stage.preview) {
    let near = false;
    stage.every(2500, () => globe.pointOfView({ altitude: (near = !near) ? 1.2 : 2.6 }, 1500));
  }

  return stage.dispose;
};

export default mount;
