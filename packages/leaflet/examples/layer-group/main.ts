// Four city markers in one LayerGroup, added to and removed from the map as one layer
import { LayerGroup, LeafletMap, type Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a marker for its popup. The group is one layer: adding or removing it moves all four markers.' });
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, zoomControl: !stage.preview }));
  baseTiles('light').addTo(map);

  const markers = cityMarkers();
  const denver = markers[1] as Marker;
  const cities = new LayerGroup(markers);
  cities.addTo(map);

  const toggle = (): void => {
    if (map.hasLayer(cities)) cities.remove();
    else cities.addTo(map);
    stage.say(map.hasLayer(cities) ? 'cities.addTo(map): four markers appear' : 'cities.remove(): four markers go');
  };
  stage.button('Add or remove the group', toggle);

  if (stage.preview) {
    stage.cycle([
      { say: 'cities.remove()', run: () => cities.remove(), hold: 1600 },
      { say: 'cities.addTo(map)', run: () => cities.addTo(map), hold: 1600 },
      { say: 'a marker of the group opens its popup', run: () => denver.openPopup(), hold: 1800 },
      { run: () => denver.closePopup(), hold: 300 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
