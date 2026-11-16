// Animation: fill, stroke and backgroundColor animate as colours, not numbers
import { Canvas, Circle, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Keys listed in FabricObject.colorProperties (fill, stroke, backgroundColor) go through animateColor: any CSS colour works as the end value.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const rect = new Rect({ left: 110, top: 120, width: 110, height: 110, fill: '#e94b3c', stroke: '#2b2b2b', strokeWidth: 8 });
  const circle = new Circle({ left: 250, top: 120, radius: 50, fill: 'rgba(59,125,216,1)', stroke: '#2b2b2b', strokeWidth: 8 });
  canvas.add(rect, circle);

  const palette = [
    ['#2e9e5b', 'hsl(280,70%,50%)', 'rgba(233,75,60,0.35)'],
    ['gold', 'teal', 'rgba(59,125,216,1)'],
    ['#e94b3c', '#2b2b2b', 'rgba(46,158,91,0.6)'],
  ] as const;
  let i = 0;
  const next = (): void => {
    const [a, b, c] = palette[i++ % palette.length]!;
    const opts = { duration: 1000, easing: util.ease.easeInOutSine, onChange: () => canvas.requestRenderAll() };
    rect.animate({ fill: a }, opts);
    rect.animate({ stroke: b }, opts);
    circle.animate({ fill: c }, { ...opts, onChange: (v: string) => { canvas.requestRenderAll(); say(`circle fill ${v.replace(/(\.\d\d)\d+/, '$1')}`); } });
  };

  next();
  if (stage.preview) stage.every(1500, next);
  else button(stage.bar!, 'Next colours', next);

  return stage.dispose;
};

export default mount;
