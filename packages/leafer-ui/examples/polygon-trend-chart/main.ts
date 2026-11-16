// Polygon: a smooth area chart
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press new data to redraw the series.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 1.6;
  const w = S, h = S * 0.6;
  const xs = [0, 20, 40, 60, 75, 90, 100];
  const make = (ys: number[]): number[] => [
    ...ys.flatMap((y, i) => [(xs[i]! / 100) * w, (y / 100) * h]),
    w, h, w, h, 0, h, // the docs' closing points along the baseline
  ];
  const next = (): void => { polygon.points = make(xs.map(() => 10 + Math.random() * 70)); };
  const polygon = new Polygon({ ...mid(stage, w, h), points: make([90, 60, 80, 40, 50, 10, 90]), curve: true, fill: '#32cd79' });
  leafer.add(polygon);
  if (stage.bar) button(stage.bar, 'new data', next);
  else stage.every(1100, next);

  return stage.dispose;
};

export default mount;
