// Zoom and pan: a minimap StaticCanvas with the visible area drawn from vptCoords; click it to jump
import { Canvas, Point, Rect, StaticCanvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, panPath, sceneAt, WORLD_H, WORLD_W, wheelAt } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Wheel to zoom, Alt + drag to pan. The small map shows the whole world with the red box as the visible area; click the map to centre the view there.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...buildWorld());
  const say = status(stage);

  // The minimap: a StaticCanvas that shows the same world at a small zoom.
  const mapW = stage.preview ? 90 : 170;
  const mapH = Math.round((mapW * WORLD_H) / WORLD_W);
  const box = document.createElement('div');
  box.style.cssText = `position:absolute;right:8px;top:8px;width:${mapW}px;height:${mapH}px;border:1px solid #888;background:#fffdf7;box-shadow:0 1px 4px rgba(0,0,0,.25);cursor:pointer;z-index:3`;
  const mapEl = document.createElement('canvas');
  mapEl.width = mapW;
  mapEl.height = mapH;
  box.append(mapEl);
  stage.frame.append(box);
  const map = stage.own(new StaticCanvas(mapEl, { width: mapW, height: mapH, renderOnAddRemove: false }));
  const k = mapW / WORLD_W;
  map.setViewportTransform([k, 0, 0, k, 0, 0]);
  map.add(...buildWorld().filter((o) => o.type !== 'text'));
  const view = new Rect({ left: 0, top: 0, originX: 'left', originY: 'top', width: 10, height: 10, fill: 'rgba(233,75,60,0.15)', stroke: '#e94b3c', strokeWidth: 2, strokeUniform: true, objectCaching: false });
  map.add(view);

  // vptCoords is the visible rectangle in scene units; mirror it onto the map after every render.
  const sync = (): void => {
    const { tl, br } = canvas.vptCoords;
    view.set({ left: tl.x, top: tl.y, width: br.x - tl.x, height: br.y - tl.y });
    map.requestRenderAll();
    if (stage.preview) say(`zoom ${canvas.getZoom().toFixed(2)}`);
    else say(`visible ${Math.round(tl.x)},${Math.round(tl.y)} to ${Math.round(br.x)},${Math.round(br.y)} · zoom ${canvas.getZoom().toFixed(2)}`);
  };
  canvas.on('after:render', sync);

  const w = stage.width;
  const h = stage.height;
  const home = Math.min(w / WORLD_W, h / WORLD_H) * 2.2;
  canvas.setViewportTransform([home, 0, 0, home, -40, -20]);

  let drags = false; // cards pan with plain drags, since their pointer sends no Alt key
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
  });

  // Clicking the map centres the main view on that world point (keeping the zoom).
  const jump = (e: PointerEvent): void => {
    const r = mapEl.getBoundingClientRect();
    const wx = ((e.clientX - r.left) / r.width) * WORLD_W;
    const wy = ((e.clientY - r.top) / r.height) * WORLD_H;
    const z = canvas.getZoom();
    canvas.setViewportTransform([z, 0, 0, z, w / 2 - wx * z, h / 2 - wy * z]);
  };
  box.addEventListener('pointerdown', jump);
  stage.onDispose(() => box.removeEventListener('pointerdown', jump));
  sync();

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    drags = true;
    stage.repeat(async () => {
      canvas.setViewportTransform([home, 0, 0, home, -40, -20]);
      await ghost.stroke(panPath(canvas, { x: w * 0.75, y: h * 0.8 }, { x: w * 0.2, y: h * 0.3 }), 1000);
      await stage.wait(300);
      await ghost.move(sceneAt(canvas, { x: w * 0.5, y: h * 0.5 }), 300);
      for (let i = 0; i < 8; i++) {
        wheelAt(ghost, canvas, { x: w * 0.5, y: h * 0.5 }, 110);
        await stage.wait(80);
      }
      await stage.wait(500);
      for (let i = 0; i < 8; i++) {
        wheelAt(ghost, canvas, { x: w * 0.5, y: h * 0.5 }, -110);
        await stage.wait(80);
      }
      await stage.wait(700);
    }, 100);
  }

  return stage.dispose;
};

export default mount;
