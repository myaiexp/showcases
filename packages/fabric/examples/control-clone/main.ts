// Controls: a clone button, a Control whose mouseUpHandler clones the object and selects the copy
import { Canvas, Control, Rect, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Select the square and click the clone button beside it: the copy appears and is selected, with the same button.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '1 object');

  const drawIcon = (c: CanvasRenderingContext2D, left: number, top: number, _s: unknown, obj: FabricObject): void => {
    c.save();
    c.translate(left, top);
    c.rotate(util.degreesToRadians(obj.getTotalAngle()));
    c.fillStyle = '#2b2a33';
    c.beginPath();
    c.arc(0, 0, 12, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = '#fff';
    c.lineWidth = 1.8;
    c.strokeRect(-6, -6, 8, 8); // two overlapping squares read as "copy"
    c.fillStyle = '#2b2a33';
    c.fillRect(-2, -2, 8, 8);
    c.strokeRect(-2, -2, 8, 8);
    c.restore();
  };
  const cloneControl = new Control({
    x: -0.5,
    y: -0.5,
    offsetX: -16,
    offsetY: -16,
    sizeX: 26,
    sizeY: 26,
    cursorStyle: 'copy',
    render: drawIcon,
    mouseUpHandler: (_e, transform) => {
      const { target } = transform;
      void target.clone().then((copy) => {
        copy.set({ left: target.left + 28, top: target.top + 22 });
        copy.controls.cloneControl = cloneControl; // a clone gets fresh default controls: add the button again
        canvas.add(copy);
        canvas.setActiveObject(copy);
        say(`${canvas.getObjects().length} objects`);
        canvas.requestRenderAll();
      });
      return true;
    },
  });

  const make = (): Rect => {
    const r = new Rect({ left: 110, top: 100, width: 70, height: 70, fill: '#d99a1c', stroke: '#8a5f0e', strokeWidth: 2 });
    r.controls.cloneControl = cloneControl;
    return r;
  };
  let first = make();
  canvas.add(first);

  const reset = (): void => {
    canvas.remove(...canvas.getObjects());
    first = make();
    canvas.add(first);
    canvas.discardActiveObject();
    say('1 object');
    canvas.requestRenderAll();
  };
  if (stage.bar) button(stage.bar, 'Start over', reset);
  else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      await ghost.click(first.getCenterPoint());
      for (let i = 0; i < 3; i++) {
        const active = canvas.getActiveObject()!;
        active.setCoords();
        await ghost.click(controlPoint(active, 'cloneControl'));
        await stage.wait(450);
      }
      await stage.wait(900);
      reset();
    });
  }
  return stage.dispose;
};

export default mount;
