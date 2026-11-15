// WMS transparent and format: an overlay that lets the base layer show through
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer, LocalWMSTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Without transparent the server paints the ocean, and the overlay hides the base. The pretend server always answers PNG; a real one needs image/png for alpha, as image/jpeg (the default) has none.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [35, 20], zoom: 4 }));
  new LocalTileLayer('https://tiles.example/terrain/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const layer = new LocalWMSTileLayer('https://wms.example/ows', {
    layers: 'coast,borders,graticule',
    styles: 'light',
    format: 'image/png',
    transparent: true,
  }).addTo(map);

  const say = (): void => {
    const p = layer.wmsParams;
    stage.say(`transparent ${String(p.transparent)}, format ${String(p.format)}`, p.transparent ? 'ok' : 'warn');
  };
  say();
  stage.toggle('transparent', true, (on) => (layer.setParams({ transparent: on }), say()));
  stage.toggle('format image/png', true, (on) => (layer.setParams({ format: on ? 'image/png' : 'image/jpeg' }), say()));

  if (stage.preview) {
    let t = true;
    stage.cycle([{ run: () => (layer.setParams({ transparent: (t = !t) }), say()) }], 2400);
  }
  return () => stage.dispose();
};

export default mount;
