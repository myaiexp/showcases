// renderer: new Canvas() draws every path on a canvas, and layers still get pointer events
import { Canvas, CircleMarker, LeafletMap, Polygon, Polyline, type LatLngTuple, type Path } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover and click the shapes: they are pixels on a canvas, yet each layer fires its own events.' });
  const log = stage.log('Layer events', 8);
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 7, zoomControl: !stage.preview, renderer: new Canvas() }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const line = new Polyline([[59.8, 23.2], [60.5, 24.0], [60.1, 25.0]], { color: '#7cb7ff', weight: 6 }).addTo(map);
  const poly = new Polygon([[60.6, 25.6], [60.3, 26.4], [60.9, 26.9]], { color: '#34d399' }).addTo(map);
  const dot = new CircleMarker([59.7, 26.2], { radius: 18, color: '#f59e0b' }).addTo(map);
  const shapes: { name: string; layer: Path; base: { color: string }; hot: { color: string } }[] = [
    { name: 'line', layer: line, base: { color: '#7cb7ff' }, hot: { color: '#fff' } },
    { name: 'polygon', layer: poly, base: { color: '#34d399' }, hot: { color: '#fff' } },
    { name: 'circle marker', layer: dot, base: { color: '#f59e0b' }, hot: { color: '#fff' } },
  ];
  for (const s of shapes) {
    s.layer.on('pointerover', () => {
      s.layer.setStyle(s.hot);
      log(`${s.name}: pointerover`);
    });
    s.layer.on('pointerout', () => {
      s.layer.setStyle(s.base);
      log(`${s.name}: pointerout`);
    });
    s.layer.on('click', () => log(`${s.name}: click`));
  }
  stage.say('The overlay pane holds one <canvas>, not one element per shape.');

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const spots: LatLngTuple[] = [[60.5, 24.0], [60.5, 26.4], [59.7, 26.2]];
    // The map finds the layer under the pointer itself: events go to the map container.
    stage.cycle(
      spots.flatMap((p, i) => [
        { run: () => g.move(p), hold: 1100 },
        { run: () => g.move([59.0, 22.5]), hold: i === 2 ? 900 : 400 },
      ]),
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
