// LatLngBounds contains, intersects and overlaps: touching edges intersect but do not overlap
import { LatLngBounds, LeafletMap, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The blue box is fixed. Move the green box east: it overlaps, then only touches along one edge (intersects true, overlaps false), then separates.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [49, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const fixed = new LatLngBounds([46, 6], [52, 12]);
  new Rectangle(fixed, { color: '#60a5fa', weight: 2 }).addTo(map);
  const moving = new Rectangle([[0, 0], [1, 1]], { color: '#34d399', weight: 2 }).addTo(map);

  const place = (west: number): void => {
    const b = new LatLngBounds([47, west], [51, west + 3]);
    moving.setBounds(b);
    stage.say(`green west ${west.toFixed(1)}: contains ${String(fixed.contains(b))}, intersects ${String(fixed.intersects(b))}, overlaps ${String(fixed.overlaps(b))}`);
  };
  place(8);
  stage.slider('green west edge', 4, 16, 0.5, 8, place);

  if (stage.preview) {
    // 8 inside, 10 overlapping, 12 touching the blue box's east edge, 14 apart.
    const stops = [8, 10, 12, 14, 6];
    let i = 0;
    stage.every(1700, () => place(stops[i++ % stops.length] as number));
  }
  return () => stage.dispose();
};

export default mount;
