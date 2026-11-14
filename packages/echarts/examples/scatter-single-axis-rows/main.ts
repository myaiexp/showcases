// A punch card: seven singleAxis rows, one scatter series per row, with the symbol size showing the count per hour
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';
import { rng } from '../../shared/scatter-data.ts';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 24 }, (_, h) => `${h}h`);

/** counts[day][hour]: busy in the working hours, quiet at night. */
function counts(seed: number): number[][] {
  const r = rng(seed);
  return days.map((_, d) =>
    hours.map((__, h) => {
      const work = Math.exp(-((h - 14) ** 2) / 30) * (d < 5 ? 1 : 0.35);
      return Math.round(work * r() * 40 + r() * 4);
    }),
  );
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });
  let seed = 5;
  let scale = 0.5;
  let symbol = 'circle';
  let inverse = false;
  const rowH = 100 / days.length;

  const show = (): void => {
    const data = counts(seed);
    chart.setOption(
      {
        tooltip: { position: 'top', formatter: (p: { seriesName: string; value: number[] }) => `${p.seriesName} ${hours[p.value[0]!]}: ${p.value[1]}` },
        // One title per row, used as the row label.
        title: days.map((d, i) => ({ text: d, top: `${i * rowH + rowH / 2 - 2}%`, textStyle: { fontSize: 12, fontWeight: 'normal' } })),
        // One singleAxis per row: left, right, top and height place each row in the chart.
        singleAxis: days.map((_, i) => ({
          type: 'category',
          data: hours,
          boundaryGap: false,
          inverse,
          left: 48,
          right: 24,
          top: `${i * rowH + 1}%`,
          height: `${rowH - 4}%`,
          axisLabel: { show: i === days.length - 1 && !ctx.preview, interval: 2 },
          axisTick: { show: false },
          axisLine: { lineStyle: { opacity: 0.3 } },
          splitLine: { show: true, lineStyle: { type: 'dashed', opacity: 0.15 } },
        })),
        // Each series picks its row with singleAxisIndex.
        series: days.map((d, i) => ({
          name: d,
          type: 'scatter' as const,
          coordinateSystem: 'singleAxis' as const,
          singleAxisIndex: i,
          symbol,
          data: data[i]!.map((v, h) => [h, v]),
          // symbolSize reads the second value of each [hour, count] pair.
          symbolSize: (v: number[]) => Math.max(2, (v[1] ?? 0) * scale),
          itemStyle: { opacity: 0.8 },
        })),
      },
      true,
    );
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1500, () => {
      seed++;
      show();
    });
  } else {
    slider(bar!, 'size scale', [0.2, 1.2, 0.1], scale, (v) => {
      scale = v;
      show();
    });
    select(bar!, 'symbol', ['circle', 'rect', 'diamond', 'triangle'], (v) => {
      symbol = v;
      show();
    });
    const inv = button(bar!, 'axis inverse: off', () => {
      inverse = !inverse;
      inv.textContent = `axis inverse: ${inverse ? 'on' : 'off'}`;
      show();
    });
    button(bar!, 'new data', () => {
      seed++;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
