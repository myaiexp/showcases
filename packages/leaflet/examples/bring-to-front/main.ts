// bringToFront and bringToBack reorder overlapping paths
import { Circle, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Paths stack in the order they were added. bringToFront and bringToBack reorder them.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const make = (name: string, lng: number, color: string): { name: string; circle: Circle } => ({
    name,
    circle: new Circle([50, lng], { radius: 320_000, color, fillColor: color, fillOpacity: 0.7, weight: 2 }).addTo(map),
  });
  const rings = [make('red', 5, '#ef4444'), make('green', 10, '#34d399'), make('blue', 15, '#3b82f6')];

  const front = (i: number): void => {
    rings[i]!.circle.bringToFront();
    stage.say(`${rings[i]!.name}.bringToFront()`);
  };
  const back = (i: number): void => {
    rings[i]!.circle.bringToBack();
    stage.say(`${rings[i]!.name}.bringToBack()`);
  };
  rings.forEach((r, i) => {
    stage.button(`${r.name} to front`, () => front(i));
    stage.button(`${r.name} to back`, () => back(i));
  });

  if (stage.preview) {
    stage.cycle([
      { run: () => front(0) },
      { run: () => front(1) },
      { run: () => back(2) },
      { run: () => front(2) },
    ], 1700);
  }
  return () => stage.dispose();
};

export default mount;
