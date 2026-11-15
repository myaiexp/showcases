// PolyUtil.centroid averages the vertices; polygonCenter finds the middle of the area
import { CircleMarker, EPSG3857, LeafletMap, Polygon, PolyUtil, type LatLngTuple } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The slider adds vertices along the bottom edge. The shape does not change, so the area centre stays put while the vertex average slides towards the crowded edge.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [49, 10], zoom: stage.preview ? 5 : 6, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const poly = new Polygon([[0, 0]], { color: '#60a5fa', weight: 2, fillOpacity: 0.15 }).addTo(map);
  const mean = new CircleMarker([0, 0], { radius: 7, color: '#fb923c', fillOpacity: 1 }).addTo(map);
  const area = new CircleMarker([0, 0], { radius: 7, color: '#34d399', fillOpacity: 1 }).addTo(map);
  mean.bindTooltip('centroid()', { permanent: true, direction: 'left' });
  area.bindTooltip('polygonCenter()', { permanent: true, direction: 'right' });

  const build = (extra: number): void => {
    const ring: LatLngTuple[] = [[53, 5]];
    ring.push([53, 15], [45, 15]);
    for (let i = 1; i <= extra; i++) ring.push([45, 15 - (10 * i) / (extra + 1)]);
    ring.push([45, 5]);
    poly.setLatLngs(ring);
    const m = PolyUtil.centroid(ring);
    const c = PolyUtil.polygonCenter(ring, EPSG3857);
    mean.setLatLng(m);
    area.setLatLng(c);
    stage.say(`${ring.length} vertices: centroid ${m.toString(2)}, polygonCenter ${c.toString(2)}`);
  };
  build(0);
  stage.slider('extra vertices on the south edge', 0, 40, 1, 0, build);
  if (stage.preview) {
    let t = 0;
    stage.every(160, () => build(Math.round(20 - 20 * Math.cos((t += 0.08)))));
  }
  return () => stage.dispose();
};

export default mount;
