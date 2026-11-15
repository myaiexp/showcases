// bindPopup on a marker, a circle and a polygon: where each popup opens
import { Circle, LeafletMap, Marker, Polygon } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Click the marker: the popup sits on its anchor. Click the circle or the polygon in different places: the popup opens where you clicked.',
  });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.25, 24.9], zoom: stage.preview ? 7 : 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker([60.17, 24.94]).addTo(map);
  const circle = new Circle([60.35, 24.4], { radius: 22000, color: '#f59e0b' }).addTo(map);
  const polygon = new Polygon(
    [
      [60.4, 25.2],
      [60.2, 25.35],
      [60.45, 25.55],
    ],
    { color: '#34d399' },
  ).addTo(map);

  // bindPopup() takes the content and wires the layer's click to open it, so no handler is needed.
  marker.bindPopup('<b>Marker</b><br>Opens on its anchor.');
  circle.bindPopup('<b>Circle</b><br>Opens at the click.');
  polygon.bindPopup('<b>Polygon</b><br>Opens at the click.');

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { say: 'Marker: popup on its anchor', run: () => g.click(marker.getLatLng(), marker.getElement()) },
        { say: 'Circle: popup at the click', run: () => g.click([60.4, 24.2], circle.getElement()) },
        { say: 'Click elsewhere on the circle', run: () => g.click([60.28, 24.6], circle.getElement()) },
        { say: 'Polygon: popup at the click', run: () => g.click([60.38, 25.3], polygon.getElement()) },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
