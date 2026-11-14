// VChart.registerFunction and formatMethod given by name
import VChart from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { DAYS } from '../../shared/events-data.ts';
import { pick } from '../../shared/components-data.ts';

const rows = DAYS.map((month, i) => ({ month, sales: 14 + ((i * 9) % 26) }));
// Names are page-wide, so they carry the `showcase` prefix.
const FUNCTIONS: Record<string, (v: number) => string> = {
  'showcase.labelTest': (key) => `${key}test`,
  'showcase.labelPercent': (v) => `${v}%`,
  'showcase.labelStars': (v) => '*'.repeat(Math.round(v / 8)),
};
const NAMES = Object.keys(FUNCTIONS);

const mount: Mount = (el, ctx) => {
  // Global registration: every chart on the page could now use these names.
  for (const [name, fn] of Object.entries(FUNCTIONS)) VChart.registerFunction(name, fn);

  const build = (name: string): never =>
    ({ type: 'bar', data: [{ id: 'sales', values: rows }], xField: 'month', yField: 'sales', label: { visible: true, formatMethod: name, style: { fill: '#E6E9F2' } } }) as never;
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, build(NAMES[0] as string));
  let released = false;
  const apply = (name: string): void => {
    if (!released) void vchart.updateSpec(build(name));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1700, () => apply(pick(NAMES, ++i)));
  } else if (bar) {
    select(bar, "label.formatMethod: '<name>'", NAMES, apply);
  }

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
