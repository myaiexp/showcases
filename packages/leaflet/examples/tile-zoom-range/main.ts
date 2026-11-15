// A tile layer's own minZoom and maxZoom: one layer for the overview, another once zoomed in
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The vintage layer has maxZoom 4 and the night layer has minZoom 5: the map hands over between them.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 14], zoom: 3 }));

  new LocalTileLayer('https://tiles.example/vintage/{z}/{x}/{y}.png', { minZoom: 0, maxZoom: 4, attribution: LAND_ATTRIBUTION }).addTo(map);
  new LocalTileLayer('https://tiles.example/night/{z}/{x}/{y}.png', { minZoom: 5, maxZoom: 12 }).addTo(map);

  const report = (): void => {
    const z = map.getZoom();
    stage.say(`zoom ${z}: ${z <= 4 ? 'vintage layer (maxZoom 4)' : 'night layer (minZoom 5)'}`);
  };
  report();
  map.on('zoomend', report);
  stage.slider('zoom', 0, 12, 1, 3, (v) => map.setZoom(v));

  if (stage.preview) {
    stage.cycle([{ run: () => map.setZoom(4) }, { run: () => map.setZoom(5) }, { run: () => map.setZoom(6) }, { run: () => map.setZoom(3) }], 2200);
  }
  return () => stage.dispose();
};

export default mount;
