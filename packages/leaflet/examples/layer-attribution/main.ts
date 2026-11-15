// The attribution control collects each layer's attribution and drops it outside the layer's zoom range
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in and out: the detail layer lists its attribution only at zoom 5 and above. The control reads layer.getAttribution(), and the layers are added and removed with the buttons.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [52, 5], zoom: 4, minZoom: 2, maxZoom: 8 }));
  const base = new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const detail = new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png?layers=coast', {
    minZoom: 5,
    attribution: 'Coastline detail &copy; Example Survey',
  }).addTo(map);
  const labels = new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png?layers=labels', { attribution: 'Labels: Example Names' });

  const read = (): void => {
    const text = map.attributionControl?.getContainer()?.textContent ?? '';
    stage.say(`zoom ${map.getZoom()}: ${text.replace('Leaflet', '').replace('|', '').trim()}`);
  };
  map.on('zoomend', read);
  map.on('layeradd', read);
  map.on('layerremove', read);
  read();

  stage.button('Add / remove labels layer', () => (map.hasLayer(labels) ? labels.remove() : labels.addTo(map)));
  stage.button('Remove base layer', () => base.remove());
  stage.button('Add base layer', () => base.addTo(map));

  if (stage.preview) {
    stage.cycle([
      { run: () => map.setZoom(4) },
      { run: () => map.setZoom(6) },
      { run: () => labels.addTo(map) },
      { run: () => { detail.remove(); detail.addTo(map); } },
      { run: () => labels.remove() },
    ], 2000);
  }
  return () => stage.dispose();
};

export default mount;
