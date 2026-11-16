// getBoundingRect() returns the axis-aligned box around an object
import { Canvas, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [300, 200],
    hint: 'The dashed box is drawn from getBoundingRect(). Drag, scale or rotate the triangle and it follows.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const tri = new Triangle({ left: 150, top: 100, width: 90, height: 100, angle: 20, fill: '#8e5bd6', stroke: '#4e2a8c', strokeWidth: 2 });
  const box = new Rect({ fill: 'transparent', stroke: '#e94b3c', strokeWidth: 1.5, strokeDashArray: [5, 4], selectable: false, evented: false, originX: 'left', originY: 'top' });
  canvas.add(tri, box);

  const follow = (): void => {
    const { left, top, width, height } = tri.getBoundingRect();
    box.set({ left, top, width, height });
    say(`left ${left.toFixed(0)} top ${top.toFixed(0)}\nwidth ${width.toFixed(0)} height ${height.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  for (const e of ['object:moving', 'object:scaling', 'object:rotating', 'object:modified'] as const) canvas.on(e, follow);
  follow();

  if (stage.bar) {
    slider(stage.bar, 'angle', 0, 360, 1, 20, (angle) => (tri.set({ angle }), tri.setCoords(), follow()));
  } else {
    stage.loop((_dt, t) => (tri.set({ angle: (t * 45) % 360, left: 150 + 40 * Math.sin(t) }), tri.setCoords(), follow()));
  }

  return stage.dispose;
};

export default mount;
