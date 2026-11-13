// Scatter series on a geo component: city points as [lon, lat, population] over registered world GeoJSON
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every, echarts } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';
import { CITIES } from '../../shared/scatter-data.ts';

// geo.map names a map registered with registerMap; this name is private to the example.
echarts.registerMap('scatter-geo-cities-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  let scale = 1;
  let labels = 'none';
  let tick = 0;

  // After the first call only the series is sent, so the reader's zoom and pan survive.
  const show = (full = false): void => {
    const option = {
      tooltip: { formatter: (p: { name: string; value: number[] }) => `${p.name}: ${p.value[2]}M` },
      // The geo component draws the land; series with coordinateSystem 'geo' sit on it.
      geo: {
        map: 'scatter-geo-cities-world',
        roam: !ctx.preview,
        itemStyle: { areaColor: '#2a2f3a', borderColor: '#0d1117', borderWidth: 0.5 },
        // Fit the whole map in the card; bigger centres on the populated band.
        zoom: ctx.preview ? 1.1 : 1,
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          // Each item: name plus [lon, lat, value]. The third value is read by symbolSize.
          data: CITIES.map((c, i) => ({
            name: c.name,
            // In the preview the sizes pulse out of phase, so the card breathes.
            value: [c.lon, c.lat, ctx.preview ? +(c.pop * (1 + 0.35 * Math.sin(tick * 0.9 + i))).toFixed(1) : c.pop],
          })),
          symbolSize: (v: number[]) => (4 + Math.sqrt(v[2] ?? 0) * 2.6) * scale,
          itemStyle: { color: '#f2b94c', opacity: 0.8, borderColor: '#fff', borderWidth: 0.5 },
          label: {
            show: labels !== 'none',
            position: 'right',
            color: '#e6e6e6',
            fontSize: 11,
            formatter: (p: { name: string; value: unknown }) => (labels === 'name' ? p.name : `${p.name} ${(p.value as number[])[2]}M`),
          },
          emphasis: { scale: 1.3, label: { show: true } },
        },
      ],
    };
    chart.setOption(full ? option : { series: option.series });
  };
  show(true);

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(900, () => {
      tick++;
      show();
    });
  } else {
    slider(bar!, 'symbol scale', [0.5, 2, 0.1], scale, (v) => {
      scale = v;
      show();
    });
    select(bar!, 'label', ['none', 'name', 'name + population'], (v) => {
      labels = v === 'name + population' ? 'full' : v;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
