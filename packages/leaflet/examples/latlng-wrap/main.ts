// LatLng.wrap brings a longitude back into -180 to 180, keeping latitude and altitude
import { CircleMarker, LatLng, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The ring is the point at the slider longitude (it can be far outside the world); the marker is wrap() of it. Both are the same place.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [20, 0], zoom: stage.preview ? 0 : 1, zoomControl: !stage.preview, worldCopyJump: true }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const raw = new CircleMarker([30, 0], { radius: 9, color: '#fb923c', fill: false, weight: 3 }).addTo(map);
  const wrapped = new Marker([30, 0]).addTo(map);

  const set = (lng: number): void => {
    const ll = new LatLng(30, lng);
    raw.setLatLng(ll);
    wrapped.setLatLng(ll.wrap());
    stage.say(`new LatLng(30, ${lng}).wrap() → ${ll.wrap().toString()}`);
  };
  set(190);
  stage.slider('longitude', -540, 540, 10, 190, set);

  if (stage.preview) {
    const values = [190, 370, -200, 540, -350, 10];
    let i = 0;
    stage.every(1800, () => set(values[i++ % values.length] as number));
  }
  return () => stage.dispose();
};

export default mount;
