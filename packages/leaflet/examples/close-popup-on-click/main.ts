// closePopupOnClick: whether a click on the map closes open popups, and a per-popup override
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open a popup, then click an empty part of the map. The option is read when a popup opens.' });
  const log = stage.log('Events');
  const map = stage.own(new LeafletMap(stage.box, { center: [60.17, 24.94], zoom: 6, closePopupOnClick: true, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const helsinki = new Marker([60.17, 24.94]).addTo(map).bindPopup('Helsinki: follows the map option');
  // closeOnClick on the popup itself wins over the map's option.
  const tallinn = new Marker([59.44, 24.75]).addTo(map).bindPopup('Tallinn: closeOnClick is false', { closeOnClick: false });
  map.on('popupopen', () => log('popupopen'));
  map.on('popupclose', () => log('popupclose'));

  stage.toggle('closePopupOnClick', true, (on) => {
    map.options.closePopupOnClick = on;
    map.closePopup();
    stage.say(`closePopupOnClick = ${on}: open the popup again for it to apply`);
  });
  stage.button('Open Helsinki popup', () => helsinki.openPopup());
  stage.button('Open Tallinn popup', () => tallinn.openPopup());

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    // Not used for its gestures: it stops the ghost's clicks bubbling out to the card's link.
    gestures(stage, map, g);
    const empty: [number, number] = [62.2, 22];
    // Popups only listen for a map click once they are open, so reopen after changing the option.
    stage.cycle(
      [
        { say: 'closePopupOnClick: true. Open the popup', run: () => g.click([60.17, 24.94], helsinki.getElement()), hold: 1500 },
        { say: 'A click on the map closes it', run: () => g.click(empty), hold: 1600 },
        {
          say: 'closePopupOnClick: false, open the popup again',
          run: () => {
            map.options.closePopupOnClick = false;
            g.click([60.17, 24.94], helsinki.getElement());
          },
          hold: 1500,
        },
        { say: 'A click on the map leaves it open', run: () => g.click(empty), hold: 1800 },
        {
          run: () => {
            map.options.closePopupOnClick = true;
            map.closePopup();
          },
          hold: 400,
        },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
