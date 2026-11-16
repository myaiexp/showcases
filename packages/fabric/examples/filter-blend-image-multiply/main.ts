// Image filters: BlendImage multiply with a second painted picture
import type { Mount } from '@/types.ts';
import { FabricImage, filters } from 'fabric';
import { slider } from '../../shared/controls.ts';
import { filterStage, shot, sweep, SIZE } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = filterStage(el, ctx);
  const { show } = shot(stage, 'portrait');
  const say = status(stage);

  // The second picture, painted here: soft colour bands that multiply with whatever lies beneath.
  const bands = document.createElement('canvas');
  [bands.width, bands.height] = SIZE;
  const g = bands.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, SIZE[0], 0);
  ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#b983ff'].forEach((c, i, all) => grad.addColorStop(i / (all.length - 1), c));
  g.fillStyle = grad;
  g.fillRect(0, 0, SIZE[0], SIZE[1]);

  // BlendImage takes a FabricImage; its left/top (image pixels) and scale place it over the target.
  // With originX/Y 'left'/'top', left: 0, top: 0 puts the blend picture on the target's corner.
  const overlay = new FabricImage(bands, { left: 0, top: 0, originX: 'left', originY: 'top' });
  const blend = new filters.BlendImage({ image: overlay, mode: 'multiply' });
  const update = (): void => {
    show([blend]);
    say(`multiply, left ${Math.round(overlay.left)}, scale ${overlay.scaleX.toFixed(2)}`);
  };
  update();

  if (stage.bar) {
    slider(stage.bar, 'image.left', -160, 160, 1, 0, (v) => {
      overlay.left = v;
      update();
    });
    slider(stage.bar, 'image scale', 0.3, 2, 0.01, 1, (v) => {
      overlay.set({ scaleX: v, scaleY: v });
      update();
    }, (v) => v.toFixed(2));
  } else {
    sweep(stage, -140, 140, (v) => {
      overlay.left = v;
      update();
    });
  }
  return stage.dispose;
};

export default mount;
