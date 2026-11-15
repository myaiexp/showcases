// toGeoJSON on each path type, with a precision option that rounds the coordinates
import type { Feature } from 'geojson';
import { Circle, CircleMarker, LeafletMap, Polygon, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a layer and a precision. Note that a Circle exports only its centre: the radius is not part of the GeoJSON.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [49, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const polyline = new Polyline([[44.123456, 1.987654], [50.55555, 6.44444], [47.31415, 12.27182]], { color: '#7cb7ff' });
  const polygon = new Polygon([[53.123456, 3.987654], [53.55555, 13.44444], [47.31415, 9.27182]], { color: '#34d399' });
  const circle = new Circle([48.8566, 2.3522], { radius: 200_000, color: '#f59e0b' });
  const marker = new CircleMarker([52.52, 13.405], { radius: 14, color: '#f472b6' });
  const layers: Record<string, { toGeoJSON(precision?: number): Feature }> = {
    Polyline: polyline,
    Polygon: polygon,
    Circle: circle,
    CircleMarker: marker,
  };
  for (const layer of [polyline, polygon, circle, marker]) layer.addTo(map);

  const pre = stage.side('toGeoJSON(precision)');
  const show = (name: string, precision: number): void => {
    const feature = layers[name]!.toGeoJSON(precision);
    const text = JSON.stringify(feature.geometry);
    if (pre) pre.textContent = JSON.stringify(feature, null, 1);
    stage.say(`${name}.toGeoJSON(${precision}) -> ${feature.geometry.type} ${text.length > 70 ? text.slice(0, 70) + '...' : text}`);
  };
  let name = 'Polyline';
  let precision = 3;
  stage.select('layer', Object.keys(layers).map((k) => ({ value: k, label: k })), name, (v) => show((name = v), precision));
  stage.slider('precision', 0, 6, 1, precision, (v) => show(name, (precision = v)));

  const names = Object.keys(layers);
  let i = 0;
  show(names[0]!, 3);
  if (stage.preview) {
    stage.every(2400, () => show(names[++i % names.length]!, i % 2 ? 2 : 4));
  }
  return () => stage.dispose();
};

export default mount;
