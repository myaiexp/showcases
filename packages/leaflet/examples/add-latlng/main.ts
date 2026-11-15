// Click the map to extend a Polyline with addLatLng
import { LeafletMap, Polyline, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const WALK: [number, number][] = [
  [44, -2], [47, 2], [45, 6], [49, 9], [47, 13], [51, 16], [49, 19],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map to add a point. The line is redrawn and its bounds grow with it.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 9], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const line = new Polyline([], { color: '#34d399', weight: 4 }).addTo(map);
  const say = (): void => {
    stage.say(line.isEmpty() ? 'Empty: no points yet' : `${line.getLatLngs().length} points; getBounds() south ${line.getBounds().getSouth().toFixed(1)}, north ${line.getBounds().getNorth().toFixed(1)}`);
  };
  map.on('click', (e: LeafletPointerEvent) => {
    line.addLatLng(e.latlng);
    say();
  });
  stage.button('Clear', () => {
    line.setLatLngs([]);
    say();
  });
  say();

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let i = 0;
    stage.every(900, () => {
      if (i === WALK.length) {
        i = 0;
        line.setLatLngs([]);
        g.hide();
        say();
        return;
      }
      g.click(WALK[i++]!);
    });
  }
  return () => stage.dispose();
};

export default mount;
