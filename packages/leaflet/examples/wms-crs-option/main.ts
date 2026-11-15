// The WMSTileLayer crs option: ask the server for another projection than the map's, and see the mismatch
import { EPSG3395, EPSG3857, EPSG4326, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer, LocalWMSTileLayer } from '../../shared/local-tiles.ts';
import { onRequest, wmsLines } from '../../shared/tile-urls.ts';

const CRSS = { 'map crs (default)': null, EPSG3857, EPSG3395, EPSG4326 };
type Name = keyof typeof CRSS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The map is EPSG3857. Each WMS tile is drawn in the layer\'s crs and stretched into the Web Mercator tile, so EPSG4326 drifts away from the dark reference lines, most near the poles.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [55, 15], zoom: 3 }));
  // The reference: the same coast and borders, as a Web Mercator XYZ layer.
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png?layers=coast', { opacity: 0.9 }).addTo(map);
  const pre = stage.side('Last GetMap request');

  let layer: LocalWMSTileLayer | undefined;
  const use = (name: Name): void => {
    layer?.remove();
    layer = new LocalWMSTileLayer('https://wms.example/ows', {
      layers: 'coast',
      styles: 'vintage',
      format: 'image/png',
      transparent: true,
      ...(CRSS[name] ? { crs: CRSS[name] } : {}),
    });
    onRequest(layer, (url) => {
      if (pre) pre.textContent = wmsLines(url);
    });
    layer.addTo(map);
    const p = layer.wmsParams;
    stage.say(`crs option: ${name}, request says ${String(p.srs ?? p.crs)}`);
  };
  use('map crs (default)');
  stage.select('crs option', (Object.keys(CRSS) as Name[]).map((v) => ({ value: v, label: v })), 'map crs (default)', use);

  if (stage.preview) {
    const order: Name[] = ['map crs (default)', 'EPSG3395', 'EPSG4326'];
    let i = 0;
    stage.cycle([{ run: () => use(order[i++ % order.length] ?? 'map crs (default)') }], 2600);
  }
  return () => stage.dispose();
};

export default mount;
