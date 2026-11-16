// Wheel zoom with zoomToPoint around the pointer, with a clamp you can change
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, sceneAt, WORLD_H, WORLD_W, wheelAt } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Scroll over the canvas: the point under the pointer stays put while everything else grows around it. The sliders set the zoom limits.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...buildWorld());
  const say = status(stage);

  const home = Math.min(stage.width / WORLD_W, stage.height / WORLD_H);
  canvas.setViewportTransform([home, 0, 0, home, 0, 0]);
  const limits = { min: 0.2, max: 8 };
  const show = (note = ''): void => say(`zoom ${canvas.getZoom().toFixed(2)}${stage.preview ? '' : ` (limits ${limits.min} to ${limits.max})`}${note}`);
  show();

  canvas.on('mouse:wheel', (opt) => {
    const delta = opt.e.deltaY;
    const wanted = canvas.getZoom() * 0.999 ** delta;
    const zoom = Math.min(limits.max, Math.max(limits.min, wanted));
    // viewportPoint is the pointer in canvas pixels: the point zoomToPoint keeps fixed.
    canvas.zoomToPoint(opt.viewportPoint, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    show(zoom !== wanted ? ' · clamped' : '');
  });

  if (stage.bar) {
    slider(stage.bar, 'min zoom', 0.05, 1, 0.05, limits.min, (v) => ((limits.min = v), show()), (v) => v.toFixed(2));
    slider(stage.bar, 'max zoom', 1, 20, 0.5, limits.max, (v) => ((limits.max = v), show()), (v) => v.toFixed(1));
    button(stage.bar, 'Reset', () => {
      canvas.setViewportTransform([home, 0, 0, home, 0, 0]);
      show();
    });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      const spots = [{ x: stage.width * 0.3, y: stage.height * 0.35 }, { x: stage.width * 0.75, y: stage.height * 0.7 }];
      for (const at of spots) {
        await ghost.move(sceneAt(canvas, at), 500);
        for (let i = 0; i < 12; i++) {
          wheelAt(ghost, canvas, at, -130);
          show();
          await stage.wait(90);
        }
        await stage.wait(400);
        for (let i = 0; i < 12; i++) {
          wheelAt(ghost, canvas, at, 130);
          show();
          await stage.wait(90);
        }
      }
    }, 100);
  }

  return stage.dispose;
};

export default mount;
