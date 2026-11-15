// A LatLngBounds across the antimeridian needs corners outside -180 to 180, or it spans the other way
import { LatLng, LatLngBounds, LeafletMap, Marker, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both boxes are meant to cover 170°E to 170°W. Leaflet only takes the smaller and larger coordinate, so the corner at -170 gives the box that runs the long way round.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [0, 180], zoom: stage.preview ? 0 : 1, zoomControl: !stage.preview, worldCopyJump: true }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const right = new LatLngBounds([-12, 170], [12, 190]);
  const wrong = new LatLngBounds([-30, 170], [30, -170]);
  new Rectangle(right, { color: '#34d399', weight: 2, fillOpacity: 0.25 }).addTo(map);
  new Rectangle(wrong, { color: '#fb923c', weight: 2, dashArray: '6 4', fill: false }).addTo(map);

  const probes: [string, LatLng][] = [['0°, 180°', new LatLng(0, 180)], ['0°, 0°', new LatLng(0, 0)]];
  for (const [name, ll] of probes) new Marker(ll, { title: name }).addTo(map);
  const rows = probes.map(([name, ll]) => `${name}: green contains ${String(right.contains(ll))}, dashed contains ${String(wrong.contains(ll))}`);
  const pre = stage.side('contains()');
  if (pre) pre.textContent = [`green  [-12,170] to [12,190]\n  west ${right.getWest()}, east ${right.getEast()}`, `dashed [-30,170] to [30,-170]\n  west ${wrong.getWest()}, east ${wrong.getEast()}`, '', ...rows].join('\n');
  let i = 0;
  const show = (): void => stage.say(rows[i++ % rows.length] as string);
  show();
  stage.every(2000, show);
  return () => stage.dispose();
};

export default mount;
