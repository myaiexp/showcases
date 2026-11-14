// legends.item.value.formatMethod: rich text with a colour that depends on the data
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const TYPES = ['oxygen', 'silicon', 'aluminum'];

const mount: Mount = (el, ctx) => {
  const r = rng(5);
  const frame = () => TYPES.map((type) => ({ type, value: Math.round(10 + r() * 60), change: Math.round((r() - 0.5) * 40) }));
  let current = frame();
  const { vchart, release } = createChart(el, ctx, {
    type: 'pie',
    data: [{ id: 'mix', values: current }],
    valueField: 'value',
    categoryField: 'type',
    outerRadius: ctx.preview ? 0.7 : 0.8,
    label: { visible: false },
    legends: {
      orient: ctx.preview ? 'right' : 'top',
      autoPage: false,
      item: {
        width: ctx.preview ? 150 : 360,
        value: {
          alignRight: true,
          formatMethod: (value: unknown, datum: { label: string }) => {
            const change = current.find((d) => d.type === datum.label)?.change ?? 0;
            return {
              type: 'rich',
              text: [
                { text: `${value}`, fontWeight: 'bold' },
                { text: `  ${change >= 0 ? '+' : ''}${change}%`, fill: change >= 0 ? '#2fb86b' : '#e5534b' },
              ],
            };
          },
        },
      },
      // Legend items have no value of their own; the data callback adds one.
      data: (items: { label: string; value?: unknown }[]) =>
        items.map((item) => ({ ...item, value: current.find((d) => d.type === item.label)?.value ?? '' })),
    },
  } as never);
  let alive = true;
  const stop = every(2400, () => {
    if (!alive) return;
    current = frame();
    void vchart.updateData('mix', current);
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
