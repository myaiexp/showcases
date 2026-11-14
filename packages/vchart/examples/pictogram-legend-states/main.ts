// Pictogram colours by a category, legend-driven highlighting with element-active-by-legend
import { registerPictogramChart } from '@visactor/vchart-extension';
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { VChart, createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';
import { BAYS, LOT_SVG } from './svg.ts';

const KEY = 'vchart-pictogram-lot';
let registered = false;
const STATUS = ['Free', 'Taken', 'Reserved'];

const bays = (seed: number): { name: string; status: string }[] => {
  const r = rng(seed);
  return BAYS.map((name) => ({ name, status: STATUS[Math.floor(r() * 3)] ?? 'Free' }));
};

const mount: Mount = (el, ctx) => {
  if (!registered) {
    registered = true;
    registerPictogramChart();
    VChart.registerSVG(KEY, LOT_SVG);
  }
  const spec = {
    type: 'pictogram',
    svg: KEY,
    nameField: 'name',
    valueField: 'status',
    seriesField: 'status',
    data: { id: 'bays', values: bays(1) },
    color: { specified: { Free: '#2fb27a', Taken: '#ef5a4c', Reserved: '#f4c95d', undefined: 'rgba(0,0,0,0)' } },
    pictogram: {
      style: { fill: { scale: 'color', field: 'status' } },
      // active is the state the legend interaction sets; hover is the pointer's.
      state: { active: { stroke: '#ffffff', lineWidth: 3 }, hover: { fillOpacity: 0.75 } },
    },
    interactions: [{ type: 'element-active-by-legend', filterField: 'status' }],
    legends: { visible: !ctx.preview, orient: 'bottom', filter: false },
    title: { visible: !ctx.preview, text: 'Hover a legend item to highlight its bays' },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 420 });

  let seed = 1;
  let released = false;
  const stop = every(1600, () => {
    if (!released) void vchart.updateData('bays', bays(++seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
