// Several WMS layer lists in a LayersControl: one request asks the server to compose, two layers compose in the browser
import { LayersControl, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalWMSTileLayer } from '../../shared/local-tiles.ts';
import { onRequest } from '../../shared/tile-urls.ts';

const wms = (layers: string, extra: object = {}): LocalWMSTileLayer =>
  new LocalWMSTileLayer('https://wms.example/ows', { layers, format: 'image/png', ...extra });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the base layer. "Land and labels" is one request for both WMS layers; the overlay is a second WMSTileLayer that the browser puts on top.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [47, 12], zoom: 4 }));
  const log = stage.log('GetMap LAYERS', 6);

  const basemaps = {
    Land: wms('land', { attribution: LAND_ATTRIBUTION }),
    Labels: wms('labels'),
    'Land, then labels': wms('land,labels'),
    'Labels, then land': wms('labels,land'),
  };
  const overlays = { 'Coast (own request)': wms('coast', { transparent: true }) };
  for (const [name, l] of [...Object.entries(basemaps), ...Object.entries(overlays)]) {
    onRequest(l, (url) => log(`${name}: LAYERS=${new URL(url).searchParams.get('layers')}${new URL(url).searchParams.get('transparent') === 'true' ? ' TRANSPARENT' : ''}`));
  }

  new LayersControl(basemaps, overlays).addTo(map);
  basemaps['Land, then labels'].addTo(map);

  if (stage.preview) {
    const order = [basemaps.Land, basemaps.Labels, basemaps['Land, then labels'], basemaps['Labels, then land']];
    const names = ['Land', 'Labels', 'Land, then labels', 'Labels, then land'];
    let i = 0;
    let coast = false;
    stage.cycle(
      [
        {
          run: () => {
            for (const l of order) l.remove();
            const k = i++ % order.length;
            order[k]?.addTo(map);
            stage.say(`base layer: ${names[k]}`);
          },
        },
        {
          run: () => {
            coast = !coast;
            if (coast) overlays['Coast (own request)'].addTo(map);
            else overlays['Coast (own request)'].remove();
            stage.say(`overlay "Coast (own request)" ${coast ? 'on' : 'off'}`);
          },
        },
      ],
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
