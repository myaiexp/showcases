// A stacked area chart with zField: each country is a ribbon at its own depth
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { INIT_3D, center3d, orbit, register3d, PREVIEW_Z_SIZE } from '../../shared/chart3d.ts';
import { rng } from '../../shared/components-data.ts';

const TYPES = ['Nail polish', 'Eyebrow pencil', 'Rouge', 'Lipstick', 'Eyeshadows', 'Eyeliner'];
const COUNTRIES = ['Africa', 'EU', 'China', 'USA'];
const rows = (seed: number): { type: string; country: string; value: number }[] => {
  const r = rng(seed);
  return TYPES.flatMap((type) => COUNTRIES.map((country) => ({ type, country, value: Math.round(3000 + r() * 12000) })));
};

const mount: Mount = (el, ctx) => {
  register3d('axis3d');
  const spec = {
    type: 'area',
    data: [{ id: 'sales', values: rows(1) }],
    stack: true,
    xField: 'type',
    yField: 'value',
    zField: 'country',
    seriesField: 'country',
    axes: [
      { orient: 'bottom', mode: '3d' },
      { orient: 'left', mode: '3d', domainLine: { visible: false }, tick: { visible: false } },
      { orient: 'z', mode: '3d', type: 'band', label: { visible: !ctx.preview }, grid: { visible: true }, ...(ctx.preview ? PREVIEW_Z_SIZE : { width: 600, height: 200, depth: 200 }) },
    ],
    legends: [{ visible: !ctx.preview, position: 'middle', orient: 'bottom', padding: { top: 30 } }],
    
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, {
    height: 460,
    init: { ...INIT_3D, options3d: { enable: true, enableView3dTransform: true, center: center3d(ctx.preview) } },
  });

  let alive = true;
  const stopOrbit = orbit(vchart, { alpha: 0.1, beta: 0.3 }, () => alive, { enableView3dTransform: true, center: center3d(ctx.preview) }, 0.15);
  let seed = 1;
  const stopData = every(3200, () => {
    if (alive) void vchart.updateData('sales', rows(++seed));
  });
  return () => {
    alive = false;
    stopOrbit();
    stopData();
    release();
  };
};

export default mount;
