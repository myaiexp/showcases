// setLayoutProperty('visibility') toggles layers; moveLayer reorders them
import { Map } from 'maplibre-gl';
import type { Feature, FeatureCollection } from 'geojson';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { cityPoints, palette, worldStyle } from '../../shared/basemap.ts';

/** Lines of latitude and longitude every 30 degrees. */
function graticule(): FeatureCollection {
  const features: Feature[] = [];
  const line = (coordinates: number[][]): void => {
    features.push({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates } });
  };
  for (let lng = -180; lng <= 180; lng += 30) {
    line(Array.from({ length: 13 }, (_, i) => [lng, -90 + i * 15]));
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    line(Array.from({ length: 25 }, (_, i) => [-180 + i * 15, lat]));
  }
  return { type: 'FeatureCollection', features };
}

const toggles = [
  { id: 'countries-fill', label: 'Countries' },
  { id: 'borders', label: 'Borders' },
  { id: 'graticule', label: 'Graticule' },
  { id: 'cities', label: 'Cities' },
];

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [15, 30],
    zoom: preview ? 0.6 : 1.3,
    interactive: !preview,
  });

  const setVisible = (id: string, visible: boolean): void => {
    if (!map.getLayer(id)) return;
    map.setLayoutProperty(id, 'visibility', visible ? 'visible' : 'none');
  };

  let timer = 0;
  map.on('load', () => {
    map.addSource('graticule', { type: 'geojson', data: graticule() });
    map.addSource('cities', { type: 'geojson', data: cityPoints() });
    // Added last, so both draw above the borders.
    map.addLayer({
      id: 'graticule',
      type: 'line',
      source: 'graticule',
      paint: { 'line-color': palette.blue, 'line-width': 1, 'line-opacity': 0.7 },
    });
    map.addLayer({
      id: 'cities',
      type: 'circle',
      source: 'cities',
      paint: {
        'circle-radius': 5,
        'circle-color': palette.accent,
        'circle-stroke-color': palette.text,
        'circle-stroke-width': 1.5,
      },
    });

    if (preview) {
      let step = 0;
      timer = window.setInterval(() => {
        step++;
        const t = toggles[step % toggles.length];
        if (!t) return;
        const vis = map.getLayoutProperty(t.id, 'visibility') !== 'none';
        setVisible(t.id, !vis);
      }, 900);
    }
  });

  if (!preview) {
    const bar = controlBar(el);
    const info = readout(el, 'Toggle layers, or move the graticule above or below the country fill.');
    for (const t of toggles) {
      const wrap = document.createElement('label');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = true;
      box.addEventListener('change', () => setVisible(t.id, box.checked));
      wrap.append(box, ` ${t.label}`);
      bar.append(wrap);
    }
    const order = controlBar(el);
    button(order, 'Graticule below countries', () => {
      map.moveLayer('graticule', 'countries-fill'); // before countries-fill: drawn under it
      info.textContent = 'moveLayer("graticule", "countries-fill"): the opaque fill now hides the lines';
    });
    button(order, 'Graticule on top', () => {
      map.moveLayer('graticule'); // no beforeId: moved to the top of the stack
      info.textContent = 'moveLayer("graticule"): drawn above every other layer';
    });
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
