// Customization: padding moves the selection frame and controls away from the object
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'padding is the gap between the object and its frame, in scene units. The dashed outline marks the real bounding box.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 120, top: 120, width: 110, height: 80, fill: '#3b7dd8', stroke: '#1d3f73', strokeWidth: 3, padding: 12 });
  const dot = new Circle({ left: 270, top: 120, radius: 36, fill: '#e94b3c', padding: 12 });
  canvas.add(rect, dot);
  canvas.setActiveObject(rect);
  // A thin guide outline of the actual box, drawn above the objects every render.
  canvas.on('after:render', ({ ctx: c }) => {
    const [a, b, cc, d, e, f] = canvas.viewportTransform;
    const { tl, br } = rect.aCoords;
    c.save();
    c.transform(a, b, cc, d, e, f);
    c.setLineDash([2, 3]);
    c.lineWidth = 1 / canvas.getZoom();
    c.strokeStyle = 'rgba(0,0,0,0.5)';
    c.strokeRect(tl.x, tl.y, br.x - tl.x, br.y - tl.y);
    c.restore();
  });

  const apply = (v: number): void => {
    rect.set('padding', v);
    dot.set('padding', v);
    rect.setCoords();
    dot.setCoords();
    say(`padding ${v}`);
    canvas.requestRenderAll();
  };
  apply(12);

  if (stage.bar) slider(stage.bar, 'padding', 0, 40, 1, 12, apply);
  else {
    const values = [0, 12, 24, 12];
    let n = 0;
    stage.every(1200, () => apply(values[++n % values.length]!));
  }

  return stage.dispose;
};

export default mount;
