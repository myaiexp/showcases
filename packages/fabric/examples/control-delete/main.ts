// A delete button built from a Control with a custom render() and a mouseUpHandler
import { Canvas, Circle, Control, Rect, Triangle, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Select a shape and click the red x. The x is drawn with plain canvas calls, no image file.' });
  const canvas = stage.own(new Canvas(stage.el));

  // render() gets the canvas context and the control's point on screen
  const drawX = (c: CanvasRenderingContext2D, left: number, top: number, _style: unknown, obj: FabricObject): void => {
    c.save();
    c.translate(left, top);
    c.rotate(util.degreesToRadians(obj.getTotalAngle()));
    c.fillStyle = '#e94b3c';
    c.beginPath();
    c.arc(0, 0, 11, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = '#fff';
    c.lineWidth = 2.5;
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(-4.5, -4.5);
    c.lineTo(4.5, 4.5);
    c.moveTo(4.5, -4.5);
    c.lineTo(-4.5, 4.5);
    c.stroke();
    c.restore();
  };
  const deleteControl = new Control({
    x: 0.5,
    y: -0.5,
    offsetX: 14,
    offsetY: -14,
    sizeX: 24,
    sizeY: 24,
    cursorStyle: 'pointer',
    // a click, not a drag: mouseUpHandler runs when the pointer is released on the control
    mouseUpHandler: (_e, transform) => {
      canvas.remove(transform.target);
      canvas.requestRenderAll();
      return true;
    },
    render: drawX,
  });

  const shapes = (): FabricObject[] => [
    new Rect({ left: 90, top: 120, width: 80, height: 60, fill: '#e94b3c', angle: -8 }),
    new Circle({ left: 190, top: 120, radius: 38, fill: '#3b7dd8' }),
    new Triangle({ left: 285, top: 125, width: 70, height: 70, fill: '#2e9e5b' }),
  ];
  const fill = (): FabricObject[] => {
    const list = shapes();
    for (const o of list) o.controls.deleteControl = deleteControl;
    canvas.add(...list);
    return list;
  };
  let [first, second] = fill();

  if (stage.bar) button(stage.bar, 'Restore the shapes', () => { canvas.remove(...canvas.getObjects()); fill(); canvas.requestRenderAll(); });
  else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      for (const o of [first!, second!]) {
        await ghost.click(o.getCenterPoint());
        o.setCoords();
        await ghost.click(controlPoint(o, 'deleteControl'));
        await stage.wait(250);
      }
      await stage.wait(700);
      canvas.remove(...canvas.getObjects());
      [first, second] = fill();
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    });
  }
  return stage.dispose;
};

export default mount;
