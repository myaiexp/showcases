// Line: a smooth trend chart from points
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press new data to redraw the series.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 1.6;
  const w = S, h = S * 0.6;
  const base = [0, 90, 20, 60, 40, 80, 60, 40, 75, 50, 90, 10, 100, 90];
  const series = (): number[] => base.map((v, i) => (i % 2 ? 10 + Math.random() * 80 : v));
  const make = (data: number[]): number[] => data.map((v, i) => (i % 2 ? (v / 100) * h : (v / 100) * w));
  const line = new Line({ ...mid(stage, w, h), points: make(base), curve: true, strokeWidth: 5, stroke: '#32cd79', strokeCap: 'round' });
  leafer.add(line);
  const next = (): void => { line.points = make(series()); };
  if (stage.bar) button(stage.bar, 'new data', next);
  else stage.every(1100, next);

  return stage.dispose;
};

export default mount;
