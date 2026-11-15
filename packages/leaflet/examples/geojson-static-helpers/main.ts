// GeoJSON.latLngToCoords, latLngsToCoords, coordsToLatLng and asFeature on points you click
import { GeoJSON, LatLng, LeafletMap, Polygon, Polyline, type LatLngExpression, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the map to add vertices. GeoJSON.latLngsToCoords turns them into coordinates (longitude first), rounded to the chosen precision.', height: 460 });
  const pre = stage.side('static methods');
  if (pre) pre.style.cssText = 'font-size:11px;min-width:300px;white-space:pre-wrap';
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.1], zoom: stage.preview ? 11 : 12, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const points: LatLng[] = [];
  let close = false;
  let precision = 4;
  const shape = new Polyline([], { color: '#f5b83d' }).addTo(map);
  let poly: Polygon | null = null;

  const report = (): void => {
    shape.setLatLngs(points);
    poly?.remove();
    poly = close && points.length > 2 ? new Polygon(points, { color: '#38bdf8', fillOpacity: 0.2 }).addTo(map) : null;
    const last = points[points.length - 1];
    const lines: string[] = [];
    if (last) {
      const c = GeoJSON.latLngToCoords(last, precision);
      lines.push(`latLngToCoords(last, ${precision})`, `  ${JSON.stringify(c)}`);
      lines.push('coordsToLatLng(coords)', `  ${GeoJSON.coordsToLatLng(c).toString()}`);
      lines.push('asFeature(Point geometry)', `  ${JSON.stringify(GeoJSON.asFeature({ type: 'Point', coordinates: c }))}`);
    }
    const coords = GeoJSON.latLngsToCoords(points as LatLngExpression[], 0, close, precision);
    lines.push(`latLngsToCoords(points, 0, close=${close}, ${precision})`, `  ${JSON.stringify(coords)}`);
    if (pre) pre.textContent = lines.join('\n');
    stage.say(`${points.length} vertices; latLngsToCoords returns ${Array.isArray(coords) ? coords.length : 0} positions${close && points.length ? ' (first repeated at the end)' : ''}`);
  };
  const add = (latlng: LatLng): void => {
    points.push(latlng);
    report();
  };
  map.on('click', (e: LeafletPointerEvent) => add(e.latlng));
  stage.toggle('close = true', false, (on) => {
    close = on;
    report();
  });
  stage.slider('precision', 0, 6, 1, precision, (v) => {
    precision = v;
    report();
  });
  stage.button('Clear', () => {
    points.length = 0;
    report();
  });
  report();

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const spots: [number, number][] = [[51.52, -0.14], [51.54, -0.08], [51.5, -0.05], [51.48, -0.12]];
    let i = 0;
    stage.every(1400, () => {
      if (i === spots.length * 2) {
        i = 0;
        points.length = 0;
        close = false;
      }
      if (i === spots.length) close = true;
      if (i < spots.length) g.click(spots[i]!);
      else report();
      i++;
    });
  }
  return () => stage.dispose();
};

export default mount;
