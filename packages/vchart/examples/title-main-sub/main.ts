// Chart title: text, subtext and their styles; arrays make multiple lines
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { groupedRows, QUARTERS } from '../../shared/components-data.ts';

const TITLES: Record<string, { text: string | string[]; subtext: string | string[] }> = {
  'text + subtext': { text: 'Quarterly revenue', subtext: 'Four regions, six quarters' },
  'text only': { text: 'Quarterly revenue', subtext: '' },
  'multi-line (arrays)': { text: ['Quarterly', 'revenue'], subtext: ['Four regions,', 'six quarters'] },
};

const build = (key: string, small = false, rows = groupedRows(QUARTERS, ['North', 'South', 'East', 'West'], 7)): ISpec => ({
  type: 'bar',
  data: [{ id: 'sales', values: rows }],
  xField: ['x', 'c'],
  yField: 'y',
  seriesField: 'c',
  legends: { visible: false },
  title: {
    visible: true,
    ...TITLES[key],
    // A 200px card leaves no room for a 20px two-line title above the plot.
    textStyle: { fill: '#f8fafc', fontSize: small ? 13 : 20, fontWeight: 'bold' },
    subtextStyle: { fill: '#94a3b8', fontSize: small ? 10 : 13 },
  },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('text + subtext', ctx.preview));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    const keys = Object.keys(TITLES);
    let i = 0;
    stop = every(1800, () => {
      i += 1;
      if (!released) void vchart.updateSpec(build(keys[i % keys.length] as string, true));
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'title', Object.keys(TITLES), (v) => {
      if (!released) void vchart.updateSpec(build(v));
    });
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
