// The layers tutorial's control: two base layers as radio buttons, the cities as a checkbox
import { LayerGroup, LayersControl, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER, pressEntry } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover or tap the layers icon. Radio buttons switch the base layer; the checkbox shows or hides the cities.' });

  const cities = new LayerGroup(cityMarkers());
  const light = baseTiles('light');
  const terrain = baseTiles('terrain');

  // Only one base layer goes on the map; the control lists them all.
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, layers: [light, cities], zoomControl: !stage.preview }));

  const baseMaps = {
    Streets: light,
    Terrain: terrain,
  };
  const overlayMaps = {
    Cities: cities,
  };
  // A card can't hover, so it keeps the control open.
  new LayersControl(baseMaps, overlayMaps, { collapsed: stage.preview }).addTo(map);

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'Terrain radio button: base layer switches', run: () => pressEntry(map, 'Terrain') },
        { say: 'Cities checkbox off: markers hidden', run: () => pressEntry(map, 'Cities') },
        { say: 'Streets radio button back', run: () => pressEntry(map, 'Streets') },
        { say: 'Cities checkbox on', run: () => pressEntry(map, 'Cities') },
      ],
      2000,
    );
  }
  return () => stage.dispose();
};

export default mount;
