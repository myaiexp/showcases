// Objects: paintFirst 'stroke' paints the outline before the fill, so the fill covers its inner half
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: "With a thick stroke, 'fill' (the default) keeps the whole stroke on top; 'stroke' lets the fill eat the inner half." });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const base = { fill: '#f2b134', stroke: '#3b2a8c', strokeWidth: 24, strokeLineJoin: 'round' as const };
  const rect = new Rect({ left: 90, top: 100, width: 90, height: 90, ...base });
  const circle = new Circle({ left: 215, top: 100, radius: 45, ...base });
  canvas.add(rect, circle);

  const apply = (paintFirst: 'fill' | 'stroke'): void => {
    rect.set('paintFirst', paintFirst);
    circle.set('paintFirst', paintFirst);
    say(`paintFirst: '${paintFirst}'`);
    canvas.requestRenderAll();
  };
  apply('fill');
  if (stage.bar) select(stage.bar, 'paintFirst', ['fill', 'stroke'], apply);
  else {
    let on = false;
    stage.every(1200, () => apply((on = !on) ? 'stroke' : 'fill'));
  }

  return stage.dispose;
};

export default mount;
