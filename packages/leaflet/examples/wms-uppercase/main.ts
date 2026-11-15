// The WMSTileLayer uppercase option: parameter names as WIDTH=256 instead of width=256
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalWMSTileLayer } from '../../shared/local-tiles.ts';
import { onRequest, wmsLines } from '../../shared/tile-urls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Some servers want uppercase keys. The option is read for every URL, so a change plus redraw() applies it. This server accepts both.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: 4 }));
  const pre = stage.side('Last GetMap request');

  const layer = new LocalWMSTileLayer('https://wms.example/ows', { layers: 'land,coast', format: 'image/png', uppercase: false, attribution: LAND_ATTRIBUTION });
  onRequest(layer, (url) => {
    if (pre) pre.textContent = wmsLines(url);
    else stage.say(`uppercase ${String(layer.options.uppercase)}: ${[...new URL(url).searchParams.keys()].slice(0, 5).join('&')}…`);
  });
  layer.addTo(map);

  const set = (on: boolean): void => {
    layer.options.uppercase = on;
    layer.redraw();
  };
  stage.toggle('uppercase', false, set);

  if (stage.preview) {
    let on = false;
    stage.cycle([{ run: () => set((on = !on)) }], 2400);
  }
  return () => stage.dispose();
};

export default mount;
