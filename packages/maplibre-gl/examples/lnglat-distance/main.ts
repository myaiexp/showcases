// LngLat.distanceTo between two draggable markers, with a line drawn between them
import { Map, Marker, LngLat } from 'maplibre-gl';
import type { GeoJSONSource } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, readout } from '../../shared/setup.ts';
import { worldStyle, cities, palette } from '../../shared/basemap.ts';

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 35],
    zoom: preview ? 0.7 : 1.5,
    interactive: !preview,
  });

  const a = new Marker({ draggable: !preview, color: palette.red })
    .setLngLat(cities.helsinki)
    .addTo(map);
  const b = new Marker({ draggable: !preview, color: palette.purple })
    .setLngLat(cities.capeTown)
    .addTo(map);

  const out = preview ? undefined : readout(el, 'Drag either marker.');

  /** Redraws the line and reports the distance between the markers. */
  const update = (): void => {
    const from: LngLat = a.getLngLat();
    const to: LngLat = b.getLngLat();
    const source = map.getSource<GeoJSONSource>('link');
    source?.setData({
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates: [from.toArray(), to.toArray()] },
    });
    // distanceTo returns metres along a great circle.
    const metres = from.distanceTo(to);
    if (out) out.textContent = `${Math.round(metres / 1000).toLocaleString('en')} km between ${from.toString()} and ${to.toString()}`;
  };

  let frame = 0;
  map.on('load', () => {
    map.addSource('link', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    map.addLayer({
      id: 'link',
      type: 'line',
      source: 'link',
      paint: { 'line-color': palette.text, 'line-width': 2, 'line-dasharray': [2, 2] },
    });
    update();
    a.on('drag', update);
    b.on('drag', update);
    if (preview) {
      let t = 0;
      const tick = (): void => {
        t += 1;
        b.setLngLat([18 + 100 * Math.sin(t / 120), -34 + 70 * Math.sin(t / 150) ** 2]);
        update();
        frame = requestAnimationFrame(tick);
      };
      tick();
    }
  });

  return () => {
    cancelAnimationFrame(frame);
    a.remove();
    b.remove();
    map.remove();
  };
};

export default mount;
