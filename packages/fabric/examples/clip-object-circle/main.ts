// A Circle as rect.clipPath shows only the part of the rect inside it
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'The circle is the rectangle\'s clipPath. Its position is measured from the rectangle\'s centre.' });
  const canvas = stage.own(new Canvas(stage.el));

  const rect = new Rect({ left: 150, top: 100, width: 200, height: 100, fill: 'red' });
  // A clipPath is any fabric object. v7 centres it (originX/originY 'center'), so left/top 0 is the
  // centre of the rectangle; the guide's top/left of -40 assumed a top left origin.
  const clipPath = new Circle({ radius: 40, left: 0, top: 0 });
  rect.clipPath = clipPath;
  // a dashed outline of the whole rectangle, so the clipped-away part is visible
  const outline = new Rect({ left: 150, top: 100, width: 200, height: 100, fill: '', stroke: '#999', strokeDashArray: [4, 4], selectable: false, evented: false });
  canvas.add(outline, rect);

  const say = status(stage);
  const update = (): void => {
    rect.set('dirty', true); // the clipPath lives in the rectangle's cache: invalidate it after changing the clipPath
    say(`r ${Math.round(clipPath.radius)} at (${Math.round(clipPath.left)}, ${Math.round(clipPath.top)})`);
    canvas.requestRenderAll();
  };
  update();

  if (stage.bar) {
    slider(stage.bar, 'radius', 10, 100, 1, 40, (v) => { clipPath.set('radius', v); update(); });
    slider(stage.bar, 'offset x', -100, 100, 1, 0, (v) => { clipPath.set('left', v); update(); });
    slider(stage.bar, 'offset y', -50, 50, 1, 0, (v) => { clipPath.set('top', v); update(); });
  } else {
    stage.loop((_dt, t) => {
      clipPath.set({ left: Math.sin(t * 1.2) * 70, top: Math.cos(t * 0.9) * 25, radius: 40 + Math.sin(t * 2) * 12 });
      update();
    });
  }

  return stage.dispose;
};

export default mount;
