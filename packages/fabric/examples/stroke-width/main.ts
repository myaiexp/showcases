// Objects: stroke sets the outline colour and strokeWidth its thickness, centred on the edge
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { color, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'The stroke is drawn half inside and half outside the edge, and it counts toward the object\'s bounding box.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 90, top: 100, width: 90, height: 90, fill: '#f2b134', stroke: '#3b2a8c', strokeWidth: 8 });
  const circle = new Circle({ left: 210, top: 100, radius: 45, fill: '#8ad0a5', stroke: '#3b2a8c', strokeWidth: 8 });
  canvas.add(rect, circle);

  const apply = (props: { strokeWidth?: number; stroke?: string }): void => {
    rect.set(props);
    circle.set(props);
    rect.setCoords();
    circle.setCoords();
    say(`strokeWidth ${rect.strokeWidth.toFixed(0)}\nbounding width ${rect.getScaledWidth().toFixed(0)}`);
    canvas.requestRenderAll();
  };
  apply({});
  if (stage.bar) {
    slider(stage.bar, 'strokeWidth', 0, 30, 1, 8, (strokeWidth) => apply({ strokeWidth }));
    color(stage.bar, 'stroke', '#3b2a8c', (stroke) => apply({ stroke }));
  } else {
    stage.loop((_dt, t) => apply({ strokeWidth: 15 + 14 * Math.sin(t * 1.8) }));
  }

  return stage.dispose;
};

export default mount;
