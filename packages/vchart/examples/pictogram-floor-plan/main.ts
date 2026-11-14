// A pictogram floor plan: nameField ties each room's rect to a data row, a colour scale paints it
import { registerPictogramChart } from '@visactor/vchart-extension';
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { VChart, createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';
import { FLOOR_SVG, ROOMS } from './svg.ts';

const KEY = 'vchart-pictogram-floor-plan';
let registered = false;

const temps = (seed: number): { name: string; value: number }[] => {
  const r = rng(seed);
  return ROOMS.map(({ name }) => ({ name, value: Math.round((18 + r() * 10) * 10) / 10 }));
};

const mount: Mount = (el, ctx) => {
  if (!registered) {
    registered = true;
    registerPictogramChart();
    VChart.registerSVG(KEY, FLOOR_SVG);
  }
  const spec = {
    type: 'pictogram',
    svg: KEY,
    nameField: 'name',
    valueField: 'value',
    data: { id: 'temps', values: temps(1) },
    seriesField: 'name',
    // A room with no row in the data would take defaultFillColor.
    defaultFillColor: '#2a2f3c',
    color: { type: 'linear', range: ['#3f7fd0', '#f4c95d', '#ef5a4c'] },
    pictogram: {
      style: { fill: { scale: 'color', field: 'value', changeDomain: 'replace' } },
      state: { hover: { stroke: '#ffffff', lineWidth: 3 } },
    },
    title: { visible: !ctx.preview, text: 'Room temperature (C)' },
    legends: { visible: false },
    tooltip: { mark: { content: [{ key: (d: { name: string }) => d.name, value: (d: { value: number }) => `${d.value} C` }] } },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 440 });

  let seed = 1;
  let released = false;
  const stop = every(1800, () => {
    if (!released) void vchart.updateData('temps', temps(++seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
