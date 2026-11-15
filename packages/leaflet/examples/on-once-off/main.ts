// Evented methods on a map: on, once, off and listens for the click event
import { LeafletMap, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or remove the two listeners, then click the map and read the log.' });
  const log = stage.log('Log', 12);

  const map = stage.own(new LeafletMap(stage.box).setView([60.17, 24.94], 10));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const every = (e: LeafletPointerEvent): void => log(`  every ran at lat ${e.latlng.lat.toFixed(2)}`);
  const single = (e: LeafletPointerEvent): void => log(`  single ran at lat ${e.latlng.lat.toFixed(2)}, then Leaflet removed it`);
  const state = (): string => `listens: every=${map.listens('click', every)} once=${map.listens('click', single)} any=${map.listens('click')}`;

  // A plain DOM listener marks each click, so a click nobody listens to still shows in the log.
  map.getContainer().addEventListener('click', () => log('click'), { signal: stage.signal, capture: true });
  const actions = {
    on: () => {
      map.on('click', every);
      log(`map.on('click', every) | ${state()}`);
    },
    once: () => {
      map.once('click', single);
      log(`map.once('click', single) | ${state()}`);
    },
    off: () => {
      map.off('click', every);
      map.off('click', single);
      log(`map.off('click', ...) | ${state()}`);
    },
  };
  stage.button("on('click', every)", actions.on);
  stage.button("once('click', single)", actions.once);
  stage.button('off both', actions.off);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const click = (lat: number): void => g.click([lat, 24.94 + (lat - 60.17) * 2]);
    stage.cycle(
      [
        { run: actions.on },
        { run: actions.once },
        { run: () => click(60.2) },
        { run: () => click(60.12) },
        { run: actions.off },
        { run: () => click(60.22) },
      ],
      1500,
    );
  }
  return () => stage.dispose();
};

export default mount;
