// features[].properties.echartsStyle: region styles stored in the GeoJSON, and a data item that overrides one
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';
import { styledWorld } from './styled.ts';

// The same countries twice under private names: one plain, one carrying echartsStyle (see styled.ts).
echarts.registerMap('geo-echarts-style-plain', { geoJSON: COUNTRIES as never, specialAreas: {} });
echarts.registerMap('geo-echarts-style-styled', { geoJSON: styledWorld() as never, specialAreas: {} });

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  let styled = true;
  let override = true;

  const series = (): object => ({
    type: 'map',
    map: styled ? 'geo-echarts-style-styled' : 'geo-echarts-style-plain',
    roam: !ctx.preview,
    // echartsStyle may set `selected`; that needs a selectedMode to show.
    selectedMode: 'multiple',
    itemStyle: { areaColor: '#2a2f3a', borderColor: '#0d1117', borderWidth: 0.5 },
    emphasis: { label: { show: false }, itemStyle: { areaColor: '#4a5265' } },
    select: { itemStyle: { areaColor: '#f2b94c' }, label: { color: '#111' } },
    // A data item wins over echartsStyle: Greenland is black in the GeoJSON and cyan here.
    data: override ? [{ name: 'Greenland', value: 1, itemStyle: { areaColor: '#22d3ee' } }] : [],
  });

  chart.setOption({ tooltip: {}, series: [series()] });

  const apply = (): void => {
    // A new map name with a fresh `selected` state: the series is replaced, not merged.
    chart.setOption({ series: [series()] }, { replaceMerge: ['series'] });
  };
  if (bar) {
    select(bar, 'GeoJSON', ['with echartsStyle', 'plain'], (v) => {
      styled = v === 'with echartsStyle';
      apply();
    });
    select(bar, 'data item for Greenland', ['overrides', 'none'], (v) => {
      override = v === 'overrides';
      apply();
    });
  }

  let i = 0;
  const stop = ctx.preview
    ? every(2400, () => {
        i++;
        styled = i % 2 === 0;
        override = i % 4 < 2;
        apply();
      })
    : (): void => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
