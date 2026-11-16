// A width handle with and without wrapWithFixedAnchor, plus wrapWithFireEvent
import { Canvas, Control, Point, Rect, controlsUtils, type TransformActionHandler } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { eventLog } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 220], hint: 'Pull the right handle. Without the anchor the rectangle grows from its centre and the left edge drifts; wrapWithFixedAnchor pins it.' });
  const canvas = stage.own(new Canvas(stage.el));
  const log = eventLog(stage, 4);

  const rect = new Rect({ left: 130, top: 110, width: 100, height: 90, fill: '#3b7dd8', cornerStyle: 'circle', cornerColor: '#e94b3c', transparentCorners: false });
  // A bare action handler: the new width is the pointer's distance from the transform origin (the left edge)
  const grow: TransformActionHandler = (_e, transform, x, y) => {
    const local = controlsUtils.getLocalPoint(transform, transform.originX, transform.originY, x, y);
    const target = transform.target;
    target.set('width', Math.max(20, Math.abs(local.x / target.scaleX)));
    return true;
  };
  const anchored = controlsUtils.wrapWithFireEvent('resizing', controlsUtils.wrapWithFixedAnchor(grow));
  const loose = controlsUtils.wrapWithFireEvent('resizing', grow);
  const handle = new Control({ x: 0.5, y: 0, cursorStyle: 'ew-resize', actionName: 'resizing', sizeX: 16, sizeY: 16, actionHandler: anchored });
  rect.controls = { handle };
  canvas.add(rect);
  canvas.setActiveObject(rect);

  // wrapWithFireEvent makes the handler fire 'resizing' on the object, and 'object:resizing' on the canvas
  rect.on('resizing', () => log.add('resizing', `width ${rect.width.toFixed(0)}, left edge x ${(rect.left - (rect.width * rect.scaleX) / 2).toFixed(0)}`));
  canvas.requestRenderAll();

  const guide = canvas.on('after:render', ({ ctx: c }) => {
    // a line at the left edge's start position makes any drift visible
    const vpt = canvas.viewportTransform;
    c.save();
    c.strokeStyle = '#e94b3c88';
    c.setLineDash([4, 4]);
    const x = 80 * vpt[0] + vpt[4];
    c.beginPath();
    c.moveTo(x, 0);
    c.lineTo(x, canvas.height);
    c.stroke();
    c.restore();
  });
  stage.onDispose(guide);

  const apply = (on: boolean): void => {
    handle.actionHandler = on ? anchored : loose;
    rect.set({ width: 100, left: 130 });
    rect.setCoords();
    canvas.requestRenderAll();
  };
  if (stage.bar) checkbox(stage.bar, 'wrapWithFixedAnchor', true, apply);
  else {
    const ghost = stage.ghost(canvas);
    let on = false;
    stage.repeat(async () => {
      apply((on = !on));
      const p = controlPoint(rect, 'handle');
      await ghost.drag(p, p.add(new Point(70, 0)), 900);
      await stage.wait(900);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
