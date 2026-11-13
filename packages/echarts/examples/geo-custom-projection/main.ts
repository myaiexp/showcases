// geo.projection: the same world drawn through project/unproject functions, with cities and a pointer readout
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';
import { CITIES } from '../../shared/scatter-data.ts';
import { PROJECTIONS } from './projections.ts';

echarts.registerMap('geo-custom-projection-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

const NAMES = Object.keys(PROJECTIONS);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const readout = document.createElement('span');
  readout.textContent = 'Move over the map: unproject turns the pointer back into longitude and latitude.';
  bar?.append(readout);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const option = (name: string): Record<string, unknown> => {
    const projection = PROJECTIONS[name];
    return {
      geo: {
        map: 'geo-custom-projection-world',
        roam: !ctx.preview,
        itemStyle: { areaColor: '#2a2f3a', borderColor: '#0d1117', borderWidth: 0.5 },
        emphasis: { label: { show: false }, itemStyle: { areaColor: '#3a4150' } },
        // project: [lon, lat] -> plane; unproject: plane -> [lon, lat]. Both are required.
        projection: projection ?? undefined,
        // Without a projection the longitude and latitude map linearly to pixels.
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
      },
      series: [
        {
          // Series on the geo component are positioned through the same projection.
          type: 'scatter',
          coordinateSystem: 'geo',
          data: CITIES.map((c) => ({ name: c.name, value: [c.lon, c.lat] })),
          symbolSize: 5,
          itemStyle: { color: '#f2b94c' },
          tooltip: { formatter: '{b}' },
        },
      ],
    };
  };
  // The layout changes with the projection, so each switch replaces the option; roam resets with it.
  chart.setOption(option(NAMES[1]!), true);

  if (bar) {
    const sel = select(bar, 'projection', NAMES, (v) => chart.setOption(option(v), true));
    sel.value = NAMES[1]!;
    chart.getZr().on('mousemove', (e: { offsetX: number; offsetY: number }) => {
      const p = chart.convertFromPixel({ geoIndex: 0 }, [e.offsetX, e.offsetY]) as number[] | null;
      const [lon, lat] = p ?? [];
      readout.textContent =
        lon !== undefined && lat !== undefined && Number.isFinite(lon) && Number.isFinite(lat)
          ? `lon ${lon.toFixed(1)}, lat ${lat.toFixed(1)}`
          : 'outside the map';
    });
  }

  let i = 1;
  const stop = ctx.preview ? every(2400, () => chart.setOption(option(NAMES[++i % NAMES.length]!), true)) : (): void => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
