// A time axis shown in local time or UTC through the root useUTC, with echarts.time.format alongside
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every, echarts } from '../../shared/chart.ts';

// Midnight UTC on a fixed date, then one value per hour for 72 hours.
const start = Date.UTC(2026, 2, 14, 0, 0, 0);
const data: [number, number][] = Array.from({ length: 72 }, (_, h) => [
  start + h * 3_600_000,
  Math.round(50 + 30 * Math.sin((h / 24) * Math.PI * 2 - 1) + 6 * Math.sin(h)),
]);

function build(utc: boolean): EChartsOption {
  // The helper formats in local time unless its third argument asks for UTC.
  const first = echarts.time.format(start, '{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}', utc);
  const offsetH = -new Date(start).getTimezoneOffset() / 60;
  return {
    // useUTC changes the display only: tick placement, axisLabel and tooltip.
    useUTC: utc,
    title: {
      text: `First point: ${first} (${utc ? 'UTC' : `local, UTC${offsetH >= 0 ? '+' : ''}${offsetH}`})`,
      left: 'center',
      textStyle: { fontSize: 13, fontWeight: 'normal' },
    },
    tooltip: { trigger: 'axis' },
    grid: { top: 44, left: 44, right: 24, bottom: 36 },
    xAxis: { type: 'time' },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data, showSymbol: false, areaStyle: { opacity: 0.2 } }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let utc = false;
  const show = (): void => {
    chart.setOption(build(utc));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2000, () => {
      utc = !utc;
      show();
    });
  } else {
    select(bar!, 'useUTC', ['false', 'true'], (v) => { utc = v === 'true'; show(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
