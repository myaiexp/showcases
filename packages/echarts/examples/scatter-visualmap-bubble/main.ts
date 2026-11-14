// A bubble chart: two visualMap components map data dimensions 2 and 3 to symbolSize and to colour
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { rng } from '../../shared/scatter-data.ts';

// Each row: [income (k$), life expectancy, population (millions), literacy %]
function rows(seed: number): number[][] {
  const r = rng(seed);
  return Array.from({ length: 34 }, () => {
    const income = 2 + r() * 58;
    const life = 52 + Math.log(income) * 6.5 + (r() - 0.5) * 6;
    return [+income.toFixed(1), +life.toFixed(1), Math.round(2 + r() * r() * 400), Math.round(55 + r() * 45)];
  });
}

const RANGES: Record<string, [number, number]> = { 'small [4, 24]': [4, 24], 'medium [8, 44]': [8, 44], 'large [14, 70]': [14, 70] };
const PALETTES: Record<string, string[]> = {
  'blue to orange': ['#3b82c4', '#9bd4a4', '#f29e4c'],
  'grey to red': ['#8a8f99', '#e8a09a', '#d6322b'],
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });
  let seed = 11;
  let size = RANGES['medium [8, 44]']!;
  let palette = PALETTES['blue to orange']!;

  const show = (): void => {
    chart.setOption({
      tooltip: { formatter: (p: { value: number[] }) => `income ${p.value[0]}k, life ${p.value[1]}<br/>population ${p.value[2]}M, literacy ${p.value[3]}%` },
      grid: { top: 20, left: 44, right: ctx.preview ? 16 : 150, bottom: 36 },
      xAxis: { type: 'value', name: 'income', nameLocation: 'middle', nameGap: 22, scale: true },
      yAxis: { type: 'value', name: 'life', scale: true },
      // visualMap with dimension 2: the population is mapped onto symbolSize.
      // inRange lists the visual value for visualMap.min and for visualMap.max.
      visualMap: [
        {
          show: !ctx.preview,
          dimension: 2,
          min: 0,
          max: 400,
          right: 8,
          top: 'middle',
          text: ['population', ''],
          calculable: true,
          inRange: { symbolSize: size },
        },
        // dimension 3: literacy is mapped onto colour. Both maps apply to the same series.
        {
          show: !ctx.preview,
          dimension: 3,
          min: 55,
          max: 100,
          right: 76,
          top: 'middle',
          text: ['literacy', ''],
          calculable: true,
          inRange: { color: palette },
        },
      ],
      series: [{ type: 'scatter', data: rows(seed), itemStyle: { opacity: 0.8 }, emphasis: { focus: 'self' } }],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1800, () => {
      seed++;
      show();
    });
  } else {
    select(bar!, 'symbolSize range', Object.keys(RANGES), (v) => {
      size = RANGES[v]!;
      show();
    });
    select(bar!, 'colour range', Object.keys(PALETTES), (v) => {
      palette = PALETTES[v]!;
      show();
    });
    select(bar!, 'data', ['set A', 'set B', 'set C'], (v) => {
      seed = 11 + (v.charCodeAt(4) - 65) * 5;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
