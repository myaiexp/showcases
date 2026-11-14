// Polar combination: a rose and a radar in one chart, with the angle and radius axes declared by hand
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const DIRS = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
const roseRows = (seed: number): { key: string; value: number }[] => {
  const r = rng(seed);
  return DIRS.map((key) => ({ key, value: Math.round(15 + r() * 40) }));
};
const radarRows = (seed: number): { key: string; value: number; category: string }[] => {
  const r = rng(seed + 9);
  return ['Destroyer', 'Carrier'].flatMap((category) => DIRS.map((key) => ({ key, category, value: Math.round(8 + r() * 40) })));
};

const mount: Mount = (el, ctx) => {
  const spec = {
    type: 'common',
    outerRadius: 0.9,
    series: [
      {
        type: 'rose',
        data: { id: 'rose', values: roseRows(1) },
        categoryField: 'key',
        valueField: 'value',
        stack: false,
        rose: { style: { lineWidth: 1, stroke: '#fff', fill: '#FF6666', fillOpacity: 0.7 } },
      },
      {
        type: 'radar',
        data: { id: 'radar', values: radarRows(1) },
        categoryField: 'key',
        valueField: 'value',
        seriesField: 'category',
        area: { style: { fillOpacity: 0.3 } },
        line: { style: { lineWidth: 2 } },
      },
    ],
    // A combination chart can't infer its coordinate system, so the polar axes are declared.
    axes: [
      { orient: 'angle', grid: { alignWithLabel: false, style: { lineDash: [0] } } },
      { orient: 'radius', domainLine: { visible: false } },
    ],
    legends: { visible: !ctx.preview, interactive: false },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 460 });

  let seed = 1;
  let released = false;
  const stop = every(2200, () => {
    if (released) return;
    seed += 1;
    void vchart.updateData('rose', roseRows(seed));
    void vchart.updateData('radar', radarRows(seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
