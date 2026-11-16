// Objects: a Polygon is a closed shape through an array of {x, y} points
import { Canvas, Polygon } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Points are listed once; the last one joins back to the first. The slider rebuilds a star with more spikes.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const star = (spikes: number, outer: number, inner: number): { x: number; y: number }[] =>
    Array.from({ length: spikes * 2 }, (_, i) => {
      const a = (i * Math.PI) / spikes - Math.PI / 2;
      const r = i % 2 === 0 ? outer : inner;
      return { x: Math.cos(a) * r, y: Math.sin(a) * r };
    });

  let polygon: Polygon | undefined;
  const draw = (spikes: number): void => {
    if (polygon) canvas.remove(polygon);
    polygon = new Polygon(star(spikes, 85, 38), { left: 150, top: 100, fill: '#f2b134', stroke: '#a8700a', strokeWidth: 3, strokeLineJoin: 'round' });
    canvas.add(polygon);
    say(`${polygon.points.length} points`);
  };
  draw(5);
  if (stage.bar) slider(stage.bar, 'spikes', 3, 12, 1, 5, draw);
  else {
    let n = 5;
    stage.every(900, () => draw((n = n >= 9 ? 3 : n + 1)));
  }

  return stage.dispose;
};

export default mount;
