// ScaleControl options: maxWidth, metric, imperial and updateWhenIdle
import { LeafletMap, ScaleControl } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The bar length is a round number of metres or feet that fits in maxWidth pixels. Options are read when the control is added, so each change makes a new control.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 12], zoom: 5 }));
  new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const opts = { maxWidth: 100, metric: true, imperial: true, updateWhenIdle: false };
  let scale: ScaleControl | undefined;
  stage.onDispose(() => scale?.remove());
  const rebuild = (): void => {
    scale?.remove();
    scale = new ScaleControl({ ...opts }).addTo(map);
    report();
  };
  const report = (): void => {
    const lines = [...(scale?.getContainer()?.querySelectorAll('.leaflet-control-scale-line') ?? [])].map((l) => l.textContent);
    stage.say(`${JSON.stringify(opts)} reads ${lines.join(' / ') || 'nothing'}`);
  };
  rebuild();
  map.on('moveend', report);

  stage.slider('maxWidth', 40, 250, 10, opts.maxWidth, (v) => { opts.maxWidth = v; rebuild(); });
  stage.toggle('metric', true, (on) => { opts.metric = on; rebuild(); });
  stage.toggle('imperial', true, (on) => { opts.imperial = on; rebuild(); });
  stage.toggle('updateWhenIdle', false, (on) => { opts.updateWhenIdle = on; rebuild(); });

  if (stage.preview) {
    const variants = [{ maxWidth: 100, metric: true, imperial: true }, { maxWidth: 60, metric: true, imperial: false }, { maxWidth: 160, metric: false, imperial: true }];
    let i = 0;
    stage.every(2200, () => {
      Object.assign(opts, variants[i % variants.length]);
      rebuild();
      map.setZoom(i++ % 2 ? 4 : 6);
    });
  }
  return () => stage.dispose();
};

export default mount;
