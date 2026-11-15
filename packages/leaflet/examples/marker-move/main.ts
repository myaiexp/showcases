// Moving a marker: setLatLng jumps, a timer makes it glide
import { LatLng, LeafletMap, Marker, Polyline, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const ROUTE: [number, number][] = [
  [51.5, -0.12],
  [51.52, -0.07],
  [51.49, -0.03],
  [51.48, -0.1],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map to send the marker there. setLatLng() only jumps; the glide is a timer calling it in small steps.' });
  const log = stage.log('move events');
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.075], zoom: 11, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker(ROUTE[0]!, { title: 'Moving' }).addTo(map);
  const trail = new Polyline([marker.getLatLng()], { color: '#f58a3d', weight: 3 }).addTo(map);

  // `move` carries the previous position as oldLatLng, and the new one as latlng.
  let moves = 0;
  marker.on('move', (e) => {
    moves++;
    trail.addLatLng(e.latlng);
    if (moves % 400 === 0) trail.setLatLngs([e.latlng]);
    if (moves % 10 === 1) log(`move: ${e.oldLatLng.toString()} -> ${e.latlng.toString()}`);
  });

  let tween: ReturnType<typeof setInterval> | undefined;
  const glideTo = (to: LatLng, steps = 40): Promise<void> =>
    new Promise((resolve) => {
      clearInterval(tween);
      const from = marker.getLatLng();
      let i = 0;
      tween = setInterval(() => {
        i++;
        marker.setLatLng([from.lat + ((to.lat - from.lat) * i) / steps, from.lng + ((to.lng - from.lng) * i) / steps]);
        if (i >= steps) {
          clearInterval(tween);
          resolve();
        }
      }, 25);
    });
  stage.onDispose(() => clearInterval(tween));

  map.on('click', (e: LeafletPointerEvent) => void glideTo(e.latlng));
  stage.button('Jump to the start', () => {
    clearInterval(tween);
    trail.setLatLngs([]);
    marker.setLatLng(ROUTE[0]!);
  });

  if (stage.preview) {
    let i = 0;
    stage.cycle([{ say: 'setLatLng() on every step', run: () => glideTo(new LatLng(...ROUTE[++i % ROUTE.length]!)), hold: 400 }], 400);
  }
  return () => stage.dispose();
};

export default mount;
