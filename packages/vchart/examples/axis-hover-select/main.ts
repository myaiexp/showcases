// Axis interaction: hover and select with background and label states
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const rand = seeded(53);
const YEARS = ['1990', '1995', '2000', '2005', '2010', '2015'];
const rows = (): { x: string; y: number; from: string }[] =>
  ['video ad', 'email marketing'].flatMap((from) => YEARS.map((x) => ({ x, y: Math.round(100 + rand() * 400), from })));

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'area',
    data: [{ id: 'area', values: rows() }],
    xField: 'x',
    yField: 'y',
    seriesField: 'from',
    axes: [
      {
        orient: 'bottom',
        hover: true, // turn on hover interaction
        select: true, // turn on select interaction
        background: {
          visible: true,
          style: { fillOpacity: 0 },
          state: {
            hover: { fillOpacity: 0.65, fill: '#495057', cursor: 'pointer' },
            selected: { fillOpacity: 0.65, fill: '#1c7ed6', cursor: 'pointer' },
          },
        },
        label: {
          style: { pickable: false }, // let the background take the pointer
          state: { hover_reverse: { fill: '#868e96' }, selected_reverse: { fill: '#868e96' } },
        },
      },
      { orient: 'left' },
    ],
  } as never);
  let alive = true;
  const stop = every(ctx.preview ? 1800 : 4000, () => {
    if (alive) void vchart.updateData('area', rows());
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
