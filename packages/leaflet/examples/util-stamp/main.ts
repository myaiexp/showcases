// Util.stamp gives any object a unique, permanent _leaflet_id
import { LayerGroup, LeafletMap, Marker, Util, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map to add a marker: its tooltip shows the id Util.stamp gave it. The ids are page-wide, so they start above 1.' });
  const log = stage.log('Util.stamp');
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 12], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const group = new LayerGroup().addTo(map);

  // A plain object that is not a Leaflet class: stamp works on any object.
  const note = { text: 'just an object' };

  const add = (latlng: LatLngExpression): void => {
    const marker = new Marker(latlng);
    // The first call assigns the id and stores it as marker._leaflet_id.
    const id = Util.stamp(marker);
    marker.bindTooltip(`id ${id}`, { permanent: true, direction: 'right' });
    group.addLayer(marker);
    const same = Util.stamp(marker) === id;
    log(`stamp(marker) = ${id}; again = ${Util.stamp(marker)} (${same ? 'same' : 'changed'}); group.getLayerId = ${group.getLayerId(marker)}`);
    stage.say(`stamp(marker) = ${id}, stamp(note) = ${Util.stamp(note)}`);
  };
  map.on('click', (e) => add(e.latlng));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const spots: [number, number][] = [[52, 5], [45, 10], [50, 20], [42, 24], [55, 14]];
    let i = 0;
    stage.cycle(
      [
        {
          run: () => {
            if (i >= spots.length) {
              group.clearLayers();
              i = 0;
              return;
            }
            const at = spots[i++] as [number, number];
            g.click(at);
          },
          hold: 1500,
        },
      ],
      1500,
    );
  } else {
    stage.say(`note is a plain object: stamp(note) = ${Util.stamp(note)}, note._leaflet_id = ${(note as { _leaflet_id?: number })._leaflet_id}`);
  }
  return () => stage.dispose();
};

export default mount;
