// bubblingPointerEvents: false keeps a path's click from also reaching the map
import { Circle, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click both circles. The blue one also triggers the map click; the green one, with bubblingPointerEvents off, does not.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [49, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const bubbling = new Circle([49, 4], { radius: 300_000, color: '#3b82f6' }).addTo(map);
  const contained = new Circle([49, 16], { radius: 300_000, color: '#34d399', bubblingPointerEvents: false }).addTo(map);

  const log = stage.log('clicks', 8);
  bubbling.on('click', () => log('blue circle click'));
  contained.on('click', () => log('green circle click'));
  map.on('click', () => log('  map click'));
  stage.say('bubblingPointerEvents: blue true (default), green false');

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle([
      { say: 'Blue circle clicked: circle click, then map click', run: () => g.click([49, 4], bubbling.getElement()), hold: 2200 },
      { say: 'Green circle clicked: circle click only', run: () => g.click([49, 16], contained.getElement()), hold: 2200 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
