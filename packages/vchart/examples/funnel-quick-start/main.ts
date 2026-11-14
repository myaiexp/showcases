// Funnel quick start: categoryField names the stages, valueField sizes each layer
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { funnelJitter, funnelRows } from '../../shared/funnel-data.ts';

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'funnel',
    data: [{ id: 'stages', values: funnelRows() }],
    categoryField: 'name',
    valueField: 'value',
    label: { visible: true },
    legends: { visible: !ctx.preview, orient: 'left' },
  });
  const next = funnelJitter(5);
  const stop = every(2000, () => {
    void vchart.updateData('stages', next());
  });
  return () => {
    stop();
    release();
  };
};

export default mount;
