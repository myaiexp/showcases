// Heatmap layer: weights, colour ramp, radius by zoom, intensity slider
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';
import { clusters } from './data.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [20, 30],
    zoom: preview ? 0.9 : 1.6,
    interactive: !preview,
  });

  map.on('load', () => {
    map.addSource('hot', { type: 'geojson', data: clusters() });
    map.addLayer({
      id: 'hot',
      type: 'heatmap',
      source: 'hot',
      paint: {
        // Each point counts for 0..10 points' worth, from its `weight` property.
        'heatmap-weight': ['interpolate', ['linear'], ['get', 'weight'], 0, 0.1, 10, 1],
        'heatmap-intensity': 1,
        // The colour ramp is indexed by the accumulated density, 0 to 1.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(10, 19, 32, 0)',
          0.2, 'rgb(40, 60, 160)',
          0.4, 'rgb(0, 190, 200)',
          0.6, 'rgb(250, 220, 40)',
          0.8, 'rgb(250, 120, 30)',
          1, 'rgb(240, 40, 40)',
        ],
        // A bigger radius of influence as the map zooms in.
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 8, 4, 30, 8, 60],
        'heatmap-opacity': 0.9,
      },
    });
  });

  // The layer only exists after load, so ignore control input before then.
  const paint = (name: string, value: unknown): void => {
    if (map.getLayer('hot')) map.setPaintProperty('hot', name as 'heatmap-intensity', value as never);
  };

  let frame = 0;
  if (preview) {
    // Pulse the intensity so the card moves without input.
    const pulse = (): void => {
      const t = performance.now() / 1000;
      map.setPaintProperty('hot', 'heatmap-intensity', 1.4 + Math.sin(t * 1.5) * 0.9);
      const c = map.getCenter();
      map.setCenter([c.lng + 0.1, c.lat]);
      frame = requestAnimationFrame(pulse);
    };
    map.once('load', pulse);
  } else {
    const bar = controlBar(el);
    readout(el, 'Zoom in: heatmap-radius grows with zoom, so the blobs stay smooth.');
    slider(bar, 'intensity', 0.2, 4, 0.1, 1, (v) => paint('heatmap-intensity', v));
    slider(bar, 'opacity', 0.1, 1, 0.05, 0.9, (v) => paint('heatmap-opacity', v));
    slider(bar, 'radius scale', 0.5, 3, 0.1, 1, (k) =>
      paint('heatmap-radius', ['interpolate', ['linear'], ['zoom'], 0, 8 * k, 4, 30 * k, 8, 60 * k]),
    );
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
