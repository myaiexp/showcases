// One small pie per day, each placed on a calendar through coordinateSystem 'calendar' and its date as the centre
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider, button } from '../../shared/chart.ts';
import { rng } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 380 });

  const look = { month: '2026-03', radius: 15, seed: 7 };
  const apply = (): void => {
    const rand = rng(look.seed);
    const [y, m] = look.month.split('-').map(Number) as [number, number];
    const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
    // A pie series per day: closed, pending and open tickets.
    const series = Array.from({ length: days }, (_, i) => {
      const date = `${look.month}-${String(i + 1).padStart(2, '0')}`;
      return {
        type: 'pie' as const,
        coordinateSystem: 'calendar' as const,
        calendarIndex: 0,
        // The centre is a position in the calendar: here the cell of that date.
        center: [date],
        radius: look.radius,
        label: { show: false },
        labelLine: { show: false },
        tooltip: { formatter: `${date}<br/>{b}: {c}` },
        data: [
          { name: 'closed', value: 1 + Math.round(rand() * 8) },
          { name: 'pending', value: 1 + Math.round(rand() * 4) },
          { name: 'open', value: 1 + Math.round(rand() * 3) },
        ],
      };
    });
    chart.setOption(
      {
        tooltip: {},
        calendar: {
          range: look.month,
          top: ctx.preview ? 30 : 50,
          left: 40,
          right: 20,
          bottom: ctx.preview ? 5 : 20,
          cellSize: ['auto', 'auto'],
          itemStyle: { borderColor: '#333', color: 'transparent' },
          dayLabel: { firstDay: 1, color: '#aaa', show: !ctx.preview },
          monthLabel: { color: '#aaa' },
          yearLabel: { show: false },
        },
        series,
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1500, () => {
      look.seed += 1;
      apply();
    });
  } else {
    select(bar!, 'calendar.range', ['2026-03', '2026-02', '2026-07'], (v) => { look.month = v; apply(); });
    slider(bar!, 'radius', [5, 30, 1], look.radius, (v) => { look.radius = v; apply(); });
    button(bar!, 'New data', () => { look.seed += 1; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
