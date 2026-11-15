// WMS options Leaflet does not know become extra request parameters, and known ones stay out
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalWMSTileLayer } from '../../shared/local-tiles.ts';
import { onRequest, wmsLines } from '../../shared/tile-urls.ts';

const DATES = ['2026-11-13', '2026-11-14', '2026-11-15'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'time, format_options and sld_body below are not Leaflet options, so they travel in each GetMap URL. opacity and attribution are Leaflet options and do not. The pretend server ignores parameters it does not know.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [42, 12], zoom: 5 }));
  const pre = stage.side('Last GetMap request');

  const layer = new LocalWMSTileLayer('https://wms.example/ows', {
    layers: 'land,coast',
    format: 'image/png',
    // Unknown to Leaflet, so sent to the server as vendor parameters:
    time: DATES[0],
    format_options: 'dpi:180',
    // Known Leaflet options, never sent:
    opacity: 0.9,
    attribution: LAND_ATTRIBUTION,
  });

  onRequest(layer, (url) => {
    if (pre) pre.textContent = wmsLines(url);
    else {
      const q = new URL(url).searchParams;
      stage.say(`time=${q.get('time')} format_options=${q.get('format_options')}, opacity sent: ${q.has('opacity')}`);
    }
  });
  layer.addTo(map);
  stage.select('time', DATES.map((v) => ({ value: v, label: v })), DATES[0] ?? '', (time) => layer.setParams({ time }));

  if (stage.preview) {
    let i = 0;
    stage.cycle([{ run: () => layer.setParams({ time: DATES[++i % DATES.length] }) }], 2200);
  }
  return () => stage.dispose();
};

export default mount;
