// zoomSnap: 0 never rounds the zoom, so any level (and a pinch or box zoom) is kept as it ends
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll-zoom or press the buttons (0.25 each). The zoom stays wherever it stops.' });

  const map = stage.own(new LeafletMap(stage.box, { zoomDelta: 0.25, zoomSnap: 0 }).setView([20, 0], 2));
  new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const show = (): void => stage.say(`zoomSnap 0, zoomDelta 0.25: zoom ${map.getZoom().toFixed(3)}`);
  map.on('zoomend', show);
  show();
  stage.slider('setZoom', 0, 6, 0.01, 2, (v) => map.setZoom(v));

  if (stage.preview) {
    const press = (cls: string): void => map.getContainer().querySelector<HTMLElement>(`.leaflet-control-zoom-${cls}`)?.click();
    stage.cycle(
      [{ run: () => press('in') }, { run: () => press('in') }, { run: () => map.setZoom(2.8) }, { run: () => press('out') }, { run: () => map.setZoom(2) }],
      1700,
    );
  }
  return () => stage.dispose();
};

export default mount;
