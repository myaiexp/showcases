// A Rectangle from two corners, resized with setBounds
import { LeafletMap, Rectangle, type LatLngBoundsExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const BOXES: { name: string; bounds: LatLngBoundsExpression }[] = [
  { name: 'Iberia', bounds: [[36, -9.5], [43.8, 3.3]] },
  { name: 'Alps', bounds: [[44.5, 5.5], [47.8, 13.5]] },
  { name: 'Scandinavia', bounds: [[55.5, 5], [68, 25]] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'new Rectangle(bounds) takes two opposite corners; setBounds moves it.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 8], zoom: stage.preview ? 3 : 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const first = BOXES[0]!;
  const rect = new Rectangle(first.bounds, { color: '#ff7800', weight: 2 }).addTo(map);
  const show = (i: number): void => {
    const b = BOXES[i % BOXES.length]!;
    rect.setBounds(b.bounds);
    const sw = rect.getBounds().getSouthWest();
    const ne = rect.getBounds().getNorthEast();
    stage.say(`setBounds(${b.name}): ${sw.lat}, ${sw.lng} to ${ne.lat}, ${ne.lng}`);
  };
  BOXES.forEach((b, i) => stage.button(b.name, () => show(i)));

  let i = 0;
  show(0);
  if (stage.preview) {
    stage.every(2200, () => show(++i));
  }
  return () => stage.dispose();
};

export default mount;
