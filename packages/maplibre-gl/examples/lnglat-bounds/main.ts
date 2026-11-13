// LngLatBounds grown by clicks, drawn as a polygon, with a contains check
import { Map, LngLatBounds } from 'maplibre-gl';
import type { GeoJSONSource, LngLatLike } from 'maplibre-gl';
import type { FeatureCollection, Feature, Polygon } from 'geojson';
import type { Mount } from '@/types.ts';
import { mapContainer, controlBar, button, readout } from '../../shared/setup.ts';
import { worldStyle, palette, seeded } from '../../shared/basemap.ts';

const empty: FeatureCollection = { type: 'FeatureCollection', features: [] };

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 30],
    zoom: preview ? 0.7 : 1.4,
    interactive: !preview,
  });

  // Starts empty: extend() grows it to cover every point added.
  let bounds = new LngLatBounds();
  const points: [number, number][] = [];
  const out = preview ? undefined : readout(el, 'Click the map to add points.');

  /** Pushes the points and the bounds polygon into their sources. */
  const draw = (): void => {
    map.getSource<GeoJSONSource>('points')?.setData({
      type: 'FeatureCollection',
      features: points.map((c) => ({ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: c } })),
    });
    const box: Feature<Polygon> | FeatureCollection = bounds.isEmpty()
      ? empty
      : {
          type: 'Feature' as const,
          properties: {},
          geometry: {
            type: 'Polygon' as const,
            coordinates: [
              [
                bounds.getSouthWest().toArray(),
                bounds.getNorthWest().toArray(),
                bounds.getNorthEast().toArray(),
                bounds.getSouthEast().toArray(),
                bounds.getSouthWest().toArray(),
              ],
            ],
          },
        };
    map.getSource<GeoJSONSource>('bounds')?.setData(box);
  };

  const add = (c: [number, number]): void => {
    points.push(c);
    bounds.extend(c);
    draw();
  };

  let timer = 0;
  map.on('load', () => {
    map.addSource('bounds', { type: 'geojson', data: empty });
    map.addSource('points', { type: 'geojson', data: empty });
    map.addLayer({ id: 'bounds-fill', type: 'fill', source: 'bounds', paint: { 'fill-color': palette.accent, 'fill-opacity': 0.25 } });
    map.addLayer({ id: 'bounds-line', type: 'line', source: 'bounds', paint: { 'line-color': palette.accent, 'line-width': 2 } });
    map.addLayer({ id: 'points', type: 'circle', source: 'points', paint: { 'circle-radius': 5, 'circle-color': palette.text } });

    if (preview) {
      const rand = seeded(7);
      timer = window.setInterval(() => {
        if (points.length >= 6) {
          points.length = 0;
          bounds = new LngLatBounds();
          draw();
        } else {
          add([-120 + rand() * 240, -50 + rand() * 100]);
        }
      }, 900);
      return;
    }

    map.on('click', (e) => add(e.lngLat.toArray()));
    map.on('mousemove', (e) => {
      if (bounds.isEmpty()) return;
      const inside = bounds.contains(e.lngLat as LngLatLike);
      const c = bounds.getCenter();
      out!.textContent = `pointer ${inside ? 'inside' : 'outside'} bounds | centre ${c.lng.toFixed(1)}, ${c.lat.toFixed(1)} | ${bounds.toString()}`;
    });
  });

  if (!preview) {
    button(controlBar(el), 'Clear', () => {
      points.length = 0;
      bounds = new LngLatBounds();
      draw();
      if (out) out.textContent = 'Click the map to add points.';
    });
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
