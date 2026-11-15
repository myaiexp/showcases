// Tooltip permanent: labels that stay open, against tooltips that open on hover
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const PLACES: [string, [number, number]][] = [
  ['Helsinki', [60.17, 24.94]],
  ['Tallinn', [59.44, 24.75]],
  ['Turku', [60.45, 22.27]],
  ['Tampere', [61.5, 23.76]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle permanent: bindTooltip is called again with the new option, and the tooltips stay open or go back to hover.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.4, 24.0], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const markers = PLACES.map(([name, at]) => new Marker(at, { title: name }).addTo(map));
  const setPermanent = (permanent: boolean): void => {
    // Binding again replaces the tooltip; a permanent one opens as soon as it is bound.
    PLACES.forEach(([name], i) => markers[i]?.bindTooltip(name, { permanent, direction: 'right' }));
    stage.say(`permanent: ${permanent}`);
  };
  setPermanent(true);
  stage.toggle('permanent', true, setPermanent);

  if (stage.preview) {
    let on = true;
    stage.every(2600, () => setPermanent((on = !on)));
  }
  return () => stage.dispose();
};

export default mount;
