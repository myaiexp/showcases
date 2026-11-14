// indicator.title.style.text returning rich text, following the selected slice
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const rows = [
  { value: '159', type: 'Tradition', percentage: '71.6%' },
  { value: '50', type: 'Services', percentage: '22.5%' },
  { value: '13', type: 'Research', percentage: '5.9%' },
];

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'pie',
    data: [{ id: 'sectors', values: rows }],
    valueField: 'value',
    categoryField: 'type',
    outerRadius: 0.85,
    innerRadius: 0.62,
    legends: { visible: false },
    label: { visible: false },
    pie: { state: { selected: { outerRadius: 0.9 } } },
    indicator: {
      visible: true,
      fixed: true,
      trigger: 'select',
      title: {
        style: {
          fontSize: 14,
          text: (datum?: { type: string }) =>
            datum
              ? {
                  type: 'rich',
                  text: [
                    { text: ctx.preview ? '' : 'sector: ', fontWeight: 'bold', fontSize: 16, fill: '#8aa4ff' },
                    { text: datum.type, fontStyle: 'italic', textDecoration: 'underline', fill: '#8aa4ff' },
                  ],
                }
              : '',
        },
      },
      content: [
        { field: 'value', style: { fontSize: ctx.preview ? 22 : 36, fontWeight: 'bolder' } },
        { field: 'percentage', style: { fontSize: ctx.preview ? 12 : 18 } },
      ],
    },
  } as never);
  let i = 0;
  let alive = true;
  const step = () => {
    if (alive) vchart.setSelected({ type: rows[i++ % rows.length]?.type });
  };
  step();
  const stop = every(1800, step);
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
