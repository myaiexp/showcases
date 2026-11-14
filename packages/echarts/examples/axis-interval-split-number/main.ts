// How a value axis picks its ticks: splitNumber, minInterval, maxInterval and a forced interval
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';

const DAY = 86400000;
const START = Date.UTC(2026, 0, 1);

// Two y data sets: small whole-number counts, where fractional ticks make no sense, and percentages.
const SETS: Record<string, number[]> = {
  counts: [1, 3, 2, 4, 3, 2, 4, 1, 3, 2],
  percent: [12, 48, 35, 91, 66, 23, 78, 54, 87, 40],
};

interface Look { set: string; splitNumber: number; minInterval: number; maxInterval: number; interval: number; dayTicks: boolean }

function build(look: Look): EChartsOption {
  const max = look.set === 'counts' ? 4 : 100;
  const forced = look.interval > 0;
  return {
    animationDurationUpdate: 400,
    tooltip: { trigger: 'axis' },
    grid: { top: 24, left: 48, right: 24, bottom: 36 },
    xAxis: {
      type: 'time',
      // maxInterval on a time axis caps the gap between ticks: one day gives a label per day.
      ...(look.dayTicks ? { maxInterval: DAY } : {}),
    },
    yAxis: {
      type: 'value',
      // splitNumber is only a recommendation; minInterval / maxInterval bound the real step.
      splitNumber: look.splitNumber,
      minInterval: look.minInterval,
      ...(look.maxInterval > 0 ? { maxInterval: look.maxInterval } : {}),
      // interval forces the step. It works best together with min and max, as the docs advise.
      ...(forced ? { interval: look.interval, min: 0, max: Math.ceil(max / look.interval) * look.interval } : {}),
    },
    series: [{ type: 'line', step: 'middle', data: (SETS[look.set] ?? []).map((v, i) => [START + i * DAY, v]) }],
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { set: 'counts', splitNumber: 5, minInterval: 0, maxInterval: 0, interval: 0, dayTicks: false };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const show = (): void => {
    chart.setOption(build(look), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const steps = [
      { splitNumber: 5, minInterval: 0 },
      { splitNumber: 2, minInterval: 0 },
      { splitNumber: 5, minInterval: 1 },
      { splitNumber: 8, minInterval: 0 },
    ];
    let i = 0;
    stop = every(1500, () => {
      Object.assign(look, steps[++i % steps.length]);
      show();
    });
  } else {
    select(bar!, 'data', Object.keys(SETS), (v) => {
      look.set = v;
      show();
    });
    slider(bar!, 'splitNumber', [1, 12, 1], look.splitNumber, (v) => {
      look.splitNumber = v;
      show();
    });
    select(bar!, 'minInterval', ['0', '1', '5', '10'], (v) => {
      look.minInterval = Number(v);
      show();
    });
    select(bar!, 'maxInterval', ['none', '1', '10', '25'], (v) => {
      look.maxInterval = v === 'none' ? 0 : Number(v);
      show();
    });
    select(bar!, 'interval', ['auto', '1', '10', '25'], (v) => {
      look.interval = v === 'auto' ? 0 : Number(v);
      show();
    });
    const day = button(bar!, 'x maxInterval: auto', () => {
      look.dayTicks = !look.dayTicks;
      day.textContent = `x maxInterval: ${look.dayTicks ? '1 day' : 'auto'}`;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
