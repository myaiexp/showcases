// Keyboard navigation: keyboardPanDelta, Shift for 3x, +/- for zoom and rebinding KeyboardHandler.keys
import { KeyboardHandler, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map to focus it, then use the arrow keys (Shift for 3x) and + / -. The map container is focusable with Tab.' });
  const log = stage.log('Events');
  const map = stage.own(new LeafletMap(stage.box, { center: [48.857, 2.352], zoom: 7, keyboard: true, keyboardPanDelta: 80, zoomControl: false }));
  new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new Marker([48.857, 2.352]).addTo(map);

  map.on('focus', () => log('focus: keys now go to the map'));
  map.on('blur', () => log('blur'));
  map.on('keydown', (e) => log(`keydown ${e.originalEvent.key}`));

  stage.slider('keyboardPanDelta (px)', 20, 240, 20, 80, (v) => (map.options.keyboardPanDelta = v));
  stage.toggle('WASD instead of arrows', false, (on) => {
    // keys is static, so it is shared by every map on the page: put it back when the example goes.
    KeyboardHandler.keys.left = on ? ['a'] : ['ArrowLeft'];
    KeyboardHandler.keys.right = on ? ['d'] : ['ArrowRight'];
    KeyboardHandler.keys.up = on ? ['w'] : ['ArrowUp'];
    KeyboardHandler.keys.down = on ? ['s'] : ['ArrowDown'];
    stage.say(on ? 'KeyboardHandler.keys: W A S D pan the map' : 'KeyboardHandler.keys: arrow keys again');
  });
  stage.onDispose(() => {
    KeyboardHandler.keys.left = ['ArrowLeft'];
    KeyboardHandler.keys.right = ['ArrowRight'];
    KeyboardHandler.keys.up = ['ArrowUp'];
    KeyboardHandler.keys.down = ['ArrowDown'];
  });
  stage.toggle('keyboard', true, (on) => {
    if (on) map.keyboard.enable();
    else map.keyboard.disable();
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gesture = gestures(stage, map, g);
    stage.cycle(
      [
        { say: 'ArrowRight: pan by keyboardPanDelta (80 px)', run: () => gesture.key('ArrowRight'), hold: 1300 },
        { say: 'ArrowDown', run: () => gesture.key('ArrowDown'), hold: 1300 },
        { say: 'Shift + ArrowLeft: 3 x 80 px', run: () => gesture.key('ArrowLeft', true), hold: 1500 },
        { say: '+ zooms in by zoomDelta', run: () => gesture.key('+'), hold: 1500 },
        { say: '- zooms out', run: () => gesture.key('-'), hold: 1500 },
        { say: 'ArrowUp', run: () => gesture.key('ArrowUp'), hold: 1300 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
