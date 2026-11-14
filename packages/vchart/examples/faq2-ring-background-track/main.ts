// FAQ: a background track under a ring with gaps: a second pie series with one full-circle datum
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const AGES = ['0~9', '10~19', '20~29', '30~39', '40~49', '50~59'];

const mount: Mount = (el, ctx) => {
  const rand = seeded(11);
  const rows = (): { type: string; value: number }[] => AGES.map((type) => ({ type, value: Math.round(20 + rand() * 30) }));
  const spec: ISpec = {
    type: 'common',
    data: [
      { id: 'ages', values: rows() },
      { id: 'track', values: [{ type: 'all', value: 1 }] },
    ],
    series: [
      // Declared first, so it is drawn below. Same radii as the ring, no animation.
      {
        type: 'pie',
        id: 'track',
        dataIndex: 1,
        outerRadius: 0.8,
        innerRadius: 0.67,
        valueField: 'value',
        categoryField: 'type',
        animation: false,
        pie: { style: { fill: '#ffffff', fillOpacity: 0.2 } },
      },
      {
        type: 'pie',
        id: 'ring',
        dataIndex: 0,
        outerRadius: 0.8,
        innerRadius: 0.67,
        padAngle: 2,
        valueField: 'value',
        categoryField: 'type',
        pie: { style: { cornerRadius: 10 }, state: { hover: { outerRadius: 0.82, innerRadius: 0.65 } } },
      },
    ],
    legends: { visible: !ctx.preview, orient: 'bottom' },
  };
  const { vchart, release } = createChart(el, ctx, spec);
  let alive = true;
  const stop = every(1800, () => {
    if (alive) void vchart.updateData('ages', rows());
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
