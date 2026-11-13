// A world map series coloured by a continuous visualMap, with roam and region highlight
import type { Mount } from '@/types.ts';
import { createChart, echarts, every } from '../../shared/chart.ts';
import { COUNTRIES, NAMES } from './world.ts';

// GeoJSON registered under a name; series.map refers to it.
echarts.registerMap('world', { geoJSON: COUNTRIES as never, specialAreas: {} });

/** A made-up index per country; a new round every few seconds animates the colours. */
const values = (round: number): { name: string; value: number }[] =>
  NAMES.map((name, i) => ({ name, value: Math.round(50 + 45 * Math.sin(i * 1.7 + round * 0.9)) }));

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  let round = 0;

  chart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    // visualMap maps each data value onto inRange.color; the handles filter on drag.
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      show: !ctx.preview,
      left: 16,
      bottom: 20,
      inRange: { color: ['#1b3a5c', '#3b82c4', '#9bd4a4', '#f2e394', '#f29e4c'] },
    },
    series: [
      {
        type: 'map',
        map: 'world',
        // Data items are matched to features by name (nameProperty defaults to 'name').
        data: values(round),
        roam: !ctx.preview,
        itemStyle: { borderColor: '#0d1117', borderWidth: 0.5, areaColor: '#2a2f3a' },
        emphasis: { label: { show: !ctx.preview }, itemStyle: { areaColor: '#ffffff' } },
        select: { disabled: true },
      },
    ],
  });

  const stopData = every(3000, () => chart.setOption({ series: [{ data: values(++round) }] }));
  // Walk a highlight across a few countries so the card moves without a pointer.
  const tour = ['Brazil', 'Finland', 'India', 'Australia', 'Canada', 'Nigeria', 'Japan'];
  let i = 0;
  const stopTour = every(1200, () => {
    chart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
    chart.dispatchAction({ type: 'highlight', seriesIndex: 0, name: tour[i++ % tour.length] });
  });

  return () => {
    stopData();
    stopTour();
    dispose();
  };
};

export default mount;
