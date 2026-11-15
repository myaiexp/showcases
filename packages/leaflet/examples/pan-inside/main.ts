// panInside: pan the minimum amount to keep a moving point inside a padded view
import { CircleMarker, LeafletMap, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import './style.css';

const CENTER: [number, number] = [47, 8];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The orange point circles a big loop. With panInside on, the map moves only when the point reaches the dashed padding.' });
  const map = stage.own(new LeafletMap(stage.box, { center: CENTER, zoom: 6, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const point = new CircleMarker(CENTER, { radius: 7, color: '#fff', fillColor: '#f58a3d', fillOpacity: 1 }).addTo(map);

  let padding = stage.preview ? 36 : 60;
  let follow = true;
  const frame = document.createElement('div');
  frame.className = 'frame';
  map.getContainer().append(frame);
  const sizeFrame = (): void => {
    frame.style.inset = `${padding}px`;
  };
  sizeFrame();

  let angle = 0;
  const path = (a: number): LatLngExpression => [CENTER[0] + 5 * Math.sin(a), CENTER[1] + 10 * Math.cos(a)];
  stage.every(60, () => {
    angle += 0.035;
    const at = path(angle);
    point.setLatLng(at);
    // The call this example is about: pan only as far as needed to fit the point inside the padded view.
    if (follow) map.panInside(at, { padding: [padding, padding], animate: false });
  });

  stage.toggle('Follow with panInside', follow, (on) => (follow = on));
  stage.slider('Padding (px)', 0, 150, 10, padding, (v) => {
    padding = v;
    sizeFrame();
  });
  stage.button('Back to start', () => map.setView(CENTER, 6));

  return () => stage.dispose();
};

export default mount;
