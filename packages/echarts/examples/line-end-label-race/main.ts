// endLabel on a growing multi-series line, with valueAnimation and moveOverlap toggles
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, button, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/line-data.ts';

const names = ['Alpha', 'Bravo', 'Charlie', 'Delta'];
const WINDOW = 24;

interface Look { valueAnimation: boolean; moveOverlap: boolean }

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const rand = seeded(5);
  const look: Look = { valueAnimation: true, moveOverlap: true };
  let tick = 0;
  const xs: number[] = [];
  const ys: number[][] = names.map((_, i) => [60 + i * 6]);
  xs.push(0);

  const option = (): EChartsOption => ({
    grid: { top: 20, left: 36, right: 110, bottom: 28 },
    xAxis: { type: 'category', data: [...xs], boundaryGap: false },
    yAxis: { type: 'value', scale: true },
    // Updates animate over 900ms, matching the feed interval so the lines glide.
    animationDurationUpdate: 900,
    animationEasingUpdate: 'linear',
    series: names.map((name, i) => ({
      name,
      type: 'line' as const,
      data: [...ys[i]!],
      showSymbol: false,
      smooth: true,
      // endLabel: a label on the last point of the line.
      endLabel: {
        show: true,
        // valueAnimation: the number counts from the old value to the new one.
        valueAnimation: look.valueAnimation,
        formatter: (p: { seriesName?: string; value?: unknown }) => `${p.seriesName}: ${Math.round(Number(p.value))}`,
        color: 'inherit',
        fontWeight: 'bold',
      },
      // moveOverlap 'shiftY' pushes labels that share a column apart vertically.
      labelLayout: look.moveOverlap ? { moveOverlap: 'shiftY' as const } : {},
    })),
  });

  // Adds one point to every series and drops the oldest once the window is full.
  const grow = (): void => {
    tick += 1;
    xs.push(tick);
    ys.forEach((a) => a.push(Math.round((a[a.length - 1]! + (rand() - 0.46) * 10) * 10) / 10));
    if (xs.length > WINDOW) {
      xs.shift();
      ys.forEach((a) => a.shift());
    }
  };
  // Prime the chart so it opens with a full window.
  for (let i = 0; i < WINDOW; i++) grow();
  chart.setOption(option());

  let running = true;
  const stop = every(1000, () => {
    if (!running) return;
    grow();
    chart.setOption(option());
  });

  if (!ctx.preview) {
    const va = button(bar!, 'valueAnimation: on', () => {
      look.valueAnimation = !look.valueAnimation;
      va.textContent = `valueAnimation: ${look.valueAnimation ? 'on' : 'off'}`;
      chart.setOption(option());
    });
    const mo = button(bar!, "moveOverlap: 'shiftY'", () => {
      look.moveOverlap = !look.moveOverlap;
      mo.textContent = look.moveOverlap ? "moveOverlap: 'shiftY'" : 'moveOverlap: off';
      // replaceMerge swaps the series list, so a removed labelLayout does not linger.
      chart.setOption(option(), { replaceMerge: ['series'] });
    });
    const pause = button(bar!, 'pause', () => {
      running = !running;
      pause.textContent = running ? 'pause' : 'resume';
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
