// Several scatter readings per category on a category axis, in either orientation
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Seeded readings: 6 per day, as [dayName, value]. With a category axis the first element of
// a pair may be the category name (or its index).
function readings(seed: number): [string, number][] {
  let s = seed;
  const next = (): number => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return days.flatMap((d, i) => Array.from({ length: 6 }, (): [string, number] => [d, Math.round(160 + 50 * Math.sin(i) + next() * 120)]));
}

interface Look { horizontal: boolean; gap: boolean; lines: boolean }

function build(data: [string, number][], look: Look, preview: boolean): EChartsOption {
  const category = { type: 'category' as const, data: days, boundaryGap: look.gap, splitLine: { show: look.lines } };
  const value = { type: 'value' as const, min: 100, max: 360 };
  return {
    tooltip: {},
    grid: { top: 16, left: 44, right: 20, bottom: preview ? 28 : 36 },
    xAxis: look.horizontal ? value : category,
    yAxis: look.horizontal ? category : value,
    series: [
      {
        type: 'scatter',
        // For a horizontal strip the pair is [value, category]: swap each reading.
        data: look.horizontal ? data.map(([d, v]) => [v, d]) : data,
        // symbolSize callback: (value, params) => size. The value axis number is last or first.
        symbolSize: (v: (string | number)[]) => 6 + (Number(look.horizontal ? v[0] : v[1]) - 100) / 18,
        itemStyle: { opacity: 0.7 },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { horizontal: false, gap: true, lines: true };
  let data = readings(7);
  const show = (): void => {
    chart.setOption(build(data, look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => {
      i++;
      data = readings(7 + i);
      if (i % 3 === 0) look.horizontal = !look.horizontal;
      look.gap = i % 2 === 0;
      show();
    });
  } else {
    select(bar!, 'category axis', ['x (vertical strips)', 'y (horizontal strips)'], (v) => {
      look.horizontal = v.startsWith('y');
      show();
    });
    const gap = button(bar!, 'boundaryGap: on', () => {
      look.gap = !look.gap;
      gap.textContent = `boundaryGap: ${look.gap ? 'on' : 'off'}`;
      show();
    });
    const lines = button(bar!, 'splitLine: on', () => {
      look.lines = !look.lines;
      lines.textContent = `splitLine: ${look.lines ? 'on' : 'off'}`;
      show();
    });
    button(bar!, 'new readings', () => {
      data = readings(Math.floor(Math.random() * 1e6));
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
