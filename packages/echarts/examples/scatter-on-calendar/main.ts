// Scatter series laid out on a calendar coordinate system: data is [date, value], symbolSize encodes the value
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';
import { rng } from '../../shared/scatter-data.ts';

const DAY = 86400000;
const start = Date.UTC(2026, 6, 1);

/** [date string, value] for each day from July to September 2026. */
function days(seed: number): [string, number][] {
  const r = rng(seed);
  return Array.from({ length: 92 }, (_, i) => {
    const date = new Date(start + i * DAY).toISOString().slice(0, 10);
    const weekday = new Date(start + i * DAY).getUTCDay();
    const base = weekday === 0 || weekday === 6 ? 2 : 10;
    return [date, Math.round(base * r() * 1.6)];
  });
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 420 });
  let seed = 2;
  let cell = 24;
  let orient = 'horizontal';
  let scale = 1;

  const show = (): void => {
    const size = ctx.preview ? 20 : cell;
    chart.setOption(
      {
        tooltip: { formatter: (p: { value: [string, number] }) => `${p.value[0]}: ${p.value[1]}` },
        calendar: {
          range: ['2026-07-01', '2026-09-30'],
          // cellSize: the size of one day cell; a number or [width, height].
          cellSize: size,
          orient,
          left: orient === 'vertical' ? 56 : 44,
          top: orient === 'vertical' ? 40 : ctx.preview ? 24 : 56,
          dayLabel: { firstDay: 1, nameMap: 'en' },
          monthLabel: { nameMap: 'en' },
          yearLabel: { show: false },
          itemStyle: { borderColor: 'rgba(255,255,255,0.12)' },
        },
        series: [
          {
            type: 'scatter',
            // coordinateSystem 'calendar' reads the first value of each datum as a date.
            coordinateSystem: 'calendar',
            data: days(seed),
            // The circles are scaled to the cell so they never spill into the next one.
            symbolSize: (v: [string, number]) => Math.max(1, (v[1] * (size / 12) * scale) / 1.2),
            itemStyle: { color: '#5b9bd5', opacity: 0.85 },
            emphasis: { scale: 1.3 },
          },
        ],
      },
      true,
    );
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1600, () => {
      seed++;
      show();
    });
  } else {
    select(bar!, 'calendar.orient', ['horizontal', 'vertical'], (v) => {
      orient = v;
      show();
    });
    slider(bar!, 'cellSize', [14, 34, 2], cell, (v) => {
      cell = v;
      show();
    });
    slider(bar!, 'symbol scale', [0.5, 1.5, 0.1], scale, (v) => {
      scale = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
