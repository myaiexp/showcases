// A bar chart with the basic-bar guidance (zero baseline, few colours, sorting, gaps) as switches
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';

const raw: [string, number][] = [
  ['North', 112], ['Coast', 131], ['Valley', 96], ['Harbour', 124], ['Plains', 104], ['Hills', 118], ['Delta', 99],
];

interface Look { baseline: 'starts at 0' | 'truncated'; colour: 'one + highlight' | 'one per bar'; order: 'sorted' | 'unsorted'; gap: 'wide' | 'tight' }

function build(look: Look): EChartsOption {
  const rows = look.order === 'sorted' ? [...raw].sort((a, b) => b[1] - a[1]) : raw;
  const top = Math.max(...raw.map((r) => r[1]));
  return {
    tooltip: {},
    grid: { top: 24, left: 44, right: 16, bottom: 36 },
    xAxis: { type: 'category', data: rows.map((r) => r[0]) },
    // The guideline: values on the y-axis should start from 0, or small differences look huge.
    yAxis: { type: 'value', min: look.baseline === 'starts at 0' ? 0 : 90 },
    series: [
      {
        type: 'bar',
        data: rows.map(([, v]) =>
          // One colour for the whole series; a contrasting colour only marks the meaningful point.
          look.colour === 'one + highlight' && v === top ? { value: v, itemStyle: { color: '#fac858' } } : v,
        ),
        // colorBy 'data' gives every bar its own palette colour (the thing to avoid).
        colorBy: look.colour === 'one per bar' ? 'data' : 'series',
        // The gap between bars: bar width should be at least twice the gap (33% of the category).
        barCategoryGap: look.gap === 'wide' ? '33%' : '4%',
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { baseline: 'starts at 0', colour: 'one + highlight', order: 'sorted', gap: 'wide' };
  const show = (): void => {
    chart.setOption(build(look));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => {
      i += 1;
      look.baseline = i % 2 ? 'truncated' : 'starts at 0';
      look.colour = i % 3 === 0 ? 'one per bar' : 'one + highlight';
      look.order = i % 4 < 2 ? 'sorted' : 'unsorted';
      look.gap = i % 5 === 4 ? 'tight' : 'wide';
      show();
    });
  } else {
    select(bar!, 'y-axis', ['starts at 0', 'truncated'], (v) => { look.baseline = v as Look['baseline']; show(); });
    select(bar!, 'colour', ['one + highlight', 'one per bar'], (v) => { look.colour = v as Look['colour']; show(); });
    select(bar!, 'order', ['sorted', 'unsorted'], (v) => { look.order = v as Look['order']; show(); });
    select(bar!, 'gap', ['wide', 'tight'], (v) => { look.gap = v as Look['gap']; show(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
