// LatLngBounds.extend grows the box point by point; pad(ratio) grows or shrinks it by a ratio
import { CircleMarker, LatLngBounds, LeafletMap, Rectangle, type LatLngTuple } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const POINTS: LatLngTuple[] = [[48.1, 11.6], [50.1, 8.7], [47.4, 8.5], [51.3, 12.4], [49.4, 7.9], [46.2, 14.3]];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map to extend the bounds with the clicked point. The dashed box is bounds.pad(ratio).' });
  const map = stage.own(new LeafletMap(stage.box, { center: [49, 11], zoom: stage.preview ? 4 : 6, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let bounds = new LatLngBounds();
  let ratio = 0.25;
  const dots: CircleMarker[] = [];
  const box = new Rectangle([[0, 0], [0, 0]], { color: '#34d399', weight: 2, fillOpacity: 0.12 });
  const padded = new Rectangle([[0, 0], [0, 0]], { color: '#fb923c', weight: 1.5, dashArray: '5 5', fill: false });
  const draw = (): void => {
    if (!bounds.isValid()) {
      box.remove();
      padded.remove();
      stage.say('new LatLngBounds(): empty, isValid() false');
      return;
    }
    box.setBounds(bounds).addTo(map);
    padded.setBounds(bounds.pad(ratio)).addTo(map);
    stage.say(`toBBoxString() ${bounds.toBBoxString()}; pad(${ratio}) moves each side out by ${Math.round(ratio * 100)}% of the span`);
  };
  const extend = (p: LatLngTuple): void => {
    bounds.extend(p);
    dots.push(new CircleMarker(p, { radius: 4, color: '#e5e7eb', fillOpacity: 1 }).addTo(map));
    draw();
  };
  const reset = (): void => {
    bounds = new LatLngBounds();
    dots.splice(0).forEach((d) => d.remove());
    draw();
  };
  draw();

  map.on('click', (e) => extend([e.latlng.lat, e.latlng.lng]));
  stage.slider('pad ratio', -0.4, 1, 0.05, ratio, (v) => { ratio = v; draw(); });
  stage.button('Reset', reset);

  if (stage.preview) {
    let i = 0;
    stage.every(1300, () => {
      if (i < POINTS.length) extend(POINTS[i++] as LatLngTuple);
      else {
        i = 0;
        reset();
      }
    });
  }
  return () => stage.dispose();
};

export default mount;
