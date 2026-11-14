// Pie quick start: categoryField and valueField turn rows into sectors; updateData reshapes them
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { ELEMENTS, jitterer } from '../../shared/polar-data.ts';

const mount: Mount = (el, ctx) => {
  const spec: ISpec = {
    type: 'pie',
    data: [{ id: 'elements', values: ELEMENTS }],
    categoryField: 'type',
    valueField: 'value',
    outerRadius: 0.8,
    title: { visible: !ctx.preview, text: 'Surface element content statistics' },
    legends: { visible: !ctx.preview, orient: 'left' },
    label: { visible: true },
  };
  const { vchart, release } = createChart(el, ctx, spec);

  // Every two seconds the values are redrawn at random and the sectors swing to their new angles.
  const next = jitterer(ELEMENTS, 3);
  const stop = every(2000, () => {
    void vchart.updateData('elements', next());
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
