// Three map series sharing one registered map: mapValueCalculation combines their values per region
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';
import { COUNTRIES, NAMES } from '../../shared/world.ts';

// Series with the same `map` value are drawn as one map; the name is private to this example.
echarts.registerMap('map-multi-series-calculation-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

const SERIES = ['Survey A', 'Survey B', 'Survey C'];
type Calc = 'sum' | 'average' | 'max' | 'min';

/** Made-up scores 0 to 100, different for each survey and country. */
const scores = (s: number): { name: string; value: number }[] =>
  NAMES.map((name, i) => ({ name, value: Math.round(50 + 45 * Math.sin(i * (1.3 + s * 0.8) + s * 2)) }));

const DATA = SERIES.map((_, s) => scores(s));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  let calc: Calc = 'sum';
  let legendDots = true;

  const build = (): Record<string, unknown> => ({
    tooltip: { trigger: 'item' },
    // showLegendSymbol draws the series symbol in each region and needs a legend component.
    legend: { data: SERIES, show: !ctx.preview, bottom: 8 },
    // 'sum' adds three scores, so its range is three times wider than the others.
    visualMap: {
      min: 0,
      max: calc === 'sum' ? 300 : 100,
      calculable: true,
      show: !ctx.preview,
      left: 16,
      bottom: 60,
      inRange: { color: ['#1b3a5c', '#3b82c4', '#9bd4a4', '#f2e394', '#f29e4c'] },
    },
    series: SERIES.map((name, s) => ({
      type: 'map',
      map: 'map-multi-series-calculation-world',
      name,
      data: DATA[s],
      // The first series' map options win; mapValueCalculation merges all series per region.
      mapValueCalculation: calc,
      showLegendSymbol: legendDots,
      itemStyle: { borderColor: '#0d1117', borderWidth: 0.5, areaColor: '#2a2f3a' },
      emphasis: { label: { show: false }, itemStyle: { areaColor: '#ffffff' } },
      select: { disabled: true },
    })),
  });
  chart.setOption(build());

  // Only the series and visualMap change; the map keeps its own layout between updates.
  const update = (): void => {
    const { visualMap, series } = build();
    chart.setOption({ visualMap, series });
  };

  if (bar) {
    select(bar, 'mapValueCalculation', ['sum', 'average', 'max', 'min'], (v) => {
      calc = v as Calc;
      update();
    });
    select(bar, 'showLegendSymbol', ['true', 'false'], (v) => {
      legendDots = v === 'true';
      update();
    });
    const hint = document.createElement('span');
    hint.textContent = 'Click legend items to hide a survey; the remaining series are recalculated.';
    bar.append(hint);
  }

  const modes: Calc[] = ['sum', 'average', 'max', 'min'];
  let i = 0;
  const stop = ctx.preview
    ? every(2200, () => {
        calc = modes[++i % modes.length]!;
        update();
      })
    : (): void => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
