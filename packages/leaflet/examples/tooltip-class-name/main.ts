// Tooltip className: a custom class on the tooltip, here a pill-shaped label with no arrow
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const PLACES: [string, string, [number, number]][] = [
  ['Helsinki', 'pill', [60.17, 24.94]],
  ['Tallinn', 'pill', [59.44, 24.75]],
  ['Turku', 'plain', [60.45, 22.27]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'className adds a class next to leaflet-tooltip. "pill" restyles it; "plain" has no arrow and no box.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.0, 24.0], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  for (const [name, className, at] of PLACES) {
    new Marker(at, { title: name }).addTo(map).bindTooltip(name, { permanent: true, direction: 'right', className });
  }
  stage.say('className: "pill" and "plain"');
  return () => stage.dispose();
};

export default mount;
