// queryRenderedFeatures under the pointer, or under a sweeping point in previews
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, readout } from '../../shared/setup.ts';
import { palette, worldStyle } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 25],
    zoom: preview ? 0.9 : 1.4,
    interactive: !preview,
  });
  const info = preview ? null : readout(el, 'Move the pointer over a country, or click one.');

  let current: string | null = null;
  const highlight = (name: string | null): void => {
    if (name === current) return;
    current = name;
    map.setFilter('highlight', ['==', ['get', 'name'], name ?? '']);
  };

  map.on('load', () => {
    map.addLayer({
      id: 'highlight',
      type: 'fill',
      source: 'countries',
      filter: ['==', ['get', 'name'], ''],
      paint: { 'fill-color': palette.accent, 'fill-opacity': 0.8 },
    });
    map.addSource('probe', {
      type: 'geojson',
      data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [0, 0] } },
    });
    map.addLayer({
      id: 'probe',
      type: 'circle',
      source: 'probe',
      paint: { 'circle-radius': 5, 'circle-color': palette.text, 'circle-stroke-color': '#000', 'circle-stroke-width': 1 },
    });
  });

  let frame = 0;
  if (preview) {
    const sweep = (t: number): void => {
      if (map.getLayer('probe')) {
        const lng = -150 + ((t / 40) % 300);
        const lat = 30 + Math.sin(t / 900) * 25;
        const source = map.getSource('probe');
        if (source && 'setData' in source) {
          (source as { setData(d: unknown): void }).setData({
            type: 'Feature',
            properties: {},
            geometry: { type: 'Point', coordinates: [lng, lat] },
          });
        }
        // Project the geographic point to a pixel and query the rendered features there.
        const hit = map.queryRenderedFeatures(map.project([lng, lat]), { layers: ['countries-fill'] });
        highlight(hit[0] ? String(hit[0].properties.name) : null);
      }
      frame = requestAnimationFrame(sweep);
    };
    map.once('load', () => {
      frame = requestAnimationFrame(sweep);
    });
  } else {
    map.on('load', () => {
      map.on('mousemove', (e) => {
        const hit = map.queryRenderedFeatures(e.point, { layers: ['countries-fill'] });
        const name = hit[0] ? String(hit[0].properties.name) : null;
        highlight(name);
        map.getCanvas().style.cursor = name ? 'pointer' : '';
        if (info) info.textContent = name ? `Under the pointer: ${name}` : 'Under the pointer: open ocean';
      });
      // A layer event delivers the features under the pointer as e.features.
      map.on('click', 'countries-fill', (e) => {
        const f = e.features?.[0];
        if (info && f) info.textContent = `Clicked: ${String(f.properties.name)} (id ${String(f.id)})`;
      });
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
