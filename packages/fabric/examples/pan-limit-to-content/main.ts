// Zoom and pan: the guide's limits, keeping the view inside the content while zooming and panning
import { Canvas, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, panPath, sceneAt, WORLD_H, WORLD_W, wheelAt } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Alt + drag to pan, wheel to zoom. With the limit on, the view can never leave the red frame; zoomed out, the content is centred instead.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...buildWorld());
  const say = status(stage);

  const w = stage.width;
  const h = stage.height;
  let limited = true;
  const home = Math.min(w / WORLD_W, h / WORLD_H);
  canvas.setViewportTransform([home * 2, 0, 0, home * 2, 0, 0]);

  // The guide's clamp, per axis: smaller than the view -> centre it; otherwise the edge cannot cross the view.
  const clamp = (): void => {
    if (!limited) return;
    const vpt = canvas.viewportTransform;
    const zoom = canvas.getZoom();
    const axis = (i: 4 | 5, view: number, world: number): void => {
      const size = world * zoom;
      if (size < view) vpt[i] = (view - size) / 2;
      else vpt[i] = Math.min(0, Math.max(view - size, vpt[i]));
    };
    axis(4, w, WORLD_W);
    axis(5, h, WORLD_H);
    canvas.setViewportTransform(vpt);
  };
  const show = (): void => say(stage.preview ? `zoom ${canvas.getZoom().toFixed(2)} · limit ${limited ? 'on' : 'off'}` : `zoom ${canvas.getZoom().toFixed(2)} · offset ${Math.round(canvas.viewportTransform[4])}, ${Math.round(canvas.viewportTransform[5])} · limit ${limited ? 'on' : 'off'}`);
  clamp();
  show();

  let drags = false; // the cards' pointer sends no Alt key, so they pan with plain drags
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
    clamp();
    show();
  });
  canvas.on('mouse:up', () => {
    panning = false;
    canvas.selection = true;
    canvas.skipTargetFind = false;
  });
  canvas.on('mouse:wheel', (opt) => {
    canvas.zoomToPoint(opt.viewportPoint, Math.min(20, Math.max(0.05, canvas.getZoom() * 0.999 ** opt.e.deltaY)));
    opt.e.preventDefault();
    opt.e.stopPropagation();
    clamp();
    show();
  });

  if (stage.bar) {
    checkbox(stage.bar, 'limit the pan to the content', true, (v) => {
      limited = v;
      clamp();
      show();
    });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      const at = { x: w / 2, y: h / 2 };
      // Drag the content far up and to the left: the clamp stops it at the content's far edge.
      drags = true;
      await ghost.stroke(panPath(canvas, { x: w * 0.95, y: h * 0.95 }, { x: -w * 0.2, y: -h * 0.2 }), 900);
      await stage.wait(400);
      drags = false;
      await ghost.move(sceneAt(canvas, at), 300);
      for (let i = 0; i < 7; i++) {
        wheelAt(ghost, canvas, at, 140);
        await stage.wait(90);
      }
      await stage.wait(900);
      canvas.setViewportTransform([home * 2, 0, 0, home * 2, 0, 0]);
      clamp();
    }, 100);
  }

  return stage.dispose;
};

export default mount;
