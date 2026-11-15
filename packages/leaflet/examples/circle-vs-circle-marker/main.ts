// Circle is sized in meters, CircleMarker in pixels: zoom and compare
import { Circle, CircleMarker, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom with the buttons or the wheel. The Circle scales with the map, the CircleMarker keeps its pixel size.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const meters = new Circle([48, 4], { radius: 250_000, color: '#f59e0b' }).addTo(map);
  const pixels = new CircleMarker([48, 16], { radius: 30, color: '#7cb7ff' }).addTo(map);

  const report = (): void => {
    stage.say(`zoom ${map.getZoom()}: Circle ${meters.getRadius() / 1000} km, CircleMarker ${pixels.getRadius()} px`);
  };
  map.on('zoomend', report);
  report();

  stage.button('Zoom in', () => map.zoomIn());
  stage.button('Zoom out', () => map.zoomOut());
  if (stage.preview) {
    stage.cycle([
      { run: () => map.setZoom(3), hold: 1800 },
      { run: () => map.setZoom(5), hold: 1800 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
