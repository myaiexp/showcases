// WMSTileLayer.setParams(): change layers or styles on a live layer, with or without redrawing
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalWMSTileLayer } from '../../shared/local-tiles.ts';
import { onRequest } from '../../shared/tile-urls.ts';

const LAYER_SETS = ['land', 'land,coast', 'land,coast,borders', 'land,borders,graticule,labels'];
const STYLES = ['dark', 'light', 'terrain', 'vintage', 'night'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'setParams() merges into wmsParams and redraws. With noRedraw on the new values wait until the next redraw() or until panning loads new tiles.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [45, 15], zoom: 4 }));
  const layer = new LocalWMSTileLayer('https://wms.example/ows', {
    layers: LAYER_SETS[0] ?? 'land',
    styles: 'dark',
    format: 'image/png',
    attribution: LAND_ATTRIBUTION,
  });

  const log = stage.log('wmsParams and requests', 10);
  onRequest(layer, (url) => {
    const q = new URL(url).searchParams;
    log(`request LAYERS=${q.get('layers')} STYLES=${q.get('styles')}`);
  });
  layer.addTo(map);

  let noRedraw = false;
  const set = (params: { layers?: string; styles?: string }, skip = noRedraw): void => {
    log(`setParams(${JSON.stringify(params)}, ${skip})`);
    layer.setParams(params, skip);
  };
  stage.select('layers', LAYER_SETS.map((v) => ({ value: v, label: v })), LAYER_SETS[0] ?? 'land', (layers) => set({ layers }));
  stage.select('styles', STYLES.map((v) => ({ value: v, label: v })), 'dark', (styles) => set({ styles }));
  stage.toggle('noRedraw', false, (on) => (noRedraw = on));
  stage.button('redraw()', () => (log('redraw()'), layer.redraw()));

  if (stage.preview) {
    stage.cycle(
      [
        { say: "setParams({layers: 'land,coast'})", run: () => layer.setParams({ layers: 'land,coast' }) },
        { say: "setParams({styles: 'terrain'})", run: () => layer.setParams({ styles: 'terrain' }) },
        { say: "setParams({layers: 'land,borders,labels'})", run: () => layer.setParams({ layers: 'land,borders,labels' }) },
        { say: "setParams({styles: 'night', layers: 'land'}, true): nothing yet", run: () => layer.setParams({ styles: 'night', layers: 'land' }, true) },
        { say: 'redraw(): both changes show', run: () => layer.redraw() },
        { say: "setParams({styles: 'dark'})", run: () => layer.setParams({ styles: 'dark' }) },
      ],
      2000,
    );
  }
  return () => stage.dispose();
};

export default mount;
