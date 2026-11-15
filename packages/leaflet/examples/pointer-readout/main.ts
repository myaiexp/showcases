// pointermove reported as latlng, container point and layer point
import { LeafletMap, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the map, then drag the map and watch the layer point stay put while the container point changes.' });
  const pre = stage.side('Last pointermove');
  const show = (text: string): void => {
    if (pre) pre.textContent = text;
    else stage.say(text);
  };

  const map = stage.own(new LeafletMap(stage.box).setView([40.4, -3.7], 5));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const fmt = (p: { x: number; y: number }): string => `${Math.round(p.x)}, ${Math.round(p.y)}`;
  map.on('pointermove', (e: LeafletPointerEvent) => {
    if (stage.preview) {
      show(`latlng ${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}  container ${fmt(e.containerPoint)}  layer ${fmt(e.layerPoint)}`);
      return;
    }
    show(
      `latlng\n  ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}\ncontainerPoint\n  ${fmt(e.containerPoint)}\nlayerPoint\n  ${fmt(e.layerPoint)}\n` +
        `pointerEventToLatLng\n  ${map.pointerEventToLatLng(e.originalEvent).toString()}`,
    );
  });
  map.on('pointerout', () => show('The pointer left the map.'));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let t = 0;
    stage.every(120, () => {
      t += 0.12;
      g.move([40.4 + 3 * Math.sin(t), -3.7 + 7 * Math.cos(t * 0.8)]);
    });
    stage.every(5000, () => map.panBy([60, 20]));
  }
  return () => stage.dispose();
};

export default mount;
