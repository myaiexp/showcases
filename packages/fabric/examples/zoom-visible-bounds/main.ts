// Zoom and pan: vptCoords and calcViewportBoundaries tell which objects are on screen
import { Canvas, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, panPath, sceneAt, WORLD_H, WORLD_W, wheelAt } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Wheel to zoom, Alt + drag to pan. vptCoords is the visible rectangle in scene units; shapes whose box misses it (isOnScreen() false) are dimmed.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const objects = buildWorld();
  canvas.add(...objects);
  const shapes = objects.filter((o) => o.selectable);
  const say = status(stage);

  const w = stage.width;
  const h = stage.height;
  const home = Math.min(w / WORLD_W, h / WORLD_H) * 2.4;

  // Recompute the visible rectangle, then dim every shape that is out of it.
  const refresh = (): void => {
    const { tl, br } = canvas.calcViewportBoundaries();
    let on = 0;
    for (const o of shapes) {
      const visible = o.isOnScreen();
      o.set('opacity', visible ? 1 : 0.2);
      if (visible) on++;
    }
    canvas.requestRenderAll();
    say(
      stage.preview
        ? `${on} of ${shapes.length} on screen`
        : `vptCoords tl (${Math.round(tl.x)}, ${Math.round(tl.y)}) · br (${Math.round(br.x)}, ${Math.round(br.y)})\n${on} of ${shapes.length} shapes on screen · zoom ${canvas.getZoom().toFixed(2)}`,
    );
  };
  canvas.setViewportTransform([home, 0, 0, home, 0, 0]);
  refresh();

  let drags = false; // cards pan with plain drags: their pointer sends no Alt key
  let panning = false;
  let last = new Point(0, 0);
  canvas.on('mouse:down:before', (opt) => {
    const e = opt.e as MouseEvent;
    if (!e.altKey && !drags) return;
    panning = true;
    canvas.selection = false;
    canvas.skipTargetFind = true;
    last = new Point(e.clientX, e.clientY);
  });
  canvas.on('mouse:move', (opt) => {
    if (!panning) return;
    const e = opt.e as MouseEvent;
    canvas.relativePan(new Point(e.clientX - last.x, e.clientY - last.y));
    last = new Point(e.clientX, e.clientY);
    refresh();
  });
  canvas.on('mouse:up', () => {
    panning = false;
    canvas.selection = true;
    canvas.skipTargetFind = false;
  });
  canvas.on('mouse:wheel', (opt) => {
    canvas.zoomToPoint(opt.viewportPoint, Math.min(20, Math.max(0.2, canvas.getZoom() * 0.999 ** opt.e.deltaY)));
    opt.e.preventDefault();
    opt.e.stopPropagation();
    refresh();
  });

  if (stage.bar) {
    button(stage.bar, 'Reset', () => {
      canvas.setViewportTransform([home, 0, 0, home, 0, 0]);
      refresh();
    });
  } else {
    const ghost = stage.ghost(canvas);
    drags = true;
    stage.repeat(async () => {
      canvas.setViewportTransform([home, 0, 0, home, 0, 0]);
      refresh();
      await ghost.stroke(panPath(canvas, { x: w * 0.85, y: h * 0.8 }, { x: w * 0.05, y: h * 0.25 }), 1200);
      await stage.wait(400);
      await ghost.stroke(panPath(canvas, { x: w * 0.8, y: h * 0.25 }, { x: w * 0.1, y: h * 0.75 }), 1200);
      await ghost.move(sceneAt(canvas, { x: w / 2, y: h / 2 }), 250);
      for (let i = 0; i < 5; i++) {
        wheelAt(ghost, canvas, { x: w / 2, y: h / 2 }, 130);
        await stage.wait(80);
      }
      await stage.wait(900);
    }, 100);
  }

  return stage.dispose;
};

export default mount;
