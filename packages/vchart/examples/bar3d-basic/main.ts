// bar3d: the bar chart with a depth, registered from vchart-extension, under a slowly turning camera
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { INIT_3D, orbit, register3d } from '../../shared/chart3d.ts';
import { rng } from '../../shared/components-data.ts';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const rows = (seed: number): { month: string; sales: number }[] => {
  const r = rng(seed);
  return DAYS.map((month) => ({ month, sales: Math.round(10 + r() * 35) }));
};

const mount: Mount = (el, ctx) => {
  register3d('bar3d');
  const spec = {
    type: 'bar3d',
    data: [{ id: 'barData', values: rows(1) }],
    xField: 'month',
    yField: 'sales',
    // length is the depth of each bar, z its position along the depth axis.
    bar3d: { style: { length: 20, z: -20 }, state: { selected: { stroke: '#fff', strokeWidth: 1 } } },
    axes: [
      { orient: 'bottom', type: 'band', tick: { tickSize: 20 }, mode: '3d' },
      { orient: 'left', type: 'linear', tick: { tickSize: 20 }, mode: '3d' },
    ],
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 440, init: INIT_3D });

  let alive = true;
  const stopOrbit = orbit(vchart, { alpha: 0.2, beta: 0.2 }, () => alive);
  let seed = 1;
  const stopData = every(2600, () => {
    if (alive) void vchart.updateData('barData', rows(++seed));
  });
  return () => {
    alive = false;
    stopOrbit();
    stopData();
    release();
  };
};

export default mount;
