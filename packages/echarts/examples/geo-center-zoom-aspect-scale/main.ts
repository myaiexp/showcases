// geo.center, zoom, aspectScale and preserveAspect: place, scale and stretch a world map by hand
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select, slider } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';

echarts.registerMap('geo-center-zoom-aspect-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  const state = { lon: 10, lat: 20, zoom: 1, aspectScale: 0.75, preserve: 'contain' };

  const geo = (): object => ({
    map: 'geo-center-zoom-aspect-world',
    // center: the [lng, lat] placed at the middle of the viewport; zoom: scale factor around it.
    center: [state.lon, state.lat],
    zoom: state.zoom,
    // aspectScale: width-to-height stretch of the map; only used while the aspect is preserved.
    aspectScale: state.aspectScale,
    // 'contain' keeps the map's aspect ratio inside the rect, 'cover' fills it, false stretches.
    preserveAspect: state.preserve === 'false' ? false : state.preserve,
    left: '4%',
    right: '4%',
    top: '4%',
    bottom: '4%',
    // Without clip, a zoomed map would spill over the page; clip keeps it in its rect.
    clip: true,
    itemStyle: { areaColor: '#2a2f3a', borderColor: '#0d1117', borderWidth: 0.5 },
    emphasis: { label: { show: false }, itemStyle: { areaColor: '#4a5265' } },
  });

  // Only the geo is sent after the first call, so the controls change one thing at a time.
  chart.setOption({ animation: false, geo: geo() });
  const apply = (): void => {
    chart.setOption({ geo: geo() });
  };

  if (bar) {
    slider(bar, 'center lng', [-180, 180, 5], state.lon, (v) => {
      state.lon = v;
      apply();
    });
    slider(bar, 'center lat', [-70, 80, 5], state.lat, (v) => {
      state.lat = v;
      apply();
    });
    slider(bar, 'zoom', [0.5, 8, 0.1], state.zoom, (v) => {
      state.zoom = v;
      apply();
    });
    slider(bar, 'aspectScale', [0.3, 1.5, 0.05], state.aspectScale, (v) => {
      state.aspectScale = v;
      apply();
    });
    select(bar, 'preserveAspect', ['contain', 'cover', 'false'], (v) => {
      state.preserve = v;
      apply();
    });
  }

  let t = 0;
  const stop = ctx.preview
    ? every(100, () => {
        t += 0.05;
        state.lon = 20 + 90 * Math.sin(t);
        state.lat = 25 + 25 * Math.sin(t * 0.7);
        state.zoom = 2.2 + 1.2 * Math.sin(t * 1.3);
        state.aspectScale = 0.75 + 0.3 * Math.sin(t * 0.5);
        apply();
      })
    : (): void => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;
