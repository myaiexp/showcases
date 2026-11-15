// A custom {look} key in the URL template, read from the layer's options
import { LeafletMap, type TileLayerOptions } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { onRequest, shortUrl } from '../../shared/tile-urls.ts';

const LOOKS = ['dark', 'light', 'terrain', 'vintage', 'night'] as const;
type Look = (typeof LOOKS)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The select writes layer.options.look, then redraw() asks the template again.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [41, 12], zoom: 4 }));

  // Any key in the template that is not {s} {z} {x} {y} {r} is read from the options.
  const options = { look: 'dark', attribution: LAND_ATTRIBUTION };
  const layer = new LocalTileLayer('https://tiles.example/{look}/{z}/{x}/{y}.png', options as TileLayerOptions);

  const log = stage.log('Requested URLs', 12);
  onRequest(layer, (url) => log(shortUrl(url)));
  layer.addTo(map);

  const setLook = (look: Look): void => {
    (layer.options as Record<string, unknown>)['look'] = look;
    layer.redraw();
  };
  stage.select('look', LOOKS.map((v) => ({ value: v, label: v })), 'dark', setLook);

  if (stage.preview) {
    let i = 0;
    stage.cycle([{ run: () => setLook(LOOKS[++i % LOOKS.length] ?? 'dark') }], 2000);
  }
  return () => stage.dispose();
};

export default mount;
