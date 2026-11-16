// createImageResizeControlsWithScaleToCover on an image
import { Canvas, FabricImage } from 'fabric';
import { createImageResizeControlsWithScaleToCover } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Drag an edge handle outwards. While the picture has more pixels behind the frame the frame just grows; once all of it is shown the picture scales up so the bigger frame stays covered, instead of showing empty paper.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = briefStatus(stage);
  const src = picture('portrait', 240, 240);
  const start = { left: 105, top: 110, cropX: 50, cropY: 40, width: 120, height: 120, scaleX: 1, scaleY: 1 };
  const img = new FabricImage(src, start);
  img.controls = createImageResizeControlsWithScaleToCover();
  canvas.add(img);
  canvas.setActiveObject(img);
  canvas.on('after:render', () => say(`frame ${Math.round(img.width)}×${Math.round(img.height)}\nscale ${img.scaleX.toFixed(2)}`));

  if (stage.preview) {
    const g = stage.ghost(canvas);
    stage.repeat(async () => {
      img.set(start);
      img.setCoords();
      canvas.setActiveObject(img);
      canvas.requestRenderAll();
      await stage.wait(500);
      const right = controlPoint(img, 'mre');
      await g.drag(right, { x: right.x + 130, y: right.y }, 1600);
      await stage.wait(900);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
