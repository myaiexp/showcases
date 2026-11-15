// WMS on a map whose crs is EPSG4326 (plate carrée), compared with the default EPSG3857 and with EPSG3395
import { EPSG3395, EPSG3857, EPSG4326, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalWMSTileLayer } from '../../shared/local-tiles.ts';
import { onRequest, wmsLines } from '../../shared/tile-urls.ts';

const CRSS = { EPSG3857, EPSG4326, EPSG3395 };
type Name = keyof typeof CRSS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A WMSTileLayer uses the map\'s crs and says so in its requests. The map crs is fixed when the map is created, so the select makes a new map.' });
  const pre = stage.side('Last GetMap request');

  let map: LeafletMap | undefined;
  stage.own({ remove: () => map?.remove() });
  const use = (name: Name): void => {
    map?.remove();
    map = new LeafletMap(stage.box, { crs: CRSS[name], center: [30, 10], zoom: 1 });
    const layer = new LocalWMSTileLayer('https://wms.example/ows', { layers: 'land,coast,graticule', format: 'image/png', attribution: LAND_ATTRIBUTION });
    onRequest(layer, (url) => {
      const u = new URL(url);
      const crs = u.searchParams.get('srs') ?? u.searchParams.get('crs');
      if (pre) pre.textContent = wmsLines(url);
      else stage.say(`map crs ${name}: ${u.searchParams.has('srs') ? 'SRS' : 'CRS'}=${crs}`);
    });
    layer.addTo(map);
    stage.say(`map crs: ${name}`);
  };
  use('EPSG4326');
  stage.select('map crs', (Object.keys(CRSS) as Name[]).map((v) => ({ value: v, label: v })), 'EPSG4326', use);

  if (stage.preview) {
    const order: Name[] = ['EPSG4326', 'EPSG3857', 'EPSG3395'];
    let i = 0;
    stage.cycle([{ run: () => use(order[i++ % order.length] ?? 'EPSG4326') }], 2600);
  }
  return () => stage.dispose();
};

export default mount;
