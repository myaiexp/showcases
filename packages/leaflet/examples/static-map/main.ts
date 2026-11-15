// A static map: every interaction option off at creation, still driven from code
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try dragging, scrolling, double clicking and pressing keys: nothing moves. The buttons call the API.' });
  const map = stage.own(
    new LeafletMap(stage.box, {
      center: [51.505, -0.09],
      zoom: 11,
      // Switch every way a user can move the map off.
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      pinchZoom: false,
      tapHold: false,
      zoomControl: false,
    }),
  );
  new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new Marker([51.5, -0.09]).addTo(map);

  stage.button('setView(Greenwich)', () => map.setView([51.4769, 0], 12));
  stage.button('setView(City of London)', () => map.setView([51.515, -0.09], 13));
  stage.button('Turn dragging on', () => {
    map.dragging.enable();
    stage.say('map.dragging.enable(): the map can be dragged now');
  });
  stage.button('Turn dragging off', () => {
    map.dragging.disable();
    stage.say('map.dragging.disable()');
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gesture = gestures(stage, map, g);
    stage.cycle(
      [
        { say: 'Drag: the map does not move', run: () => gesture.drag([51.5, -0.09], [-120, 40], 600), hold: 900 },
        { say: 'Double click: no zoom', run: () => gesture.dblclick([51.5, -0.09]), hold: 1400 },
        { say: 'Wheel: no zoom', run: () => gesture.wheel([51.5, -0.09], -240), hold: 1400 },
        { say: 'map.setView(...) from code still works', run: () => map.setView([51.4769, 0], 12), hold: 2000 },
        { run: () => map.setView([51.505, -0.09], 11), hold: 1600 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
