// zoomSnap sets the steps the zoom level may take: setZoom(0.8) lands on 0.75 with zoomSnap 0.25
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a zoomSnap, then ask for a zoom. The map snaps to the nearest valid level and scales the tiles of the whole zoom below it.' });

  const map = stage.own(new LeafletMap(stage.box, { zoomSnap: 0.25 }).setView([0, 0], 1));
  new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const ask = (z: number): void => {
    map.setZoom(z);
    stage.say(`setZoom(${z}) with zoomSnap ${map.options.zoomSnap}: the zoom is ${map.getZoom()}`);
  };
  map.on('zoomend', () => stage.say(`zoomSnap ${map.options.zoomSnap}: the zoom is now ${map.getZoom()}`));

  stage.select('zoomSnap', ['1', '0.5', '0.25', '0.1'].map((v) => ({ value: v, label: v })), '0.25', (v) => {
    map.options.zoomSnap = Number(v);
  });
  stage.slider('Ask for zoom', 0, 4, 0.05, 1, ask);

  if (stage.preview) {
    const asks = [0.8, 1.3, 2.9, 0.4, 1.55];
    let i = 0;
    stage.every(2200, () => ask(asks[i++ % asks.length]!));
  }
  return () => stage.dispose();
};

export default mount;
