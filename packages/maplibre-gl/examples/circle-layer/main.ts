// Circle layer: data-driven radius, colour and stroke; blur and opacity
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, enableOnLoad, mapContainer, readout } from '../../shared/setup.ts';
import { palette, worldStyle } from '../../shared/basemap.ts';
import { stations } from './data.ts';
import { select, slider } from '../../shared/controls.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [20, 35],
    zoom: preview ? 0.9 : 1.6,
    pitch: preview ? 0 : 45,
    interactive: !preview,
  });

  map.on('load', () => {
    map.addSource('stations', { type: 'geojson', data: stations() });
    map.addLayer({
      id: 'stations',
      type: 'circle',
      source: 'stations',
      paint: {
        // Radius and colour are read from each feature's `mag` property.
        'circle-radius': ['interpolate', ['linear'], ['get', 'mag'], 1, 3, 10, 14],
        'circle-color': ['interpolate', ['linear'], ['get', 'mag'], 1, palette.blue, 5, palette.accent, 10, palette.red],
        'circle-opacity': 0.8,
        'circle-blur': 0,
        // The stroke colour comes from the feature's `kind`.
        'circle-stroke-width': 1.5,
        'circle-stroke-color': ['match', ['get', 'kind'], 'quake', '#ffffff', 'storm', palette.purple, palette.green],
        'circle-pitch-alignment': 'viewport',
      },
    });
  });

  let frame = 0;
  if (preview) {
    const drift = (): void => {
      const c = map.getCenter();
      map.setCenter([c.lng + 0.12, 30 + Math.sin(performance.now() / 4000) * 10]);
      frame = requestAnimationFrame(drift);
    };
    map.once('load', drift);
  } else {
    const bar = controlBar(el);
    const out = readout(el, 'Radius and colour follow "mag"; stroke colour follows "kind".');
    slider(bar, 'blur', 0, 1, 0.05, 0, (v) => map.setPaintProperty('stations', 'circle-blur', v));
    slider(bar, 'opacity', 0.1, 1, 0.05, 0.8, (v) => map.setPaintProperty('stations', 'circle-opacity', v));
    select(bar, 'pitch-alignment', ['viewport', 'map'], (v) => {
      map.setPaintProperty('stations', 'circle-pitch-alignment', v === 'map' ? 'map' : 'viewport');
      out.textContent = `circle-pitch-alignment: ${v}. With "map" the circles lie flat on the ground as the map tilts.`;
    });
    button(bar, 'Flatten', () => map.easeTo({ pitch: 0 }));
    button(bar, 'Tilt', () => map.easeTo({ pitch: 60 }));
    enableOnLoad(map, bar);
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
