// closestLayerPoint finds the spot on a line nearest to the pointer, with its pixel distance
import { CircleMarker, LeafletMap, Polyline, type LatLngExpression, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer around the map. The white tick joins it to the nearest point on the line.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const line = new Polyline([[44, 0], [51, 6], [45, 11], [52, 18]], { color: '#7cb7ff', weight: 3 }).addTo(map);
  const spot = new CircleMarker([48, 10], { radius: 5, color: '#ffffff', fillOpacity: 1, interactive: false });
  const tick = new Polyline([], { color: '#ffffff', weight: 1, dashArray: '3 3', interactive: false });

  map.on('pointermove', (e: LeafletPointerEvent) => {
    const nearest = line.closestLayerPoint(map.latLngToLayerPoint(e.latlng));
    if (!nearest) return;
    const at: LatLngExpression = map.layerPointToLatLng(nearest);
    spot.setLatLng(at).addTo(map);
    tick.setLatLngs([e.latlng, at]).addTo(map);
    stage.say(`closestLayerPoint: ${Math.round(nearest.distance)} px away`);
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let t = 0;
    stage.every(120, () => {
      t += 0.1;
      g.move([48 + 5 * Math.sin(t * 1.3), 9 + 11 * Math.cos(t * 0.7)]);
    });
  }
  return () => stage.dispose();
};

export default mount;
