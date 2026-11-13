// Zoom expressions (interpolate, step) driving circle radius, line width, opacity
import { Map } from 'maplibre-gl';
import type { FeatureCollection, LineString } from 'geojson';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { cityPoints, palette, worldStyle } from '../../shared/basemap.ts';
import { slider } from '../../shared/controls.ts';

/** Lines of latitude and longitude every 10 degrees. */
function graticule(): FeatureCollection<LineString> {
  const features: FeatureCollection<LineString>['features'] = [];
  for (let lng = -180; lng <= 180; lng += 10) {
    features.push({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[lng, -80], [lng, 80]] } });
  }
  for (let lat = -80; lat <= 80; lat += 10) {
    features.push({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[-180, lat], [180, lat]] } });
  }
  return { type: 'FeatureCollection', features };
}

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 45],
    zoom: 1,
    interactive: !preview,
  });

  map.on('load', () => {
    map.addSource('graticule', { type: 'geojson', data: graticule() });
    map.addSource('cities', { type: 'geojson', data: cityPoints() });
    map.addLayer({
      id: 'graticule',
      type: 'line',
      source: 'graticule',
      paint: {
        'line-color': palette.blue,
        // ["zoom"] may only be the input of an outer interpolate or step.
        'line-width': ['interpolate', ['linear'], ['zoom'], 0, 0.3, 4, 1.2, 8, 3],
        'line-opacity': ['interpolate', ['linear'], ['zoom'], 0, 0.6, 5, 0.15],
      },
    });
    map.addLayer({
      id: 'cities',
      type: 'circle',
      source: 'cities',
      paint: {
        'circle-radius': ['interpolate', ['exponential', 1.5], ['zoom'], 0, 3, 4, 9, 8, 26],
        // step: a new colour from zoom 3, another from zoom 5.
        'circle-color': ['step', ['zoom'], palette.accent, 3, palette.green, 5, palette.purple],
        'circle-opacity': ['interpolate', ['linear'], ['zoom'], 0, 1, 7, 0.45],
        'circle-stroke-width': 1.5,
        'circle-stroke-color': '#ffffff',
      },
    });
  });

  let frame = 0;
  let zoomSlider: HTMLInputElement | undefined;
  if (preview) {
    const breathe = (): void => {
      map.jumpTo({ zoom: 3.6 + Math.sin(performance.now() / 1800) * 2.6 });
      frame = requestAnimationFrame(breathe);
    };
    map.once('load', breathe);
  } else {
    const bar = controlBar(el);
    const out = readout(el);
    zoomSlider = slider(bar, 'zoom', 0, 9, 0.1, 1, (z) => map.setZoom(z));
    const show = (): void => {
      const z = map.getZoom();
      out.textContent = `zoom ${z.toFixed(2)}: circle colour ${z < 3 ? 'amber' : z < 5 ? 'green' : 'purple'} (step at 3 and 5)`;
      if (zoomSlider) zoomSlider.value = String(z);
    };
    map.on('zoom', show);
    show();
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
