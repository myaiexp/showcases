// LatLng.distanceTo: the great-circle distance of each leg of a route, and the total
import { LatLng, LeafletMap, Marker, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const STOPS: [string, [number, number]][] = [
  ['Lisbon', [38.72, -9.14]],
  ['Madrid', [40.42, -3.7]],
  ['Paris', [48.86, 2.35]],
  ['Berlin', [52.52, 13.4]],
  ['Warsaw', [52.23, 21.01]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'distanceTo uses the Haversine formula on a sphere of radius 6371000 m, so the legs follow the curve of the Earth, not the straight lines drawn on the Mercator map.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [47, 7], zoom: stage.preview ? 3 : 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new Polyline(STOPS.map(([, ll]) => ll), { color: '#60a5fa', weight: 3 }).addTo(map);
  for (const [name, ll] of STOPS) new Marker(ll, { title: name }).addTo(map);

  const legs = STOPS.slice(1).map(([name, ll], i) => {
    const [from, a] = STOPS[i] as [string, [number, number]];
    const km = new LatLng(a).distanceTo(ll) / 1000;
    return { text: `${from} to ${name}: ${km.toFixed(0)} km`, km };
  });
  const total = legs.reduce((s, l) => s + l.km, 0);
  const pre = stage.side('new LatLng(a).distanceTo(b)');
  if (pre) pre.textContent = [...legs.map((l) => l.text), '', `route: ${total.toFixed(0)} km`].join('\n');

  let i = 0;
  stage.every(1700, () => {
    const leg = legs[i++ % (legs.length + 1)];
    stage.say(leg ? `${leg.text} (distanceTo)` : `route: ${total.toFixed(0)} km`);
  });
  stage.say(legs[0]?.text ?? '');
  return () => stage.dispose();
};

export default mount;
