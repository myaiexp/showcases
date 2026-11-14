// colorScheme.default plus a palette per series type
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const CATS = ['Q1', 'Q2', 'Q3', 'Q4'];
const bars = CATS.flatMap((x, i) => ['north', 'south'].map((g, j) => ({ x, g, v: 20 + ((i * 7 + j * 11) % 25) })));
const line = CATS.flatMap((x, i) => ['trend a', 'trend b'].map((g, j) => ({ x, g, v: 30 + i * 6 + j * 14 })));

const SCHEMES: Record<string, Record<string, string[]>> = {
  'default only': { default: ['#5383F4', '#7BCF8E'] },
  'default + bar': { default: ['#5383F4', '#7BCF8E'], bar: ['#FF9D2C', '#FFDB26'] },
  'default + bar + line': { default: ['#5383F4', '#7BCF8E'], bar: ['#FF9D2C', '#FFDB26'], line: ['#FF6B6B', '#BB8FCE'] },
};

const mount: Mount = (el, ctx) => {
  const build = (scheme: string): never =>
    ({
      type: 'common',
      data: [
        { id: 'bars', values: bars },
        { id: 'lines', values: line },
      ],
      theme: { colorScheme: SCHEMES[scheme] },
      series: [
        { type: 'bar', dataId: 'bars', xField: 'x', yField: 'v', seriesField: 'g' },
        { type: 'line', dataId: 'lines', xField: 'x', yField: 'v', seriesField: 'g' },
      ],
      axes: [
        { orient: 'bottom', type: 'band' },
        { orient: 'left', type: 'linear' },
      ],
      legends: { visible: !ctx.preview },
    }) as never;

  const names = Object.keys(SCHEMES);
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, build('default only'));
  let released = false;
  const apply = (s: string): void => {
    if (!released) void vchart.updateSpec(build(s));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => apply(names[++i % names.length] ?? 'default only'));
  } else if (bar) {
    select(bar, 'colorScheme keys', names, apply);
  }

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
