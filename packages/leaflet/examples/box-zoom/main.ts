// Box zoom: Shift-drag a rectangle, with boxzoomstart and boxzoomend
import { LeafletMap, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hold Shift and drag a rectangle. The map fits it with fitBounds when you let go.' });
  const log = stage.log('Events');
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  map.on('boxzoomstart', () => log('boxzoomstart'));
  // boxzoomend fires before the map zooms, and carries the box's bounds.
  const last = new Rectangle([[0, 0], [0, 0]], { color: '#f5b83d', weight: 1, fill: false, dashArray: '4' });
  map.on('boxzoomend', (e) => {
    const b = e.boxZoomBounds;
    log(`boxzoomend ${b.getSouth().toFixed(1)}, ${b.getWest().toFixed(1)} to ${b.getNorth().toFixed(1)}, ${b.getEast().toFixed(1)}`);
    stage.say(`boxZoomBounds: ${[b.getWest(), b.getSouth(), b.getEast(), b.getNorth()].map((n) => n.toFixed(1)).join(', ')}`);
    last.setBounds(b).addTo(map);
  });
  map.on('zoomend', () => log(`zoomend: ${map.getZoom()}`));

  stage.toggle('boxZoom', true, (on) => {
    if (on) map.boxZoom.enable();
    else map.boxZoom.disable();
    stage.say(`map.boxZoom.${on ? 'enable' : 'disable'}()`);
  });
  stage.button('Reset view', () => {
    last.remove();
    map.setView([48, 10], 4);
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gesture = gestures(stage, map, g);
    stage.cycle(
      [
        { run: () => map.setView([48, 10], 4, { animate: false }), hold: 400 },
        { say: 'Shift + drag a box over Italy', run: () => gesture.boxDrag([46, 6], [37, 19], 900), hold: 2800 },
        { say: 'Shift + drag a box over Scandinavia', run: () => map.setView([48, 10], 4, { animate: false }), hold: 300 },
        { run: () => gesture.boxDrag([66, 5], [56, 28], 900), hold: 2800 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
