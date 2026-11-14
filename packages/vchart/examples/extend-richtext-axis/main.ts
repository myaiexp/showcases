// axes.label.formatMethod returning rich text: a rank badge image and a styled name
import type { Mount } from '@/types.ts';
import { badge } from '../../shared/richtext-icons.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const NAMES = ['Ada', 'Bo', 'Cy', 'Di'];
const MEDAL = ['#d4a017', '#9aa4b2', '#b87333', '#4d7cff'];

const mount: Mount = (el, ctx) => {
  const r = rng(77);
  const ranking = () =>
    NAMES.map((name) => ({ name, value: Math.round(100 + r() * 800) })).sort((a, b) => b.value - a.value);
  let order = ranking();
  const { vchart, release } = createChart(el, ctx, {
    type: 'bar',
    direction: 'horizontal',
    data: [{ id: 'rank', values: order }],
    yField: 'name',
    xField: 'value',
    padding: { left: 20 },
    legends: { visible: false },
    bar: { style: { cornerRadius: [0, 8, 8, 0] } },
    label: { visible: true, position: 'inside', style: { fill: '#ffffff' } },
    axes: [
      {
        orient: 'left',
        type: 'band',
        minWidth: 90,
        label: {
          formatMethod: (name: string) => ({
            type: 'rich',
            text: [
              { image: badge(MEDAL[order.findIndex((d) => d.name === name)] ?? '#888', String(order.findIndex((d) => d.name === name) + 1)), width: 26, height: 26 },
              { text: ` ${name}`, fontSize: 14, fontWeight: 'bold', fontStyle: 'italic' },
            ],
          }),
        },
      },
      { orient: 'bottom', type: 'linear', visible: !ctx.preview },
    ],
  } as never);
  let alive = true;
  const stop = every(2400, () => {
    if (!alive) return;
    order = ranking();
    void vchart.updateData('rank', order);
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
