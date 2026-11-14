// Mark styles from functions: fill and corner radius computed from each datum
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const rand = seeded(6);
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon2', 'Tue2'];
const values = (): { day: string; score: number }[] => DAYS.map((day) => ({ day, score: Math.round(10 + rand() * 40) }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const specFor = (threshold: number): ISpec => ({
    type: 'bar',
    data: [{ id: 'scores', values: values() }],
    xField: 'day',
    yField: 'score',
    bar: {
      style: {
        // Style functions get the datum of each mark and return the value for that mark.
        fill: (datum: { score: number }) => (datum.score >= threshold ? '#ff6b6b' : '#4dabf7'),
        cornerRadius: (datum: { score: number }) => Math.round(datum.score / 5),
      },
    },
    axes: [{ orient: 'bottom', visible: true }, { orient: 'left', max: 50 }],
  } as unknown as ISpec);
  let threshold = 30;
  const chart = createChart(el, ctx, specFor(threshold));
  let alive = true;
  const stop = every(ctx.preview ? 1800 : 3500, () => {
    if (alive) void chart.vchart.updateData('scores', values());
  });
  if (bar) {
    slider(bar, 'threshold', [10, 50, 1], threshold, (v) => {
      threshold = v;
      if (alive) void chart.vchart.updateSpec(specFor(v));
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
