// minNativeZoom and maxNativeZoom: the server's zoom range, with the tiles scaled outside it
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { onRequest } from '../../shared/tile-urls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom the map past maxNativeZoom or below minNativeZoom: the tiles keep the server zoom printed on them and are scaled.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [46, 8], zoom: 6, minZoom: 0, maxZoom: 9 }));

  // The layer shows at every zoom (maxZoom 9) but only has tiles for zoom 3 to 5.
  const layer = new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', {
    minNativeZoom: 3,
    maxNativeZoom: 5,
    maxZoom: 9,
    attribution: LAND_ATTRIBUTION,
  });

  let served = 0;
  const report = (): void => {
    const { minNativeZoom, maxNativeZoom } = layer.options;
    stage.say(`map zoom ${map.getZoom()}, tiles from zoom ${served} (native ${minNativeZoom}–${maxNativeZoom})`, map.getZoom() === served ? 'ok' : 'warn');
  };
  onRequest(layer, (_u, c) => {
    served = c.z;
    report();
  });
  layer.addTo(map);
  map.on('zoomend', report);

  const apply = (): void => {
    layer.redraw();
    report();
  };
  stage.slider('minNativeZoom', 0, 9, 1, 3, (v) => ((layer.options.minNativeZoom = Math.min(v, layer.options.maxNativeZoom ?? 9)), apply()));
  stage.slider('maxNativeZoom', 0, 9, 1, 5, (v) => ((layer.options.maxNativeZoom = Math.max(v, layer.options.minNativeZoom ?? 0)), apply()));

  if (stage.preview) {
    stage.cycle([{ run: () => map.setZoom(8) }, { run: () => map.setZoom(5) }, { run: () => map.setZoom(1) }, { run: () => map.setZoom(6) }], 2400);
  }
  return () => stage.dispose();
};

export default mount;
