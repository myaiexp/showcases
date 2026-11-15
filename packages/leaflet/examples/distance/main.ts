// map.distance between two markers, in meters by default
import { LeafletMap, Marker, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag either marker: the distance is recomputed with map.distance().' });

  const map = stage.own(new LeafletMap(stage.box).setView([49, 8], 4));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const a = new Marker([51.5, -0.12], { draggable: !stage.preview }).addTo(map);
  const b = new Marker([41.9, 12.5], { draggable: !stage.preview }).addTo(map);
  const line = new Polyline([a.getLatLng(), b.getLatLng()], { color: '#f90', dashArray: '6 6' }).addTo(map);

  const update = (): void => {
    line.setLatLngs([a.getLatLng(), b.getLatLng()]);
    const m = map.distance(a.getLatLng(), b.getLatLng());
    stage.say(`map.distance(a, b) = ${Math.round(m).toLocaleString('en')} m (${(m / 1000).toFixed(1)} km)`);
    b.bindTooltip(`${(m / 1000).toFixed(0)} km from the first marker`).openTooltip();
  };
  a.on('move', update);
  b.on('move', update);
  update();

  if (stage.preview) {
    let t = 0;
    stage.every(60, () => {
      t += 0.05;
      b.setLatLng([45 + 7 * Math.sin(t), 14 + 18 * Math.cos(t)]);
    });
  }
  return () => stage.dispose();
};

export default mount;
