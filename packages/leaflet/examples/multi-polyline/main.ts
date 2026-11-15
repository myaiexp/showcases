// One Polyline holding two separate lines: a nested array of latlngs
import { LeafletMap, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the layer: both lines belong to one Polyline, so both react.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [40, -98], zoom: 3, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const lines = new Polyline(
    [
      [
        [45.51, -122.68],
        [37.77, -122.43],
        [34.04, -118.2],
      ],
      [
        [40.78, -73.91],
        [41.83, -87.62],
        [32.76, -96.72],
      ],
    ],
    { color: '#f59e0b', weight: 5 },
  ).addTo(map);

  const note = (): string => {
    const rings = lines.getLatLngs();
    return `One layer, ${rings.length} lines, ${rings.map((r) => (Array.isArray(r) ? r.length : 0)).join(' and ')} points. toGeoJSON type: ${lines.toGeoJSON().geometry.type}`;
  };
  stage.say(note());
  lines.on('pointerover', () => lines.setStyle({ color: '#fde68a' }));
  lines.on('pointerout', () => lines.setStyle({ color: '#f59e0b' }));

  // Card: the pointer is faked, so toggle the style the same way the events would.
  let on = false;
  if (stage.preview) {
    stage.every(1400, () => {
      on = !on;
      lines.setStyle({ color: on ? '#fde68a' : '#f59e0b' });
    });
  }
  return () => stage.dispose();
};

export default mount;
