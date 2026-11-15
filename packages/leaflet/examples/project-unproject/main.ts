// project and unproject a point at any zoom, with the world's size in pixels from getPixelWorldBounds
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the marker, then change the zoom used for projecting. The map itself stays where it is.' });
  const pre = stage.side('Projection');

  const map = stage.own(new LeafletMap(stage.box).setView([48.85, 2.35], 4));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const marker = new Marker([48.85, 2.35], { draggable: !stage.preview }).addTo(map);

  let zoom = 3;
  const render = (): void => {
    const ll = marker.getLatLng();
    const p = map.project(ll, zoom);
    const back = map.unproject(p, zoom);
    const world = map.getPixelWorldBounds(zoom);
    const size = world?.getSize();
    const text = [
      `project(latlng, ${zoom})`,
      `  ${p.x.toFixed(1)}, ${p.y.toFixed(1)} px`,
      `unproject(that, ${zoom})`,
      `  ${back.lat.toFixed(4)}, ${back.lng.toFixed(4)}`,
      `getPixelWorldBounds(${zoom})`,
      `  ${size?.x} x ${size?.y} px`,
    ];
    if (pre) pre.textContent = text.join('\n');
    else stage.say(`project(latlng, ${zoom}) = ${p.x.toFixed(0)}, ${p.y.toFixed(0)} px in a world ${size?.x} px wide`);
  };
  marker.on('move', render);
  stage.slider('Zoom to project at', 0, 12, 1, zoom, (v) => {
    zoom = v;
    render();
  });
  render();

  if (stage.preview) {
    let i = 0;
    stage.every(1300, () => {
      i = (i + 1) % 10;
      zoom = i;
      marker.setLatLng([48.85 + (i % 3) * 2, 2.35 + (i % 4) * 3]);
    });
  }
  return () => stage.dispose();
};

export default mount;
