// WMS version 1.1.1 or 1.3.0 on an EPSG4326 map: SRS or CRS, and BBOX as lng,lat or lat,lng
import { EPSG4326, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalWMSTileLayer } from '../../shared/local-tiles.ts';
import { onRequest } from '../../shared/tile-urls.ts';

type Version = '1.1.1' | '1.3.0';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both versions draw the same map. The request differs: 1.3.0 names the parameter CRS and puts the EPSG:4326 BBOX in latitude, longitude order.' });
  const map = stage.own(new LeafletMap(stage.box, { crs: EPSG4326, center: [30, 20], zoom: 2 }));
  const pre = stage.side('Last GetMap request');

  const layer = new LocalWMSTileLayer('https://wms.example/ows', {
    layers: 'land,coast,graticule',
    format: 'image/png',
    version: '1.1.1',
    attribution: LAND_ATTRIBUTION,
  });

  onRequest(layer, (url) => {
    const q = new URL(url).searchParams;
    const version = q.get('version') ?? '?';
    const crs = q.has('crs') ? `CRS=${q.get('crs')}` : `SRS=${q.get('srs')}`;
    const order = version >= '1.3' ? 'south,west,north,east (lat,lng)' : 'west,south,east,north (lng,lat)';
    const text = `VERSION=${version}\n${crs}\nBBOX=${q.get('bbox')}\n\nBBOX order: ${order}`;
    if (pre) pre.textContent = text;
    else stage.say(`${version}: ${crs}, BBOX ${(q.get('bbox') ?? '').split(',').map((n) => Math.round(Number(n))).join(',')} = ${version >= '1.3' ? 'lat,lng' : 'lng,lat'}`);
  });
  layer.addTo(map);

  const set = (v: Version): void => {
    layer.setParams({ version: v });
  };
  stage.select('version', (['1.1.1', '1.3.0'] as const).map((v) => ({ value: v, label: v })), '1.1.1', set);

  if (stage.preview) {
    const order: Version[] = ['1.3.0', '1.1.1'];
    let i = 0;
    stage.cycle([{ run: () => set(order[i++ % order.length] ?? '1.1.1') }], 2400);
  }
  return () => stage.dispose();
};

export default mount;
