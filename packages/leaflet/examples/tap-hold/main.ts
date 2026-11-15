// tapHold and tapTolerance: a long touch press fires contextmenu, if the finger stays put
import { LeafletMap, Popup, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'On a touch screen, press and hold for about 600 ms. A mouse right click fires contextmenu too. The buttons send a scripted long touch.',
  });
  const log = stage.log('Events');
  const map = stage.own(new LeafletMap(stage.box, { center: [60.17, 24.94], zoom: 6, tapHold: true, tapTolerance: 15, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const popup = new Popup({ closeButton: false });
  map.on('contextmenu', (e: LeafletPointerEvent) => {
    log(`contextmenu at ${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}`);
    popup.setLatLng(e.latlng).setContent('contextmenu fired here').openOn(map);
  });

  const g = ghost(map);
  stage.onDispose(() => g.remove());
  const gesture = gestures(stage, map, g);
  const at: [number, number] = [60.17, 24.94];
  const press = (ms: number, drift = 0): void => {
    popup.close();
    stage.say(`Touch held ${ms} ms${drift ? `, finger drifting ${drift} px` : ''}`);
    void gesture.touchHold(at, ms, drift);
  };

  stage.toggle('tapHold', true, (on) => {
    if (on) map.tapHold.enable();
    else map.tapHold.disable();
  });
  stage.slider('tapTolerance (px)', 0, 60, 5, 15, (v) => (map.options.tapTolerance = v));
  stage.button('Hold 300 ms (too short)', () => press(300));
  stage.button('Hold 900 ms', () => press(900));
  stage.button('Hold 900 ms, finger drifts 30 px', () => press(900, 30));

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => press(300), hold: 1600 },
        { run: () => press(900), hold: 2400 },
        { run: () => press(900, 40), hold: 2400 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
