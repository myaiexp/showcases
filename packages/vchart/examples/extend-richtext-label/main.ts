// label.formatMethod returning rich text: an image paragraph and styled text paragraphs
import type { Mount } from '@/types.ts';
import { weekdayRows } from '../../shared/anim-data.ts';
import { badge } from '../../shared/richtext-icons.ts';
import { createChart, every } from '../../shared/chart.ts';

const COLORS = ['#4d7cff', '#2fb8a6', '#e8a33d', '#d9576c', '#8e6bd8'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const mount: Mount = (el, ctx) => {
  const rows = (seed: number) => weekdayRows(seed, days);
  const { vchart, release } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'sales', values: rows(1) }],
    xField: 'day',
    yField: 'sales',
    seriesField: 'day',
    legends: { visible: false },
    label: {
      visible: true,
      position: 'top',
      style: { singleLine: true, ellipsis: true },
      formatMethod: (value: unknown, datum?: { day?: string }) => ({
        type: 'rich',
        text: [
          { image: badge(COLORS[days.indexOf(datum?.day ?? '') % COLORS.length] ?? '#888', (datum?.day ?? '?').slice(0, 1)), width: 18, height: 18 },
          ...(ctx.preview ? [] : [{ text: ` ${datum?.day}: `, fontSize: 12, underline: true }]),
          { text: ` ${value}`, fontSize: 14, fontStyle: 'italic', fontWeight: 'bold', fill: '#ffffff' },
        ],
      }),
    },
  } as never);
  let i = 1;
  let alive = true;
  const stop = every(2200, () => {
    if (alive) void vchart.updateData('sales', rows(++i));
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
