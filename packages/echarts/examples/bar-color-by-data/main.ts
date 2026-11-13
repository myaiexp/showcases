// colorBy: one colour per series or per data item, taken from a palette set with the top-level color option
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const cats = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const PALETTES: Record<string, string[]> = {
  default: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  warm: ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d'],
  cool: ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8'],
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let colorBy: 'series' | 'data' = 'data';
  let palette = 'default';

  const apply = (): void => {
    chart.setOption(
      {
        // color: the palette that colorBy draws from.
        color: PALETTES[palette],
        legend: { show: !ctx.preview },
        grid: { top: 16, left: 36, right: 16, bottom: ctx.preview ? 28 : 60 },
        xAxis: { type: 'category', data: cats },
        yAxis: { type: 'value' },
        series: [
          // colorBy 'series': every bar of a series shares one palette colour (the default).
          // colorBy 'data': each bar takes the next colour, restarting for every series.
          { name: 'North', type: 'bar', colorBy, data: [20, 34, 28, 41, 36] },
          { name: 'South', type: 'bar', colorBy, data: [14, 22, 31, 25, 30] },
        ],
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'colorBy', ['data', 'series'], (v) => {
      colorBy = v as typeof colorBy;
      apply();
    });
    select(bar, 'color palette', Object.keys(PALETTES), (v) => {
      palette = v;
      apply();
    });
  } else {
    let i = 0;
    const keys = Object.keys(PALETTES);
    stop = every(1500, () => {
      i++;
      colorBy = i % 2 ? 'series' : 'data';
      palette = keys[Math.floor(i / 2) % keys.length]!;
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
