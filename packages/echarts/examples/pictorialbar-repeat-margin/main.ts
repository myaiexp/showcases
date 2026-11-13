// pictorialBar spacing: symbolMargin from gaps to overlap, with symbolRepeatDirection picking which symbol sits on top
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const names = ['North', 'East', 'South', 'West'];
const values = [9, 6, 8, 4];
const MARGINS = ['0', '6', '-8', '-14', '30%!', '-30%'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let margin: string = '-8';
  let direction: 'start' | 'end' = 'start';
  let repeat: boolean | number | 'fixed' = true;

  const apply = (): void => {
    const m = /^-?\d+$/.test(margin) ? Number(margin) : margin;
    chart.setOption(
      {
        title: ctx.preview ? { text: `symbolMargin: ${margin}   direction: ${direction}`, left: 'center', top: 0, textStyle: { fontSize: 12, fontWeight: 'normal' } } : undefined,
        grid: { top: 30, left: 56, right: 20, bottom: 24 },
        yAxis: { type: 'category', data: names, inverse: true },
        xAxis: { type: 'value', max: 10, splitLine: { show: false } },
        series: {
          type: 'pictorialBar',
          data: values,
          colorBy: 'data',
          symbol: 'circle',
          symbolSize: [20, 20],
          // symbolRepeat: true repeats symbols to fill each value; a number fixes the count;
          // 'fixed' ignores the value and fills symbolBoundingData.
          symbolRepeat: repeat,
          symbolBoundingData: 10,
          // symbolMargin: the gap each side of a symbol. Negative values overlap the symbols;
          // a trailing "!" (like '30%!') also adds blank space at both ends.
          symbolMargin: m,
          // symbolRepeatDirection: the render order of repeated symbols, which decides who overlaps whom.
          symbolRepeatDirection: direction,
          itemStyle: { borderColor: '#1b1b1f', borderWidth: 1.5 },
        },
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'symbolMargin', MARGINS, (v) => {
      margin = v;
      apply();
    }).value = margin;
    select(bar, 'symbolRepeatDirection', ['start', 'end'], (v) => {
      direction = v as typeof direction;
      apply();
    });
    select(bar, 'symbolRepeat', ['true', '5', 'fixed'], (v) => {
      repeat = v === 'true' ? true : v === 'fixed' ? 'fixed' : Number(v);
      apply();
    });
  } else {
    let i = 0;
    stop = every(1500, () => {
      i++;
      margin = MARGINS[i % MARGINS.length]!;
      direction = Math.floor(i / MARGINS.length) % 2 ? 'end' : 'start';
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
