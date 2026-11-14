// Two stacked grids that read one dataset, with an axisPointer linked across both x axes
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider, button, every } from '../../shared/chart.ts';

// One table feeds both charts: [day, price, volume].
const SOURCE: (string | number)[][] = [['day', 'price', 'volume']];
for (let i = 0; i < 40; i++) {
  const price = Math.round((100 + 14 * Math.sin(i / 5) + i * 0.6) * 10) / 10;
  SOURCE.push([`D${i + 1}`, price, Math.round(300 + 200 * Math.abs(Math.sin(i * 1.3)))]);
}

interface Look { split: number; labelsOnTop: boolean; linked: boolean }

function build(look: Look, preview: boolean): EChartsOption {
  const top = 20;
  const bottom = preview ? 24 : 40;
  // Heights are percentages of the chart: the top grid takes `split`%, the lower one the rest.
  const gap = 4;
  const total = 100 - gap;
  const upper = (total * look.split) / 100;
  return {
    animationDurationUpdate: 300,
    dataset: { source: SOURCE },
    tooltip: { trigger: 'axis', show: !preview },
    // axisPointer.link ties the pointers of several axes together: one hover shows both.
    axisPointer: { link: look.linked ? [{ xAxisIndex: 'all' }] : [] },
    // Two grids in one chart; xAxis/yAxis entries pick theirs with gridIndex.
    grid: [
      { top, left: 48, right: 16, height: `${upper * 0.78}%` },
      { top: `${upper * 0.78 + gap + 8}%`, left: 48, right: 16, bottom },
    ],
    xAxis: [
      // The upper axis can hide its labels because the lower one carries the same categories.
      { type: 'category', gridIndex: 0, axisLabel: { show: look.labelsOnTop }, axisTick: { show: look.labelsOnTop } },
      { type: 'category', gridIndex: 1 },
    ],
    yAxis: [
      { type: 'value', gridIndex: 0, scale: true, name: 'Price', splitNumber: 3 },
      { type: 'value', gridIndex: 1, name: 'Volume', splitNumber: 2 },
    ],
    // Both series take the x dimension from the same dataset column through encode.
    series: [
      { type: 'line', xAxisIndex: 0, yAxisIndex: 0, showSymbol: false, encode: { x: 'day', y: 'price' } },
      { type: 'bar', xAxisIndex: 1, yAxisIndex: 1, encode: { x: 'day', y: 'volume' }, itemStyle: { color: '#91cc75' } },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { split: 70, labelsOnTop: false, linked: true };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });
  const show = (): void => {
    chart.setOption(build(look, ctx.preview));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const splits = [70, 50, 35, 50];
    let i = 0;
    stop = every(1500, () => {
      look.split = splits[++i % splits.length]!;
      show();
    });
  } else {
    slider(bar!, 'upper grid %', [30, 80, 1], look.split, (v) => {
      look.split = v;
      show();
    });
    const labels = button(bar!, 'upper x labels: hidden', () => {
      look.labelsOnTop = !look.labelsOnTop;
      labels.textContent = `upper x labels: ${look.labelsOnTop ? 'shown' : 'hidden'}`;
      show();
    });
    const link = button(bar!, 'axisPointer.link: on', () => {
      look.linked = !look.linked;
      link.textContent = `axisPointer.link: ${look.linked ? 'on' : 'off'}`;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
