// bindTooltip on markers: a small label that shows while the pointer is over the layer
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const PLACES: [string, [number, number]][] = [
  ['Helsinki', [60.17, 24.94]],
  ['Tallinn', [59.44, 24.75]],
  ['Turku', [60.45, 22.27]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a marker for its tooltip. Tab to a marker and the tooltip opens too; a tap or click opens it on touch screens.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.0, 24.0], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const markers = PLACES.map(([name, at]) => new Marker(at, { title: name }).addTo(map).bindTooltip(name));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const steps = markers.flatMap((m) => [
      { run: () => g.over(m.getLatLng(), m.getElement()), hold: 1400 },
      { run: () => g.out(m.getElement()), hold: 400 },
    ]);
    stage.cycle(steps, 900);
  }
  return () => stage.dispose();
};

export default mount;
