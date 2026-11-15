// wrapLatLng and wrapLatLngBounds fold coordinates from repeated world copies back into -180..180
import { CircleMarker, LatLngBounds, LeafletMap, Rectangle, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The map repeats east and west. Click a copy of the world: e.latlng keeps the unwrapped longitude, wrapLatLng folds it.' });
  const log = stage.log('Clicks', 8);

  const map = stage.own(new LeafletMap(stage.box, { minZoom: 1 }).setView([30, 180], 1));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // A box that sits in the copy east of the dateline, and the same box wrapped.
  const far = new LatLngBounds([10, 190], [45, 230]);
  new Rectangle(far, { color: '#f90', fill: false }).addTo(map);
  const wrapped = map.wrapLatLngBounds(far);
  new Rectangle(wrapped, { color: '#4cf', dashArray: '4 4', fill: false }).addTo(map);
  const wb = (b: LatLngBounds): string => `${b.getWest().toFixed(0)}..${b.getEast().toFixed(0)}`;
  if (!stage.preview) log(`box ${wb(far)} -> wrapLatLngBounds ${wb(wrapped)}`);

  const dots: CircleMarker[] = [];
  map.on('click', (e: LeafletPointerEvent) => {
    const w = map.wrapLatLng(e.latlng);
    dots.splice(0).forEach((d) => d.remove());
    dots.push(new CircleMarker(e.latlng, { radius: 6, color: '#f90' }).addTo(map), new CircleMarker(w, { radius: 6, color: '#4cf' }).addTo(map));
    log(`lng ${e.latlng.lng.toFixed(1)} -> wrapLatLng ${w.lng.toFixed(1)}`);
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { run: () => g.click([20, 215]) },
        { run: () => g.click([-10, 250]) },
        { run: () => g.click([40, 150]) },
        { run: () => g.click([0, 340]) },
      ],
      2000,
    );
  }
  return () => stage.dispose();
};

export default mount;
