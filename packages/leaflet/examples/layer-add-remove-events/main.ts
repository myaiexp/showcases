// layeradd and layerremove fire on the map for every layer that joins or leaves it
import { Circle, LeafletMap, Marker, Polygon, type LayerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add and remove layers with the buttons; each change is logged by the map.' });
  const log = stage.log('Map events', 12);

  const map = stage.own(new LeafletMap(stage.box).setView([51.505, -0.09], 13));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);

  const kind = (l: object): string => l.constructor.name;
  map.on('layeradd', (e: LayerEvent) => log(`layeradd    ${kind(e.layer)}`));
  map.on('layerremove', (e: LayerEvent) => log(`layerremove ${kind(e.layer)}`));

  const marker = new Marker([51.5, -0.09]);
  const circle = new Circle([51.508, -0.11], { radius: 500, color: 'red' });
  const polygon = new Polygon([[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]]);
  const flip = (layer: Marker | Circle | Polygon): void => {
    if (map.hasLayer(layer)) layer.remove();
    else layer.addTo(map);
  };
  stage.button('Toggle marker', () => flip(marker));
  stage.button('Toggle circle', () => flip(circle));
  stage.button('Toggle polygon', () => flip(polygon));

  if (stage.preview) {
    stage.cycle(
      [marker, circle, polygon, marker, polygon, circle].map((layer) => ({ run: () => flip(layer) })),
      1400,
    );
  }
  return () => stage.dispose();
};

export default mount;
