// zoomDelta: how many zoom levels the zoom buttons and the + and - keys step
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the map buttons or the + and - keys (click the map first). Change zoomDelta to change the step.' });

  const map = stage.own(new LeafletMap(stage.box, { zoomDelta: 0.5, zoomSnap: 0.5 }).setView([20, 0], 2));
  new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const show = (): void => stage.say(`zoomDelta ${map.options.zoomDelta}: zoom ${map.getZoom()}`);
  map.on('zoomend', show);
  show();
  stage.select('zoomDelta', ['0.25', '0.5', '1', '2'].map((v) => ({ value: v, label: v })), '0.5', (v) => {
    map.options.zoomDelta = Number(v);
    map.options.zoomSnap = Math.min(Number(v), 1);
    show();
  });

  if (stage.preview) {
    // Press the control's real buttons.
    const press = (cls: string): void => map.getContainer().querySelector<HTMLElement>(`.leaflet-control-zoom-${cls}`)?.click();
    stage.cycle([{ run: () => press('in') }, { run: () => press('in') }, { run: () => press('out') }, { run: () => press('out') }], 1700);
  }
  return () => stage.dispose();
};

export default mount;
