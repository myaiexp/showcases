// link: one independent segment per row, here a slopegraph between two columns colored by direction
import { defineChart, dot, link, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { id: 'Oslo', before: 41, after: 52 },
  { id: 'Lima', before: 63, after: 48 },
  { id: 'Cairo', before: 30, after: 44 },
  { id: 'Perth', before: 55, after: 58 },
  { id: 'Quito', before: 70, after: 61 },
  { id: 'Hanoi', before: 22, after: 39 },
  { id: 'Turin', before: 47, after: 36 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a segment: its midpoint is the focus point.' });

  const definition = defineChart({
    marks: [
      link(rows, {
        x1: () => 'Before',
        y1: 'before',
        x2: () => 'After',
        y2: 'after',
        key: 'id',
        color: (r) => (r.after >= r.before ? 'up' : 'down'),
        strokeWidth: 2.5,
      }),
      dot(rows, { x: () => 'Before', y: 'before', key: 'id', r: 3.5, color: (r) => (r.after >= r.before ? 'up' : 'down') }),
      dot(rows, { x: () => 'After', y: 'after', key: 'id', r: 3.5, color: (r) => (r.after >= r.before ? 'up' : 'down') }),
    ],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.35) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip,
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Slopegraph of seven cities' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
