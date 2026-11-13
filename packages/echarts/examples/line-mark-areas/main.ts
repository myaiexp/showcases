// markArea bands: an xAxis range, a yAxis range, a coord rectangle and an average-to-max band
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';

const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
const temps = [8, 7, 6, 6, 5, 6, 8, 11, 14, 17, 19, 21, 23, 24, 24, 23, 21, 18, 16, 14, 12, 10, 9, 8];

interface Look { opacity: number; position: string; night: boolean; comfort: boolean; box: boolean; peak: boolean; silent: boolean }

function build(look: Look): EChartsOption {
  const fill = (color: string): { color: string; opacity: number } => ({ color, opacity: look.opacity });
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 24, left: 40, right: 16, bottom: 28 },
    xAxis: { type: 'category', data: hours, boundaryGap: false },
    yAxis: { type: 'value', min: 0, max: 30, name: '°C', nameGap: 10 },
    series: [
      {
        type: 'line',
        data: temps,
        smooth: true,
        symbolSize: 5,
        markArea: {
          // silent: true makes the areas ignore mouse events (no hover, no tooltip).
          silent: look.silent,
          // label.position places each area's name; markArea.data[n][0].name is the label text.
          label: { position: look.position as 'top', color: '#ddd' },
          // data: each area is [top-left corner, bottom-right corner].
          data: [
            // xAxis only: spans the full height between two categories.
            ...(look.night
              ? [[{ name: 'night', xAxis: '00:00', itemStyle: fill('#5470c6') }, { xAxis: '06:00' }]]
              : []),
            ...(look.night ? [[{ name: 'late', xAxis: '21:00', itemStyle: fill('#5470c6') }, { xAxis: '23:00' }]] : []),
            // yAxis only: spans the full width between two values.
            ...(look.comfort ? [[{ name: 'comfort 18-22', yAxis: 18, itemStyle: fill('#91cc75') }, { yAxis: 22 }]] : []),
            // coord: a rectangle between two points in data coordinates.
            ...(look.box ? [[{ name: 'warm-up', coord: ['07:00', 9], itemStyle: fill('#fac858') }, { coord: ['11:00', 20] }]] : []),
            // type: 'average' and 'max' are computed from the series values.
            ...(look.peak ? [[{ name: 'avg to max', type: 'average', itemStyle: fill('#ee6666') }, { type: 'max' }]] : []),
          ] as never,
        },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { opacity: 0.2, position: 'insideTop', night: true, comfort: true, box: true, peak: false, silent: true };
  const show = (): void => {
    chart.setOption(build(look), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 0;
    stop = every(1500, () => {
      n += 1;
      look.night = n % 4 !== 1;
      look.comfort = n % 4 !== 2;
      look.box = n % 4 !== 3;
      look.peak = n % 2 === 0;
      show();
    });
  } else {
    const toggle = (key: 'night' | 'comfort' | 'box' | 'peak', text: string): void => {
      const b = button(bar!, `${text}: ${look[key] ? 'on' : 'off'}`, () => {
        look[key] = !look[key];
        b.textContent = `${text}: ${look[key] ? 'on' : 'off'}`;
        show();
      });
    };
    toggle('night', 'xAxis range');
    toggle('comfort', 'yAxis range');
    toggle('box', 'coord box');
    toggle('peak', 'average to max');
    select(bar!, 'label.position', ['insideTop', 'top', 'inside', 'insideBottom', 'left', 'right'], (v) => {
      look.position = v;
      show();
    });
    slider(bar!, 'opacity', [0.05, 0.8, 0.05], 0.2, (v) => {
      look.opacity = v;
      show();
    });
    const sl = button(bar!, 'silent: on', () => {
      look.silent = !look.silent;
      sl.textContent = `silent: ${look.silent ? 'on' : 'off'}`;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
