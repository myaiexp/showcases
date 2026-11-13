// Line layers: dasharray, cap/join, width by zoom, offset, line-progress gradient
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { palette, worldStyle } from '../../shared/basemap.ts';
import { gradientRoutes, plainRoutes } from './routes.ts';
import { select, slider } from '../../shared/controls.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [30, 25],
    zoom: preview ? 0.8 : 1.5,
    interactive: !preview,
  });

  map.on('load', () => {
    // line-gradient only works on a GeoJSON source with lineMetrics: true.
    map.addSource('gradient-routes', { type: 'geojson', data: gradientRoutes, lineMetrics: true });
    map.addSource('routes', { type: 'geojson', data: plainRoutes });

    map.addLayer({
      id: 'gradient',
      type: 'line',
      source: 'gradient-routes',
      layout: { 'line-cap': 'round' },
      paint: {
        'line-width': 6,
        // line-progress runs 0 to 1 from the start of the line to its end.
        'line-gradient': ['interpolate', ['linear'], ['line-progress'], 0, palette.blue, 0.5, palette.purple, 1, palette.red],
      },
    });
    map.addLayer({
      id: 'dashed',
      type: 'line',
      source: 'routes',
      filter: ['==', ['get', 'name'], 'dashed'],
      // With a round cap, a zero-length dash becomes a dot.
      layout: { 'line-cap': 'round' },
      paint: { 'line-color': palette.accent, 'line-width': 3, 'line-dasharray': ['literal', [0, 2]] },
    });
    map.addLayer({
      id: 'zoom-width',
      type: 'line',
      source: 'routes',
      filter: ['==', ['get', 'name'], 'zoom'],
      paint: { 'line-color': palette.green, 'line-width': ['interpolate', ['linear'], ['zoom'], 1, 1, 4, 5, 8, 18] },
    });
    // Three copies of one route, shifted left, centred and right of the geometry.
    for (const [id, offset, color] of [['offset-left', -6, palette.red], ['offset-mid', 0, '#ffffff'], ['offset-right', 6, palette.blue]] as const) {
      map.addLayer({
        id,
        type: 'line',
        source: 'routes',
        filter: ['==', ['get', 'name'], 'offset'],
        paint: { 'line-color': color, 'line-width': 3, 'line-offset': offset },
      });
    }
    map.addLayer({
      id: 'zigzag',
      type: 'line',
      source: 'routes',
      filter: ['==', ['get', 'name'], 'zigzag'],
      layout: { 'line-cap': 'butt', 'line-join': 'miter' },
      paint: { 'line-color': palette.purple, 'line-width': 10 },
    });
  });

  let frame = 0;
  if (preview) {
    const drift = (): void => {
      // Breathe in and out so the width-by-zoom route visibly changes.
      const t = performance.now() / 1000;
      map.jumpTo({ center: [30 + Math.sin(t / 5) * 40, 25], zoom: 1.6 + Math.sin(t / 2.5) * 1.1 });
      frame = requestAnimationFrame(drift);
    };
    map.once('load', drift);
  } else {
    const has = (): boolean => !!map.getLayer('zigzag'); // layers appear on load
    const bar = controlBar(el);
    const out = readout(el, 'Zoom in on Tokyo-Singapore: its line-width interpolates with zoom.');
    select(bar, 'line-cap', ['butt', 'round', 'square'], (v) => has() && map.setLayoutProperty('zigzag', 'line-cap', v as 'butt' | 'round' | 'square'));
    select(bar, 'line-join', ['miter', 'bevel', 'round'], (v) => has() && map.setLayoutProperty('zigzag', 'line-join', v as 'miter' | 'bevel' | 'round'));
    slider(bar, 'offset', 0, 14, 1, 6, (v) => {
      if (!has()) return;
      map.setPaintProperty('offset-left', 'line-offset', -v);
      map.setPaintProperty('offset-right', 'line-offset', v);
      out.textContent = `line-offset: -${v}, 0, +${v} px (positive is to the right of the line's direction)`;
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
