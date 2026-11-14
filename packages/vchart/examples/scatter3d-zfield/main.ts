// A scatter plot in 3D: zField is the third axis, sizeField the bubble size, shapeField the symbol
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { INIT_3D, center3d, orbit, register3d, PREVIEW_Z_SIZE } from '../../shared/chart3d.ts';
import { rng } from '../../shared/components-data.ts';

const AREAS = ['Northeast', 'Zhongnan', 'Southwest', 'North China', 'East China'];
const TYPES = ['Technology', 'office supplies', 'furniture'];
const rows = (seed: number): { x: number; y: number; size: number; type: string; area: string }[] => {
  const r = rng(seed);
  return AREAS.flatMap((area) =>
    TYPES.map((type) => ({ area, type, x: Math.round(200000 + r() * 1500000), y: Math.round(300 + r() * 6000), size: Math.round(20000 + r() * 230000) })),
  );
};

const mount: Mount = (el, ctx) => {
  register3d('axis3d');
  const spec = {
    type: 'scatter',
    data: [{ id: 'points', values: rows(1) }],
    xField: 'x',
    yField: 'y',
    zField: 'area',
    seriesField: 'type',
    shapeField: 'type',
    shape: { type: 'ordinal', range: ['star', 'triangleLeft', 'diamond'] },
    sizeField: 'size',
    size: { type: 'linear', range: [8, 26] },
    axes: [
      { orient: 'bottom', mode: '3d' },
      { orient: 'left', mode: '3d', domainLine: { visible: false }, tick: { visible: false } },
      { orient: 'z', mode: '3d', type: 'band', label: { visible: !ctx.preview }, grid: { visible: true }, ...(ctx.preview ? PREVIEW_Z_SIZE : { width: 600, height: 200, depth: 200 }) },
    ],
    legends: [{ visible: !ctx.preview, orient: 'left', position: 'start' }],
    direction: 'horizontal',
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, {
    height: 440,
    init: { ...INIT_3D, options3d: { enable: true, enableView3dTransform: true, center: center3d(ctx.preview) } },
  });

  let alive = true;
  const stopOrbit = orbit(vchart, { alpha: 0.12, beta: 0.3 }, () => alive, { enableView3dTransform: true, center: center3d(ctx.preview) });
  let seed = 1;
  const stopData = every(3200, () => {
    if (alive) void vchart.updateData('points', rows(++seed));
  });
  return () => {
    alive = false;
    stopOrbit();
    stopData();
    release();
  };
};

export default mount;
