// A heatmap series on a geo component: pointSize, blurSize, minOpacity and maxOpacity shape the density blobs
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider, every, echarts } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';
import { CITIES, rng, gauss } from '../../shared/scatter-data.ts';

echarts.registerMap('heatmap-geo-density-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

// Points scattered around each city, [lon, lat, weight]; bigger cities get more points.
const r = rng(21);
const data = CITIES.flatMap((c) =>
  Array.from({ length: Math.round(4 + c.pop * 1.5) }, () => [+(c.lon + gauss(r) * 4).toFixed(2), +(c.lat + gauss(r) * 3).toFixed(2), Math.round(1 + r() * 9)]),
);

interface Look { pointSize: number; blurSize: number; minOpacity: number; maxOpacity: number }

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  const look: Look = { pointSize: 8, blurSize: 14, minOpacity: 0, maxOpacity: 1 };

  // These four apply on a geo coordinate system only.
  // pointSize: radius of each point; blurSize: how far the colour bleeds out.
  // minOpacity / maxOpacity: opacity at the lowest and highest density.
  const heat = (): Look => ({ ...look });
  const show = (): void => {
    chart.setOption({
      geo: {
        map: 'heatmap-geo-density-world',
        roam: !ctx.preview,
        itemStyle: { areaColor: '#232832', borderColor: '#0d1117', borderWidth: 0.5 },
        zoom: ctx.preview ? 1.1 : 1,
      },
      // A heatmap always needs a visualMap to turn the weight into a colour. Overlapping
      // points add up, so the range sits well above a single point's weight (1–9) or every
      // city saturates to the top colour.
      visualMap: {
        show: !ctx.preview,
        min: 0,
        max: 40,
        calculable: true,
        left: 16,
        bottom: 20,
        inRange: { color: ['#3b82c4', '#9bd4a4', '#f2e394', '#f29e4c', '#ef5350'] },
      },
      series: [
        {
          type: 'heatmap',
          coordinateSystem: 'geo',
          data,
          ...heat(),
        },
      ],
    });
  };
  show();
  // Later changes only touch the series, so a zoom or pan the reader made on the map stays.
  const update = (): void => {
    chart.setOption({ series: [heat()] });
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // Breathe the blob size so the density spreads and gathers again.
    let t = 0;
    stop = every(700, () => {
      t++;
      look.pointSize = 6 + 6 * (0.5 + 0.5 * Math.sin(t * 0.5));
      look.blurSize = 8 + 14 * (0.5 + 0.5 * Math.sin(t * 0.5 + 1));
      update();
    });
  } else {
    slider(bar!, 'pointSize', [2, 30, 1], look.pointSize, (v) => {
      look.pointSize = v;
      update();
    });
    slider(bar!, 'blurSize', [0, 40, 1], look.blurSize, (v) => {
      look.blurSize = v;
      update();
    });
    slider(bar!, 'minOpacity', [0, 1, 0.05], look.minOpacity, (v) => {
      look.minOpacity = v;
      update();
    });
    slider(bar!, 'maxOpacity', [0, 1, 0.05], look.maxOpacity, (v) => {
      look.maxOpacity = v;
      update();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
