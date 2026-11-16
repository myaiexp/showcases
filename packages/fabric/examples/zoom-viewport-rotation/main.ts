// A rotated viewportTransform; getZoom() reads the scale under rotation
import { Canvas, Point, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, WORLD_H, WORLD_W } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Turn the view around the world centre. Since fabric 7.4.0 getZoom() is the magnitude of the matrix\'s scale part, so it stays put while viewportTransform[0] is only zoom x cos(angle). Select a shape: its handles follow.',
  });
  // vptCoords (the visible box used to skip off-screen objects) is built from two inverse-mapped
  // corners, which under a rotated viewport misses most of the view: draw every object instead.
  const canvas = stage.own(new Canvas(stage.el, { skipOffscreen: false }));
  canvas.add(...buildWorld());
  const say = status(stage);

  const w = stage.width;
  const h = stage.height;
  const focus = new Point(WORLD_W / 2, WORLD_H / 2);
  const state = { zoom: Math.min(w / WORLD_W, h / WORLD_H) * 1.0, angle: 20 };

  // [a b c d e f] = scale and rotate, then a translation that puts the focus at the pane's centre.
  const apply = (): void => {
    const rad = util.degreesToRadians(state.angle);
    const a = state.zoom * Math.cos(rad);
    const b = state.zoom * Math.sin(rad);
    const tx = w / 2 - (a * focus.x - b * focus.y);
    const ty = h / 2 - (b * focus.x + a * focus.y);
    canvas.setViewportTransform([a, b, -b, a, tx, ty]);
    const vpt = canvas.viewportTransform;
    say(
      stage.preview
        ? `getZoom() ${canvas.getZoom().toFixed(2)} · vpt[0] ${vpt[0].toFixed(2)}`
        : `angle ${state.angle.toFixed(0)}° · getZoom() ${canvas.getZoom().toFixed(3)} · viewportTransform[0] ${vpt[0].toFixed(3)} · [1] ${vpt[1].toFixed(3)}`,
    );
    // Objects keep their own coordinates; refresh them so the handles are placed for the new view.
    for (const o of canvas.getObjects()) o.setCoords();
  };
  apply();

  canvas.on('mouse:wheel', (opt) => {
    // zoomToPoint would overwrite the rotation terms of the matrix, so the wheel changes `zoom` and we rebuild it.
    state.zoom = Math.min(8, Math.max(0.1, state.zoom * 0.999 ** opt.e.deltaY));
    apply();
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });

  if (stage.bar) {
    const zoomSlider = slider(stage.bar, 'zoom', 0.1, 4, 0.05, state.zoom, (v) => ((state.zoom = v), apply()), (v) => v.toFixed(2));
    slider(stage.bar, 'angle', -180, 180, 1, state.angle, (v) => ((state.angle = v), apply()), (v) => `${v}°`);
    canvas.on('mouse:wheel', () => (zoomSlider.value = String(Math.min(4, state.zoom))));
  } else {
    stage.loop((_dt, t) => {
      state.angle = 40 * Math.sin(t * 0.8);
      state.zoom = Math.min(w / WORLD_W, h / WORLD_H) * (1.0 + 0.3 * Math.sin(t * 0.55));
      apply();
    });
  }

  return stage.dispose;
};

export default mount;
