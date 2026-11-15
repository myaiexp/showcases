// waterfall orderBy and order: accumulation follows the chosen order, not the input order
import { barY, defineChart, waterfall } from '@tanstack/charts';
import type { TransformOrder } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const moves = [
  { month: 4, change: -20 },
  { month: 1, change: 60 },
  { month: 3, change: 15 },
  { month: 2, change: -35 },
  { month: 5, change: 40 },
];
type Mode = { orderBy?: 'month'; order?: TransformOrder };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (mode: Mode) => {
    const bridge = waterfall(moves, { value: 'change', ...mode });
    return defineChart({
      marks: [barY(bridge, { x: (row) => `m${row.kind === 'total' ? '-' : row.month}`, y1: 'start', y2: 'end', color: 'kind', key: (row) => `m${row.kind === 'total' ? '-' : row.month}` })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: { domain: ['increase', 'decrease'], range: ['#4ade80', '#f87171'] },
    });
  };
  const states: readonly (readonly [Mode, string])[] = [
    [{}, 'input order: 4, 1, 3, 2, 5'],
    [{ orderBy: 'month' }, "orderBy: 'month'"],
    [{ orderBy: 'month', order: 'descending' }, "orderBy: 'month', order: 'descending'"],
  ];
  lab(stage, { label: 'order', ariaLabel: 'Bridge in different orders', states, build, ms: 2200, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
