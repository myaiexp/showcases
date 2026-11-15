// interactive: false makes a path invisible to the pointer; clicks fall through to the map
import { Circle, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click each circle. The blue one fires its own click; clicks on the orange one reach only the map.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [49, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const live = new Circle([49, 4], { radius: 300_000, color: '#3b82f6' }).addTo(map);
  const inert = new Circle([49, 16], { radius: 300_000, color: '#f59e0b', interactive: false }).addTo(map);

  const log = stage.log('clicks', 8);
  live.on('click', () => log('circle (interactive) click'));
  inert.on('click', () => log('circle (interactive: false) click'));
  map.on('click', (e) => log(`map click at ${e.latlng.lat.toFixed(1)}, ${e.latlng.lng.toFixed(1)}`));
  stage.say(`blue interactive: ${live.options.interactive}; orange interactive: ${inert.options.interactive}`);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle([
      { say: 'Click on the interactive circle: its own click, then the map click', run: () => g.click([49, 4], live.getElement()), hold: 2200 },
      { say: 'Click on the non-interactive circle: only the map hears it', run: () => g.click([49, 16]), hold: 2200 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
