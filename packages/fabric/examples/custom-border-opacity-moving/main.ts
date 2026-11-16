// borderOpacityWhenMoving: how visible the frame is during a drag
import { Canvas, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Drag the rectangle: while it moves the frame fades to borderOpacityWhenMoving (default 0.4); at rest it is fully drawn.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({
    left: 120,
    top: 120,
    width: 110,
    height: 80,
    fill: '#f2b134',
    borderColor: '#c0392b',
    borderScaleFactor: 3,
    hasControls: false,
    borderOpacityWhenMoving: 0.4,
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const show = (): void => say(`${stage.preview ? 'opacityWhenMoving' : 'borderOpacityWhenMoving'} ${rect.borderOpacityWhenMoving.toFixed(2)}${stage.preview ? '' : ` · isMoving ${rect.isMoving ?? false}`}`);
  canvas.on('object:moving', show);
  canvas.on('mouse:up', show);
  show();

  if (stage.bar) {
    slider(stage.bar, 'borderOpacityWhenMoving', 0, 1, 0.05, 0.4, (v) => ((rect.borderOpacityWhenMoving = v), show()), (v) => v.toFixed(2));
  } else {
    const ghost = stage.ghost(canvas);
    const values = [0, 0.4, 1];
    let n = 0;
    stage.repeat(async () => {
      rect.borderOpacityWhenMoving = values[n++ % values.length]!;
      await ghost.drag(new Point(120, 120), new Point(240, 150), 1300);
      await stage.wait(300);
      await ghost.dragTo(new Point(120, 100), 700);
      rect.set({ left: 120, top: 120 });
      rect.setCoords();
      canvas.requestRenderAll();
    }, 400);
  }

  return stage.dispose;
};

export default mount;
