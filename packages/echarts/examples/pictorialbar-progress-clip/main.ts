// pictorialBar as progress meters: one symbol per item, symbolClip cutting it to the value, symbolBoundingData fixing its size
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
import { seeded, between } from '../../shared/bar-data.ts';

const names = ['Disk', 'Memory', 'Network', 'Battery', 'CPU'];
// A battery-like outline; the same path is used for the track and for the fill.
const ICON = 'path://M2 6h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM22 10h2v4h-2z';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const rand = seeded(8);
  const roll = (): number[] => names.map(() => between(rand, 5, 100));
  let values = roll();
  let clip = true;
  let bounded = true;

  const apply = (): void => {
    chart.setOption(
      {
        grid: { top: 12, left: 70, right: 56, bottom: 20 },
        yAxis: { type: 'category', data: names, inverse: true, axisLine: { show: false }, axisTick: { show: false } },
        xAxis: { type: 'value', min: 0, max: 100, show: false },
        series: [
          // Track: the whole symbol at full size, behind the fill.
          {
            type: 'pictorialBar',
            data: names.map(() => 100),
            symbol: ICON,
            symbolSize: ['100%', 26],
            symbolBoundingData: 100,
            itemStyle: { color: 'rgba(160,160,160,0.25)' },
            animation: false,
            silent: true,
            z: 1,
          },
          {
            type: 'pictorialBar',
            data: values.map((v) => ({ value: v, itemStyle: { color: v > 70 ? '#91cc75' : v > 35 ? '#fac858' : '#ee6666' } })),
            symbol: ICON,
            symbolSize: ['100%', 26],
            // symbolClip: cut the symbol at the value instead of scaling it to the value.
            symbolClip: clip,
            // symbolBoundingData: a data value whose coordinate sets the symbol's full size, so the
            // fill matches the track. Unset, the size follows each bar's own length.
            symbolBoundingData: bounded ? 100 : undefined,
            // A bigger z puts the fill over the track.
            z: 2,
            label: { show: !ctx.preview, position: 'right', formatter: '{c}%', color: '#ddd' },
            animationDuration: 600,
          },
        ],
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  const redraw = (): void => {
    values = roll();
    apply();
  };
  if (bar) {
    const c = button(bar, 'symbolClip: on', () => {
      clip = !clip;
      c.textContent = `symbolClip: ${clip ? 'on' : 'off'}`;
      apply();
    });
    const b = button(bar, 'symbolBoundingData: 100', () => {
      bounded = !bounded;
      b.textContent = `symbolBoundingData: ${bounded ? '100' : 'unset'}`;
      apply();
    });
    button(bar, 'new values', redraw);
  } else {
    let i = 0;
    stop = every(1500, () => {
      i++;
      if (i % 4 === 0) clip = !clip;
      redraw();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
