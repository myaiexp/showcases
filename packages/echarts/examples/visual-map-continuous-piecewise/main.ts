// A third data dimension mapped to color and size by a continuous or piecewise visualMap
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';

// Seeded PRNG for a stable cloud of [x, y, value] points.
function points(seed: number, n: number): number[][] {
  let s = seed;
  const next = (): number => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: n }, () => [Math.round(next() * 100), Math.round(next() * 100), Math.round(next() * 100)]);
}

type Kind = 'continuous' | 'piecewise';
type Channel = 'color' | 'color + size' | 'size';

function build(data: number[][], kind: Kind, channel: Channel, preview: boolean): EChartsOption {
  // inRange: the visual channels the data range is mapped onto.
  const inRange: Record<string, unknown> = {};
  if (channel !== 'size') inRange.color = ['#2c7bb6', '#abd9e9', '#ffffbf', '#fdae61', '#d7191c'];
  if (channel !== 'color') inRange.symbolSize = [8, 28];

  const common = {
    dimension: 2, // map value[2], the third dimension of each data item
    seriesIndex: 0,
    inRange,
    textStyle: { color: '#ccc' },
    show: !preview,
  };
  const visualMap: EChartsOption['visualMap'] =
    kind === 'continuous'
      ? // continuous: min/max, a draggable gradient bar; `calculable` adds range handles.
        { type: 'continuous', ...common, min: 0, max: 100, calculable: true, left: 'right', top: 'middle' }
      : // piecewise: the range is cut into pieces that can be toggled in the legend-like control.
        {
          type: 'piecewise',
          ...common,
          pieces: [
            { min: 75, label: 'high (75+)' },
            { min: 50, max: 75, label: 'mid (50-75)' },
            { min: 25, max: 50, label: 'low (25-50)' },
            { max: 25, label: 'very low', color: '#888' },
          ],
          left: 'right',
          top: 'middle',
        };

  return {
    visualMap,
    tooltip: {},
    grid: { top: 16, bottom: 28, left: 36, right: preview ? 16 : 140 },
    xAxis: { type: 'value', max: 100 },
    yAxis: { type: 'value', max: 100 },
    series: [{ type: 'scatter', data, symbolSize: 14 }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const state = { kind: 'continuous' as Kind, channel: 'color + size' as Channel };
  const data = points(11, ctx.preview ? 30 : 60);
  const show = (): void => {
    // notMerge so the previous visualMap type is replaced, not merged into.
    chart.setOption(build(data, state.kind, state.channel, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2000, () => {
      state.kind = state.kind === 'continuous' ? 'piecewise' : 'continuous';
      show();
    });
  } else {
    select(bar!, 'visualMap.type', ['continuous', 'piecewise'], (v) => {
      state.kind = v as Kind;
      show();
    });
    select(bar!, 'inRange', ['color + size', 'color', 'size'], (v) => {
      state.channel = v as Channel;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
