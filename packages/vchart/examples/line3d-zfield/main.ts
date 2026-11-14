// A line chart gets a third dimension from zField and a z axis in 3d mode (registerAxis3dPlugin)
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { INIT_3D, center3d, orbit, register3d, PREVIEW_Z_SIZE } from '../../shared/chart3d.ts';
import { rng } from '../../shared/components-data.ts';

const YEARS = ['1950', '1960', '1970', '1980', '1990', '2000', '2010'];
const COUNTRIES = ['France', 'Germany', 'Japan', 'United States'];
const rows = (seed: number): { year: string; country: string; value: number }[] => {
  const r = rng(seed);
  return COUNTRIES.flatMap((country, c) => {
    let v = 2 + c;
    return YEARS.map((year) => ({ year, country, value: Math.round((v += 1 + r() * 4) * 10) / 10 }));
  });
};

const mount: Mount = (el, ctx) => {
  register3d('axis3d');
  const spec = {
    type: 'line',
    data: [{ id: 'values', values: rows(1) }],
    xField: 'year',
    yField: 'value',
    // zField puts each country on its own depth lane; the z axis (mode '3d') labels the lanes.
    zField: 'country',
    seriesField: 'country',
    line: { style: { lineWidth: 3 } },
    point: { visible: false },
    axes: [
      { orient: 'bottom', mode: '3d' },
      { orient: 'left', mode: '3d' },
      { orient: 'z', mode: '3d', type: 'band', label: { visible: !ctx.preview }, grid: { visible: true }, ...(ctx.preview ? PREVIEW_Z_SIZE : { width: 600, height: 200, depth: 200 }) },
    ],
    legends: { visible: !ctx.preview, orient: 'bottom' },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, {
    height: 440,
    init: { ...INIT_3D, options3d: { enable: true, enableView3dTransform: true, center: center3d(ctx.preview) } },
  });

  let alive = true;
  const stopOrbit = orbit(vchart, { alpha: 0.15, beta: 0.35 }, () => alive, { enableView3dTransform: true, center: center3d(ctx.preview) });
  let seed = 1;
  const stopData = every(3200, () => {
    if (alive) void vchart.updateData('values', rows(++seed));
  });
  return () => {
    alive = false;
    stopOrbit();
    stopData();
    release();
  };
};

export default mount;
