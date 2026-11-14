// FAQ: segment a linearProgress bar with extensionMark rules at 1/n of its length
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, every, select } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const TYPES = ['Tradition', 'Business', 'Customer'];

const mount: Mount = (el, ctx) => {
  const rand = seeded(8);
  const rows = (): { type: string; value: number }[] => TYPES.map((type) => ({ type, value: Math.round((0.3 + rand() * 0.65) * 100) / 100 }));
  const build = (segments: number): ISpec =>
    ({
      type: 'linearProgress',
      data: [{ id: 'id0', values: rows() }],
      direction: 'horizontal',
      xField: 'value',
      yField: 'type',
      seriesField: 'type',
      height: ctx.preview ? 190 : 240,
      cornerRadius: 20,
      progress: { style: { cornerRadius: 0 } },
      bandWidth: 30,
      axes: [
        { orient: 'left', type: 'band', domainLine: { visible: false }, tick: { visible: false } },
        { orient: 'bottom', type: 'linear', visible: true, grid: { visible: false }, label: { formatMethod: (v: number) => `${v * 100}%`, flush: true } },
      ],
      // One rule per inner boundary; ctx converts a value or a category to canvas pixels.
      extensionMark: Array.from({ length: segments - 1 }, (_, k) => ({
        type: 'rule',
        dataId: 'id0',
        visible: true,
        style: {
          x: (_d: unknown, c: { valueToX: (v: number[]) => number }) => c.valueToX([(k + 1) / segments]),
          x1: (_d: unknown, c: { valueToX: (v: number[]) => number }) => c.valueToX([(k + 1) / segments]),
          y: (d: { type: string }, c: { valueToY: (v: string[]) => number }) => c.valueToY([d.type]) - 15,
          y1: (d: { type: string }, c: { valueToY: (v: string[]) => number }) => c.valueToY([d.type]) + 15,
          stroke: '#0b0c10',
          lineWidth: 4,
          zIndex: 1,
        },
      })),
    }) as unknown as ISpec;
  let segments = 3;
  let chart = createChart(el, ctx, build(segments), { height: 260, previewHeight: 200 });
  const rebuild = (n: number): void => {
    segments = n;
    chart.release();
    chart = createChart(el, ctx, build(n), { height: 260, previewHeight: 200 });
  };
  let alive = true;
  let i = 0;
  const stop = every(1800, () => {
    if (!alive) return;
    i++;
    if (ctx.preview && i % 3 === 0) rebuild(segments === 3 ? 5 : 3);
    else void chart.vchart.updateData('id0', rows());
  });
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'segments', ['2', '3', '4', '5', '10'], (v) => rebuild(Number(v))).value = '3';
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
