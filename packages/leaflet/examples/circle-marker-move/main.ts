// CircleMarker.setLatLng moves the marker and fires move with old and new positions
import { CircleMarker, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const CITIES: [string, [number, number]][] = [
  ['Lisbon', [38.72, -9.14]],
  ['Paris', [48.85, 2.35]],
  ['Berlin', [52.52, 13.4]],
  ['Rome', [41.9, 12.5]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button calls setLatLng; the move event reports where the marker came from.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [46, 5], zoom: stage.preview ? 3 : 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const dot = new CircleMarker(CITIES[0]![1], { radius: 12, color: '#f472b6', fillOpacity: 0.7 }).addTo(map);
  const log = stage.log('move events', 8);
  dot.on('move', (e) => {
    log(`move: ${e.oldLatLng.lat.toFixed(1)}, ${e.oldLatLng.lng.toFixed(1)} -> ${e.latlng.lat.toFixed(1)}, ${e.latlng.lng.toFixed(1)}`);
  });

  for (const [name, at] of CITIES) stage.button(name, () => dot.setLatLng(at));
  let i = 0;
  if (stage.preview) {
    stage.every(1500, () => dot.setLatLng(CITIES[++i % CITIES.length]![1]));
  }
  return () => stage.dispose();
};

export default mount;
