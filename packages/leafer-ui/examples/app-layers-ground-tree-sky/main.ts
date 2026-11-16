// Advanced: the ground, tree and sky layers of an App
import { App, Rect, Ellipse, Pen, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a square; the ring in the sky layer follows the pointer.', paper: 'transparent' });
  const u = sizer(stage);
  const app = stage.own(
    new App({
      view: stage.view,
      ground: { fill: '#2b2b2b' }, // the bottom layer
      tree: {}, // the content layer
      sky: {}, // the top layer
    }),
  );
  // ground: a grid, drawn once
  const grid = new Pen();
  grid.setStyle({ stroke: '#555', strokeWidth: 1 });
  for (let x = 0; x <= stage.width; x += u(30)) grid.moveTo(x, 0).lineTo(x, stage.height);
  for (let y = 0; y <= stage.height; y += u(30)) grid.moveTo(0, y).lineTo(stage.width, y);
  app.ground.add(grid);

  // tree: the content
  app.tree.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(60), u(90), u(90)));
  app.tree.add(Rect.one({ fill: '#FEB027', draggable: true }, u(200), u(100), u(60), u(60)));

  // sky: an overlay that must not take hits itself
  const ring = new Ellipse({ width: 26, height: 26, around: 'center', stroke: '#FF4B4B', strokeWidth: 3, hittable: false, opacity: 0 });
  app.sky.add(ring);
  app.on(PointerEvent.MOVE, (e: PointerEvent) => ring.set({ x: e.x, y: e.y, opacity: 1 }));
  app.on(PointerEvent.LEAVE, () => (ring.opacity = 0));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await ghost.drag({ x: u(115), y: u(105) }, { x: u(170), y: u(150) }, 800);
      await stage.wait(500);
      await ghost.drag({ x: u(170), y: u(150) }, { x: u(115), y: u(105) }, 800);
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
