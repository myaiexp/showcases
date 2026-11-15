// LatLng.validate says whether a coordinate is accepted before a path is built from it
import { Circle, LatLng, LeafletMap, Polyline, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const INPUTS: { label: string; value: unknown }[] = [
  { label: '[48.8, 2.3]', value: [48.8, 2.3] },
  { label: "['50.1', '8.7'] (numeric strings)", value: ['50.1', '8.7'] },
  { label: '[null, 10]', value: [null, 10] },
  { label: "['north', 'east']", value: ['north', 'east'] },
  { label: '[NaN, 5]', value: [Number.NaN, 5] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each input is checked with LatLng.validate; the line below is built only from the ones that pass.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [49, 6], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const rows = INPUTS.map(({ label, value }) => {
    const [lat, lng] = value as [number, number];
    const ok = LatLng.validate(lat, lng);
    let result = 'accepted';
    try {
      new Polyline([value as LatLngExpression]);
    } catch (err) {
      result = `new Polyline throws: ${err instanceof Error ? err.message : String(err)}`;
    }
    return { label, ok, result, value };
  });
  const valid = rows.filter((r) => r.ok).map((r) => r.value as LatLngExpression);
  new Polyline([[44, 0], ...valid, [52, 14]], { color: '#34d399', weight: 4 }).addTo(map);

  const pre = stage.side('LatLng.validate');
  if (pre) pre.textContent = rows.map((r) => `${r.label}\n  validate: ${r.ok}\n  ${r.result}`).join('\n');

  let radiusError = '';
  try {
    // The Leaflet 1 form, with the radius as the second argument.
    new Circle([49, 6], 200_000 as never);
  } catch (err) {
    radiusError = err instanceof Error ? err.message : String(err);
  }
  if (pre) pre.textContent += `\n\nnew Circle(latlng, 200000)\n  ${radiusError}`;

  let i = 0;
  const show = (): void => {
    const r = rows[i++ % rows.length]!;
    stage.say(`${r.label}: validate ${r.ok}`);
  };
  show();
  if (stage.preview) {
    stage.every(1800, show);
  }
  return () => stage.dispose();
};

export default mount;
