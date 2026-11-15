// addBaseLayer, addOverlay and removeLayer change a layers control that is already on the map
import { LayerGroup, LayersControl, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER, parkMarkers, pressEntry } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The control starts with one base layer and one overlay. The buttons add and remove entries.' });
  const cities = new LayerGroup(cityMarkers());
  const parks = new LayerGroup(parkMarkers());
  const light = baseTiles('light');
  const night = baseTiles('night');

  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, layers: [light, cities], zoomControl: !stage.preview }));
  const control = new LayersControl({ Streets: light }, { Cities: cities }, { collapsed: false }).addTo(map);

  const actions = {
    addBase: () => (control.addBaseLayer(night, 'Night'), stage.say('control.addBaseLayer(night, "Night")')),
    addParks: () => (control.addOverlay(parks, 'Parks'), stage.say('control.addOverlay(parks, "Parks")')),
    removeBase: () => (control.removeLayer(night), stage.say('control.removeLayer(night): the entry goes, the layer stays where it is')),
    removeParks: () => (control.removeLayer(parks), stage.say('control.removeLayer(parks)')),
  };
  stage.button('addBaseLayer(Night)', actions.addBase);
  stage.button('addOverlay(Parks)', actions.addParks);
  stage.button('removeLayer(Night)', actions.removeBase);
  stage.button('removeLayer(Parks)', actions.removeParks);

  if (stage.preview) {
    stage.cycle(
      [
        { run: actions.addBase },
        { say: 'Night radio button', run: () => pressEntry(map, 'Night') },
        { say: 'Streets radio button', run: () => pressEntry(map, 'Streets') },
        { run: actions.addParks },
        { say: 'Parks checkbox on', run: () => pressEntry(map, 'Parks') },
        { run: actions.removeParks },
        { say: 'The parks stay on the map: removeLayer drops only the entry', run: () => undefined },
        { run: () => (parks.remove(), actions.removeBase()) },
      ],
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
