// areaStyle.origin (auto / start / end / number) and a linear-gradient fill
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';
import { walk } from '../../shared/line-data.ts';

const cats = Array.from({ length: 30 }, (_, i) => `${i + 1}`);

interface Look { origin: 'auto' | 'start' | 'end' | number; gradient: boolean }

function build(values: number[], look: Look, preview: boolean): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 20, left: 40, right: 16, bottom: 28 },
    xAxis: { type: 'category', data: cats, boundaryGap: false },
    yAxis: { type: 'value', min: -40, max: 40 },
    series: [
      {
        type: 'line',
        data: values,
        showSymbol: false,
        lineStyle: { width: 2, color: '#5470c6' },
        areaStyle: {
          // origin: 'auto' fills between the axis line and the data; 'start' and 'end' fill from
          // the axis minimum or maximum; a number (5.3.2+) fills from that value.
          origin: look.origin,
          opacity: look.gradient ? 1 : 0.6,
          // A fill may be a gradient object: x/y to x2/y2 are fractions of the bounding box,
          // offsets 0..1 place the colour stops.
          color: look.gradient
            ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(238, 102, 102, 0.9)' },
                  { offset: 0.5, color: 'rgba(250, 200, 88, 0.45)' },
                  { offset: 1, color: 'rgba(84, 112, 198, 0.1)' },
                ],
              }
            : '#5470c6',
        },
        // A mark line at 0 shows what a numeric origin would be compared to.
        markLine: preview ? undefined : { silent: true, symbol: 'none', data: [{ yAxis: 0 }], lineStyle: { color: '#999' }, label: { show: false } },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let values = walk(30, 3, 0, 9);
  const look: Look = { origin: 'auto', gradient: false };
  const show = (): void => {
    // Replace the option: an areaStyle.origin of a different type should not merge into the old one.
    chart.setOption(build(values, look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const origins: Look['origin'][] = ['auto', 'start', 'end', 20];
    let n = 0;
    stop = every(1600, () => {
      n += 1;
      look.origin = origins[n % origins.length]!;
      look.gradient = n % 8 >= 4;
      show();
    });
  } else {
    const num = slider(bar!, 'numeric origin', [-40, 40, 5], 0, (v) => {
      look.origin = v;
      mode.value = 'number';
      show();
    });
    const mode = select(bar!, 'origin', ['auto', 'start', 'end', 'number'], (v) => {
      look.origin = v === 'number' ? Number(num.value) : (v as 'auto' | 'start' | 'end');
      show();
    });
    const g = button(bar!, 'gradient fill: off', () => {
      look.gradient = !look.gradient;
      g.textContent = `gradient fill: ${look.gradient ? 'on' : 'off'}`;
      show();
    });
    button(bar!, 'new data', () => {
      values = walk(30, Math.floor(Math.random() * 1000), 0, 9);
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
