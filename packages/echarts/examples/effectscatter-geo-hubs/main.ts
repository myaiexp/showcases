// effectScatter on a geo component marking the biggest cities, over plain scatter points for the rest
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every, echarts } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';
import { CITIES } from '../../shared/scatter-data.ts';

echarts.registerMap('effectscatter-geo-hubs-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

const hubs = CITIES.filter((c) => c.pop >= 20);
const rest = CITIES.filter((c) => c.pop < 20);
const toData = (list: typeof CITIES): { name: string; value: number[] }[] => list.map((c) => ({ name: c.name, value: [c.lon, c.lat, c.pop] }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  let showOn = 'render';
  let number = 3;
  let period = 4;

  // After the first call only the series is sent, so the reader's zoom and pan survive.
  const show = (full = false): void => {
    const option = {
        tooltip: { formatter: (p: { name: string; value: number[] }) => `${p.name}: ${p.value[2]}M` },
        geo: {
          map: 'effectscatter-geo-hubs-world',
          roam: !ctx.preview,
          itemStyle: { areaColor: '#2a2f3a', borderColor: '#0d1117', borderWidth: 0.5 },
          zoom: ctx.preview ? 1.1 : 1,
        },
        series: [
          { type: 'scatter', coordinateSystem: 'geo', data: toData(rest), symbolSize: 6, itemStyle: { color: '#8a8f99' } },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: toData(hubs),
            symbolSize: (v: number[]) => 6 + (v[2] ?? 0) / 3,
            itemStyle: { color: '#f2b94c' },
            // showEffectOn: 'render' ripples all the time; 'emphasis' only while a point is hovered.
            showEffectOn: showOn as 'render' | 'emphasis',
            rippleEffect: { number, period, scale: 3, brushType: 'stroke' },
            label: { show: true, formatter: '{b}', position: 'right', color: '#e6e6e6', fontSize: 11 },
          },
        ],
    };
    chart.setOption(full ? option : { series: option.series });
  };
  show(true);

  let stop = (): void => {};
  if (ctx.preview) {
    // Preview: switches to 'emphasis' and highlights each hub in turn, which is what a hover does.
    showOn = 'emphasis';
    show();
    let i = 0;
    stop = every(1600, () => {
      chart.dispatchAction({ type: 'downplay', seriesIndex: 1 });
      chart.dispatchAction({ type: 'highlight', seriesIndex: 1, dataIndex: i++ % hubs.length });
    });
  } else {
    select(bar!, 'showEffectOn', ['render', 'emphasis'], (v) => {
      showOn = v;
      show();
    });
    slider(bar!, 'rippleEffect.number', [1, 6, 1], number, (v) => {
      number = v;
      show();
    });
    slider(bar!, 'rippleEffect.period', [1, 8, 0.5], period, (v) => {
      period = v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
