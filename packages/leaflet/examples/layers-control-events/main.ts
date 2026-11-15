// The map fires baselayerchange, overlayadd and overlayremove when the control changes a layer
import { LayerGroup, LayersControl, LeafletMap, type LayersControlEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER, parkMarkers, pressEntry } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Use the control. Each switch logs the event with the entry\'s name.' });
  const log = stage.log('Map events', 10);
  const cities = new LayerGroup(cityMarkers());
  const parks = new LayerGroup(parkMarkers());
  const light = baseTiles('light');
  const terrain = baseTiles('terrain');
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, layers: [light, cities], zoomControl: !stage.preview }));
  new LayersControl({ Streets: light, Terrain: terrain }, { Cities: cities, Parks: parks }, { collapsed: false }).addTo(map);

  for (const type of ['baselayerchange', 'overlayadd', 'overlayremove'] as const) {
    map.on(type, (e: LayersControlEvent) => log(`${type.padEnd(15)} name: ${e.name}`));
  }

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => pressEntry(map, 'Terrain') },
        { run: () => pressEntry(map, 'Parks') },
        { run: () => pressEntry(map, 'Cities') },
        { run: () => pressEntry(map, 'Streets') },
        { run: () => pressEntry(map, 'Parks') },
        { run: () => pressEntry(map, 'Cities') },
      ],
      1500,
    );
  }
  return () => stage.dispose();
};

export default mount;
