// series.lines with polyline: true draws tracks through many coords; false keeps only the two ends
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select, slider } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';
import { TRACKS } from './tracks.ts';

echarts.registerMap('lines-polyline-tracks-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  const s = { polyline: true, effect: true, width: 3, type: 'solid' };

  const lines = (): object => ({
    type: 'lines',
    coordinateSystem: 'geo',
    zlevel: 2,
    // polyline: data.coords may hold more than two points. Without it only the first and last count.
    polyline: s.polyline,
    // Each data item carries its own coords and its own line style.
    data: TRACKS.map((t) => ({
      name: t.name,
      coords: t.coords,
      lineStyle: { color: t.color, width: s.width, type: s.type, opacity: 0.85 },
    })),
    effect: { show: s.effect, symbol: 'circle', symbolSize: 5, trailLength: 0.3, period: 6, color: '#ffffff' },
    // Large mode would drop per-item styles, so it is switched off for these five tracks.
    large: false,
    tooltip: { formatter: '{b}' },
  });

  chart.setOption({
    animation: false,
    tooltip: {},
    geo: {
      map: 'lines-polyline-tracks-world',
      roam: !ctx.preview,
      // Fit the Baltic Sea: longitude and latitude of the left-top and right-bottom corners.
      boundingCoords: [[8, 66], [32, 53]],
      // Meridians converge at this latitude, so the width is scaled by about cos(60 degrees).
      aspectScale: 0.5,
      preserveAspect: 'contain',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      itemStyle: { areaColor: '#232833', borderColor: '#3a4150', borderWidth: 0.5 },
      emphasis: { disabled: true },
    },
    series: [lines()],
  });
  const apply = (): void => {
    chart.setOption({ series: [lines()] });
  };

  if (bar) {
    select(bar, 'polyline', ['true', 'false'], (v) => {
      s.polyline = v === 'true';
      apply();
    });
    select(bar, 'effect.show', ['true', 'false'], (v) => {
      s.effect = v === 'true';
      apply();
    });
    slider(bar, 'lineStyle.width', [1, 8, 1], s.width, (v) => {
      s.width = v;
      apply();
    });
    select(bar, 'lineStyle.type', ['solid', 'dashed', 'dotted'], (v) => {
      s.type = v;
      apply();
    });
  }

  const stop = ctx.preview
    ? every(2600, () => {
        s.polyline = !s.polyline;
        apply();
      })
    : (): void => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
