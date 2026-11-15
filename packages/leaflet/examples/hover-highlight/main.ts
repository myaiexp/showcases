// Highlight a path on pointerover with setStyle and put it back on pointerout
import { Circle, LeafletMap, Polygon, Rectangle, type Path } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { ghost } from '../../shared/ghost.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const BASE = { color: '#3388ff', weight: 2, fillOpacity: 0.25 };
const HOT = { color: '#fbbf24', weight: 5, fillOpacity: 0.6 };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over a shape: pointerover restyles it and brings it to the front, pointerout restores it.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const round = new Circle([49, 17], { ...BASE, radius: 300_000 });
  const shapes: { layer: Path; at: [number, number] }[] = [
    { layer: new Polygon([[53.5, 2], [54, 8], [51, 9], [50.5, 3]], BASE), at: [52, 5] },
    { layer: new Rectangle([[49, 8], [54, 14]], BASE), at: [51.5, 11.5] },
    { layer: round, at: [49, 17] },
    { layer: new Polygon([[47.5, 4], [48.5, 12], [45, 12], [45.5, 5]], BASE), at: [46.5, 8] },
  ];
  const log = stage.log('events', 6);
  shapes.forEach(({ layer }, i) => {
    layer.addTo(map);
    layer.on('pointerover', () => {
      layer.setStyle(HOT).bringToFront();
      log(`pointerover shape ${i + 1}`);
    });
    layer.on('pointerout', () => {
      layer.setStyle(BASE);
      log(`pointerout shape ${i + 1}`);
    });
  });

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      shapes.flatMap(({ layer, at }) => [
        { run: () => g.over(at, layer.getElement()), hold: 1100 },
        { run: () => g.out(layer.getElement()), hold: 250 },
      ]),
      400,
    );
  }
  return () => stage.dispose();
};

export default mount;
