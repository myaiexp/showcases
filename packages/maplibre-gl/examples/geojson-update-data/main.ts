// Incremental edits to a GeoJSON source with updateData, by feature id
import { Map } from 'maplibre-gl';
import type { GeoJSONSource } from 'maplibre-gl';
import type { Feature, Point } from 'geojson';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { palette, seeded, worldStyle } from '../../shared/basemap.ts';

interface Mover {
  id: number;
  lng: number;
  lat: number;
  vx: number;
  vy: number;
}

const mount: Mount = (el, { preview }) => {
  const rand = seeded(7);
  let nextId = 1;
  const movers: Mover[] = [];

  // Fly-by points scattered over the Atlantic and Europe, each with its own velocity.
  const spawn = (): Mover => ({
    id: nextId++,
    lng: -40 + rand() * 80,
    lat: 15 + rand() * 50,
    vx: (rand() - 0.5) * 0.8,
    vy: (rand() - 0.5) * 0.5,
  });
  const asFeature = (m: Mover): Feature<Point> => ({
    type: 'Feature',
    id: m.id, // updateData needs an id on every feature (or a promoteId on the source)
    properties: { hue: m.id % 3 },
    geometry: { type: 'Point', coordinates: [m.lng, m.lat] },
  });
  for (let i = 0; i < 50; i++) movers.push(spawn());

  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [-5, 40],
    zoom: preview ? 0.9 : 1.8,
    interactive: !preview,
  });
  const info = preview ? null : readout(el);
  const showCount = (): void => {
    if (info) info.textContent = `${movers.length} features in the source`;
  };

  let source: GeoJSONSource | undefined;
  let timer = 0;
  let cycle = 0;
  let removed = false;
  // updateData returns a promise that can reject once the map is gone; swallow that.
  const send = (diff: Parameters<GeoJSONSource['updateData']>[0]): void => {
    if (removed) return;
    source?.updateData(diff).catch(() => {});
  };

  map.on('load', () => {
    map.addSource('movers', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: movers.map(asFeature) },
    });
    map.addLayer({
      id: 'movers',
      type: 'circle',
      source: 'movers',
      paint: {
        'circle-radius': 5,
        'circle-color': ['match', ['get', 'hue'], 0, palette.accent, 1, palette.blue, palette.green],
        'circle-stroke-color': palette.ocean,
        'circle-stroke-width': 1,
      },
    });
    source = map.getSource<GeoJSONSource>('movers') as GeoJSONSource;
    showCount();

    timer = window.setInterval(() => {
      for (const m of movers) {
        m.lng += m.vx;
        m.lat += m.vy;
        if (m.lng < -45 || m.lng > 45) m.vx = -m.vx;
        if (m.lat < 10 || m.lat > 70) m.vy = -m.vy;
      }
      // Only the geometry of each existing feature changes; nothing is re-sent that did not move.
      send({
        update: movers.map((m) => ({
          id: m.id,
          newGeometry: { type: 'Point', coordinates: [m.lng, m.lat] },
        })),
      });
    }, 100);

    // In a gallery card, add and remove features on a timer so the diffs are visible.
    if (preview) cycle = window.setInterval(() => (movers.length > 60 ? removeTen() : addTen()), 1200);
  });

  const addTen = (): void => {
    const fresh = Array.from({ length: 10 }, spawn);
    movers.push(...fresh);
    send({ add: fresh.map(asFeature) });
    showCount();
  };
  const removeTen = (): void => {
    const gone = movers.splice(0, 10).map((m) => m.id);
    send({ remove: gone });
    showCount();
  };
  const recolor = (): void => {
    send({
      update: movers.map((m) => ({
        id: m.id,
        addOrUpdateProperties: [{ key: 'hue', value: Math.floor(rand() * 3) }],
      })),
    });
  };

  if (!preview) {
    const bar = controlBar(el);
    button(bar, 'Add 10', addTen);
    button(bar, 'Remove 10 oldest', removeTen);
    button(bar, 'Recolour (update properties)', recolor);
    button(bar, 'Remove all', () => {
      movers.length = 0;
      send({ removeAll: true });
      showCount();
    });
  }

  return () => {
    removed = true;
    clearInterval(timer);
    clearInterval(cycle);
    map.remove();
  };
};

export default mount;
