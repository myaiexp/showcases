// two visualMaps on two scatter series: seriesIndex picks the series, dimension picks the data column
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { seeded } from '../../shared/interaction-data.ts';

// Rows are [x, y, temperature, humidity]; two stations drawn as two series.
function station(seed: number, cx: number, cy: number): number[][] {
  const rand = seeded(seed);
  return Array.from({ length: 40 }, () => [
    Math.round(cx + (rand() - 0.5) * 50),
    Math.round(cy + (rand() - 0.5) * 50),
    Math.round(rand() * 40),
    Math.round(rand() * 100),
  ]);
}
const A = station(41, 30, 65);
const B = station(42, 70, 35);

const TARGETS: Record<string, number[]> = { 'both series': [0, 1], 'Station A only': [0], 'Station B only': [1] };

function build(colourTargets: string, sizeDimension: number, compact: boolean): EChartsOption {
  return {
    tooltip: {},
    legend: { data: ['Station A', 'Station B'], bottom: 0 },
    grid: { top: 16, left: compact ? 40 : 92, right: compact ? 80 : 100, bottom: 56 },
    xAxis: { type: 'value', min: 0, max: 100 },
    yAxis: { type: 'value', min: 0, max: 100 },
    visualMap: [
      {
        // seriesIndex: which series this map colours; the others keep their own colours.
        seriesIndex: TARGETS[colourTargets],
        // dimension 2 is the temperature column.
        dimension: 2,
        min: 0,
        max: 40,
        text: ['40 C', '0 C'],
        right: 8,
        top: 'center',
        inRange: { color: ['#5470c6', '#fac858', '#ee6666'] },
        textStyle: { color: '#ccc' },
      },
      {
        // A second map on the same series: it drives size, from another column.
        seriesIndex: [0, 1],
        dimension: sizeDimension,
        min: 0,
        max: sizeDimension === 3 ? 100 : 40,
        text: [sizeDimension === 3 ? 'humid' : 'warm', 'dry'],
        left: 8,
        top: 'center',
        inRange: { symbolSize: [6, 26] },
        controller: { inRange: { color: ['#aaa'] } },
        textStyle: { color: '#ccc' },
      },
    ],
    series: [
      { name: 'Station A', type: 'scatter', data: A, itemStyle: { color: '#91cc75' } },
      { name: 'Station B', type: 'scatter', data: B, itemStyle: { color: '#73c0de' } },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let targets = 'both series';
  let dim = 3;
  const show = (): void => {
    chart.setOption(build(targets, dim, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'colour map seriesIndex', Object.keys(TARGETS), (v) => {
      targets = v;
      show();
    });
    select(bar, 'size map dimension', ['3 (humidity)', '2 (temperature)'], (v) => {
      dim = Number.parseInt(v, 10);
      show();
    });
  } else {
    const names = Object.keys(TARGETS);
    let i = 0;
    stop = every(1800, () => {
      targets = names[++i % names.length]!;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
