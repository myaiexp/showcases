// Thousands of circle markers drawn on one canvas, still interactive
import { Canvas, CircleMarker, LayerGroup, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { scatter } from '../../shared/scatter.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a count. Hover a dot: the canvas renderer hit-tests them, without a DOM element per dot.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 15], zoom: 4, zoomControl: !stage.preview, renderer: new Canvas() }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const group = new LayerGroup().addTo(map);
  const all = scatter(20000, [34, -12, 68, 45], 3);

  const fill = (n: number): void => {
    const t0 = performance.now();
    group.clearLayers();
    for (const p of all.slice(0, n)) {
      const dot = new CircleMarker(p, { radius: 3, color: '#38bdf8', weight: 1, fillOpacity: 0.6 });
      dot.on('pointerover', () => {
        dot.setStyle({ color: '#f59e0b', radius: 9 });
      });
      dot.on('pointerout', () => dot.setStyle({ color: '#38bdf8', radius: 3 }));
      group.addLayer(dot);
    }
    const ms = Math.round(performance.now() - t0);
    stage.say(`${n.toLocaleString('en')} circle markers added in ${ms} ms; <path> elements in the map: ${map.getContainer().querySelectorAll('.leaflet-overlay-pane path').length}`);
  };
  stage.slider('points', 500, 20000, 500, 3000, fill);
  fill(3000);

  if (stage.preview) {
    const counts = [1000, 4000, 1000, 6000];
    let i = 0;
    stage.cycle(
      [
        { run: () => fill(counts[i++ % counts.length] ?? 1000), hold: 1500 },
        { run: () => map.panBy([-120, 40], { duration: 1.5 }), hold: 1700 },
        { run: () => map.panBy([120, -40], { duration: 1.5 }), hold: 1700 },
      ],
      100,
    );
  }
  return () => stage.dispose();
};

export default mount;
