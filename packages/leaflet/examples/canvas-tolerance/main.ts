// A Canvas renderer's tolerance widens the click area around thin paths
import { Canvas, LeafletMap, Polyline, SVG, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The line is 2 px wide. Click beside it: the pale band is where a click now counts.' });
  const log = stage.log('Clicks', 8);
  const canvas = new Canvas({ tolerance: 0 });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 7, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const route: LatLngExpression[] = [[59.8, 23.0], [60.4, 24.2], [60.0, 25.6], [60.6, 26.9]];
  const line = new Polyline(route, { color: '#f59e0b', weight: 2, renderer: canvas }).addTo(map);
  // The band is only a picture, on its own SVG renderer, never interactive.
  const band = new Polyline(route, { color: '#f59e0b', opacity: 0.2, weight: 2, interactive: false, renderer: new SVG() }).addTo(map);

  // The layer's click fires before the map's, so `hit` is set by the time the map handler reads it.
  let hit = false;
  line.on('click', () => (hit = true));
  map.on('click', (e) => {
    const p = map.latLngToContainerPoint(e.latlng);
    log(`click at ${Math.round(p.x)}, ${Math.round(p.y)}: ${hit ? 'hit the line' : 'missed'} (tolerance ${canvas.options.tolerance})`);
    stage.say(hit ? 'hit' : 'miss', hit ? 'ok' : 'warn');
    hit = false;
  });

  const set = (v: number): void => {
    canvas.options.tolerance = v;
    band.setStyle({ weight: 2 + 2 * v });
  };
  stage.slider('tolerance (px)', 0, 20, 1, 0, set);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    // A point on the line near the view centre, then 8 px below it.
    const onLine = map.layerPointToLatLng(line.closestLayerPoint(map.latLngToLayerPoint([60.2, 24.9])) ?? map.latLngToLayerPoint(map.getCenter()));
    const base = map.latLngToContainerPoint(onLine);
    const beside = map.containerPointToLatLng([base.x, base.y + 8]);
    stage.cycle(
      [
        { run: () => set(0), hold: 300 },
        { run: () => g.click(beside), hold: 2000 },
        { run: () => set(12), hold: 700 },
        { run: () => g.click(beside), hold: 2200 },
      ],
      200,
    );
  }
  return () => stage.dispose();
};

export default mount;
