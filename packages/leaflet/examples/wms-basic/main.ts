// A WMSTileLayer: the layers option picks what the server draws, and each tile is one GetMap request
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalWMSTileLayer } from '../../shared/local-tiles.ts';
import { onRequest, shortUrl, wmsLines } from '../../shared/tile-urls.ts';

const SETS = ['land', 'land,coast', 'land,coast,borders,labels', 'land,graticule'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The layers option is a comma-separated list of the WMS server\'s own layer names. The side panel shows the last GetMap URL.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 10], zoom: 4 }));
  const pre = stage.side('Last GetMap request');

  let layer: LocalWMSTileLayer | undefined;
  const use = (layers: string): void => {
    layer?.remove();
    // The base URL is the service; every option Leaflet does not know becomes a request parameter.
    layer = new LocalWMSTileLayer('https://wms.example/ows', { layers, format: 'image/png', attribution: LAND_ATTRIBUTION });
    onRequest(layer, (url) => {
      if (pre) pre.textContent = wmsLines(url);
      else stage.say(`layers=${layers}  ${shortUrl(url).slice(0, 60)}…`);
    });
    layer.addTo(map);
  };
  use(SETS[0] ?? 'land');
  stage.select('layers', SETS.map((v) => ({ value: v, label: v })), SETS[0] ?? 'land', use);

  if (stage.preview) {
    let i = 0;
    stage.cycle([{ run: () => use(SETS[++i % SETS.length] ?? 'land') }], 2400);
  }
  return () => stage.dispose();
};

export default mount;
