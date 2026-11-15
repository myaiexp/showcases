// LatLng.equals compares within a small margin, which maxMargin overrides
import { Circle, CircleMarker, LatLng, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'equals(other) accepts a difference of 1e-9 degrees in each coordinate. equals(other, maxMargin) accepts maxMargin: the slider sets it, in degrees.' });
  const home = new LatLng(52.5, 13.4);
  const map = stage.own(new LeafletMap(stage.box, { center: home, zoom: 10, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new CircleMarker(home, { radius: 6, color: '#34d399', fillOpacity: 1 }).addTo(map);
  const probe = new CircleMarker(home, { radius: 6, color: '#fb923c', fillOpacity: 1 }).addTo(map);
  const margin = new Circle(home, { radius: 1, color: '#60a5fa', weight: 1, fill: false }).addTo(map);

  let offset = 0.05;
  let maxMargin = 0.02;
  const update = (): void => {
    const other = new LatLng(home.lat + offset, home.lng + offset);
    probe.setLatLng(other);
    // The margin is a square in degrees (largest of the two differences); the circle is for orientation.
    margin.setRadius(maxMargin * 111_320);
    stage.say(`offset ${offset.toFixed(3)}°, maxMargin ${maxMargin}: equals() ${String(home.equals(other))}, equals(other, maxMargin) ${String(home.equals(other, maxMargin))}`);
  };
  update();
  stage.slider('offset (degrees)', 0, 0.1, 0.005, offset, (v) => { offset = v; update(); });
  stage.slider('maxMargin', 0, 0.1, 0.005, maxMargin, (v) => { maxMargin = v; update(); });

  if (stage.preview) {
    let t = 0;
    stage.every(120, () => {
      t += 0.12;
      offset = 0.05 + 0.04 * Math.sin(t);
      update();
    });
  }
  return () => stage.dispose();
};

export default mount;
