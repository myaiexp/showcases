// enterCropMode: double-click an image to crop it with the extension's controls
import { Canvas, FabricImage } from 'fabric';
import { enterCropMode } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { picture } from '../../shared/images.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'Double-click the picture to enter crop mode: the edge handles crop, the corner brackets crop two sides, the outer squares scale, and dragging inside pans the picture behind the frame (a ghost shows what is cropped away). Double-click again to leave.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = briefStatus(stage);
  const src = picture('landscape', 320, 220);
  const img = new FabricImage(src, { left: 160, top: 110, scaleX: 0.7, scaleY: 0.7 });
  canvas.add(img);
  canvas.setActiveObject(img);

  // the function registers itself again on leaving, so one `once` starts the cycle
  img.once('mousedblclick', enterCropMode);

  const report = (): void => say(`cropX ${Math.round(img.cropX)} cropY ${Math.round(img.cropY)}\n${Math.round(img.width)}×${Math.round(img.height)} of ${src.width}×${src.height}`);
  canvas.on('after:render', report);

  if (!stage.preview) {
    button(stage.bar!, 'reset crop', () => {
      img.set({ left: 160, top: 110, cropX: 0, cropY: 0, width: src.width, height: src.height });
      img.setCoords();
      canvas.requestRenderAll();
    });
  } else {
    const g = stage.ghost(canvas);
    stage.repeat(async () => {
      img.set({ left: 160, top: 110, cropX: 0, cropY: 0, width: src.width, height: src.height, scaleX: 0.7, scaleY: 0.7 });
      img.setCoords();
      canvas.setActiveObject(img);
      canvas.requestRenderAll();
      await stage.wait(500);
      await g.dblclick({ x: 160, y: 110 });
      await stage.wait(500);
      const right = controlPoint(img, 'mrc');
      await g.drag(right, { x: right.x - 60, y: right.y }, 900);
      await stage.wait(300);
      const top = controlPoint(img, 'mtc');
      await g.drag(top, { x: top.x, y: top.y + 30 }, 800);
      await stage.wait(300);
      await g.drag({ x: 150, y: 110 }, { x: 175, y: 120 }, 800);
      await stage.wait(700);
      await g.dblclick({ x: 160, y: 110 });
      await stage.wait(900);
    }, 300);
  }
  return stage.dispose;
};

export default mount;
