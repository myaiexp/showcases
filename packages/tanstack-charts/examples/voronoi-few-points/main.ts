// voronoi edge cases: one point fills the plot, two points split it, collinear points make strips
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { voronoi } from '@tanstack/charts/spatial/voronoi';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

type Pt = { id: string; x: number; y: number };
const sets: readonly (readonly [string, readonly Pt[]])[] = [
  ['one point', [{ id: 'a', x: 3, y: 4 }]],
  ['two points', [{ id: 'a', x: 2, y: 3 }, { id: 'b', x: 7, y: 5 }]],
  ['collinear', [1, 3, 4, 8].map((x) => ({ id: `p${x}`, x, y: 2 + x / 2 }))],
  ['coincident', [{ id: 'a', x: 3, y: 3 }, { id: 'b', x: 3, y: 3 }, { id: 'c', x: 7, y: 6 }, { id: 'd', x: 5, y: 1 }]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (rows: readonly Pt[]) =>
    defineChart({
      marks: [
        voronoi(rows, { x: 'x', y: 'y', key: 'id', color: 'id', fillOpacity: 0.25, stroke: '#fff' }),
        dot(rows, { x: 'x', y: 'y', key: 'id', color: 'id', r: 4 }),
      ],
      scales: {
        x: { scale: scaleLinear().domain([0, 9]), grid: true },
        y: { scale: scaleLinear().domain([0, 8]), grid: true },
      },
    });

  const options = (rows: readonly Pt[]) => ({ definition: build(rows), height: stage.height, ariaLabel: 'Voronoi with very few points' });
  const host = stage.own(mountChart(stage.box, options(sets[0]![1])));
  const show = (set: readonly [string, readonly Pt[]]): void => {
    host.update(options(set[1]));
    stage.say(set[0] === 'coincident' ? 'Two rows share a position: one cell, owned by the key that sorts first.' : set[0]);
  };
  if (stage.bar) select(stage.bar, 'points', sets.map((s) => [s, s[0]] as const), show);
  else stage.cycle(sets, 1800, show);
  return () => stage.dispose();
};

export default mount;
