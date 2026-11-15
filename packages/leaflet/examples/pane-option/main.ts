// The pane option moves a layer into another pane, here a big circle that covers the markers or sits under them
import { Circle, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const PANES = ['overlayPane', 'shadowPane', 'markerPane', 'tooltipPane', 'popupPane'] as const;
type PaneName = (typeof PANES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The circle is a vector layer. By default it sits in overlayPane, under the markers. Give it another pane and it moves.' });

  const map = stage.own(new LeafletMap(stage.box).setView([51.505, -0.09], 14));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);
  for (const ll of [[51.505, -0.09], [51.508, -0.085], [51.502, -0.095], [51.506, -0.1]] as [number, number][]) new Marker(ll).addTo(map);

  let circle: Circle | undefined;
  const use = (pane: PaneName): void => {
    circle?.remove();
    circle = new Circle([51.505, -0.092], { radius: 380, color: '#e8590c', fillOpacity: 0.55, pane }).addTo(map);
    stage.say(`new Circle(..., { pane: '${pane}' }): ${pane} is z-index ${getComputedStyle(map.getPane(pane)!).zIndex}`);
  };
  stage.own({ remove: () => circle?.remove() });
  stage.select('pane', PANES.map((p) => ({ value: p, label: p })), 'overlayPane', use);
  use('overlayPane');

  if (stage.preview) {
    let i = 0;
    stage.every(2200, () => use(i++ % 2 ? 'overlayPane' : 'markerPane'));
  }
  return () => stage.dispose();
};

export default mount;
