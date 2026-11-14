// City pies placed on a world map: series.pie with coordinateSystem 'geo' and a [lon, lat] centre
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, echarts, select, slider, button } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';
import { rng } from '../../shared/pie-data.ts';

echarts.registerMap('pie-on-geo-map-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

const cities: [string, number, number, number][] = [
  ['New York', -74, 40.7, 22],
  ['London', -0.1, 51.5, 20],
  ['Lagos', 3.4, 6.5, 16],
  ['Mumbai', 72.9, 19.1, 20],
  ['Tokyo', 139.7, 35.7, 24],
  ['Sao Paulo', -46.6, -23.5, 18],
  ['Sydney', 151.2, -33.9, 16],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440, previewHeight: 200 });

  const look = { scale: 1, rose: 'none', seed: 3 };
  const apply = (): void => {
    const rand = rng(look.seed);
    const px = ctx.preview ? 0.55 : 1;
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: ctx.preview ? { show: false } : { top: 0 },
      geo: {
        map: 'pie-on-geo-map-world',
        roam: false,
        top: ctx.preview ? 0 : 30,
        bottom: ctx.preview ? 0 : 20,
        silent: true,
        itemStyle: { areaColor: '#2a313c', borderColor: '#46505e' },
      },
      series: cities.map(([name, lon, lat, size]) => ({
        type: 'pie' as const,
        name,
        coordinateSystem: 'geo' as const,
        geoIndex: 0,
        // The centre is a [longitude, latitude] on the map.
        center: [lon, lat],
        radius: size * look.scale * px,
        roseType: look.rose === 'none' ? undefined : look.rose,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: { borderColor: '#111', borderWidth: 1 },
        data: [
          { name: 'Solar', value: 1 + Math.round(rand() * 9) },
          { name: 'Wind', value: 1 + Math.round(rand() * 9) },
          { name: 'Hydro', value: 1 + Math.round(rand() * 9) },
        ],
      })),
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1500, () => {
      look.seed += 1;
      apply();
    });
  } else {
    slider(bar!, 'radius scale', [0.5, 2, 0.1], 1, (v) => { look.scale = v; apply(); });
    select(bar!, 'roseType', ['none', 'radius', 'area'], (v) => { look.rose = v; apply(); });
    button(bar!, 'New data', () => { look.seed += 1; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
