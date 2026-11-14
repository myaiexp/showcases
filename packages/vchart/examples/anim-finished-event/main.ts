// vchart.on('animationFinished'): time from updateData to the end of the animation
import type { Mount } from '@/types.ts';
import { weekdayRows } from '../../shared/anim-data.ts';
import { createChart, every, readout } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  let duration = 900;
  const spec = () => ({
    type: 'bar' as const,
    data: [{ id: 'sales', values: weekdayRows(1) }],
    xField: 'day',
    yField: 'sales',
    animationUpdate: { duration, oneByOne: 60 },
  });
  const chart = createChart(el, ctx, spec());
  const log = ctx.preview ? null : readout(el);
  let sentAt = 0;
  const lines: string[] = [];
  let finished = 0;
  const handler = (): void => {
    finished++;
    if (sentAt) lines.unshift(`animationFinished #${finished}: ${Math.round(performance.now() - sentAt)} ms after updateData (duration ${duration}, oneByOne 60)`);
    if (log) log.textContent = lines.slice(0, 6).join('\n');
    sentAt = 0;
  };
  chart.vchart.on('animationFinished', handler);
  let i = 1;
  let alive = true;
  const stop = every(3000, () => {
    if (!alive) return;
    duration = [900, 400, 1600][i % 3] ?? 900;
    void chart.vchart.updateSpec(spec()).then(() => {
      if (!alive) return;
      sentAt = performance.now();
      void chart.vchart.updateData('sales', weekdayRows(++i));
    });
  });
  return () => {
    alive = false;
    stop();
    chart.vchart.off('animationFinished', handler);
    chart.release();
  };
};

export default mount;
