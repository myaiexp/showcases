// A map series on a hand-written SVG city plan: named polygons coloured by a visualMap, with selection and labels
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';
import { CITY, DISTRICTS, METRICS } from './district.ts';

// The SVG string is registered like GeoJSON; series.map then draws it by name.
echarts.registerMap('map-svg-visual-map-city', { svg: CITY });

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  const keys = Object.keys(METRICS);
  let metric = keys[0]!;

  const series = (): object => ({
    type: 'map',
    map: 'map-svg-visual-map-city',
    // Data names match the name attribute of the SVG elements.
    data: DISTRICTS.map((name, i) => ({ name, value: METRICS[metric]!.values[i]! })),
    layoutCenter: ['50%', '50%'],
    layoutSize: '95%',
    selectedMode: 'single',
    label: { show: true, color: '#fff', fontSize: 12 },
    // areaColor is ignored for named elements: the visualMap colours them.
    emphasis: { label: { color: '#fff' }, itemStyle: { borderColor: '#fff', borderWidth: 2 } },
    select: { itemStyle: { borderColor: '#f2b94c', borderWidth: 3 }, label: { color: '#fff' } },
    tooltip: { formatter: (p: { name: string; value: number }) => `${p.name}: ${p.value} ${METRICS[metric]!.unit}` },
  });
  const visualMap = (): object => ({
    min: 0,
    max: METRICS[metric]!.max,
    calculable: true,
    show: !ctx.preview,
    left: 12,
    bottom: 12,
    text: ['high', 'low'],
    inRange: { color: ['#1b3a5c', '#3b82c4', '#9bd4a4', '#f2e394', '#f29e4c'] },
  });

  chart.setOption({ tooltip: {}, visualMap: visualMap(), series: [series()] });
  const apply = (): void => {
    chart.setOption({ visualMap: visualMap(), series: [series()] });
  };

  if (bar) {
    select(bar, 'Metric', keys, (v) => {
      metric = v;
      apply();
    });
  }

  let i = 0;
  const stop = ctx.preview
    ? every(2400, () => {
        metric = keys[++i % keys.length]!;
        apply();
        chart.dispatchAction({ type: 'select', seriesIndex: 0, name: DISTRICTS[i % DISTRICTS.length]! });
      })
    : (): void => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
