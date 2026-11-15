// The map's view events in the order they fire: movestart, move, zoomstart, zoom, viewreset, resize
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const TYPES = ['movestart', 'move', 'moveend', 'zoomstart', 'zoom', 'zoomend', 'viewreset', 'resize'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag, scroll-zoom or use the buttons; repeated move and zoom events are counted on one line.' });
  const log = stage.log('Events', 16);

  const map = stage.own(new LeafletMap(stage.box).setView([48.85, 2.35], 5));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // move and zoom fire many times per animation, so runs of the same type collapse into "move x12".
  let run = { type: '', n: 0 };
  const flush = (): void => {
    if (run.n) log(run.n > 1 ? `${run.type} x${run.n}` : run.type);
  };
  const seen = (type: string): void => {
    if (type === run.type) run.n++;
    else {
      flush();
      run = { type, n: 1 };
    }
  };
  for (const type of TYPES) map.on(type, (e: { type: string }) => seen(e.type));
  stage.onDispose(() => {
    run = { type: '', n: 0 };
  });

  const narrow = (): void => {
    stage.box.style.width = stage.box.style.width ? '' : '70%';
  };
  const steps = {
    pan: () => map.panBy([120, 40]),
    zoom: () => map.setZoom(map.getZoom() >= 7 ? 4 : map.getZoom() + 1),
    fly: () => map.flyTo([41.9, 12.5], 6),
    view: () => map.setView([48.85, 2.35], 5, { animate: false }),
    resize: narrow,
  };
  stage.button('panBy', steps.pan);
  stage.button('setZoom', steps.zoom);
  stage.button('flyTo Rome', steps.fly);
  stage.button('setView (no animation)', steps.view);
  stage.button('Resize the container', steps.resize);

  if (stage.preview) {
    stage.cycle(
      [{ run: steps.pan }, { run: steps.zoom }, { run: steps.fly, hold: 4200 }, { run: steps.resize }, { run: steps.view }],
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
