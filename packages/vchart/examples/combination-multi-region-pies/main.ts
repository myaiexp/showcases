// Four pie regions in a 2 x 2 grid layout with one shared legend underneath
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const REGIONS = ['DAU', 'New', 'MAU', 'Returning'];
const TYPES = ['Mobile', 'Desktop', 'Tablet'];
const rows = (region: string, seed: number): { type: string; value: number }[] => {
  const r = rng(seed + region.length * 17);
  return TYPES.map((type) => ({ type, value: Math.round(10 + r() * 60) }));
};

const mount: Mount = (el, ctx) => {
  const spec = {
    type: 'common',
    padding: { top: ctx.preview ? 10 : 40 },
    layout: {
      type: 'grid',
      col: 2,
      row: 3,
      // The legend row is 36px; each function size gives a pie row half of what is left.
      rowHeight: [
        { index: 0, size: (total: number) => (total - 36) / 2 },
        { index: 1, size: (total: number) => (total - 36) / 2 },
        { index: 2, size: 36 },
      ],
      elements: [
        { modelId: 'DAU', col: 0, row: 0 },
        { modelId: 'New', col: 1, row: 0 },
        { modelId: 'MAU', col: 0, row: 1 },
        { modelId: 'Returning', col: 1, row: 1 },
        { modelId: 'legend', col: 0, colSpan: 2, row: 2 },
      ],
    },
    region: REGIONS.map((id) => ({ id })),
    legends: { id: 'legend', visible: !ctx.preview, orient: 'bottom', regionId: REGIONS },
    series: REGIONS.map((id) => ({
      type: 'pie',
      regionId: id,
      data: { id, values: rows(id, 1) },
      valueField: 'value',
      categoryField: 'type',
      seriesField: 'type',
      outerRadius: 0.8,
      innerRadius: 0.4,
      label: { visible: false },
    })),
    title: { visible: !ctx.preview, text: 'Four regions, one chart' },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec, { height: 460 });

  let seed = 1;
  let released = false;
  const stop = every(2200, () => {
    if (released) return;
    seed += 1;
    for (const id of REGIONS) void vchart.updateData(id, rows(id, seed));
  });
  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
