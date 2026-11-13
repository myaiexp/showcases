// PictorialBar: symbolRepeat tiles a shape along the bar, symbolClip fills it to a value
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const cups = 'path://M2 2h20v4c0 8-4 12-10 12S2 14 2 6V2z';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  let values = [4, 7, 3, 9, 6];
  let repeat: boolean | string | number = true;

  const apply = (): void => {
    chart.setOption({
      grid: { left: 40, right: 20, top: 20, bottom: 30 },
      xAxis: { type: 'category', data: labels },
      yAxis: { max: 10, splitLine: { show: false } },
      series: [
        // Background track: the full symbol outline, repeated up to the axis max.
        {
          type: 'pictorialBar',
          symbol: cups,
          symbolRepeat: true,
          symbolSize: ['60%', 20],
          symbolMargin: 2,
          itemStyle: { color: '#444' },
          data: labels.map(() => 10),
          animation: false,
          z: 1,
        },
        // Foreground: symbolRepeat tiles the shape; with repeat off, symbolClip cuts one symbol to the value.
        {
          type: 'pictorialBar',
          symbol: cups,
          symbolRepeat: repeat, // true | false | number | 'fixed'
          symbolClip: true, // clip the symbol (or the last repeat) to the value
          symbolSize: ['60%', repeat === false ? '100%' : 20],
          symbolMargin: 2,
          symbolBoundingData: repeat === false ? 10 : undefined, // size one symbol to the axis max
          z: 2,
          data: values,
          itemStyle: { color: '#ffb74d' },
          label: { show: !ctx.preview, position: 'top' },
        },
      ],
    });
  };
  apply();

  if (bar) {
    select(bar, 'symbolRepeat', ['true', 'false', '3'], (v) => {
      repeat = v === 'true' ? true : v === 'false' ? false : Number(v);
      apply();
    });
  }
  const stop = every(ctx.preview ? 1500 : 2200, () => {
    values = values.map(() => Math.round((1 + Math.random() * 9) * 10) / 10);
    apply();
  });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
