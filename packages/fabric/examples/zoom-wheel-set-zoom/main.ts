// Zoom and pan: the guide's mouse:wheel zoom with setZoom, clamped to 1%..2000%
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, sceneAt, WORLD_H, WORLD_W, wheelAt } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  // No `scene`: this example owns the viewportTransform.
  const stage = createStage(el, ctx, {
    hint: 'Scroll the mouse wheel over the canvas. setZoom keeps the canvas top-left corner fixed, so content slides away from the pointer.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...buildWorld());
  const say = status(stage);

  const home = Math.min(stage.width / WORLD_W, stage.height / WORLD_H);
  canvas.setViewportTransform([home, 0, 0, home, 0, 0]);
  const show = (): void => say(stage.preview ? `zoom ${(canvas.getZoom() * 100).toFixed(0)}%` : `zoom ${(canvas.getZoom() * 100).toFixed(0)}% · viewportTransform ${canvas.viewportTransform.slice(4).map((n) => Math.round(n)).join(', ')} (e, f)`);
  show();

  canvas.on('mouse:wheel', (opt) => {
    const delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    show();
  });

  if (stage.bar) {
    button(stage.bar, 'Reset', () => {
      canvas.setViewportTransform([home, 0, 0, home, 0, 0]);
      show();
    });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      const at = { x: stage.width * 0.55, y: stage.height * 0.55 };
      await ghost.move(sceneAt(canvas, at), 400);
      for (let i = 0; i < 14; i++) {
        wheelAt(ghost, canvas, at, -120);
        show();
        await stage.wait(90);
      }
      await stage.wait(500);
      for (let i = 0; i < 14; i++) {
        wheelAt(ghost, canvas, at, 120);
        show();
        await stage.wait(90);
      }
      await stage.wait(500);
    }, 100);
  }

  return stage.dispose;
};

export default mount;
