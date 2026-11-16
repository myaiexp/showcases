// Zoom and pan: hold Alt and drag to pan with relativePan, wheel to zoom, plain drags still select
import { Canvas, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, panPath, sceneAt, WORLD_H, WORLD_W, wheelAt } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Alt + drag pans the view; the wheel zooms around the pointer. Without Alt a drag moves a shape or draws a selection box as usual.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...buildWorld());
  const say = status(stage);

  const home = Math.min(stage.width / WORLD_W, stage.height / WORLD_H) * 1.6;
  canvas.setViewportTransform([home, 0, 0, home, 20, 10]);
  const show = (): void => say(stage.preview ? `${panning ? 'panning' : 'idle'} · zoom ${canvas.getZoom().toFixed(2)}` : `panning ${panning ? 'on' : 'off'} · zoom ${canvas.getZoom().toFixed(2)} · offset ${Math.round(canvas.viewportTransform[4])}, ${Math.round(canvas.viewportTransform[5])}`);

  // Alt starts a pan. `drags` makes a plain drag pan too (the cards use it: their pointer sends no keys).
  let drags = false;
  let panning = false;
  let lastX = 0;
  let lastY = 0;

  // down:before runs before fabric looks for a target: with Alt held nothing can be grabbed.
  canvas.on('mouse:down:before', (opt) => {
    if (!(opt.e as MouseEvent).altKey && !drags) return;
    panning = true;
    canvas.selection = false;
    canvas.skipTargetFind = true;
    lastX = (opt.e as MouseEvent).clientX;
    lastY = (opt.e as MouseEvent).clientY;
    show();
  });
  canvas.on('mouse:move', (opt) => {
    if (!panning) return;
    const e = opt.e as MouseEvent;
    // relativePan moves the viewport by a vector of canvas pixels.
    canvas.relativePan(new Point(e.clientX - lastX, e.clientY - lastY));
    lastX = e.clientX;
    lastY = e.clientY;
    show();
  });
  canvas.on('mouse:up', () => {
    if (!panning) return;
    panning = false;
    canvas.selection = true;
    canvas.skipTargetFind = false;
    show();
  });
  canvas.on('mouse:wheel', (opt) => {
    canvas.zoomToPoint(opt.viewportPoint, Math.min(20, Math.max(0.1, canvas.getZoom() * 0.999 ** opt.e.deltaY)));
    opt.e.preventDefault();
    opt.e.stopPropagation();
    show();
  });
  show();

  if (stage.bar) {
    checkbox(stage.bar, 'plain drags pan too', false, (v) => (drags = v));
    button(stage.bar, 'Reset', () => {
      canvas.setViewportTransform([home, 0, 0, home, 20, 10]);
      show();
    });
  } else {
    const ghost = stage.ghost(canvas);
    const w = stage.width;
    const h = stage.height;
    drags = true;
    stage.repeat(async () => {
      canvas.setViewportTransform([home, 0, 0, home, 20, 10]);
      await ghost.stroke(panPath(canvas, { x: w * 0.7, y: h * 0.7 }, { x: w * 0.25, y: h * 0.3 }), 1000);
      await stage.wait(300);
      await ghost.move(sceneAt(canvas, { x: w / 2, y: h / 2 }), 300);
      for (let i = 0; i < 8; i++) {
        wheelAt(ghost, canvas, { x: w / 2, y: h / 2 }, -120);
        await stage.wait(80);
      }
      await stage.wait(300);
      await ghost.stroke(panPath(canvas, { x: w * 0.3, y: h * 0.3 }, { x: w * 0.8, y: h * 0.75 }), 1000);
      await stage.wait(900);
    }, 100);
  }

  return stage.dispose;
};

export default mount;
