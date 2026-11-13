// Animating a GeoJSON source by calling setData with a longer route each frame
import { Map } from 'maplibre-gl';
import type { GeoJSONSource } from 'maplibre-gl';
import type { Feature, FeatureCollection, Position } from 'geojson';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { cities, palette, worldStyle } from '../../shared/basemap.ts';

const WAYPOINTS: Position[] = [
  cities.reykjavik,
  cities.london,
  cities.cairo,
  cities.mumbai,
  cities.singapore,
  cities.tokyo,
];
const DURATION_MS = 9000;

/** The route up to `progress` (0..1), measured along the straight segments between waypoints. */
function partialRoute(progress: number): FeatureCollection {
  const lengths = WAYPOINTS.slice(1).map((p, i) => {
    const q = WAYPOINTS[i] as Position;
    return Math.hypot((p[0] as number) - (q[0] as number), (p[1] as number) - (q[1] as number));
  });
  let remaining = progress * lengths.reduce((a, b) => a + b, 0);
  const coords: Position[] = [WAYPOINTS[0] as Position];
  for (let i = 0; i < lengths.length; i++) {
    const a = WAYPOINTS[i] as Position;
    const b = WAYPOINTS[i + 1] as Position;
    const len = lengths[i] as number;
    const t = Math.min(1, remaining / len);
    coords.push([
      (a[0] as number) + ((b[0] as number) - (a[0] as number)) * t,
      (a[1] as number) + ((b[1] as number) - (a[1] as number)) * t,
    ]);
    remaining -= len;
    if (remaining <= 0) break;
  }
  const line: Feature = {
    type: 'Feature',
    properties: {},
    geometry: { type: 'LineString', coordinates: coords },
  };
  const head: Feature = {
    type: 'Feature',
    properties: {},
    geometry: { type: 'Point', coordinates: coords[coords.length - 1] as Position },
  };
  return { type: 'FeatureCollection', features: [line, head] };
}

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [60, 35],
    zoom: preview ? 0.3 : 1.1,
    interactive: !preview,
  });

  let running = true;
  let elapsed = 0;
  let last = performance.now();
  let frame = 0;
  const info = preview ? null : readout(el, '');

  map.on('load', () => {
    map.addSource('route', { type: 'geojson', data: partialRoute(0) });
    map.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      filter: ['==', '$type', 'LineString'],
      paint: { 'line-color': palette.accent, 'line-width': 3 },
    });
    map.addLayer({
      id: 'route-head',
      type: 'circle',
      source: 'route',
      filter: ['==', '$type', 'Point'],
      paint: {
        'circle-radius': 7,
        'circle-color': '#fff',
        'circle-stroke-color': palette.accent,
        'circle-stroke-width': 3,
      },
    });

    // setData replaces the whole dataset; the source re-parses it and the map redraws.
    const source = map.getSource<GeoJSONSource>('route') as GeoJSONSource;
    const tick = (now: number): void => {
      if (running) elapsed = (elapsed + (now - last)) % (DURATION_MS + 1500);
      last = now;
      const progress = Math.min(1, elapsed / DURATION_MS);
      source.setData(partialRoute(progress)).catch(() => {}); // may reject after remove()
      if (info) info.textContent = `progress ${(progress * 100).toFixed(0)}%`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  });

  if (!preview) {
    const bar = controlBar(el);
    const toggle = button(bar, 'Pause', () => {
      running = !running;
      toggle.textContent = running ? 'Pause' : 'Resume';
    });
    button(bar, 'Restart', () => {
      elapsed = 0;
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
