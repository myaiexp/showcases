// Popup bringToFront and bringToBack: two popups that overlap in the same pane
import { LeafletMap, Popup } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both popups are added with addTo so they stay open together. The buttons reorder them.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const opts = { autoPan: false, closeButton: false, offset: [0, 0] as [number, number] };
  const red = new Popup([60.2, 24.84], { ...opts, className: 'red', content: 'Red popup<br>with two lines' }).addTo(map);
  const blue = new Popup([60.22, 24.96], { ...opts, className: 'blue', content: 'Blue popup<br>with two lines' }).addTo(map);

  const front = (p: Popup, name: string) => (): void => {
    p.bringToFront();
    stage.say(`${name}.bringToFront()`);
  };
  stage.button('red.bringToFront()', front(red, 'red'));
  stage.button('blue.bringToFront()', front(blue, 'blue'));
  stage.button('blue.bringToBack()', () => {
    blue.bringToBack();
    stage.say('blue.bringToBack()');
  });

  if (stage.preview) {
    stage.cycle(
      [
        { run: front(red, 'red') },
        { run: front(blue, 'blue') },
        { run: () => (red.bringToFront(), blue.bringToBack(), stage.say('blue.bringToBack(): red on top')) },
      ],
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
