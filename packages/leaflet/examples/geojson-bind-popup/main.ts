// A GeoJSON layer is a FeatureGroup: one bindPopup with a function reads each clicked feature
import { GeoJSON, LeafletMap, type Layer, type Polygon } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

type Props = { color: string; description: string };
const box = (x: number, y: number, props: Props): Feature => ({
  type: 'Feature',
  properties: props,
  geometry: { type: 'Polygon', coordinates: [[[x, y], [x + 0.03, y], [x + 0.03, y + 0.02], [x, y + 0.02], [x, y]]] },
});
const data: Feature[] = [
  box(-105.03, 39.74, { color: '#f87171', description: 'Red lot: parking' }),
  box(-104.98, 39.75, { color: '#4ade80', description: 'Green lot: park' }),
  box(-104.94, 39.73, { color: '#38bdf8', description: 'Blue lot: water works' }),
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a polygon. The popup was bound once, to the whole layer; its function gets the polygon that was clicked.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [39.75, -104.97], zoom: stage.preview ? 11 : 12, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const layer = new GeoJSON(data, {
    style(feature) {
      return { color: (feature.properties as Props).color, fillOpacity: 0.5 };
    },
  })
    .bindPopup((layer: Layer) => (layer as unknown as { feature: Feature }).feature.properties?.['description'])
    .addTo(map);

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const polys = layer.getLayers() as Polygon[];
    stage.cycle(
      polys.map((p) => ({ run: () => g.click(p.getBounds().getCenter(), p.getElement()), hold: 2000 })),
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
