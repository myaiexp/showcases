// The forms a LatLng accepts (array, object, lon, altitude, strings), plus clone and toString
import { LatLng, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const FORMS: { code: string; make: () => LatLng }[] = [
  { code: 'new LatLng(60.1699, 24.9384)', make: () => new LatLng(60.1699, 24.9384) },
  { code: 'new LatLng(60.1699, 24.9384, 26)', make: () => new LatLng(60.1699, 24.9384, 26) },
  { code: 'new LatLng([60.1699, 24.9384])', make: () => new LatLng([60.1699, 24.9384]) },
  { code: 'new LatLng([60.1699, 24.9384, 26])', make: () => new LatLng([60.1699, 24.9384, 26]) },
  { code: 'new LatLng({lat: 60.1699, lng: 24.9384})', make: () => new LatLng({ lat: 60.1699, lng: 24.9384 }) },
  { code: 'new LatLng({lat: 60.1699, lon: 24.9384})', make: () => new LatLng({ lat: 60.1699, lon: 24.9384 }) },
  { code: "new LatLng('60.1699', '24.9384')", make: () => new LatLng('60.1699' as unknown as number, '24.9384' as unknown as number) },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every form builds the same point. Anywhere Leaflet takes a LatLngExpression, these work too: map.panTo([60, 25]) and map.panTo({lat: 60, lng: 25}) are the same call.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.1699, 24.9384], zoom: 6, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const marker = new Marker([60.1699, 24.9384]).addTo(map);

  const pre = stage.side('LatLng forms');
  const lines = FORMS.map((f) => {
    const ll = f.make();
    return `${f.code}\n  → ${ll.toString()}${ll.alt === undefined ? '' : `, alt ${ll.alt}`}`;
  });
  const base = new LatLng([60.1699, 24.9384, 26]);
  const extra = [
    `clone() of the last point\n  → ${base.clone().toString()}, alt ${base.clone().alt}`,
    `toString(2)\n  → ${base.toString(2)}`,
    `toString(0)\n  → ${base.toString(0)}`,
  ];
  if (pre) pre.textContent = [...lines, ...extra].join('\n');

  let i = 0;
  const show = (): void => {
    const f = FORMS[i++ % FORMS.length] as (typeof FORMS)[number];
    const ll = f.make();
    marker.setLatLng(ll);
    stage.say(`${f.code} → ${ll.toString()}`);
  };
  show();
  stage.every(1900, show);
  return () => stage.dispose();
};

export default mount;
