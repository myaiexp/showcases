// A Polygon drops a last point equal to the first; a Polyline keeps it
import { LeafletMap, Polygon, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both layers got the same five points, the last equal to the first.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const shape = (dx: number): [number, number][] => [
    [53, 2 + dx],
    [53, 8 + dx],
    [48, 8 + dx],
    [48, 2 + dx],
    [53, 2 + dx],
  ];
  const polygon = new Polygon(shape(0), { color: '#34d399' }).addTo(map);
  const line = new Polyline(shape(9), { color: '#7cb7ff' }).addTo(map);

  // A polygon's latlngs are wrapped in one ring array.
  const polygonRing = polygon.getLatLngs()[0];
  const polygonPoints = Array.isArray(polygonRing) ? polygonRing.length : 0;
  const text = `Polygon keeps ${polygonPoints} points (the repeat was removed). Polyline keeps ${line.getLatLngs().length}.`;
  stage.say(text);
  if (stage.preview) {
    stage.every(1600, () => {
      polygon.setStyle({ fillOpacity: polygon.options.fillOpacity === 0.2 ? 0.5 : 0.2 });
    });
  }
  return () => stage.dispose();
};

export default mount;
