// whenReady waits for the map's first view: it runs on the load event, or at once if already loaded
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The map starts without a view. Register callbacks, then give it one with setView and see when each runs.' });
  const log = stage.log('Order of events', 12);

  let map: LeafletMap | undefined;
  stage.own({ remove: () => map?.remove() });

  let step = 0;
  const create = (): void => {
    map?.remove();
    map = new LeafletMap(stage.box);
    new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
    map.on('load', () => log('load event fired'));
    log('new LeafletMap(...): no view yet');
  };
  const ready = (): void => {
    const n = ++step;
    log(`whenReady #${n} registered`);
    map?.whenReady(() => log(`  whenReady #${n} callback ran`));
  };
  const view = (): void => {
    log('setView([35.68, 139.69], 9)');
    map?.setView([35.68, 139.69], 9, { animate: false });
  };
  const reset = (): void => {
    step = 0;
    create();
  };
  create();
  stage.button('whenReady(callback)', ready);
  stage.button('setView', view);
  stage.button('Start over', reset);

  if (stage.preview) {
    stage.cycle([{ run: reset }, { run: ready }, { run: view }, { run: ready }], 1500);
  }
  return () => stage.dispose();
};

export default mount;
