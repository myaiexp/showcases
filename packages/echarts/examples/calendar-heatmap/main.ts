// Calendar component with a heatmap series: a year of generated daily values
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

let seed = 99;
const rnd = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// One [date, value] per day of 2026; weekdays are busier.
const data: [string, number][] = [];
for (let t = Date.UTC(2026, 0, 1); t < Date.UTC(2027, 0, 1); t += 86400000) {
  const d = new Date(t);
  const weekday = d.getUTCDay() > 0 && d.getUTCDay() < 6;
  data.push([d.toISOString().slice(0, 10), Math.round(rnd() * (weekday ? 12 : 4))]);
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 260 });

  const apply = (range: string | string[]): void => {
    chart.setOption({
      tooltip: { formatter: (p: unknown) => `${(p as { value: [string, number] }).value[0]}: ${(p as { value: [string, number] }).value[1]}` },
      visualMap: {
        min: 0,
        max: 12,
        show: !ctx.preview,
        orient: 'horizontal',
        left: 'center',
        bottom: 6,
        inRange: { color: ['#1f2a36', '#2e6f4e', '#4caf50', '#c6ff7a'] },
      },
      calendar: {
        range, // a year ('2026') or a span like ['2026-03-01', '2026-06-30']
        left: 40,
        top: ctx.preview ? 24 : 50,
        right: 20,
        cellSize: ['auto', ctx.preview ? 12 : 16],
        itemStyle: { borderWidth: 2, borderColor: '#111' },
        splitLine: { lineStyle: { color: '#555' } }, // lines between months
        dayLabel: { firstDay: 1, color: '#aaa', show: !ctx.preview },
        monthLabel: { color: '#aaa', fontSize: ctx.preview ? 9 : 12 },
        yearLabel: { show: !ctx.preview },
      },
      // The heatmap series binds to the calendar through coordinateSystem + calendarIndex.
      series: [{ type: 'heatmap', coordinateSystem: 'calendar', calendarIndex: 0, data }],
    });
  };
  apply('2026');

  if (bar) {
    const ranges: Record<string, string | string[]> = {
      'whole year': '2026',
      'Mar to Jun': ['2026-03-01', '2026-06-30'],
      'one month': '2026-09',
    };
    select(bar, 'calendar.range', Object.keys(ranges), (v) => apply(ranges[v] ?? '2026'));
  }
  // Re-roll the values so the cells keep changing.
  const stop = every(ctx.preview ? 1800 : 2800, () => {
    chart.setOption({ series: [{ data: data.map(([d, v]) => [d, Math.max(0, Math.min(12, Math.round(v + (Math.random() - 0.5) * 8)))]) }] });
  });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
