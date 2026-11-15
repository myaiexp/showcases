// Listeners belong on the layers or the map: the canvas element itself gets no pointer events
import { Canvas, CircleMarker, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the circle. Listeners on the layer and the map count it; one on the <canvas> element never fires, because the canvas has pointer-events: none.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 7, zoomControl: !stage.preview, renderer: new Canvas() }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 18, attribution: LAND_ATTRIBUTION }).addTo(map);

  const circle = new CircleMarker([60.2, 24.9], { radius: 40, color: '#f59e0b', fillOpacity: 0.4 }).addTo(map);
  const canvas = map.getContainer().querySelector('canvas');
  let onLayer = 0;
  let onMap = 0;
  let onCanvas = 0;
  const show = (): void => stage.say(`circle click ${onLayer} | map click ${onMap} | <canvas> element click ${onCanvas}`);
  circle.on('click', () => (onLayer++, show()));
  map.on('click', () => (onMap++, show()));
  canvas?.addEventListener('click', () => (onCanvas++, show()), { signal: stage.signal });
  show();

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    // The map finds the circle itself, so the click goes to the container like a real one would.
    stage.cycle([{ run: () => g.click([60.2, 24.9]) }, { run: () => g.click([59.3, 23.2]) }], 1800);
  }
  return () => stage.dispose();
};

export default mount;
