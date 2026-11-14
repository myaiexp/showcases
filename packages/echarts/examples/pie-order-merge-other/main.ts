// A pie with the guideline order (largest first, clockwise from the top) and an Other slice, as switches
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';

const browsers: [string, number][] = [
  ['Firefox', 6.4], ['Chrome', 64.1], ['Opera', 2.3], ['Safari', 18.2], ['Edge', 4.6], ['Brave', 1.1],
  ['Vivaldi', 0.8], ['Samsung', 1.9], ['UC', 0.4], ['Others', 0.2],
];

interface Look { merge: boolean; sort: boolean; emphasis: boolean }

function build(look: Look): EChartsOption {
  // Largest first: the data is ordered by size, then drawn clockwise from the start angle.
  let rows = look.sort ? [...browsers].sort((a, b) => b[1] - a[1]) : [...browsers];
  if (look.merge) {
    // Keep the top four and name the long tail "Other" so the pie stays under five slices.
    const sorted = [...browsers].sort((a, b) => b[1] - a[1]);
    const rest = sorted.slice(4).reduce((s, r) => s + r[1], 0);
    const kept = look.sort ? sorted.slice(0, 4) : browsers.filter((b) => sorted.slice(0, 4).includes(b));
    rows = [...kept, ['Other', Math.round(rest * 10) / 10]];
  }
  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
    legend: { show: false },
    series: [
      {
        type: 'pie',
        radius: '68%',
        center: ['50%', '50%'],
        // Clockwise from the top is the default reading habit the guideline relies on.
        startAngle: 90,
        clockwise: true,
        selectedMode: 'single',
        selectedOffset: 14,
        label: { formatter: '{b}\n{d}%' },
        data: rows.map(([name, value]) => ({
          name,
          value,
          // One sector pushed out, to stress it without extra colours (moderate decoration).
          selected: look.emphasis && value === 64.1,
        })),
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { merge: true, sort: true, emphasis: true };
  const show = (): void => {
    chart.setOption(build(look), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(2000, () => {
      i += 1;
      look.merge = i % 2 === 0;
      look.sort = i % 4 < 2;
      show();
    });
  } else {
    select(bar!, 'small slices', ['merged into Other', 'every slice'], (v) => { look.merge = v === 'merged into Other'; show(); });
    select(bar!, 'order', ['largest first', 'data order'], (v) => { look.sort = v === 'largest first'; show(); });
    select(bar!, 'emphasis', ['one sector offset', 'none'], (v) => { look.emphasis = v === 'one sector offset'; show(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
