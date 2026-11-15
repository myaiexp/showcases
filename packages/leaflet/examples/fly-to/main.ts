// flyTo: a smooth zoom-out, pan and zoom-in between far apart cities
import { LeafletMap, Marker, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const CITIES: Record<string, { at: LatLngExpression; zoom: number }> = {
  London: { at: [51.505, -0.09], zoom: 9 },
  Tokyo: { at: [35.68, 139.69], zoom: 9 },
  Sydney: { at: [-33.87, 151.21], zoom: 10 },
  'Rio de Janeiro': { at: [-22.9, -43.2], zoom: 9 },
  Nairobi: { at: [-1.29, 36.82], zoom: 9 },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button calls flyTo. Duration 0 lets Leaflet pick a time from the distance.' });
  const map = stage.own(new LeafletMap(stage.box, { center: CITIES['London']!.at, zoom: 9 }));
  new LocalTileLayer('https://tiles.example/terrain/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  for (const city of Object.values(CITIES)) new Marker(city.at).addTo(map);

  let duration = 0;
  let frames = 0;
  let started = 0;
  map.on('movestart', () => {
    frames = 0;
    started = performance.now();
  });
  // flyTo marks each of its animation frames with `flyTo: true` on the move event.
  map.on('move', (e) => {
    if (e.flyTo) frames++;
  });
  map.on('moveend', () => {
    if (frames) stage.say(`Flight took ${Math.round(performance.now() - started)} ms over ${frames} frames, ending at zoom ${map.getZoom()}`);
  });

  const fly = (name: string): void => {
    const city = CITIES[name]!;
    map.flyTo(city.at, city.zoom, duration ? { duration } : {});
  };
  for (const name of Object.keys(CITIES)) stage.button(name, () => fly(name));
  stage.slider('Duration (s)', 0, 8, 0.5, duration, (v) => (duration = v));

  if (stage.preview) {
    duration = 2.5;
    const names = ['Tokyo', 'Sydney', 'Rio de Janeiro', 'London'];
    stage.cycle(
      names.map((name) => ({ say: `map.flyTo(${name}, ${CITIES[name]!.zoom})`, run: () => fly(name), hold: 3600 })),
    );
  }
  return () => stage.dispose();
};

export default mount;
