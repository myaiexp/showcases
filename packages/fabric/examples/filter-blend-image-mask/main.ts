// Image filters: BlendImage mask uses a second picture as a window
import type { Mount } from '@/types.ts';
import { FabricImage, filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep, SIZE } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'landscape');
  const say = status(stage);

  // The mask picture: a soft round spot on transparency. Mode 'mask' copies its alpha channel
  // to the target, so only the spot of the landscape stays visible.
  const spot = document.createElement('canvas');
  [spot.width, spot.height] = SIZE;
  const g = spot.getContext('2d')!;
  const radial = g.createRadialGradient(160, 110, 10, 160, 110, 100);
  radial.addColorStop(0, '#000f');
  radial.addColorStop(0.7, '#000d');
  radial.addColorStop(1, '#0000');
  g.fillStyle = radial;
  g.fillRect(0, 0, SIZE[0], SIZE[1]);

  const mask = new FabricImage(spot, { left: 0, top: 0, originX: 'left', originY: 'top' });
  const blend = new filters.BlendImage({ image: mask, mode: 'mask' });
  const update = (): void => {
    show([blend]);
    say(`mask, left ${Math.round(mask.left)}, top ${Math.round(mask.top)}`);
  };
  update();

  if (stage.bar) {
    slider(stage.bar, 'image.left', -160, 160, 1, 0, (v) => {
      mask.left = v;
      update();
    });
    slider(stage.bar, 'image.top', -110, 110, 1, 0, (v) => {
      mask.top = v;
      update();
    });
    slider(stage.bar, 'image scale', 0.3, 2, 0.01, 1, (v) => {
      mask.set({ scaleX: v, scaleY: v });
      update();
    }, (v) => v.toFixed(2));
  } else {
    sweep(stage, -130, 130, (v) => {
      mask.left = v;
      update();
    });
  }
  return stage.dispose;
};

export default mount;
