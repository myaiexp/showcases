// LatLng.toBounds(sizeInMeters): a square around a point, wider in degrees of longitude further north
import { LatLng, LeafletMap, Marker, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The bounds are sizeInMeters / 2 from the point in every direction. Longitude degrees get shorter away from the equator, so the box takes more degrees of longitude there.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [40, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const SIZE = 600_000;
  const cities: [number, number][] = [[5, 10], [40, 10], [65, 10]];
  const boxes = cities.map((c) => {
    new Marker(c).addTo(map);
    const b = new LatLng(c).toBounds(SIZE);
    new Rectangle(b, { color: '#60a5fa', weight: 2, fillOpacity: 0.15 }).addTo(map);
    return { c, b };
  });
  const pre = stage.side(`toBounds(${SIZE})`);
  const text = boxes.map(({ c, b }) => `at lat ${c[0]}\n  lat span ${(b.getNorth() - b.getSouth()).toFixed(2)}°\n  lng span ${(b.getEast() - b.getWest()).toFixed(2)}°`);
  if (pre) pre.textContent = text.join('\n');

  let i = 0;
  stage.every(2200, () => {
    const k = i++ % boxes.length;
    const b = (boxes[k] as (typeof boxes)[number]).b;
    map.flyToBounds(b.pad(0.8), { duration: 1.2 });
    stage.say(`${SIZE / 1000} km box at lat ${(boxes[k] as (typeof boxes)[number]).c[0]}: ${(b.getEast() - b.getWest()).toFixed(2)}° wide, ${(b.getNorth() - b.getSouth()).toFixed(2)}° high`);
  });
  stage.say(text[1]?.replace(/\n\s*/g, ' ') ?? '');
  return () => stage.dispose();
};

export default mount;
