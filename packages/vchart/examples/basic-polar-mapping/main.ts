// Polar mapping: a pie spec with categoryField and valueField, title, legend, label and tooltip
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const ELEMENTS = ['oxygen', 'silicon', 'aluminum', 'iron', 'calcium', 'sodium', 'potassium', 'others'];
const rand = seeded(7);
const values = (): { type: string; value: string }[] =>
  ELEMENTS.map((type, i) => ({ type, value: (rand() * 30 + (i === 0 ? 30 : 2)).toFixed(2) }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const spec: ISpec = {
    type: 'pie',
    data: [{ id: 'id0', values: values() }],
    outerRadius: 0.8,
    valueField: 'value',
    categoryField: 'type',
    title: { visible: true, text: 'Surface element content' },
    legends: { visible: !ctx.preview, orient: 'left' },
    label: { visible: true },
    tooltip: {
      mark: {
        content: [{ key: (datum) => String(datum?.['type']), value: (datum) => `${datum?.['value']}%` }],
      },
    },
  };
  const { vchart, release } = createChart(el, ctx, spec);
  let alive = true;

  const stop = every(ctx.preview ? 1800 : 3000, () => {
    if (alive) void vchart.updateData('id0', values());
  });
  if (bar) {
    slider(bar, 'outerRadius', [0.3, 1, 0.05], 0.8, (v) => {
      void vchart.updateSpec({ ...spec, outerRadius: v });
    });
    select(bar, 'legend orient', ['left', 'top', 'right', 'bottom'], (v) => {
      void vchart.updateSpec({ ...spec, legends: { visible: true, orient: v as 'left' } });
    });
  }

  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
