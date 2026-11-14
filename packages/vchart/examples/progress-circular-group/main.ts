// Grouped circular progress: several categories nest as rings, with an indicator card on hover
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { jitterer } from '../../shared/polar-data.ts';

const ROWS = [
  { type: 'Traditional industries', value: 0.795, text: '79.5%' },
  { type: 'Business companies', value: 0.25, text: '25%' },
  { type: 'Customer-facing companies', value: 0.065, text: '6.5%' },
];

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'circularProgress',
    data: [{ id: 'rings', values: ROWS }],
    valueField: 'value',
    categoryField: 'type',
    seriesField: 'type',
    radius: 0.9,
    innerRadius: 0.35,
    roundCap: true,
    cornerRadius: 20,
    progress: { style: { innerPadding: 3, outerPadding: 3 } },
    // The category axis is a band axis on the radius, so each category gets one ring.
    axes: [
      { orient: 'angle', type: 'linear', visible: false },
      { orient: 'radius', type: 'band', visible: false },
    ],
    indicator: {
      visible: !ctx.preview,
      trigger: 'hover',
      title: { visible: true, field: 'type', autoLimit: true, style: { fontSize: 16, fill: '#ddd' } },
      content: [{ visible: true, field: 'text', style: { fontSize: 14, fill: '#999' } }],
    },
    legends: { visible: !ctx.preview, orient: 'right', title: { visible: false } },
  } as never);
  const next = jitterer(ROWS, 2, 0.8);
  const stop = every(1800, () => {
    void vchart.updateData(
      'rings',
      next().map((d) => {
        const value = Math.min(1, Math.round(d.value * 1000) / 1000);
        return { ...d, value, text: `${Math.round(value * 1000) / 10}%` };
      }),
    );
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
