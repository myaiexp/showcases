// Cropping controls on a flipped image (withFlip swaps handlers)
import { Canvas, FabricImage } from 'fabric';
import { createImageCroppingControls } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { checkbox } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'The cropping controls are assigned straight to the image. Flip it and drag an edge handle: the control wrapped by withFlip still crops the side under the pointer instead of the mirrored one.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = briefStatus(stage);
  const src = picture('city', 320, 220);
  const img = new FabricImage(src, { left: 160, top: 110, scaleX: 0.7, scaleY: 0.7, cropX: 20, width: 280, padding: 0 });
  // the same object enterCropMode builds, without the mode
  img.controls = createImageCroppingControls();
  canvas.add(img);
  canvas.setActiveObject(img);

  canvas.on('after:render', () => say(`flipX ${img.flipX} flipY ${img.flipY}\ncropX ${Math.round(img.cropX)} width ${Math.round(img.width)}`));
  const flip = (axis: 'flipX' | 'flipY', v: boolean): void => {
    img.set(axis, v);
    img.setCoords();
    canvas.requestRenderAll();
  };

  if (stage.bar) {
    checkbox(stage.bar, 'flipX', false, (v) => flip('flipX', v));
    checkbox(stage.bar, 'flipY', false, (v) => flip('flipY', v));
  } else {
    const g = stage.ghost(canvas);
    let n = 0;
    stage.repeat(async () => {
      const flipped = n++ % 2 === 1;
      img.set({ left: 160, top: 110, flipX: flipped, flipY: false, cropX: 20, cropY: 0, width: 280, height: 220 });
      img.setCoords();
      canvas.setActiveObject(img);
      canvas.requestRenderAll();
      await stage.wait(500);
      const right = controlPoint(img, 'mrc');
      await g.drag(right, { x: right.x - 55, y: right.y }, 1000);
      await stage.wait(900);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
