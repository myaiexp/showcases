// registerSVG and a pictogram series: an inline SVG whose named elements are styled from data
import { registerPictogramChart } from '@visactor/vchart-extension';
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { VChart, createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';
import { SHAPES_SVG, SHAPE_NAMES } from './svg.ts';

const KEY = 'vchart-pictogram-shapes';
let registered = false;

const rows = (seed: number): { name: string; value: number }[] => {
  const r = rng(seed);
  return SHAPE_NAMES.map((name) => ({ name, value: Math.round(r() * 100) }));
};

const mount: Mount = (el, ctx) => {
  if (!registered) {
    registered = true;
    registerPictogramChart();
    VChart.registerSVG(KEY, SHAPES_SVG);
  }
  const spec = {
    type: 'pictogram',
    svg: KEY,
    // Elements whose `name` attribute matches a row of the data take the data's colour.
    nameField: 'name',
    valueField: 'value',
    data: { id: 'values', values: rows(1) },
    seriesField: 'name',
    color: { type: 'linear', range: ['#2b2f5a', '#f4c95d', '#ef5a4c'] },
    pictogram: { style: { fill: { scale: 'color', field: 'value', changeDomain: 'replace' } } },
    // roam.blank lets the reader drag from the empty area too.
    // Named elements without a data row (the line, the polyline, the text) fall back to this fill.
    defaultFillColor: '#e8e8e8',
    legends: { visible: false },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 460 });

  let seed = 1;
  let released = false;
  const stop = every(1600, () => {
    if (!released) void vchart.updateData('values', rows(++seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
